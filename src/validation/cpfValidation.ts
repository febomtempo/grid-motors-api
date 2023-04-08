export function validateCPF(cpf: string) {
  if (typeof cpf !== 'string') {
    // Verifica se o CPF é uma string.
    return false;
  }

  cpf = cpf.replace(/[^\d]/g, ''); // Remove todos os caracteres que não são dígitos numéricos.

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    // Verifica se o CPF tem 11 dígitos e não é uma sequência repetida de números.
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    // Calcula o primeiro dígito verificador.
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let digit = remainder < 2 ? 0 : 11 - remainder;
  if (digit !== parseInt(cpf.charAt(9))) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    // Calcula o segundo dígito verificador.
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  digit = remainder < 2 ? 0 : 11 - remainder;
  if (digit !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true; // Retorna verdadeiro se o CPF for válido.
}
