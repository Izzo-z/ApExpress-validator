var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const fs = require('fs');
const { validationSets, handleValidationErrors, renderWithErrors } = require('../validations/validations');

// cria a pasta de uploads caso nao exista
const uploadDir = '/uploads/';

// configuração de destino de armazenamento e nome do arquivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// configuração do multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Apenas imagens são permitidas!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // limita a 5MB
    },
});


router.get('/', function (req, res) {
    res.render('pages/home');
});


router.get('/empresa', function (req, res) {
    res.render('pages/empresa');
});

router.get('/home-jovem', function (req, res) {
    // Enviar algumas vagas visualizadas como exemplo
    const vagasVisualizadas = Object.values(infoVagas).slice(0, 3); // Pega as primeiras 3 vagas
    
    // Garantir que cada vaga tenha o ID correto
    vagasVisualizadas.forEach(vaga => {
        if (!vaga.id && vaga.numero) {
            vaga.id = vaga.numero;
        }
    });
    
    res.render('pages/home-jovem', { vagas: vagasVisualizadas, infoVagas });
});

const vagas = require('../data/vagas');
const infoVagas = require('../data/vagaspt2-completo');
const { encontrarVaga } = require('../data/vagasLoader');

// Sistema simples para armazenar candidaturas (em produção, use banco de dados)
let vagasCandidatadas = [];
let vagasAnteriores = [];

router.get('/vagas/:id', function (req, res) {
    const vagaId = req.params.id;
    console.log('Acessando vaga:', vagaId);
    
    // Verificar em todas as fontes de dados
    let vaga = vagas[vagaId] || infoVagas[vagaId];
    
    console.log('Vaga encontrada:', vaga ? 'Sim' : 'Não');

    if (!vaga) {
        console.log('Vaga não encontrada, redirecionando...');
        return res.redirect('/vagas');
    }

    res.render('pages/vaga-detalhes', { vaga, infoVagas });
});


router.get('/vagas', function (req, res) {
    // Enviando todas as vagas, incluindo ROLTA e RIMBERIO
    const todasVagas = { ...infoVagas };
    
    res.render('pages/vagas', { vagas: todasVagas, infoVagas });
});

router.get('/vaga-detalhes', function (req, res) {
    const vagaId = req.query.id;
    console.log('Acessando vaga-detalhes:', vagaId);
    
    // Verificar em todas as fontes de dados
    let vaga = vagas[vagaId] || infoVagas[vagaId];
    
    console.log('Vaga encontrada:', vaga ? 'Sim' : 'Não');

    if (!vaga) {
        console.log('Vaga não encontrada, redirecionando...');
        return res.redirect('/vagas');
    }

    res.render('pages/vaga-detalhes', { vaga, infoVagas });
});


router.get('/login', (req, res) => {
    // Determinar qual aba mostrar com base na consulta da URL
    const activeTab = req.query.tab || 'jovem';
    
    res.render('pages/login', {
        listaErros: [],
        email: "",
        password: "",
        activeTab: activeTab,
        query: req.query
    });
});


router.post(
    '/login/verify',
    validationSets.loginJovem,
    handleValidationErrors,
    (req, res) => {
        // Verificar se há erros de validação e renderizar com erros
        const errorRender = renderWithErrors(req, res, 'pages/login', {
            activeTab: 'jovem',
            email: req.body.email,
            password: req.body.password
        });
        
        if (errorRender !== null) return errorRender;

        // Se chegou aqui, validação passou - implementar lógica de autenticação
        console.log('Login do jovem validado com sucesso:', req.body.email);
        
        // TODO: Implementar autenticação real (verificar credenciais no banco)
        // TODO: Criar sessão do usuário
        
        // Redirecionar para o portal do jovem
        res.redirect('/home-jovem');
    }
);

// Rota para login de empresa
router.post(
    '/login/empresa',
    validationSets.loginEmpresa,
    handleValidationErrors,
    (req, res) => {
        // Verificar se há erros de validação e renderizar com erros
        const errorRender = renderWithErrors(req, res, 'pages/login', {
            activeTab: 'empresa',
            credencial: req.body.credencial,
            chave: req.body.chave
        });
        
        if (errorRender !== null) return errorRender;

        // Se chegou aqui, validação passou - implementar lógica de autenticação
        console.log('Login da empresa validado com sucesso:', req.body.credencial);
        
        // TODO: Implementar autenticação real (verificar credenciais no banco)
        // TODO: Criar sessão da empresa
        
        // Redirecionar para o portal da empresa
        res.redirect('/empresa');
    }
);


router.get('/cadastro', function (req, res) {
    res.render('pages/cadastro', { errors: null, form: {} });
});

// POST: Validar primeira página do cadastro de jovem
router.post(
    '/cadastro',
    validationSets.cadastroJovem,
    handleValidationErrors,
    (req, res) => {
        // Verificar se há erros de validação e renderizar com erros
        const errorRender = renderWithErrors(req, res, 'pages/cadastro');
        
        if (errorRender !== null) return errorRender;

        // Se validação passou, armazenar dados na sessão e ir para próxima página
        req.session.cadastroJovem = req.body;
        console.log('Primeira página do cadastro validada:', req.body);
        
        res.redirect('/cad2');
    }
);

