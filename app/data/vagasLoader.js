// Importação do módulo de vagas consolidado
const infoVagas = require('./vagaspt2-completo');

/**
 * Função para carregar todas as vagas a partir do módulo JavaScript completo
 * Utiliza o arquivo vagaspt2-completo.js que já contém todas as vagas consolidadas
 */
function carregarVagasJSON() {
    // Retorna o objeto de vagas já consolidado
    return infoVagas;
}

/**
 * Verifica se um objeto de vaga existe em qualquer uma das fontes de dados
 * @param {string} id - ID da vaga a ser procurada
 * @returns {object|null} - Objeto da vaga encontrada ou null se não existir
 */
function encontrarVaga(id) {
    const vagas = carregarVagasJSON();
    return vagas[id] || null;
}

// Exporta as funções para uso em outros arquivos
module.exports = {
    carregarVagasJSON,
    encontrarVaga
};