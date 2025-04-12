export class CEP {
    private url: string = "https://viacep.com.br/ws/";

    // Propriedades públicas correspondentes à API ViaCEP
    public cep: string = "";
    public logradouro: string = "";
    public complemento: string = "";
    public bairro: string = "";
    public localidade: string = "";
    public uf: string = "";
    public ibge: string = "";
    public gia: string = "";
    public ddd: string = "";
    public siafi: string = "";

    // Campos adicionais (não presentes na API oficial)
    public unidade: string = "";
    public estado: string = "";
    public regiao: string = "";

    /**
     * Busca um endereço pelo CEP
     * @param cep - CEP a ser consultado (com ou sem máscara)
     * @returns Promise<boolean> - true se encontrou o endereço, false caso contrário
     */
    public async buscar(cep: string): Promise<boolean> {
        try {
            // Remove caracteres não numéricos
            const cepNumerico = cep.replace(/[\D|\.|-]/g, '');

            if (cepNumerico.length !== 8) {
                throw new Error("CEP deve conter 8 dígitos");
            }

            const response = await fetch(`${this.url}${cepNumerico}/json/`);
            const data = await response.json();

            if (data.erro) {
                return false;
            }

            // Preenche as propriedades com os dados da API
            this.cep = data.cep || "";
            this.logradouro = data.logradouro || "";
            this.complemento = data.complemento || "";
            this.bairro = data.bairro || "";
            this.localidade = data.localidade || "";
            this.uf = data.uf || "";
            this.ibge = data.ibge || "";
            this.gia = data.gia || "";
            this.ddd = data.ddd || "";
            this.siafi = data.siafi || "";

            // Preenche campos adicionais baseados no UF
            this.estado = this.getEstadoPorUF(this.uf);
            this.regiao = this.getRegiaoPorUF(this.uf);

            return true;
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            return false;
        }
    }

    /**
     * Retorna o nome completo do estado a partir da UF
     * @param uf - Sigla do estado (ex: "SP")
     * @returns string - Nome completo do estado
     */
    private getEstadoPorUF(uf: string): string {
        const estados: Record<string, string> = {
            "AC": "Acre", "AL": "Alagoas", "AP": "Amapá", "AM": "Amazonas",
            "BA": "Bahia", "CE": "Ceará", "DF": "Distrito Federal",
            "ES": "Espírito Santo", "GO": "Goiás", "MA": "Maranhão",
            "MT": "Mato Grosso", "MS": "Mato Grosso do Sul", "MG": "Minas Gerais",
            "PA": "Pará", "PB": "Paraíba", "PR": "Paraná", "PE": "Pernambuco",
            "PI": "Piauí", "RJ": "Rio de Janeiro", "RN": "Rio Grande do Norte",
            "RS": "Rio Grande do Sul", "RO": "Rondônia", "RR": "Roraima",
            "SC": "Santa Catarina", "SP": "São Paulo", "SE": "Sergipe",
            "TO": "Tocantins"
        };
        return estados[uf.toUpperCase()] || "";
    }

    /**
     * Retorna a região do Brasil a partir da UF
     * @param uf - Sigla do estado
     * @returns string - Nome da região
     */
    private getRegiaoPorUF(uf: string): string {
        const regioes: Record<string, string> = {
            "AC": "Norte", "AP": "Norte", "AM": "Norte", "PA": "Norte",
            "RO": "Norte", "RR": "Norte", "TO": "Norte",
            "AL": "Nordeste", "BA": "Nordeste", "CE": "Nordeste",
            "MA": "Nordeste", "PB": "Nordeste", "PE": "Nordeste",
            "PI": "Nordeste", "RN": "Nordeste", "SE": "Nordeste",
            "GO": "Centro-Oeste", "MT": "Centro-Oeste", "MS": "Centro-Oeste", "DF": "Centro-Oeste",
            "ES": "Sudeste", "MG": "Sudeste", "RJ": "Sudeste", "SP": "Sudeste",
            "PR": "Sul", "RS": "Sul", "SC": "Sul"
        };
        return regioes[uf.toUpperCase()] || "";
    }
}