export function maskCpfCnpj(value: string): string {
    // Remove todos os caracteres não numéricos
    const onlyDigits = value.replace(/\D/g, '');

    // Verifica se é CPF (11 dígitos) ou CNPJ (14 dígitos)
    if (onlyDigits.length <= 11) {
        // Formata como CPF: XXX.XXX.XXX-XX
        return onlyDigits
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
            .replace(/(-\d{2})\d+?$/, '$1');
    } else {
        // Formata como CNPJ: XX.XXX.XXX/XXXX-XX
        return onlyDigits
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    }
}

export function maskMilhar(value: string): string {
    // Remove tudo que não é dígito e zeros à esquerda
    const onlyDigits = value.replace(/\D|^0+/g, '');

    // Adiciona separadores de milhar
    return onlyDigits
        .split('')
        .reverse()
        .join('')
        .replace(/(\d{3})(?=\d)/g, '$1.')
        .split('')
        .reverse()
        .join('');
}

export function maskPhone(value: string): string {
    // Remove todos os caracteres não numéricos
    const onlyDigits = value.replace(/\D/g, '');

    // Aplica máscara conforme o tamanho
    if (onlyDigits.length <= 10) {
        // Formato para telefone fixo (XX) XXXX-XXXX
        return onlyDigits
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    } else {
        // Formato para celular (XX) XXXXX-XXXX
        return onlyDigits
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    }
}

export function maskCEP(value: string): string {
    // Remove todos os caracteres não numéricos
    const onlyDigits = value.replace(/\D/g, '');

    // Limita a 8 caracteres (tamanho do CEP)
    const truncated = onlyDigits.slice(0, 8);

    // Aplica a máscara XXXXX-XXX
    return truncated
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-d{3})\d+?$/, '$1'); // Remove dígitos extras após o hífen
}