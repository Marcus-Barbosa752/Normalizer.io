import { Create_Card } from "../Javascript/Index.js"
import { Normalizar } from "../Utils/Arrumar.js"

const NomesEmbaralhados = [
    "M 3a@ r c u s 2V i n i 5c i u s   A s s i s #D e   J e s u s!   B a! r b o@ s a",
    "M 4a r c u s   V i 2n i c i u s   S i l@ v a",
    "A n 8a   P a u l a   M e 3n d e s",
    "J o 1ã o   V i t o r   S a n t o! s",
    "L u 7c a s   F e r r e i r@ a",
    "C a m 5i l a   R o c h a   L i 9m a",
    "R a 2f a e l   A l m e i d@ a",
    "B e a 6t r i z   C o s t a",
    "G u s 3t a v o   H e n r i q u e",
    "M a r i 4a   E d u a r d a",
    "T h i 8a g o   P e r e i r a",
    "L a u r 2a   S o u z a",
    "F e l i 7p e   A r a ú j o",
    "A l a n 9   R i b e i r o",
    "I s a b 3e l a   M a r t i n s",
    "D i e g o 5   O l i v e i r a",
    "V i n i 1c i u s   C a r v a l h o",
    "E d u a r 6d o   M o r a e s",
    "H e l e n 8a   B a r b o s a",
    "C a i o 2   A l v e s",
    "J ú l i 4a   G o m e s",
    "R e n a 7t a   S a l e s",
    "M a t e u 3s   F r a n ç a",
    "B r u n o 9   L e m o s",
    "L a r i s 5s a   F a r i a",
    "N a t a l i 1a   D u a r t e",
    "A n d r 6e   P i n h e i r o",
    "P a t r í 8c i a   M a c e d o",
    "S a m u e 2l   B a t i s t a",
    "Y a s m i 4n   R e i s",
    "L e o n a r 7d o   T e i x e i r a",
    "A m a n 3d a   C a m p o s",
    "K a u 9ã   R o c h a",
    "M u r i l 5o   N u n e s",
    "V a l e n 1t i n a   L o p e s",
    "E n z o 6   S i q u e i r a",
    "M i l e n 8a   C a r d o s o",
    "A r t h u 2r   F e r n a n d e s",
    "L í v i a 4   A z e v e d o",
    "N i c o l 7e   B o r g e s",
    "P e d r o 3   H e n r i q u e",
    "S o f i 9a   C o e l h o",
    "R a y a n 5   M e l o",
    "C l a r a 1   B r a g a",
    "I g o r 6   T a v a r e s",
    "D a n i e 8l a   C u n h a",
    "V i t ó r 2i a   A s s i s",
    "H e n r i 4q u e   B e l t r a n o",
    "A l e s s a 7n d r o   P a i v a",
    "T a i n 3á   R a m o s",
    "M a r c e 9l a   F o n s e c a"
]

const Exemplo_Chat = () => {
    const InputTextoTeste = NomesEmbaralhados[Math.floor(Math.random() * NomesEmbaralhados.length)]

    InsertValue.innerHTML = Create_Card("User", InputTextoTeste)
    const TimeOutSendText = setTimeout(() => {
        InsertValue.innerHTML += Create_Card("Bot", Normalizar(InputTextoTeste))
        clearTimeout(TimeOutSendText)
    }, 1000)

    document.getElementById("BtnCleanChat").style.display = "block"
}

export { Exemplo_Chat }
