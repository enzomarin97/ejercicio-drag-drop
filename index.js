const parrafos = document.querySelectorAll(".parrafo")
const secciones = document.querySelectorAll(".seccion")
const papelera = document.querySelectorAll(".papelera")

parrafos.forEach(parrafo =>{
    parrafo.addEventListener("dragstart", event =>{
        console.log(`Estoy arrastrando el parrafo: ${parrafo.innerText}`)
        parrafo.classList.add("dragging") //estoy agregando una nueva clase al argumento 'parrafo' (se usa para dejar la sombra al parrafo al empezar a arrastrar)
        event.dataTransfer.setData("id", parrafo.id) //"id" es el nombre que le doy a la propiedad que setee en el html (id="parrafo-N"). Despues se usará en un getData
        const elemento_fantasma = document.querySelector(".imagen-fantasma")
        event.dataTransfer.setDragImage(elemento_fantasma, 0, 0)
    })

    parrafo.addEventListener("dragend", ()=>{
        parrafo.classList.remove("dragging")//estoy borrando esta clase al argumento 'parrafo'
    })
})
secciones.forEach(seccion => {
    /* el Drop no estaba siendo ejecutado porque por defecto html no lo permite cuando se activa el dragover, espor eso que en la funcion anonima con argumento event agrego el metodo preventDefault() - ahora si se ejecuta el Drop en el EventListener */
    seccion.addEventListener("dragover", event =>{
        event.preventDefault()
        //dropeffect cambia el icono 
        event.dataTransfer.dropEffect = "move"
    })
    seccion.addEventListener("drop", event =>{
        console.log("Drop")
        //dataTransfer nos permite transm. info. por medio de los eventos drag & drop
        const id_parrafo = event.dataTransfer.getData("id")//este "id" es el nombre del string "id" que creé en el setData del parrafo
        const parrafo = document.getElementById(id_parrafo)
        seccion.appendChild(parrafo)
    })
})



papelera.forEach(papelera =>{
    papelera.addEventListener("drop", event =>{
        // event.preventDefault()
        const id_parrafo = event.dataTransfer.getData("id")
        const parrafo = document.getElementById(id_parrafo)
        // papelera.removeChild(parrafo)
        id_parrafo.parentNode.removeChild(id_parrafo)

        event.dataTransfer.dropEffect = "remove"
        console.log(`elemento ${parrafo.innerText} eliminado`)
    })
    /* no logré eliminar el elemento ...  */
})