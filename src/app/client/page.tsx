'use client'

import {prisma} from "@/utils/db";
import {DTOClient} from "@/DTO/model";

export default async function ClientPage() {
    const allClient: DTOClient[] = await prisma.clients.list()
    return (
        <div>
            <h1>Página do Cliente Cliente</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {allClient.map((client: DTOClient) =>
                <tr key={client.id}>
                    <td>{`${client.first_name} ${client.last_name}`}</td>
                    <td>{client.email}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
}