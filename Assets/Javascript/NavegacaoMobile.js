const BtnToggleMenuFloatMobile = document.getElementById("BtnToggleMenuFloatMobile")

const SpanUmToggleMenuFloatMobile = document.getElementById("SpanUmToggleMenuFloatMobile")
const SpanDoisToggleMenuFloatMobile = document.getElementById("SpanDoisToggleMenuFloatMobile")

BtnToggleMenuFloatMobile.onclick = () => {
    SpanUmToggleMenuFloatMobile.classList.toggle("ActiveSpanUmToggleMenuFloatMobile")
    SpanDoisToggleMenuFloatMobile.classList.toggle("ActiveSpanDoisToggleMenuFloatMobile")
}