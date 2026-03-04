// CONFIGURAÇÕES
const PREPOSICOES_D = new Set(["da", "de", "do", "dos", "das"])
const NOMES_CURTOS = new Set(["ana", "zé", "ze"])

const isLetter = (ch) => /\p{L}/u.test(ch)

// NORMALIZAÇÃO
function normalizarNome(input) {
    // 1️⃣ Remove tudo que não é letra (ignora espaços como ruído)
    let texto = input.replace(/[^\p{L}]/gu, "")

    // 2️⃣ Aqui entra SEU algoritmo validado de reconstrução
    texto = reconstruirPorContexto(texto)

    // 3️⃣ Se for palavra única curta → pode estar invertida
    if (!texto.includes(" ") && texto.length <= 6) {
        const invertida = texto.split("").reverse().join("")

        if (avaliarQualidade(invertida) > avaliarQualidade(texto)) {
            texto = invertida
        }
    }

    return texto
}

function reconstruirPorContexto(texto) {
    if (!texto) return ""

    // 🔹 Conta quantas maiúsculas existem no texto original
    const maiusculas = [...texto].filter(l =>
        l === l.toLocaleUpperCase("pt-BR") &&
        l !== l.toLocaleLowerCase("pt-BR")
    ).length

    // 👉 Se tiver 0 ou 1 maiúscula → tratar como palavra única
    if (maiusculas <= 1) {
        const lower = texto.toLocaleLowerCase("pt-BR")

        return (
            lower[0].toLocaleUpperCase("pt-BR") +
            lower.slice(1)
        )
    }

    // 🔹 Caso contrário, aplica reconstrução por transição
    let palavras = []
    let atual = ""

    for (let i = 0; i < texto.length; i++) {
        const letra = texto[i]
        const anterior = texto[i - 1]

        const ehMaiuscula =
            letra === letra.toLocaleUpperCase("pt-BR") &&
            letra !== letra.toLocaleLowerCase("pt-BR")

        const anteriorEhMinuscula =
            anterior &&
            anterior === anterior.toLocaleLowerCase("pt-BR")

        if (i > 0 && ehMaiuscula && anteriorEhMinuscula) {
            palavras.push(atual)
            atual = letra
        }else {
            atual += letra;
        }
    }

    if (atual) palavras.push(atual)

    palavras = palavras.map(p => {
        const lower = p.toLocaleLowerCase("pt-BR")

        if (PREPOSICOES_D.has(lower)) {
            return "D" + lower.slice(1)
        }

        return (
            lower[0].toLocaleUpperCase("pt-BR") +
            lower.slice(1)
        )
    })

    return palavras.join(" ")
}

function avaliarQualidade(str) {
    const vogais = (str.match(/[aeiouáéíóúãõâêîôû]/gi) || []).length
    const consoantes = str.length - vogais

    // Penaliza excesso de consoante no final
    const penalidadeFinal = /[^aeiouáéíóúãõ]$/i.test(str) ? -1 : 0

    return vogais * 2 - consoantes + penalidadeFinal
}

const estaNormalizado = (input = "") => {
    if (typeof input !== "string") return false

    const s = input.trim()
    if (!s) return false

    if (!/^[\p{L}]+(?: [\p{L}]+)*$/u.test(s)) return false

    const palavras = s.split(" ")

    for (const p of palavras) {
        const lower = p.toLocaleLowerCase("pt-BR")

        if (PREPOSICOES_D.has(lower)) {
            if (p !== "D" + lower.slice(1)) return false
            continue
        }

        const esperado =
            p[0].toLocaleUpperCase("pt-BR") +
            p.slice(1).toLocaleLowerCase("pt-BR")

        if (p !== esperado) return false
    }

    return true
}

// PROCESSADOR COMPLETO
function processarNome(nome) {
    if (!nome || typeof nome !== "string") {
        return {
            valorFinal: "",
            invertidoDetectado: false,
            jaEstavaNormalizado: false,
            valido: false
        }
    }

    // 🔹 Função auxiliar para remover repetição exagerada
    const removerRepeticoes = (str) => {
        // remove 3 ou mais repetições
        str = str.replace(/(\p{L})\1{2,}/gu, "$1")
    
        // 🔥 remove repetição dupla no INÍCIO da palavra
        str = str.replace(/^(\p{L})\1+/u, "$1")
    
        return str
    }

    // 🔹 Primeiro testa normal
    const normalOriginal = removerRepeticoes(
        normalizarNome(nome)
    )

    // 🔹 Inverte PRIMEIRO o texto cru
    const invertidoTexto = [...nome].reverse().join("")

    // 🔹 Depois normaliza
    const normalInvertido = removerRepeticoes(
        normalizarNome(invertidoTexto)
    )

    // 🔹 Score inteligente
    const score = (str) => {
        if (!str) return 0
    
        let pontos = 0
        const palavras = str.split(" ")
    
        for (let p of palavras) {
    
            if (p.length >= 4) pontos += 3
            else if (p.length === 3) pontos += 2
            else if (p.length === 2) pontos += 1
            else pontos -= 2
    
            // 🔹 Penaliza final raro (ld, dl, etc)
            if (/[bcdfghjklmnpqrstvwxyz]{2}$/i.test(p))
                pontos -= 3
    
            // 🔹 Bonifica final comum brasileiro
            if (/(an|ão|el|as|os|es|is)$/i.test(p))
                pontos += 2
        }
    
        return pontos
    }

    const scoreA = score(normalOriginal)
    const scoreB = score(normalInvertido)

    const usarInvertido = scoreB > scoreA

    let valorFinal = usarInvertido ? normalInvertido : normalOriginal

    if (!valorFinal.includes(" ") && valorFinal.length <= 6) {

        const candidato = valorFinal.slice(1)
    
        const scoreLocal = (str) => {
            const vogais = (str.match(/[aeiouáéíóúãõ]/gi) || []).length
            return vogais * 2 - str.length
        }
    
        if (scoreLocal(candidato) > scoreLocal(valorFinal)) {
            valorFinal = candidato
        }
    
        // capitaliza corretamente
        valorFinal =
            valorFinal[0].toLocaleUpperCase("pt-BR") +
            valorFinal.slice(1).toLocaleLowerCase("pt-BR")
    }

    return {
        valorFinal,
        invertidoDetectado: usarInvertido,
        jaEstavaNormalizado: estaNormalizado(nome),
        valido: valorFinal.length >= 3
    }
}

export {
    normalizarNome,
    estaNormalizado,
    processarNome
}
