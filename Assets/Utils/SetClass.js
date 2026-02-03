const SetClass = (Objeto, BackClass, NextClass) => {
    if (Objeto.classList.contains(BackClass)) {
        Objeto.classList.remove(BackClass)
        Objeto.classList.add(NextClass)
        return
    }

    Objeto.classList.remove(NextClass)
    Objeto.classList.add(BackClass)
}

export { SetClass }