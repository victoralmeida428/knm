import {describe, it, expect, vi, beforeEach} from 'vitest'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import ClientPage from '@/app/client/page'

// Mock das chamadas fetch
global.fetch = vi.fn()

describe('ClientPage', () => {
    const mockClients = [{
        id: '1',
        nome: 'Cliente Teste',
        documento: '123456789',
        telefone: '11999999999',
        email: 'cliente@teste.com',
        cidade: 'Rio de Janeiro',
        bairro: 'Campo Grande',
        numero: 1314,
        complemento: 'Rio de Janeiro',
        cep: '23084110'
    },
        {
            id: '2',
            nome: "João",
            documento: '987654321',
            telefone: '11999999999',
            email: 'email@email.com',
            cidade: 'Rio de Janeiro',
            bairro: 'Campo Grande',
            numero: 1314,
            complemento: 'Rio de Janeiro',
            cep: '23084110'
        }]

    beforeEach(() => {
        // Resetar mocks antes de cada teste
        vi.clearAllMocks()

        // Mock da resposta da API
        ; // @ts-expect-error vi.Mock funciona
        (fetch as vi.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve(mockClients)
        });

    })

    it('deve renderizar a tabela de clientes', async () => {
        render(<ClientPage/>)

        await waitFor(() => {
            expect(screen.queryByText('Documento')).toBeTruthy()
            expect(screen.queryByText('Nome')).toBeTruthy()
            expect(screen.queryByText('Cliente Teste')).toBeTruthy()
            expect(screen.queryByText('João')).toBeTruthy()
        })
    })

    it('deve filtrar clientes', async () => {
        render(<ClientPage/>)

        await waitFor(() => expect(screen.queryByText('Cliente Teste')).toBeTruthy())

        const searchInput = screen.getByPlaceholderText('Buscar')
        fireEvent.change(searchInput, {target: {value: 'Cliente'}})

        expect(screen.queryByText('Cliente Teste')).toBeTruthy()
        expect(screen.queryByText('João')).toBeFalsy()

        fireEvent.change(searchInput, {target: {value: 'XYZ'}})
        expect(screen.queryByText('Cliente Teste')).toBeFalsy()
    })

    it('deve cadastrar novo cliente', async () => {
        render(<ClientPage/>)

        await waitFor(() => expect(screen.queryByText('Cliente Teste')).toBeTruthy())

        const registerBtn =screen.getByRole('button')
        fireEvent.click(registerBtn)
        await waitFor(() => expect(screen.queryByText('Cadastro de Cliente')).toBeTruthy())
        const inputDocumento = screen.getByRole('textbox', { name: 'CPF / CNPJ *' })  as HTMLInputElement;

        expect(screen.queryByText('Salvar')).toBeTruthy()
        expect(inputDocumento.value).toBe('')
    })


    it ('detalhe do cliente', async () => {
        render(<ClientPage/>)
        const clientName = 'Cliente Teste'
        await waitFor(() => expect(screen.queryByText(clientName)).toBeTruthy())
        const client =screen.queryByText('123456789')
        fireEvent.click(client!)
        await  waitFor(() => expect(screen.queryByRole('heading', {name: clientName})).toBeTruthy())
        expect(screen.queryByText('Criado em:')).toBeTruthy()
    })

    it ('atualizar cliente', async () => {
        render(<ClientPage/>)
        const clientName = 'Cliente Teste'
        await waitFor(() => expect(screen.queryByText(clientName)).toBeTruthy())
        const client =screen.queryByText('123456789')
        client?.click()
        await  waitFor(() => expect(screen.queryByRole('heading', {name: clientName})).toBeTruthy())
        screen.queryByRole('button', {name: 'Editar'})?.click()

        await  waitFor(() => expect(screen.queryByRole('heading', {name: 'Atualizar Cliente'})).toBeTruthy())

        const inputDocumento = screen.getByRole('textbox', { name: 'CPF / CNPJ *' })  as HTMLInputElement;
        expect(screen.queryByText('Salvar')).toBeTruthy()
        expect(inputDocumento.value).toBe('123456789')
    })

})

