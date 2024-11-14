import { createEmailVerificationToken } from '@/app/actions/auth'
import { redirect } from 'next/navigation'

export async function sendEmailVerification(
    email: string,
    provider: {
        apiKey: string
        from: string
    },
    theme: Theme = {}
) {
    const token = await createEmailVerificationToken(email)
    const url = process.env.NEXT_PUBLIC_BASE_URL
    if (!url) throw new Error('NEXT_PUBLIC_BASE_URL is not set')

    const { host } = new URL(url)
    console.log('host', host)
    console.log('url', url)
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: provider.from,
            name: email,
            to: email,
            subject: `verify Your email ${email} at ${host}`,
            html: html({ url, host, theme, email, token }),
            text: text({ url, host })
        })
    })

    if (!res.ok)
        throw new Error('Resend error: ' + JSON.stringify(await res.json()))

    redirect('/')
}

type Theme = {
    brandColor?: string
    buttonText?: string
}

function html(params: {
    email?: string
    url: string
    host: string
    theme: Theme
    token?: string
}) {
    const { email, url, host, theme, token } = params

    const httpUrl =
        process.env.NODE_ENV === 'production'
            ? `https://${host}`
            : 'http://localhost:3000'
    const confirmLink = `${httpUrl}/verify-email?token=${token}&email=${encodeURIComponent(email || '')}`
    const escapedHost = host.replace(/\./g, '&#8203;.')
    console.log('escapedHost', escapedHost)
    const brandColor = theme.brandColor || '#346df1'
    const color = {
        background: '#f9f9f9',
        text: '#444',
        mainBackground: '#fff',
        buttonBackground: brandColor,
        buttonBorder: brandColor,
        buttonText: theme.buttonText || '#fff'
    }

    return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Verify your email <strong>
${confirmLink}

        </strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${confirmLink}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>

        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
  ${params}
   ${escapedHost} escape host
        ${host} host
        ${confirmLink} confirm link
        ${url} url
</body>
`
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
}
