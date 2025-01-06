// app/api/experience/update/route.ts

import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()

        // Validate the input
        if (formData === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Update the Experience field dynamically
        const updatedExperience = await prisma.experience.update({
            where: { id },
            data: { [field]: value } // Dynamically update the specified field
        })

        return NextResponse.json(updatedExperience)
    } catch (error) {
        console.error('Error updating Experience:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
