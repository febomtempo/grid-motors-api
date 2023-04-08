export function validateCPF(cpf: string) {
  if (typeof cpf !== 'string') {
    return false;
  }
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let digit = remainder < 2 ? 0 : 11 - remainder;
  if (digit !== parseInt(cpf.charAt(9))) {
    return false;
  }
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  digit = remainder < 2 ? 0 : 11 - remainder;
  if (digit !== parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
}
