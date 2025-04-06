import { NextResponse } from 'next/server'
import prisma from '@/utils/db'

export async function GET() {
    try {
        const clients = await prisma.client.findMany()
        return NextResponse.json(clients)
    } catch (e) {
        return NextResponse.json(
            { error: e + "erro interno" },
            { status: 500 }
        )
    }
}