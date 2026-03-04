import { processarNome } from "../Utils/Arrumar.js"
import { Exemplo_Chat } from "./Exemplo.js"

const InsertValue = document.getElementById("InsertValue")
const InputTexto = document.getElementById("InputTexto")
const BtnEnviarTexto = document.getElementById("BtnEnviarTexto")
const BtnCleanChat = document.getElementById("BtnCleanChat")
const MessageBox = document.getElementById("MessageBox")

const Create_Card = (Tipo, Texto) => {
    if (!Tipo && !Texto) {
        return `
        <h4>Iniciar chat</h4>
        <h3>Coloque seu texto todo bagunçado e eu devolvo concertado</h3>
        `
    }

    return `
        <div class="CardText ${Tipo}">
            <h2>${Tipo === "User" ? "Seu texto - Escrita" : "Resposta - Bot"}</h2>
            ${Texto}
        </div>
    `
}

const Is_Not_Empty = value => value && value.trim().length > 0

if (BtnEnviarTexto && InputTexto && InsertValue && BtnCleanChat) {
    BtnEnviarTexto.addEventListener("click", () => {
        if (!InputTexto.value) {
            MessageBox.style.top = '40px'
            setTimeout(() => MessageBox.style.top = '-100px', 2000)
            return
        }
        const texto = InputTexto.value.trim()

        if (!Is_Not_Empty(texto)) return

        InsertValue.innerHTML = Create_Card("User", texto)

        setTimeout(() => {

            const resultado = processarNome(texto)

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

            InputTexto.value = ""
            InputTexto.focus()

        }, 800)

        BtnCleanChat.style.display = "block"
    })

    BtnCleanChat.addEventListener("click", () => {
        const HeroSection = document.getElementById("HeroSection")
    
        // 🔹 Restaurar HeroSection
        if (HeroSection) {
            HeroSection.style.display = "block"
        }
    
        // 🔹 Restaurar conteúdo inicial completo
        InsertValue.innerHTML = `
            <h4 id="H4TitleChat">Mesmo bagunçado, seu nome sai do jeito certo.</h4>
            <h3 id="H3SubTitleChat">Normalização inteligente de nomes.</h3>
            <h4 id="H4MensagemChat">Pode bagunçar. Eu arrumo.</h4>
            <nav>
                <button id="BtnTextoExemploChat">Exemplo único</button>
                <button id="BtnTextoExemploMultiploChat">Exemplo múltiplo</button>
            </nav>
        `
    
        // 🔹 Recriar evento do botão Exemplo
        const BtnTextoExemploChat = document.getElementById("BtnTextoExemploChat")
    
        if (BtnTextoExemploChat) {
            BtnTextoExemploChat.addEventListener("click", () => {
                Exemplo_Chat()
            })
        }
    
        BtnCleanChat.style.display = "none"
    })

    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            BtnEnviarTexto.click()
        }
    })
}

export { Create_Card }
