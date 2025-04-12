'use client'

import {client} from '../../../generated/prisma';
import {useEffect, useState} from "react";
import Table from "@/components/table/table";
import Loading from "@/components/loading/loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {faEnvelope, faLocationDot, faPhone, faSearch, faUser} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import Modal from "@/components/modal/modal";
import ClientRegister from "@/app/client/formRegister";
import FormField from "@/components/form/Formulario";
import Button from "@/components/button/button";
import {DetailedClient} from "@/app/client/modalDetailed";
import RegisterClient from "@/app/client/modalRegister";

export default function ClientPage() {
    const [clients, setClients] = useState<client[]>([])
    const [clientsFilter, setClientsFilter] = useState<client[]>([])
    const [loading, setLoading] = useState(true)
    const [openRegister, setOpenRegister] = useState(false)
    const [openClient, setOpenClient] = useState(false)
    const [clientChoice, setClient] = useState<client>();
    const [errorMap, setErrorMap] = useState<boolean>(false);
    const fetchClients = async () => {
        try {
            const response = await fetch('/api/clients')
            const data: client[] = await response.json()
            if (Array.isArray(data)) {
                setClients(data)
                setClientsFilter(data)
            }
        } catch (error) {
            console.error('Error fetching clients:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        fetchClients()
    }, [])

    const handleFilter = (filter: string) => {
        setLoading(true)
        if (filter == "") {
            setClientsFilter(clients)
        } else {
            setClientsFilter(clients.filter(
                client =>
                    client.nome.toLowerCase().includes(filter.toLowerCase()) ||
                    client.email.toLowerCase().includes(filter.toLowerCase()) ||
                    client.telefone.toLowerCase().includes(filter.toLowerCase()) ||
                    client.documento.toLowerCase().includes(filter.toLowerCase()) ||
                    client.cidade.toLowerCase().includes(filter.toLowerCase()) ||
                    client.bairro.toLowerCase().includes(filter.toLowerCase()) ||
                    client.cep.toLowerCase().includes(filter.toLowerCase())
            ))
        }
        setLoading(false)
    }

    return (
        loading ? <Loading
                className={'flex justify-center items-center text-center w-full h-full'}
                size={40}
            /> :
            <div className={'mt-5 flex flex-col justify-content-start  items-start w-full h-full'}>
                <div className={'flex justify-between w-full px-10'}>
                    <FormField
                        icon={<FontAwesomeIcon icon={faSearch}/>}
                        placeholder='Buscar'
                        type='text'
                        onChange={(e) => handleFilter(e.target.value!)}
                    />
                    <Button
                        mode={'primary'}
                        onClick={() => {
                            setOpenRegister(true)
                        }}
                    >
                        <span><FontAwesomeIcon icon={faPlus}/></span> Cadastrar
                    </Button>
                </div>
                <div className={'w-full p-2'}>
                    <RegisterClient
                        client={clientChoice}
                        openRegister={openRegister}
                        onClose={() => {
                            setOpenRegister(false)
                            setClient(undefined)
                        }}
                        fetchClients={fetchClients}
                        closeModal={() => {
                            if (clientChoice) setOpenRegister(false)
                        }}/>
                    <DetailedClient
                        openClient={openClient}
                        client={clientChoice}
                        onClose={() => {
                            setOpenClient(false)
                            setClient(undefined)
                        }}
                        onEdit={() => {
                            setOpenClient(false)
                            setOpenRegister(true)
                        }}
                    />
                    <Table className={'select-none'}>
                        <Table.Header>
                            <Table.Row className={"bg-primary text-white"}>
                                <Table.HeadCell>Documento</Table.HeadCell>
                                <Table.HeadCell>Nome</Table.HeadCell>
                                <Table.HeadCell>Telefone</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell> </Table.HeadCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>

                            {clientsFilter.map((client, index) => (
                                <Table.Row
                                    key={index}
                                    hoverEffect={false}
                                    className={index % 2 == 1 ? 'bg-gray-300' : ''}>
                                    <Table.Cell className={'select-text text-sm text-center '}>
                                        <span className={`underline cursor-pointer text-primary`}
                                              onClick={() => {
                                                  setOpenClient(true)
                                                  setClient(client)
                                              }}
                                        >{client.documento}</span>
                                    </Table.Cell>
                                    <Table.Cell className={'select-text text-sm text-center'}>{client.nome}</Table.Cell>
                                    <Table.Cell
                                        className={'select-text text-sm text-center'}>{client.telefone}</Table.Cell>
                                    <Table.Cell
                                        className={'select-text text-sm text-center'}>{client.email}</Table.Cell>
                                    <Table.Cell className={'select-text text-sm text-center'}>
                                        <FontAwesomeIcon color={'red'}
                                                         className={'cursor-pointer'}
                                                         icon={faTrashCan}
                                                         onClick={async () => {
                                                             await fetch('/api/clients',
                                                                 {
                                                                     method: 'DELETE',
                                                                     headers: {
                                                                         'Content-Type': 'application/json'
                                                                     },
                                                                     body: JSON.stringify(client)
                                                                 })
                                                             await fetchClients()
                                                         }}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
    );
}