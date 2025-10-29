// ========== VALIDAÇÕES PADRONIZADAS ==========

// Classe principal de validação
class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.errors = {};
    this.init();
  }

  init() {
    if (!this.form) return;
    
    // Adicionar validação em tempo real para todos os inputs
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    // Interceptar submit do formulário
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  // Validar campo individual
  validateField(field) {
    const fieldName = field.name || field.id;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Limpar erro anterior
    this.clearFieldError(field);

    // Validações por tipo de campo
    switch(field.type) {
      case 'email':
        if (!value) {
          errorMessage = 'E-mail é obrigatório';
          isValid = false;
        } else if (!this.isValidEmail(value)) {
          errorMessage = 'Digite um e-mail válido';
          isValid = false;
        }
        break;

      case 'password':
        if (!value) {
          errorMessage = 'Senha é obrigatória';
          isValid = false;
        } else if (value.length < 6) {
          errorMessage = 'Senha deve ter pelo menos 6 caracteres';
          isValid = false;
        }
        break;

      case 'tel':
        if (!value) {
          errorMessage = 'Telefone é obrigatório';
          isValid = false;
        } else if (!this.isValidPhone(value)) {
          errorMessage = 'Digite um telefone válido';
          isValid = false;
        }
        break;

      case 'text':
        // Validações específicas por name/id
        if (fieldName === 'nome' || fieldName === 'nomeCompleto') {
          if (!value) {
            errorMessage = 'Nome é obrigatório';
            isValid = false;
          } else if (value.length < 2) {
            errorMessage = 'Nome deve ter pelo menos 2 caracteres';
            isValid = false;
          }
        } else if (fieldName === 'confirmPassword' || fieldName === 'confirmarSenha') {
          const passwordField = this.form.querySelector('input[type="password"]:not([name="confirmPassword"]):not([name="confirmarSenha"])');
          if (passwordField && value !== passwordField.value) {
            errorMessage = 'Senhas não coincidem';
            isValid = false;
          }
        } else if (fieldName === 'razao_social') {
          if (!value) {
            errorMessage = 'Razão social é obrigatória';
            isValid = false;
          } else if (value.length < 2) {
            errorMessage = 'Razão social deve ter pelo menos 2 caracteres';
            isValid = false;
          }
        } else if (fieldName === 'nome_fantasia') {
          if (!value) {
            errorMessage = 'Nome fantasia é obrigatório';
            isValid = false;
          }
        } else if (fieldName === 'cnpj') {
          if (!value) {
            errorMessage = 'CNPJ é obrigatório';
            isValid = false;
          } else if (!this.isValidCNPJ(value)) {
            errorMessage = 'Digite um CNPJ válido';
            isValid = false;
          }
        } else if (fieldName === 'logradouro') {
          if (!value) {
            errorMessage = 'Logradouro é obrigatório';
            isValid = false;
          }
        } else if (fieldName === 'cidade') {
          if (!value) {
            errorMessage = 'Cidade é obrigatória';
            isValid = false;
          }
        } else if (field.hasAttribute('required') && !value) {
          errorMessage = `${this.getFieldLabel(field)} é obrigatório`;
          isValid = false;
        }
        break;

      case 'select-one':
        if (field.hasAttribute('required') && !value) {
          errorMessage = `${this.getFieldLabel(field)} é obrigatório`;
          isValid = false;
        }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
      this.errors[fieldName] = errorMessage;
    } else {
      delete this.errors[fieldName];
      field.classList.add('valid');
    }

    return isValid;
  }

  // Mostrar erro no campo
  showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('valid');
    
    // Verificar se já existe um span.field-error (sistema antigo)
    const existingFieldError = field.parentNode.querySelector('.field-error');
    if (existingFieldError) {
      // Usar o sistema existente
      existingFieldError.textContent = message;
      existingFieldError.style.display = 'block';
    } else {
      // Remover mensagem de erro existente
      const existingError = field.parentNode.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }

      // Adicionar nova mensagem de erro
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
  }

  // Limpar erro do campo
  clearFieldError(field) {
    field.classList.remove('error');
    
    // Verificar se existe um span.field-error (sistema antigo)
    const existingFieldError = field.parentNode.querySelector('.field-error');
    if (existingFieldError) {
      // Limpar o conteúdo mas manter o elemento
      existingFieldError.textContent = '';
      existingFieldError.style.display = 'none';
    } else {
      // Remover mensagem de erro do sistema novo
      const errorMessage = field.parentNode.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
    }
  }

  // Obter label do campo
  getFieldLabel(field) {
    const label = this.form.querySelector(`label[for="${field.id}"]`);
    if (label) {
      return label.textContent.replace('*', '').trim();
    }
    return field.placeholder || field.name || 'Campo';
  }

  // Validar e-mail
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validar telefone
  isValidPhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  }

  // Validar CNPJ
  isValidCNPJ(cnpj) {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    // Verificar se tem 14 dígitos
    if (cleanCNPJ.length !== 14) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleanCNPJ)) return false;
    
    // Validar dígitos verificadores
    let sum = 0;
    let weight = 5;
    
    // Primeiro dígito verificador
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCNPJ[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    
    let digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (digit1 !== parseInt(cleanCNPJ[12])) return false;
    
    // Segundo dígito verificador
    sum = 0;
    weight = 6;
    
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCNPJ[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    
    let digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return digit2 === parseInt(cleanCNPJ[13]);
  }

  // Validar formulário completo
  validateForm() {
    const inputs = this.form.querySelectorAll('input, select, textarea');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  // Manipular submit do formulário
  handleSubmit(event) {
    // Limpar mensagem de erro geral
    this.clearGeneralError();

    if (!this.validateForm()) {
      event.preventDefault();
      this.showGeneralError('Por favor, corrija os erros antes de continuar.');
      return false;
    }

    // Mostrar loading no botão
    const submitBtn = this.form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
      submitBtn.classList.add('btn-loading');
      submitBtn.disabled = true;
    }

    return true;
  }

  // Mostrar erro geral
  showGeneralError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'general-error';
    errorDiv.textContent = message;
    this.form.insertBefore(errorDiv, this.form.firstChild);
  }

  // Limpar erro geral
  clearGeneralError() {
    const existingError = this.form.querySelector('.general-error');
    if (existingError) {
      existingError.remove();
    }
  }

  // Mostrar mensagem de sucesso
  showSuccess(message) {
    this.clearGeneralError();
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    this.form.insertBefore(successDiv, this.form.firstChild);
  }
}

