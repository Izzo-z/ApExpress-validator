const { body } = require('express-validator');

// ========== VALIDAÇÕES PARA CADASTRO DE EMPRESA ==========

const empresaCadastroValidations = {
  // Razão social
  razaoSocial: body('razao_social')
    .trim()
    .notEmpty()
    .withMessage('Razão social é obrigatória')
    .isLength({ min: 2, max: 200 })
    .withMessage('Razão social deve ter entre 2 e 200 caracteres'),

  // Nome fantasia
  nomeFantasia: body('nome_fantasia')
    .trim()
    .notEmpty()
    .withMessage('Nome fantasia é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome fantasia deve ter entre 2 e 100 caracteres'),

  // CNPJ - aceita formato XX.XXX.XXX/XXXX-XX
  cnpj: body('cnpj')
    .trim()
    .notEmpty()
    .withMessage('CNPJ é obrigatório')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
    .withMessage('CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX')
    .custom((value) => {
      const cnpj = value.replace(/\D/g, '');
      
      // Verificar se tem 14 dígitos
      if (cnpj.length !== 14) {
        throw new Error('CNPJ deve ter 14 dígitos');
      }
      
      // Verificar se todos os dígitos são iguais
      if (/^(\d)\1+$/.test(cnpj)) {
        throw new Error('CNPJ inválido');
      }
      
      // Validar dígitos verificadores
      let sum = 0;
      let weight = 5;
      
      // Primeiro dígito verificador
      for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj[i]) * weight;
        weight = weight === 2 ? 9 : weight - 1;
      }
      
      let digit1 = sum % 11;
      digit1 = digit1 < 2 ? 0 : 11 - digit1;
      
      if (digit1 !== parseInt(cnpj[12])) {
        throw new Error('CNPJ inválido');
      }
      
      // Segundo dígito verificador
      sum = 0;
      weight = 6;
      
      for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj[i]) * weight;
        weight = weight === 2 ? 9 : weight - 1;
      }
      
      let digit2 = sum % 11;
      digit2 = digit2 < 2 ? 0 : 11 - digit2;
      
      if (digit2 !== parseInt(cnpj[13])) {
        throw new Error('CNPJ inválido');
      }
      
      return true;
    }),

  // Telefone - aceita formato (XX) XXXXX-XXXX
  telefone: body('telefone')
    .trim()
    .notEmpty()
    .withMessage('Telefone é obrigatório')
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)
    .withMessage('Digite um telefone válido no formato (XX) XXXXX-XXXX'),

  // Logradouro
  logradouro: body('logradouro')
    .trim()
    .notEmpty()
    .withMessage('Logradouro é obrigatório')
    .isLength({ min: 5, max: 200 })
    .withMessage('Logradouro deve ter entre 5 e 200 caracteres'),

  // Cidade
  cidade: body('cidade')
    .trim()
    .notEmpty()
    .withMessage('Cidade é obrigatória')
    .isLength({ min: 2, max: 100 })
    .withMessage('Cidade deve ter entre 2 e 100 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Cidade deve conter apenas letras e espaços'),

  // Estado
  estado: body('estado')
    .notEmpty()
    .withMessage('Estado é obrigatório')
    .isIn(['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF'])
    .withMessage('Selecione um estado válido'),

  // CEP
  cep: body('cep')
    .optional()
    .matches(/^\d{5}-?\d{3}$/)
    .withMessage('CEP deve estar no formato XXXXX-XXX'),

  // Complemento (opcional)
  complemento: body('complemento')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Complemento deve ter no máximo 100 caracteres')
};

// ========== VALIDAÇÕES PARA REPRESENTANTE (SEGUNDA ETAPA) ==========

