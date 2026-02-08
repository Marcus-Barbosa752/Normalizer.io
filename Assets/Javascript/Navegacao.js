import { SetClass } from "../Utils/SetClass.js"
import { Temas } from "./Tema.js"
import { Insert_Tema } from "../Utils/Utils.js"
import { Exemplo_Chat } from "./Exemplo.js"

const Upload = document.getElementById("Upload")
const BtnToggleUpload = document.getElementById("BtnToggleUpload")
const BtnTextoExemploChat = document.getElementById("BtnTextoExemploChat")

// 1) Dropdowns (Tema e Som)
const TemaBoxes = document.querySelectorAll('.Tema[id="ContainerTema"]')

TemaBoxes.forEach((temaBox) => {
    const titulo = temaBox.querySelector('#SelectTheme')
    const caret = temaBox.querySelector('#IindicatoExpandTema')

    if (!titulo) return

    titulo.onclick = () => {
        temaBox.classList.toggle("Expand")
        if (caret) SetClass(caret, "fi-sr-caret-down", "fi-sr-caret-up")
    }
})

// 2) Restaurar configurações
document.addEventListener("DOMContentLoaded", () => {
    const temaSalvo = localStorage.getItem("tema_atual")
    if (temaSalvo && Temas[temaSalvo]) {
        Insert_Tema(temaSalvo, false)
    }

    const efeitoSalvo = localStorage.getItem("efeito_sonoro_chat")
    if (efeitoSalvo) marcarOpcaoEfeitoSom(efeitoSalvo)
})

// 3) Botões (Tema e Efeito Sonoro)
const TodosBotoes = document.querySelectorAll('#BtnSelectTheme')

TodosBotoes.forEach((btn) => {
    btn.onclick = () => {
        const temaBox = btn.closest('.Tema[id="ContainerTema"]')
        if (!temaBox) return

        const texto = (btn.querySelector("span")?.textContent || "").trim()
        if (!texto) return

        const nav = btn.closest("nav")

        /* ====== 3.1) Tema (PC e Mobile) ====== */
        if (Temas[texto]) {
            // Marca seleção só dentro desse bloco de temaBox
            temaBox.querySelectorAll('#BtnSelectTheme').forEach(b => b.classList.remove("BtnThemeSelected"))
            btn.classList.add("BtnThemeSelected")

            // Atualiza ícone do próprio bloco (não mexe no outro card)
            const iconStatus = temaBox.querySelector('#IStatusTemaIcon')
            const iconBtn = btn.querySelector("i")
            if (iconStatus && iconBtn) {
                iconStatus.className = ""
                iconStatus.classList.add(...iconBtn.classList)
            }

            Insert_Tema(texto)
            return
        }

        /* ====== 3.2) Efeito Sonoro (somente no nav correto) ====== */
        if (nav && nav.id === "SelectEfeitoSonoroOptions") {
            nav.querySelectorAll('#BtnSelectTheme').forEach(b => b.classList.remove("BtnThemeSelected"))
            btn.classList.add("BtnThemeSelected")
            localStorage.setItem("efeito_sonoro_chat", texto)
            return
        }
    }
})

function marcarOpcaoEfeitoSom(valor) {
    const navSom = document.getElementById("SelectEfeitoSonoroOptions")
    if (!navSom) return

    navSom.querySelectorAll('#BtnSelectTheme').forEach(b => {
        const texto = (b.querySelector("span")?.textContent || "").trim()
        b.classList.toggle("BtnThemeSelected", texto === valor)
    })
}

// 4) Upload
if (BtnToggleUpload) {
    BtnToggleUpload.onclick = () => {
        Upload.classList.toggle("UploadExpand")

        const icon = document.getElementById("ItagUpload")
        if (icon) SetClass(icon, "fi-sr-document-circle-arrow-up", "fi-sr-cross")
    }
}

// Exemplo no chat
if (BtnTextoExemploChat) {
    BtnTextoExemploChat.onclick = () => {
        Exemplo_Chat()
    }
}
