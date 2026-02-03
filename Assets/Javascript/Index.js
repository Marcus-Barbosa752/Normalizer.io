import { Normalizar } from "../Utils/Arrumar.js"
import { Exemplo_Chat } from "./Exemplo.js"

const InsertValue = document.getElementById("InsertValue")
const InputTexto = document.getElementById("InputTexto")
const BtnEnviarTexto = document.getElementById("BtnEnviarTexto")
const BtnCleanChat = document.getElementById("BtnCleanChat")
const MessageBox = document.getElementById("MessageBox")

const Create_Card = (Tipo, Texto) => {
    const Cards = {
        User: `
        <div class="CardText User">
            <h2>Seu texto - Escrita</h2>
            ${Texto}
        </div>
        `,
        Bot: `
        <div class="CardText Bot">
            <h2>Resposta - Bot</h2>
            ${Texto}
        </div>
        `,
        Vazio: `
        <h4>Iniciar chat</h4>
        <h3>Coloque seu texto todo bagunçado e eu devolvo concertado</h3>
        `
    }

    if (!Tipo && !Texto) {
        return Cards.Vazio
    }

    switch (Tipo) {
        case "User":
            return Cards.User
        case "Bot":
            return Cards.Bot
        default:
            return Cards.Vazio
    }
}

const Is_Digit = Digit => Digit

BtnEnviarTexto.onclick = () => {
    if (!Is_Digit(InputTexto.value)) {
        InputTexto.style.boxShadow = "0 0 10px red"
        InputTexto.focus()
        InputTexto.onclick = () => InputTexto.style.boxShadow = "none"
        
        setTimeout(() => {
            MessageBox.style.top = "40px"
            setTimeout(() => MessageBox.style.top = "-100px", 3000)
        })
        return
    }

    InsertValue.innerHTML = Create_Card("User", InputTexto.value)
    const TimeOutSendText = setTimeout(() => {
        InsertValue.innerHTML += Create_Card("Bot", Normalizar(InputTexto.value))
    
        InputTexto.value = ""
        InputTexto.focus()
        clearTimeout(TimeOutSendText)
    }, 1000)

    BtnCleanChat.style.display = "block"
}

BtnCleanChat.onclick = () => {
    InsertValue.innerHTML = `
    <h4 id="H4TitleChat">Mesmo bagunçado, seu nome sai do jeito certo.</h4>
    <h3 id="H3SubTitleChat">Normalização inteligente de nomes..</h3>
    <h4 id="H4MensagemChat">Pode bagunçar. Eu arrumo.</h4>
    <button id="BtnTextoExemploChat">Exemplo</button>
    `

    document.getElementById("BtnTextoExemploChat").onclick = () => Exemplo_Chat()
    BtnCleanChat.style.display = "none"
}

addEventListener("keydown", ({keyCode}) => {
    if (keyCode == 13) BtnEnviarTexto.click()
})

export { Create_Card }