const representanteValidations = {
  // Nome do representante (diferente de nomeCompleto)
  nome: body('nome')
    .trim()
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome deve conter apenas letras e espaços'),

  // Cargo do representante
  cargo: body('cargo')
    .trim()
    .notEmpty()
    .withMessage('Cargo é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('Cargo deve ter entre 2 e 100 caracteres'),

  // Nome completo
  nomeCompleto: body('nomeCompleto')
    .trim()
    .notEmpty()
    .withMessage('Nome completo é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome deve conter apenas letras e espaços'),

  // Email
  email: body('email')
    .trim()
    .notEmpty()
    .withMessage('Email é obrigatório')
    .isEmail()
    .withMessage('Digite um email válido')
    .normalizeEmail(),

  // CPF
  cpf: body('cpf')
    .trim()
    .notEmpty()
    .withMessage('CPF é obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .withMessage('CPF deve estar no formato XXX.XXX.XXX-XX')
    .custom((value) => {
      const cpf = value.replace(/\D/g, '');
      
      // Verificar se tem 11 dígitos
      if (cpf.length !== 11) {
        throw new Error('CPF deve ter 11 dígitos');
      }
      
      // Verificar se todos os dígitos são iguais
      if (/^(\d)\1+$/.test(cpf)) {
        throw new Error('CPF inválido');
      }
      
      // Validar dígitos verificadores
      let sum = 0;
      
      // Primeiro dígito verificador
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
      }
      
      let digit1 = 11 - (sum % 11);
      if (digit1 >= 10) digit1 = 0;
      
      if (digit1 !== parseInt(cpf[9])) {
        throw new Error('CPF inválido');
      }
      
      // Segundo dígito verificador
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
      }
      
      let digit2 = 11 - (sum % 11);
      if (digit2 >= 10) digit2 = 0;
      
      if (digit2 !== parseInt(cpf[10])) {
        throw new Error('CPF inválido');
      }
      
      return true;
    }),

  // Telefone comercial (campo telefone no cadastro-empresa2)
  telefone: body('telefone')
    .trim()
    .notEmpty()
    .withMessage('Telefone é obrigatório')
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)
    .withMessage('Digite um telefone válido no formato (XX) XXXXX-XXXX'),

  // Telefone do representante
  telefoneRepresentante: body('telefone')
    .trim()
    .notEmpty()
    .withMessage('Telefone é obrigatório')
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)
    .withMessage('Digite um telefone válido no formato (XX) XXXXX-XXXX'),

  // Senha
  senha: body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres')
    .isLength({ max: 128 })
    .withMessage('Senha muito longa'),

  // Confirmação de senha
  confirmarSenha: body('confirmarSenha')
    .notEmpty()
    .withMessage('Confirmação de senha é obrigatória')
    .custom((value, { req }) => {
      if (value !== req.body.senha) {
        throw new Error('Senhas não coincidem');
      }
      return true;
    })
};

// ========== CONJUNTOS DE VALIDAÇÃO ==========

const validationSets = {
  // Primeira etapa: dados da empresa
  cadastroEmpresaEtapa1: [
    empresaCadastroValidations.razaoSocial,
    empresaCadastroValidations.nomeFantasia,
    empresaCadastroValidations.cnpj,
    empresaCadastroValidations.telefone,
    empresaCadastroValidations.logradouro,
    empresaCadastroValidations.cidade,
    empresaCadastroValidations.estado,
    empresaCadastroValidations.cep,
    empresaCadastroValidations.complemento
  ],

  // Segunda etapa: dados do representante (campos originais)
  cadastroEmpresaEtapa2: [
    representanteValidations.nomeCompleto,
    representanteValidations.email,
    representanteValidations.cpf,
    representanteValidations.telefoneRepresentante,
    representanteValidations.senha,
    representanteValidations.confirmarSenha
  ],

  // Segunda etapa: dados do representante (campos do formulário atual)
  cadastroEmpresaRepresentante: [
    representanteValidations.nome,
    representanteValidations.cargo,
    representanteValidations.email,
    representanteValidations.telefone
  ]
};

module.exports = {
  empresaCadastroValidations,
  representanteValidations,
  validationSets
};