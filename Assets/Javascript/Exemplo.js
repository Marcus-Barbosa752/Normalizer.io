import { Create_Card } from "./Index.js"
import { processarNome } from "../Utils/Arrumar.js"

const NOMES_BASE = [
    "Gustavo Henrique",
    "Marcus Vinicius Assis de Jesus Barbosa",
    "Ana Paula Mendes",
    "João Vitor Santos",
    "Camila Rocha Lima",
    "Felipe Araujo",
    "Beatriz Costa",
    "Thiago Pereira"
]

const EMOJIS = ["😎","🔥","💀","👑","🎯","🚀","💥","✨","🎮","🐍","🌪","🧠","💎","🌸","🎵","⚡"]
const SIMBOLOS = ["@", "#", "$", "%", "&", "!", "+", "_"]

const random = (arr) => arr[Math.floor(Math.random() * arr.length)]
const chance = (p) => Math.random() < p

const gerarNomeCaotico = (nome) => {
    let resultado = ""

    for (let char of nome) {
        resultado += char

        if (chance(0.7)) resultado += " "
        if (chance(0.3)) resultado += Math.floor(Math.random() * 10)
        if (chance(0.2)) resultado += random(SIMBOLOS)
        if (chance(0.2)) resultado += random(EMOJIS)
    }

    // 40% de chance de inverter tudo
    if (chance(0.4)) {
        resultado = [...resultado].reverse().join("")
    }

    return resultado
}

const Exemplo_Chat = () => {
    const InsertValue = document.getElementById("InsertValue")
    const HeroSection = document.getElementById("HeroSection")
    const BtnCleanChat = document.getElementById("BtnCleanChat")

    if (!InsertValue) return

    if (HeroSection) HeroSection.style.display = "none"

    const nomeBase = random(NOMES_BASE)
    const nomeBaguncado = gerarNomeCaotico(nomeBase)

    InsertValue.innerHTML = Create_Card("User", nomeBaguncado)

    setTimeout(() => {
        const resultado = processarNome(nomeBaguncado)

        let resposta = `
            <p><strong>Nome normalizado:</strong> ${resultado.valorFinal}</p>
        `

        if (resultado.jaEstavaNormalizado) {
            resposta += `<p>✔️ Já estava normalizado.</p>`
        }

        if (!resultado.valido) {
            resposta += `<p>⚠️ Nome pode estar incompleto ou inválido.</p>`
        }

        InsertValue.innerHTML += Create_Card("Bot", resposta)

    }, 1000)

    if (BtnCleanChat) BtnCleanChat.style.display = "block"
}

export { Exemplo_Chat }
