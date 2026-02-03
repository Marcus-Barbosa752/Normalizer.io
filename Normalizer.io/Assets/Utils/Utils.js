import { Temas } from "../Javascript/Tema.js"

const SetColorById = (Ids, Color) => {
    Ids.forEach(id => {
        const El = document.getElementById(id)
        if (El) El.style.color = Color
    })
}

const SetColorBySelector = (Selectors, Color) => {
    Selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.style.color = Color)
    })
}

const Insert_Tema = (Tema, Salvar = true) => {
    const Config = Temas[Tema]

    if (!Config) {
        console.warn(`Tema inválido: ${Tema}`)
        return
    }

    document.body.style.background = Config.Background

    // Elementos por ID
    SetColorById([
        "SpanNomeLogo",
        "IStatusTemaIcon",
        "IindicatoExpandTema",
        "BtnHistorico",
        "H4TitleChat",
        "H3SubTitleChat",
        "H4MensagemChat"
    ], Config.Color)

    // Elementos por Selector
    SetColorBySelector([
        "#IgetClassName",
        "#SpanGetClassName"
    ], Config.Color)

    // Salvar tema
    if (Salvar) {
        localStorage.setItem("tema_atual", Tema)
    }
}

export { Insert_Tema }