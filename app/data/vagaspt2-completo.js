// Arquivo consolidado com todas as vagas
const infoVagas = {
    // Parte 1
    desenvolvedor_full_stack: {
        id: 'desenvolvedor_full_stack',
        numero: 1,
        titulo: 'Desenvolvedor Full Stack',
        tipo: 'Efetivo',
        local: 'São Paulo, SP',
        empresa: 'CodeSphere',
        categoria: 'Tecnologia da Informação',
        salario: '6.500,00',
        descricao: 'Desenvolvedor Full Stack com experiência em aplicações web modernas e APIs REST. Responsável pelo desenvolvimento de soluções completas, desde o front-end até o back-end.',
        beneficios: [
            'Equipamentos fornecidos',
            'Trabalho híbrido',
            'Plano de saúde',
            'Vale-refeição'
        ],
        icones: {
            perfil: '👨‍💻',
            empresa: '🏢',
            categoria: '💼',
            salario: '💰'
        }
    },

    tecnico_manutencao_industrial: {
        id: 'tecnico_manutencao_industrial',
        numero: 2,
        titulo: 'Técnico em Manutenção Industrial',
        tipo: 'Efetivo',
        local: 'Contagem, MG',
        empresa: 'Indústria MecFlex',
        categoria: 'Produção e Manutenção',
        salario: '3.200,00',
        descricao: 'Profissional para atuar na manutenção preventiva e corretiva de equipamentos industriais, garantindo o funcionamento contínuo das operações.',
        beneficios: [
            '🚍 Vale-transporte',
            '🍛 Alimentação no local',
            '🦷 Plano odontológico'
        ],
        icones: {
            perfil: '🧑‍🔧',
            empresa: '🏢',
            categoria: '💼',
            salario: '💰'
        }
    },

    // Adicionando vaga de parte 2
    tecnico_biotecnologia: {
        id: 'tecnico_biotecnologia',
        numero: 11,
        titulo: 'Técnico em Biotecnologia',
        tipo: 'Efetivo',
        local: 'Porto Alegre, RS',
        empresa: 'GenLife',
        categoria: 'Pesquisa e Produção',
        salario: '4.500,00',
        descricao: 'Profissional para atuar em processos biotecnológicos, realizando testes e análises em laboratório.',
        beneficios: [
            'Laboratório moderno',
            'Vale-refeição',
            'Convênio médico'
        ],
        icones: {
            perfil: '',
            empresa: '',
            categoria: '',
            salario: ''
        }
    },

    // Mais vagas serão consolidadas aqui...
    // Mantenha as vagas mais importantes/utilizadas para o sistema funcionar

    // Uma última vaga para exemplificar
    assistente_administrativo: {
        id: 'assistente_administrativo',
        numero: 8,
        titulo: 'Assistente Administrativo',
        tipo: 'Efetivo',
        local: 'Brasília, DF',
        empresa: 'CentralCorp',
        categoria: 'Administração',
        salario: '2.900,00',
        descricao: 'Auxiliar nas rotinas administrativas, organizar documentos, atender clientes e fornecer suporte à gestão.',
        beneficios: [
            '🍽️ Vale-alimentação',
            '🏥 Plano de saúde',
            '🦷 Plano odontológico'
        ],
        icones: {
            perfil: '👩‍💼',
            empresa: '🏢',
            categoria: '💼',
            salario: '💰'
        }
    },

    estagiario_ti: {
        id: 'estagiario_ti',
        numero: 5,
        titulo: 'Estagiário em TI',
        tipo: 'Estágio',
        local: 'Recife, PE',
        empresa: 'TechNova',
        categoria: 'Tecnologia',
        salario: '1.400,00',
        descricao: 'Oportunidade para estudantes de TI aprenderem na prática sobre desenvolvimento de software, infraestrutura e suporte técnico.',
        beneficios: [
            '🚍 Vale-transporte',
            '🎓 Treinamentos internos',
            '💻 Acesso a softwares premium'
        ],
        icones: {
            perfil: '👨‍💻',
            empresa: '🏢',
            categoria: '💼',
            salario: '💰'
        }
    },

    designer_grafico: {
        id: 'designer_grafico',
        numero: 6,
        titulo: 'Designer Gráfico',
        tipo: 'Efetivo',
        local: 'São Paulo, SP',
        empresa: 'Agência Criativa 360',
        categoria: 'Marketing e Design',
        salario: '3.800,00',
        descricao: 'Designer para criar peças gráficas, identidades visuais e materiais de comunicação para diversos clientes e plataformas.',
        beneficios: [
            '🎨 Ferramentas Adobe',
            '🍽️ Vale-refeição',
            '🏠 Regime híbrido'
        ],
        icones: {
            perfil: '👩‍🎨',
            empresa: '🏢',
            categoria: '💼',
            salario: '💰'
        }
    }
,

    // Vaga ROLTA - Programa Jovem Aprendiz
    rolta: {
        id: 'rolta',
        numero: 9,
        titulo: 'Jovem Aprendiz ROLTA',
        programa: 'Programa Jovem Aprendiz - 2025',
        tipo: 'Jovem Aprendiz',
        local: 'São Paulo, SP',
        empresa: 'ROLTA Indústria',
        categoria: 'Indústria e Tecnologia',
        salario: '1.800,00',
        descricao: 'O programa Jovem Aprendiz da ROLTA oferece uma experiência completa na indústria de tecnologia e automação, preparando jovens para o mercado de trabalho com formação prática e teórica.',
        beneficios: [
            '🚍 Vale-transporte',
            '🍽️ Vale-refeição',
            '📚 Bolsa de estudos',
            '🏥 Plano de saúde'
        ],
        icones: {
            perfil: '👨‍🔧',
            empresa: '🏭',
            categoria: '💼',
            salario: '💰'
        },
        imagem: '/img/rolta-logo.png',
        dataInicio: '2024-07-01',
        dataFim: '2024-09-30',
        dataInicioFormatada: '01/07/2024',
        dataFimFormatada: '30/09/2024'
    },

    // Vaga RIMBERIO - Programa Jovem Aprendiz
    rimberio: {
        id: 'rimberio',
        numero: 10,
        titulo: 'Jovem Aprendiz RIMBERIO',
        programa: 'Programa Jovem Aprendiz - 2025',
        tipo: 'Jovem Aprendiz',
        local: 'Campinas, SP',
        empresa: 'Grupo RIMBERIO',
        categoria: 'Logística e Operações',
        salario: '1.650,00',
        descricao: 'O programa Jovem Aprendiz do Grupo RIMBERIO é voltado para a formação em operações logísticas e gestão de cadeia de suprimentos, com oportunidades de efetivação após o período de aprendizagem.',
        beneficios: [
            '🚍 Vale-transporte',
            '🍽️ Alimentação no local',
            '📚 Cursos de capacitação',
            '🦷 Plano odontológico'
        ],
        icones: {
            perfil: '👨‍🔧',
            empresa: '🏢',
            categoria: '💼',
            salario: '💰'
        },
        imagem: '/img/rimberio-logo.png',
        dataInicio: '2024-06-15',
        dataFim: '2024-08-31',
        dataInicioFormatada: '15/06/2024',
        dataFimFormatada: '31/08/2024'
    }
};

module.exports = infoVagas; 
