'use server'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import crypto from 'crypto'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'

const schema = z.object({
    // username: z.string(

    // ).min(3,
    //     "Username must be at least 3 characters long").max(20,
    //         "Username must be at most 20 characters long").optional(),
    email: z.string().email('Invalid email address'),
    // shield should be empty to prevent spam bots
    shield: z.string().max(0)
})
export const sendEmail = async (prevState: any, formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const validatedFields = schema.safeParse({
        email: formData.get('email'),
        shield: formData.get('shield')
    })
    if (!validatedFields.success) {
        return {
            message: validatedFields.error?.flatten().fieldErrors
        }
    }
    const { email, shield } = validatedFields.data
    if (shield !== '') {
        return {
            message: 'Invalid form submission'
        }
    }

    await getOrCreateUser(email)
    const keytoApi = process.env.AUTH_RESEND_KEY
    if (!keytoApi) {
        throw new Error('No API key provided')
    }
    await sendEmailVerification(email, {
        apiKey: keytoApi,
        from: 'no-reply@derickhoskinson.com'
    })
    return {
        message: `Email sent to ${email}`
    }
}

const getOrCreateUser = async (email: string) => {
    try {
        await prisma.user.upsert({
            where: { email },
            update: {}, // Leave empty if you don’t want to change anything for existing users
            create: {
                email,
                emailVerified: false,
                // use just the first part of the email as the name
                name: email.split('@')[0]
            }
        })
        return {
            message: `Email sent to ${email}`
        }
    } catch (error) {
        console.error('Error in upsert:', error)
        throw new Error('Unable to register user')
    }
}

export const createEmailVerificationToken = async (email: string) => {
    const token =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    // expire 24 hours from now
    const expires = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    await prisma.verificationToken.create({
        data: {
            identifier: email,
            token,
            expires
        }
    })
    return token
}

export const verifyToken = async (token: string, email: string) => {
    // Find the token and return it so additional checks can be made
    const verificationToken = await prisma.verificationToken.findUnique({
        where: {
            token
        }
    })
    if (
        !verificationToken ||
        verificationToken.identifier !== email ||
        verificationToken.expires < new Date()
    ) {
        redirect('/invalid-link')
    }

    // delete the token

    await prisma.verificationToken.delete({
        where: { token }
    })
    // update the user
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            emailVerified: true
        },
        create: {
            email,
            emailVerified: true
        }
    })

    await createUserSession(user.id)
}


interface AuthCookie {
    isAuthenticated: boolean
    userId: string
}

export const verifySession = cache(async () => {
    const cookie = cookies().get('session-token')

    if (!cookie) {
        return null
    }

    if (!cookie?.value) {
        return null
    }

    const { token, userId } = JSON.parse(cookie.value)

    if (!token || !userId) {
        return null
    }

    const session = await prisma.session.findMany({
        where: {
            sessionToken: token,
            userId: userId
        },
        select: {
            expires: true
        }
    })

    if (!session) {
        return null
    }

    return {
        isAuthenticated: true,
        userId
    } as AuthCookie
})

export const deleteSession = () => {
    cookies().delete('session-token')
}


export const createUserSession = async (userId: string) => {
    const sessionToken = crypto.randomBytes(32).toString('hex')
    const sessionExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 0y days
    await prisma.session.create({
        data: {
            userId,
            expires: sessionExpires,
            sessionToken
        }
    })
    const sessionData = JSON.stringify({
        token: sessionToken,
        userId: userId
    })
    const sessionSecret = process.env.AUTH_SECRET
    if (!sessionSecret) {
        throw new Error('No session secret provided')
    }

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        secret: sessionSecret,
        expires: sessionExpires
    }

    // set the session cookie
    cookies().set('session-token', sessionData, cookieOptions)
    redirect('/')
}

export const logout = async () => {
    try {
        deleteSession()
    } catch (error) {
        console.error('Error in logout:', error)
        throw new Error('Unable to logout')
    }
    redirect('/')
}

export const isAuthenticated = async (sessionToken: string, userId: string) => {
    const session = await prisma.session.findUnique({
        where: {
            sessionToken,
            userId
        }
    })
    if (!session || session.expires < new Date()) {
        return false
    }
    return true
}

export const checkSession = async (sessionToken: string) => {
    const session = await prisma.session.findUnique({
        where: {
            sessionToken
        },
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    })
    if (!session || session.expires < new Date()) {
        return false
    }
    return session
}

export const getUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if (!user) {
        return null
    }
    return user
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) {
        return null
    }
    return user
}

export const getSession = async (sessionToken: string) => {
    const session = await prisma.session.findUnique({
        where: {
            sessionToken
        }
    })
    if (!session) {
        return null
    }
    return session
}
