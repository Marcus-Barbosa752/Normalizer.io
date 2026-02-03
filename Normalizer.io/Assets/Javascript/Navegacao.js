import { SetClass } from "../Utils/SetClass.js"
import { Temas } from "./Tema.js"
import { Insert_Tema } from "../Utils/Utils.js"
import { Exemplo_Chat } from "./Exemplo.js"

const SelectTheme = document.getElementById("SelectTheme")
const ContainerTema = document.getElementById("ContainerTema")
const Upload = document.getElementById("Upload")

const IindicatoExpandTema = document.getElementById("IindicatoExpandTema")
const IStatusTemaIcon = document.getElementById("IStatusTemaIcon")

const BtnSelectTheme = document.querySelectorAll("#BtnSelectTheme")
const BtnToggleUpload = document.getElementById("BtnToggleUpload")
const BtnTextoExemploChat = document.getElementById("BtnTextoExemploChat")

SelectTheme.onclick = () => {
    ContainerTema.classList.toggle("Expand")
    IindicatoExpandTema = SetClass(IindicatoExpandTema, "fi-sr-caret-down", "fi-sr-caret-up")
}

document.addEventListener("DOMContentLoaded", () => {
    const temaSalvo = localStorage.getItem("tema_atual")

    if (temaSalvo && Temas[temaSalvo]) {
        Insert_Tema(temaSalvo, false)
    }
})

BtnSelectTheme.forEach(Btn => {
    Btn.onclick = () => {
        const Icon = Btn.querySelector("i")
        const Span = Btn.querySelector("span")

        BtnSelectTheme.forEach(b => b.classList.remove("BtnThemeSelected"))
        Btn.classList.add("BtnThemeSelected")

        IStatusTemaIcon.className = ""
        IStatusTemaIcon.classList.add(...Icon.classList)

        Insert_Tema(Span.textContent.trim())
    }
})

BtnToggleUpload.onclick = () => {
    Upload.classList.toggle("UploadExpand")
    const Icon = document.getElementById("ItagUpload")
    Icon = SetClass(Icon, "fi-sr-document-circle-arrow-up", "fi-sr-cross")
}

BtnTextoExemploChat.onclick = () => {
    Exemplo_Chat()
}