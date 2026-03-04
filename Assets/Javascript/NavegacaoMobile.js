import { Exemplo_Chat } from "./Exemplo.js"

const BtnToggleMenuFloatMobile = document.getElementById("BtnToggleMenuFloatMobile")
const BtnCloseMenuMobile = document.getElementById("BtnCloseMenuMobile")
const BtnCleanChatMobile = document.getElementById("BtnCleanChatMobile")

const SpanUmToggleMenuFloatMobile = document.getElementById("SpanUmToggleMenuFloatMobile")
const SpanDoisToggleMenuFloatMobile = document.getElementById("SpanDoisToggleMenuFloatMobile")

const MenuFloatMobile = document.getElementById("MenuFloatMobile")

BtnToggleMenuFloatMobile.onclick = () => {
    SpanUmToggleMenuFloatMobile.classList.add("ActiveSpanUmToggleMenuFloatMobile")
    SpanDoisToggleMenuFloatMobile.classList.add("ActiveSpanDoisToggleMenuFloatMobile")
    MenuFloatMobile.classList.add("AddMenuFloatMobile")
}

BtnCloseMenuMobile.onclick = () => {
    SpanUmToggleMenuFloatMobile.classList.remove("ActiveSpanUmToggleMenuFloatMobile")
    SpanDoisToggleMenuFloatMobile.classList.remove("ActiveSpanDoisToggleMenuFloatMobile")
    MenuFloatMobile.classList.remove("AddMenuFloatMobile")
}

BtnCleanChatMobile.onclick = () => {
    InsertValue.innerHTML = `
    <h4 id="H4TitleChat">Mesmo bagunçado, seu nome sai do jeito certo.</h4>
    <h3 id="H3SubTitleChat">Normalização inteligente de nomes..</h3>
    <h4 id="H4MensagemChat">Pode bagunçar. Eu arrumo.</h4>
    <nav>
        <button id="BtnTextoExemploChat">Exemplo único</button>
        <button id="BtnTextoExemploMultiploChat">Exemplo múltiplo</button>
    </nav>
    `

    document.getElementById("BtnTextoExemploChat").onclick = () => Exemplo_Chat()
    BtnCleanChat.style.display = "none"
    BtnCloseMenuMobile.click()
}
