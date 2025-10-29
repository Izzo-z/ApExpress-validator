// Validação específica para o formulário de cadastro de empresa
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#form-cadastro, .cad-form');
  if (!form) return;

  // Mensagens de erro personalizadas
  const messages = {
    razao_social: 'Razão social é obrigatória',
    nome_fantasia: 'Nome fantasia é obrigatório',
    cnpj: 'CNPJ inválido — informe no formato XX.XXX.XXX/XXXX-XX',
    telefone: 'Telefone inválido — informe no formato (XX) XXXXX-XXXX',
    logradouro: 'Logradouro é obrigatório',
    cidade: 'Cidade é obrigatória',
    estado: 'Estado é obrigatório',
    cep: 'CEP inválido — informe 8 números',
  };

  // Função para extrair apenas dígitos
  function digits(value) {
    return (value || '').replace(/\D/g, '');
  }

  // Função de validação individual dos campos
  function validateInput(input) {
    const id = input.id;
    const raw = input.value || '';
    let ok = true;

    if (id === 'cnpj') {
      // Verificar se está no formato correto XX.XXX.XXX/XXXX-XX
      ok = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(raw);
      console.log(`CNPJ validation - Value: "${raw}", Valid: ${ok}`);
    }
    else if (id === 'telefone') {
      // Verificar se está no formato correto (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
      ok = /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(raw);
      console.log(`Telefone validation - Value: "${raw}", Valid: ${ok}`);
    }
    else if (id === 'cep') ok = /^\d{8}$/.test(digits(raw));
    else if (id === 'complemento') ok = true; // optional field
    else ok = raw.trim().length > 0;

    const span =
      input.nextElementSibling && input.nextElementSibling.classList.contains('field-error')
        ? input.nextElementSibling
        : null;

    if (!ok) {
      input.classList.add('invalid');
      if (span) span.textContent = messages[id] || 'Campo inválido';
    } else {
      input.classList.remove('invalid');
      if (span) {
        // clear only our generic message; if server message existed but user fixed input, clear it
        span.textContent = '';
      }
    }

    return ok;
  }

  // Função para formatar CNPJ
  function formatCNPJ(digits) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return digits.replace(/(\d{2})(\d+)/, '$1.$2');
    if (digits.length <= 8) return digits.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
    if (digits.length <= 12) return digits.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, '$1.$2.$3/$4-$5');
  }

  // Função para formatar telefone
  function formatTelefone(digits) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return digits.replace(/(\d{2})(\d+)/, '($1) $2');
    if (digits.length <= 10) return digits.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    return digits.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
  }

  // Aplicar máscaras de formatação
  form.querySelectorAll('input').forEach(function (input) {
    // Aplicar validação em tempo real
    input.addEventListener('blur', function () {
      validateInput(input);
    });

    // Aplicar máscaras conforme o tipo
    if (input.id === 'cnpj') {
      input.addEventListener('input', function () {
        const raw = digits(this.value);
        this.value = formatCNPJ(raw);
        if (this.value.length >= 18) validateInput(this); // validar quando completar
      });

      // Mostrar placeholder formatado no foco
      input.addEventListener('focus', function () {
        this.placeholder = '00.000.000/0000-00';
      });
      input.addEventListener('blur', function () {
        this.placeholder = 'CNPJ';
      });
    }

    if (input.id === 'telefone') {
      input.addEventListener('input', function () {
        const raw = digits(this.value);
        this.value = formatTelefone(raw);
        if (this.value.length >= 14) validateInput(this); // validar quando completar
      });
    }
  });

  // Validação final no submit - sem remover máscaras (servidor espera formatado)
  form.addEventListener('submit', function (e) {
    let allOk = true;
    form.querySelectorAll('input').forEach((input) => {
      if (!validateInput(input)) allOk = false;
    });
    if (!allOk) {
      e.preventDefault();
      const first = form.querySelector('input.invalid');
      if (first) first.focus();
    }
  });
});