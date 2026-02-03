const PREPOSICOES_D = new Set(["da", "de", "do", "dos", "das"])
const NOMES_CURTOS = new Set(["ana", "zé", "ze"])

const isLetter = (ch) => /\p{L}/u.test(ch)

const normalizarNome = (input = "") => {
    if (typeof input !== "string") return ""

    const palavras = []
    let atual = ""
    let teveRuido = false

    const flush = () => {
        if (atual) palavras.push(atual)
        atual = ""
    }

    for (let i = 0; i < input.length; i++) {
        const ch = input[i]

        if (isLetter(ch)) {
            const isUpperOriginal = ch === ch.toLocaleUpperCase("pt-BR")

            if (atual && teveRuido) {
                const lowerAtual = atual.toLocaleLowerCase("pt-BR")

                // 1) Se a palavra atual é preposição, qualquer ruído antes da próxima letra separa
                if (PREPOSICOES_D.has(lowerAtual)) {
                    flush()
                }
                // 2) Se a próxima letra é maiúscula no original, pode ser nova palavra
                else if (isUpperOriginal) {
                    // evita quebrar "MarCus" (curto demais) mas separa nomes completos
                    if (atual.length >= 4 || NOMES_CURTOS.has(lowerAtual)) {
                        flush()
                    }
                }
            }

            atual += ch.toLocaleLowerCase("pt-BR")
            teveRuido = false
            continue
        }

        // tudo que não é letra é ruído (inclui espaços, números, símbolos)
        teveRuido = true
    }

    flush()

    // capitaliza final + Da/De/Do/Dos/Das com D maiúsculo
    return palavras
        .map(p => p.toLocaleLowerCase("pt-BR"))
        .map(p => {
            if (PREPOSICOES_D.has(p)) return "D" + p.slice(1)
            return p[0].toLocaleUpperCase("pt-BR") + p.slice(1)
        })
        .join(" ")
}

const estaNormalizado = (input = "") => {
    if (typeof input !== "string") return false

    const s = input.trim()
    if (!s) return false

    // apenas letras (com acentos) e espaços simples
    if (!/^[\p{L}]+(?: [\p{L}]+)*$/u.test(s)) return false

    const palavras = s.split(" ")

    for (const p of palavras) {
        const lower = p.toLocaleLowerCase("pt-BR")

        // Da / De / Do / Dos / Das com D maiúsculo
        if (PREPOSICOES_D.has(lower)) {
            if (p !== "D" + lower.slice(1)) return false
            continue
        }

        // Title Case normal
        const esperado =
            p[0].toLocaleUpperCase("pt-BR") +
            p.slice(1).toLocaleLowerCase("pt-BR")

        if (p !== esperado) return false
    }

    return true
}

// ✅ Função “wrapper”: só normaliza se precisar
const NormalizarOuAvisar = (nome = "") => {
    if (estaNormalizado(nome)) {
        return "Já está normalizado, não foi preciso normalizar!"
    }

    return normalizarNome(nome)
}

const Normalizar = (Valor) => NormalizarOuAvisar(Valor)

export { Normalizar }