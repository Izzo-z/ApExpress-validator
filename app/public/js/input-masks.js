// Máscaras de formatação simples para formulários
document.addEventListener('DOMContentLoaded', function() {
  
  // Aplicar máscara de CNPJ
  const cnpjInputs = document.querySelectorAll('input[data-mask="cnpj"], input[name="cnpj"]');
  cnpjInputs.forEach(function(input) {
    input.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
      e.target.value = value;
    });
  });
  
  // Aplicar máscara de telefone
  const telefoneInputs = document.querySelectorAll('input[data-mask="telefone"], input[name="telefone"], input[type="tel"]');
  telefoneInputs.forEach(function(input) {
    input.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
      }
      e.target.value = value;
    });
  });

  // Aplicar máscara de CEP
  const cepInputs = document.querySelectorAll('input[data-mask="cep"], input[name="cep"]');
  cepInputs.forEach(function(input) {
    input.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      e.target.value = value;
    });
  });

  // Aplicar máscara de CPF
  const cpfInputs = document.querySelectorAll('input[data-mask="cpf"], input[name="cpf"]');
  cpfInputs.forEach(function(input) {
    input.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2');
      e.target.value = value;
    });
  });
});