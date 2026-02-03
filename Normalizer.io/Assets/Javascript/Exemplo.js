import { Create_Card } from "../Javascript/Index.js"
import { Normalizar } from "../Utils/Arrumar.js"

const Exemplo_Chat = () => {
    const InputTextoTeste = "M 3a@ r c u s 2V i n i 5c i u s   A s s i s #D e   J e s u s!   B a! r b o@ s a"

    InsertValue.innerHTML = Create_Card("User", InputTextoTeste)
    const TimeOutSendText = setTimeout(() => {
        InsertValue.innerHTML += Create_Card("Bot", Normalizar(InputTextoTeste))
        clearTimeout(TimeOutSendText)
    }, 1000)

    document.getElementById("BtnCleanChat").style.display = "block"
}

export { Exemplo_Chat }