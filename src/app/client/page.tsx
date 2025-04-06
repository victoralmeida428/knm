'use client'

import {client} from '../../../generated/prisma';
import {useEffect, useState} from "react";
import Table from "@/components/table/table";
import Loading from "@/components/loading/loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import Modal from "@/components/modal/modal";

export default function ClientPage() {
    const [clients, setClients] = useState<client[]>([])
    const [clientsFilter, setClientsFilter] = useState<client[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const headers = <tr>
        <th>Nome</th>
        <th>Telefone</th>
        <th>Email</th>
        <th>Documento</th>
        <th>Cidade</th>
        <th>Bairro</th>
        <th>Rua</th>
        <th>CEP</th>
        <th></th>
    </tr>

    useEffect(() => {
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
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FontAwesomeIcon icon={faSearch}/>
                        </div>
                        <input
                            className="
                          border-primary
                          border
                          rounded
                          placeholder:text-gray-500
                          ps-10  /* Aumente o padding esquerdo para o ícone */
                          py-2
                          w-full
                          focus:outline-none
                          focus:ring-1
                          focus:ring-primary
                        "
                            type='text'
                            placeholder='Buscar'
                            onChange={(e) => handleFilter(e.target.value)}
                        />
                    </div>
                    <button
                        className={'bg-primary px-5 text-white rounded cursor-pointer h-8 hover:bg-blue-900'}
                        onClick={() => {setOpen(true)}}
                    >
                        <span><FontAwesomeIcon icon={faPlus}/></span> Cadastrar
                    </button>
                </div>
                <div className={'w-full p-2'}>
                    <Modal isOpen={open} onClose={()=>{setOpen(false)}}>Teste</Modal>
                    <Table className={'p-20 select-none'} headers={headers}
                           rows={clientsFilter.map((client: client) => (
                               <tr key={client.id} className={client.id % 2 == 1 ? 'bg-gray-300' : ''}>
                                   <td className={'select-text'}>{client.nome}</td>
                                   <td className={'select-text'}>{client.telefone}</td>
                                   <td className={'select-text'}>{client.email}</td>
                                   <td className={'select-text'}>{client.documento}</td>
                                   <td className={'select-text'}>{client.cidade}</td>
                                   <td className={'select-text'}>{client.bairro}</td>
                                   <td className={'select-text'}>{client.rua}</td>
                                   <td className={'select-text'}>{client.cep}</td>
                                   <td className={'select-text'}><FontAwesomeIcon color={'red'}
                                                                                  className={'cursor-pointer'}
                                                                                  icon={faTrashCan}/></td>
                               </tr>))
                           }/>
                </div>
            </div>
    );
}