// Máscaras de input
class InputMasks {
  static phone(input) {
    input.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (value.length >= 7) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      } else if (value.length >= 1) {
        value = value.replace(/(\d{0,2})/, '($1');
      }
      this.value = value;
    });
  }

  static cpf(input) {
    input.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      this.value = value;
    });
  }

  static cnpj(input) {
    input.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      this.value = value;
    });
  }
}

// ========== VALIDAÇÕES ESPECÍFICAS PARA LOGIN ==========

class LoginValidator {
  constructor(formId, loginType = 'jovem') {
    this.form = document.getElementById(formId);
    this.loginType = loginType;
    this.errors = {};
    
    if (this.form) {
      this.init();
    }
  }

  init() {
    // Adicionar validação em tempo real
    const inputs = this.form.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    // Interceptar submit
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validateField(field) {
    const fieldName = field.name || field.id;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Limpar erro anterior
    this.clearFieldError(field);

    if (this.loginType === 'jovem') {
      // Validações para login de jovem
      if (fieldName === 'email') {
        if (!value) {
          errorMessage = 'Email é obrigatório';
          isValid = false;
        } else if (!this.isValidEmail(value)) {
          errorMessage = 'Digite um email válido';
          isValid = false;
        }
      } else if (fieldName === 'password') {
        if (!value) {
          errorMessage = 'Senha é obrigatória';
          isValid = false;
        }
      }
    } else if (this.loginType === 'empresa') {
      // Validações para login de empresa
      if (fieldName === 'credencial') {
        if (!value) {
          errorMessage = 'Credencial é obrigatória';
          isValid = false;
        } else if (value.length < 3) {
          errorMessage = 'Credencial deve ter pelo menos 3 caracteres';
          isValid = false;
        }
      } else if (fieldName === 'chave') {
        if (!value) {
          errorMessage = 'Chave é obrigatória';
          isValid = false;
        }
      }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
      this.errors[fieldName] = errorMessage;
    } else {
      delete this.errors[fieldName];
    }

    return isValid;
  }

  validateForm() {
    let isFormValid = true;
    const inputs = this.form.querySelectorAll('input[required], input[name="email"], input[name="password"], input[name="credencial"], input[name="chave"]');
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // Validar todos os campos
    if (this.validateForm()) {
      // Se válido, remover prevent default e submeter o formulário
      this.form.removeEventListener('submit', this.handleSubmit.bind(this));
      this.form.submit();
    } else {
      // Focar no primeiro campo com erro
      const firstErrorField = this.form.querySelector('.field-error');
      if (firstErrorField) {
        firstErrorField.focus();
      }
    }
  }

  showFieldError(field, message) {
    field.classList.add('field-error');
    
    // Remover mensagem de erro existente
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Adicionar nova mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(field) {
    field.classList.remove('field-error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Inicialização automática quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Aplicar máscaras automaticamente
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    InputMasks.phone(input);
  });

  document.querySelectorAll('input[data-mask="cpf"]').forEach(input => {
    InputMasks.cpf(input);
  });

  document.querySelectorAll('input[data-mask="cnpj"]').forEach(input => {
    InputMasks.cnpj(input);
  });

  // Inicializar validação de login automaticamente se houver formulário de login
  const loginForms = document.querySelectorAll('form[data-login-type]');
  loginForms.forEach(form => {
    const loginType = form.getAttribute('data-login-type');
    new LoginValidator(form.id, loginType);
  });
});

// Função global para inicializar validação em qualquer formulário
function initFormValidation(formId) {
  return new FormValidator(formId);
}