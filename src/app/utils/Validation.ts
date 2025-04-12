export function ValidationCPF(cpf: string): boolean {
    cpf = cpf.replace(/[\D|\.|-]/g, '');
    const calcDigit = (slice: string, factor: number) => {
        let soma = 0;
        for (const digit of slice) {
            soma += parseInt(digit) * factor--;
        }
        const resto = (soma * 10) % 11;
        return resto === 10 ? 0 : resto;
    };

    const digit1 = calcDigit(cpf.slice(0, 9), 10);
    const digit2 = calcDigit(cpf.slice(0, 10), 11);
    return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
}

export function ValidationCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '');
    const calcDigit = (slice: string, factor: number) => {
        let soma = 0;
        let pos = factor;

        for (const digit of slice) {
            soma += parseInt(digit) * pos;
            pos = (pos - 1) < 2 ? 9 : pos - 1;
        }

        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    const digit1 = calcDigit(cnpj.slice(0, 12), 5);
    const digit2 = calcDigit(cnpj.slice(0, 13), 6);

    return digit1 === parseInt(cnpj[12]) && digit2 === parseInt(cnpj[13]);
}