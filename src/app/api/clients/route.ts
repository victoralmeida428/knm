import { NextResponse } from 'next/server'
import prisma from '@/utils/db'
import {client} from '../../../../generated/prisma';


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

export async function POST(request: Request) {
    try {
        const body = await request.json() as client
        const newClient = await prisma.client.create({
            data: body
        })
        return NextResponse.json(newClient, {status: 201})
    } catch (e) {
        console.log(e)
        return NextResponse.json(
            { error: e + "erro interno" },
            { status: 500 }
        )
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json() as client

        const updatedClient = await prisma.client.update({
            where: {
                id: body.id
            },
            data: body
        })

        return NextResponse.json(updatedClient, {status: 201})
    } catch (e) {
        console.log(e)
        return NextResponse.json(
            { error: e + "erro interno" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json() as client
        await prisma.client.delete({where: body})
    } catch (e) {
        console.log(e)
        return NextResponse.json(
            { error: e + "erro interno" },
            { status: 500 }
        )
    }
}