router.get('/cad2', function (req, res) {
    // Verificar se passou pela primeira página
    if (!req.session.cadastroJovem) {
        return res.redirect('/cadastro');
    }
    
    res.render('pages/cad2', { errors: null, form: {} });
});

// POST: Validar segunda página do cadastro de jovem
router.post(
    '/cad2',
    validationSets.cadastroJovem2,
    handleValidationErrors,
    (req, res) => {
        // Verificar se passou pela primeira página
        if (!req.session.cadastroJovem) {
            return res.redirect('/cadastro');
        }
        
        // Verificar se há erros de validação e renderizar com erros
        const errorRender = renderWithErrors(req, res, 'pages/cad2');
        
        if (errorRender !== null) return errorRender;

        // Se validação passou, combinar dados das duas páginas
        const dadosCompletos = {
            ...req.session.cadastroJovem,
            ...req.body
        };
        
        console.log('Cadastro completo validado:', dadosCompletos);
        
        // TODO: Salvar no banco de dados
        
        // Limpar sessão
        delete req.session.cadastroJovem;
        
        // Redirecionar para sucesso
        res.redirect('/login?cadastro=sucesso');
    }
);


const users = require('../data/users');


router.get('/perfil', (req, res) => {
    const user = users.user1; // (lembrar de usar ID dinâmico posteriormente)
    res.render('pages/perfil', {
        profileImage: '/img/default-profile.png',
        user: user,
    });
});


// Rota para processar o upload
router.post('/upload-profile', upload.single('profileImage'), (req, res) => {
    const user = users.user1; // Mantém os dados do usuário

    if (!req.file) {
        return res.render('pages/perfil', {
            profileImage: '/img/default-profile.png',
            user: user,
            error: 'Nenhum arquivo foi enviado.',
        });
    }

    try {
        const imageUrl = `/uploads/${req.file.filename}`;
        res.render('pages/perfil', {
            profileImage: imageUrl,
            user: user,
            error: null,
        });
    } catch (error) {
        res.render('pages/perfil', {
            profileImage: null,
            user: user,
            error: 'Erro ao processar o upload da imagem.',
        });
    }
});


router.get('/minhas-vagas', function (req, res) {
    // Enviando todas as vagas, igual à rota /vagas
    const todasVagas = { ...infoVagas };
    
    res.render('pages/minhasvagas', { 
        vagas: todasVagas, 
        infoVagas,
        vagasCandidatadas,
        vagasAnteriores 
    });
});

// Rota para processar candidatura
router.post('/candidatar', function (req, res) {
    const { vagaId } = req.body;
    
    if (vagaId && infoVagas[vagaId]) {
        // Verificar se já não está candidatado
        if (!vagasCandidatadas.includes(vagaId)) {
            vagasCandidatadas.push(vagaId);
        }
    }
    
    // Redirecionar de volta para a página de detalhes
    res.redirect(`/vaga-detalhes?id=${vagaId}`);
});

// Rota para cancelar candidatura
router.post('/cancelar-candidatura', function (req, res) {
    const { vagaId } = req.body;
    
    // Remover da lista de candidatadas e adicionar às anteriores
    const index = vagasCandidatadas.indexOf(vagaId);
    if (index > -1) {
        vagasCandidatadas.splice(index, 1);
        if (!vagasAnteriores.includes(vagaId)) {
            vagasAnteriores.push(vagaId);
        }
    }
    
    res.redirect('/minhas-vagas');
});


router.get('/teste2', function (req, res) {
    res.render('pages/cadastro-empresa2', { form: {}, errors: null });
});


router.get('/teste3', function (req, res) {
    res.render('pages/cadastro-empresa3');
});


// rota de empresa, depois colocar em um arquivo separado
router.get('/cadastro-empresa', function (req, res) {
    res.render('pages/cadastro-empresa', { form: {}, errors: null });
});


// POST: validar dados do cadastro da empresa no servidor
router.post(
    '/cadastro-empresa',
    validationSets.cadastroEmpresa,
    handleValidationErrors,
    (req, res) => {
        // Verificar se há erros de validação e renderizar com erros
        const errorRender = renderWithErrors(req, res, 'pages/cadastro-empresa');
        
        if (errorRender !== null) return errorRender;

        // Se validação passou, armazenar dados na sessão e ir para próxima página
        req.session.cadastroEmpresa = req.body;
        console.log('Cadastro empresa validado:', req.body);
        
        // TODO: Salvar no banco de dados
        
        res.redirect('/teste2');
    }
);

// POST: validar dados do representante da empresa (segunda etapa)
router.post(
    '/cadastro-empresa2',
    validationSets.cadastroEmpresaRepresentante,
    handleValidationErrors,
    (req, res) => {
        // Verificar se há erros de validação e renderizar com erros
        const errorRender = renderWithErrors(req, res, 'pages/cadastro-empresa2');
        
        if (errorRender !== null) return errorRender;

        // Se passou na validação, armazenar dados e seguir para próxima etapa
        if (!req.session) {
            req.session = {};
        }
        req.session.representanteData = req.body;
        console.log('Dados do representante validados:', req.body);
        
        return res.redirect('/teste3');
    }
);

router.get('/home-empresa', function (req, res) {
    res.render('pages/home-empresa');
});

// Rota para Sala de Reunião
router.get('/sala-reuniao', function (req, res) {
    res.render('pages/saladereunião');
});

module.exports = router;