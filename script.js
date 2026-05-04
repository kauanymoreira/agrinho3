// ============================================
// 1. Função para calcular impacto sustentável
// ============================================
function calcularImpacto(areaTotal, areaPreservacao, nivelTecnologia) {
    // Variáveis para armazenar informações processadas
    let percentualPreservado = (areaPreservacao / areaTotal) * 100;
    let pontuacaoBase = 0;
    let mensagemImpacto = "";
    let corImpacto = "";
    let sugestao = "";
    
    // Validação básica
    if (areaPreservacao > areaTotal) {
        return {
            erro: true,
            mensagem: "❌ A área de preservação não pode ser maior que a área total!"
        };
    }
    
    // Processamento do nível tecnológico
    switch(nivelTecnologia) {
        case "basico":
            pontuacaoBase = 30;
            break;
        case "intermediario":
            pontuacaoBase = 65;
            break;
        case "avancado":
            pontuacaoBase = 90;
            break;
        default:
            pontuacaoBase = 0;
    }
    
    // Variável de cálculo final (armazena pontuação)
    let pontuacaoFinal = pontuacaoBase;
    
    // Bônus por percentual de preservação
    if (percentualPreservado >= 30) {
        pontuacaoFinal += 20;
    } else if (percentualPreservado >= 20) {
        pontuacaoFinal += 10;
    } else if (percentualPreservado < 10) {
        pontuacaoFinal -= 15;
    }
    
    // Garantir que a pontuação fique entre 0 e 100
    pontuacaoFinal = Math.min(100, Math.max(0, pontuacaoFinal));
    
    // Classificação do impacto (variável que armazena texto)
    let classificacao;
    if (pontuacaoFinal >= 80) {
        classificacao = "🌍 Excelente! Exemplo de agro sustentável";
        corImpacto = "#4caf50";
        sugestao = "Parabéns! Continue incentivando boas práticas.";
    } else if (pontuacaoFinal >= 50) {
        classificacao = "🌿 Bom caminho, mas pode melhorar";
        corImpacto = "#ff9800";
        sugestao = "Aumente áreas de preservação e adote tecnologias mais eficientes.";
    } else {
        classificacao = "⚠️ Impacto crítico. Aja agora!";
        corImpacto = "#f44336";
        sugestao = "Invista em recuperação de APP e tecnologias verdes.";
    }
    
    // Construção da mensagem final (usando template string)
    mensagemImpacto = `
        <strong>${classificacao}</strong><br>
        📊 Pontuação sustentável: ${pontuacaoFinal} pontos<br>
        🌳 Percentual preservado: ${percentualPreservado.toFixed(1)}%<br>
        💡 Sugestão: ${sugestao}
    `;
    
    // Retorna um objeto com os resultados
    return {
        erro: false,
        mensagem: mensagemImpacto,
        pontuacao: pontuacaoFinal,
        cor: corImpacto,
        percentual: percentualPreservado
    };
}

// ============================================
// 2. Manipulação do DOM - Formulário de Impacto
// ============================================
const impactoForm = document.getElementById('impactoForm');
const resultadoDiv = document.getElementById('resultadoImpacto');

if (impactoForm) {
    impactoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede recarregar a página
        
        // Capturando valores do formulário (variáveis de armazenamento)
        const areaTotal = parseFloat(document.getElementById('area').value);
        const areaPreservacao = parseFloat(document.getElementById('preservacao').value);
        const tecnologia = document.getElementById('tecnologia').value;
        
        // Validação extra com variáveis
        let mensagemValidacao = "";
        let isValid = true;
        
        if (isNaN(areaTotal) || areaTotal <= 0) {
            mensagemValidacao = "Por favor, informe uma área total válida (maior que zero).";
            isValid = false;
        } else if (isNaN(areaPreservacao) || areaPreservacao < 0) {
            mensagemValidacao = "Por favor, informe uma área de preservação válida.";
            isValid = false;
        } else if (!tecnologia) {
            mensagemValidacao = "Selecione o nível de tecnologia sustentável.";
            isValid = false;
        }
        
        // Processamento e exibição do resultado (manipulação do DOM)
        if (!isValid) {
            resultadoDiv.innerHTML = `<span style="color:#f44336;">❌ ${mensagemValidacao}</span>`;
            resultadoDiv.style.display = "block";
            return;
        }
        
        // Chama a função que processa os dados e retorna objeto
        const resultado = calcularImpacto(areaTotal, areaPreservacao, tecnologia);
        
        if (resultado.erro) {
            resultadoDiv.innerHTML = `<span style="color:#f44336;">${resultado.mensagem}</span>`;
        } else {
            resultadoDiv.innerHTML = `<span style="color:${resultado.cor};">${resultado.mensagem}</span>`;
        }
        
        resultadoDiv.style.display = "block";
        
        // Limpa o formulário após envio
        impactoForm.reset();
    });
}

// ============================================
// 3. Botão "Saiba mais" (alerta informativo)
// ============================================
const saibaMaisBtn = document.getElementById('saibaMaisBtn');
if (saibaMaisBtn) {
    saibaMaisBtn.addEventListener('click', function() {
        // Variável para armazenar a mensagem antes de exibir
        let mensagemInformativa = "🌱 Agro forte, futuro sustentável significa:\n\n✅ Produzir alimentos sem destruir florestas\n✅ Uso racional da água e do solo\n✅ Tecnologia a favor do meio ambiente\n✅ Respeito às leis ambientais\n✅ Compromisso com as próximas gerações";
        
        // Exibe a mensagem armazenada na variável
        alert(mensagemInformativa);
    });
}

// ============================================
// 4. Formulário de contato (feedback)
// ============================================
const contatoForm = document.getElementById('contatoForm');
const feedbackDiv = document.getElementById('feedbackContato');

if (contatoForm) {
    contatoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Variáveis para armazenar os dados do formulário
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Variável para armazenar mensagem de validação
        let mensagemFeedback = "";
        let corFeedback = "";
        
        // Processamento das informações antes de exibir
        if (nome === "" || email === "" || mensagem === "") {
            mensagemFeedback = "❌ Por favor, preencha todos os campos.";
            corFeedback = "#f44336";
        } else if (!email.includes('@') || !email.includes('.')) {
            mensagemFeedback = "❌ Por favor, informe um e-mail válido (deve conter @ e .).";
            corFeedback = "#f44336";
        } else {
            // Variável que armazena dados processados para exibição
            let nomeCapitalizado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
            let mensagemPersonalizada = `✅ Obrigado, ${nomeCapitalizado}! Sua mensagem foi enviada com sucesso.\n\n📧 Responderemos em breve para: ${email}\n\n💬 Sua mensagem: "${mensagem}"\n\nJuntos construímos um agro mais forte e sustentável!`;
            
            mensagemFeedback = mensagemPersonalizada;
            corFeedback = "#4caf50";
            
            // Limpa o formulário
            contatoForm.reset();
        }
        
        // Exibe o feedback na página (manipulação do DOM)
        feedbackDiv.innerHTML = `<span style="color:${corFeedback};">${mensagemFeedback.replace(/\n/g, '<br>')}</span>`;
        feedbackDiv.style.display = "block";
        
        // Opcional: esconder a mensagem após 8 segundos
        setTimeout(() => {
            if (feedbackDiv) {
                feedbackDiv.style.opacity = "0";
                setTimeout(() => {
                    feedbackDiv.style.display = "none";
                    feedbackDiv.style.opacity = "1";
                }, 500);
            }
        }, 8000);
    });
}

// ============================================
// 5. Smooth scroll para navegação (bônus - melhora UX)
// ============================================
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
