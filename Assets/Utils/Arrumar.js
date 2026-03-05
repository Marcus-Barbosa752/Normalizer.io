const PREPOSICOES_D = new Set(["da","de","do","dos","das"])
const RE_VOGAIS = /[aeiouáéíóúãõâêîôû]/gi

function limparSpamLetras(str){
    if(!str) return { texto: "", tinhaSpamInicio: false, letraSpamInicio: null }
    let tinhaSpamInicio = false
    let letraSpamInicio = null
    const texto = str.replace(/(\p{L})\1{3,}/giu, (match, letra, offset) => {
        if(offset === 0){
            tinhaSpamInicio = true
            letraSpamInicio = letra.toUpperCase()
        }
        return letra
    })
    return { texto, tinhaSpamInicio, letraSpamInicio }
}

function limparTextoBase(texto){
    texto = texto.replace(/[^\p{L}]/gu," ")
    texto = texto.replace(/\s+/g," ").trim()
    return texto
}

function juntarLetrasSeparadas(texto){
    const partes = texto.split(" ").filter(Boolean)
    const letras = partes.filter(p=>p.length===1)
    if(letras.length >= partes.length*0.6){
        return partes.join("")
    }
    return texto
}

function reconstruirSequenciaDeLetras(texto){
    const partes = texto.split(" ")
    if(partes.every(p=>p.length===1)){
        const nome = partes.join("")
        if(nome.length>=6){
            const meio = Math.floor(nome.length/2)
            return nome.slice(0,meio) + " " + nome.slice(meio)
        }
    }
    return texto
}

function limparSufixoRuido(texto){
    return texto.replace(/(\p{L})\1{2,}$/giu,"$1")
}

function reconstruirNomeCurto(partes){
    if(partes.length===2){
        const [a, b] = partes
        const aTemVogal = /[aeiouáéíóúãõâêîôû]/i.test(a)
        const bTemVogal = /[aeiouáéíóúãõâêîôû]/i.test(b)

        // Descarta bloco multi-char sem vogal (ex: "Ld", "St") — ruído de consonantes
        if(!bTemVogal && b.length >= 2) return [a]
        if(!aTemVogal && a.length >= 2) return [b]

        // FIX: descarta consonante MINÚSCULA isolada (ex: "d" de dLuan — noise de spam)
        // mas MANTÉM consonante MAIÚSCULA isolada (ex: "P" de "orde P" — inicial real do nome)
        if(!bTemVogal && b.length === 1 && b === b.toLowerCase()) return [a]
        if(!aTemVogal && a.length === 1 && a === a.toLowerCase()) return [b]

        const tentativa = partes.join("")
        if(aTemVogal && bTemVogal && tentativa.length<=5) return [tentativa]
    }
    return partes
}

function separarCamelCase(str){
    return str.replace(/([a-zà-ÿ])([A-Z])/g,"$1 $2")
}

function separarBlocosMaiusculos(str){
    const grupos = str.match(/[A-ZÁÉÍÓÚÃÕÂÊÎÔÛ]{3,}/g)
    if(!grupos) return str
    if(grupos.length>=2) return grupos.join(" ")
    return str
}

function capitalizarPalavra(p){
    const lower = p.toLocaleLowerCase("pt-BR")
    if(PREPOSICOES_D.has(lower)) return lower
    return lower[0].toUpperCase() + lower.slice(1)
}

function normalizarNome(input, tinhaSpamInicio = false, letraSpamInicio = null){
    let texto = String(input ?? "")
    texto = limparTextoBase(texto)
    texto = juntarLetrasSeparadas(texto)
    texto = reconstruirSequenciaDeLetras(texto)
    texto = limparSufixoRuido(texto)
    texto = separarCamelCase(texto)
    texto = separarBlocosMaiusculos(texto)

    // Remove prefixo espúrio de spam apenas quando o texto ainda é todo maiúsculo
    // Ex: "AJOAO SILVA" → remove A. Mas "Gustavo" (mixed case) → não remove G.
    if(tinhaSpamInicio && letraSpamInicio && texto === texto.toUpperCase()){
        texto = texto.replace(/^(\p{L})(?!\1)(?=\p{L}{2,})/u, "")
    }

    let partes = texto.split(/\s+/).filter(Boolean)
    partes = reconstruirNomeCurto(partes)
    partes = partes.map(capitalizarPalavra)
    return partes.join(" ")
}

function estaNormalizado(input=""){
    if(typeof input!=="string") return false
    const s=input.trim()
    if(!s) return false
    if(!/^[\p{L}]+(?: [\p{L}]+)*$/u.test(s)) return false
    const palavras=s.split(" ")
    for(const p of palavras){
        const esperado=p[0].toUpperCase()+p.slice(1).toLowerCase()
        if(p!==esperado) return false
    }
    return true
}

// FIX: adiciona bônus por total de letras (resultado mais longo é mais completo)
// Isso corrige o desempate Nau(3) vs Luan(4) → mesmo score base, Luan tem +1 letra
function avaliarQualidade(str){
    RE_VOGAIS.lastIndex = 0
    const totalLetras = str.replace(/\s/g,"").length
    const vogais = (str.match(RE_VOGAIS)||[]).length
    const consoantes = totalLetras - vogais
    const letrasIsoladas = str.split(" ").filter(p=>p.length===1).length
    return vogais*2 - consoantes - letrasIsoladas*2 + totalLetras
}

function processarNome(nome){
    if(!nome||typeof nome!=="string"){
        return{ valorFinal:"", invertidoDetectado:false, jaEstavaNormalizado:false, valido:false }
    }

    const { texto: textoLimpo, tinhaSpamInicio, letraSpamInicio } = limparSpamLetras(nome)
    const normalOriginal = normalizarNome(textoLimpo, tinhaSpamInicio, letraSpamInicio)

    const invertidoTexto = [...nome].reverse().join("")
    const { texto: invLimpo, tinhaSpamInicio: invSpam, letraSpamInicio: invLetra } = limparSpamLetras(invertidoTexto)
    const normalInvertido = normalizarNome(invLimpo, invSpam, invLetra)

    const scoreA = avaliarQualidade(normalOriginal)
    const scoreB = avaliarQualidade(normalInvertido)

    // Desempate por comprimento: se scores iguais, prefere o resultado MAIS LONGO
    // (mais letras = menos informação descartada durante a limpeza)
    // Ex: Nau(3) vs Luan(4) → score igual → Luan ganha por comprimento
    // Ex: Joao Silva(9) vs Avlis Oaoj(9) → score igual, comprimento igual → original ganha
    const lenA = normalOriginal.replace(/\s/g,"").length
    const lenB = normalInvertido.replace(/\s/g,"").length
    const usarInvertido = scoreB > scoreA || (scoreB === scoreA && lenB > lenA)
    const valorFinal = usarInvertido ? normalInvertido : normalOriginal

    return{
        valorFinal,
        invertidoDetectado: usarInvertido,
        jaEstavaNormalizado: estaNormalizado(nome),
        valido: valorFinal.length>=3
    }
}

export { normalizarNome, estaNormalizado, processarNome }
