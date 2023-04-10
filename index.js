const parrafos = document.querySelectorAll(".parrafo")
const secciones = document.querySelectorAll(".seccion")

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


/* -> No era necesario hacer el forEach()
papelera.forEach(papelera =>{
    
}) */
/* 
 * lo que funca es hacer 2 escuchadores, un dragover y un drop
 */

/********************************************************************************/
/* 
EL BENDITO BUG ERA QUE USABA querySelectorAll(), pero debia ir querySelector()
ME PARECE INEDITO QUE SOLO POR ESE DETALLE NO SERVIA LA PAPELERA
*/
/********************************************************************************/
const papelera = document.querySelector(".papelera")

papelera.addEventListener("dragover", event =>{
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
})

papelera.addEventListener("drop", event =>{
    const id_parrafo = event.dataTransfer.getData("id")
    /* toda esta idea que tuve era demasiado compleja para este ejercicio, la solucion era mas simple... */
    /* const parrafo = document.getElementById(id_parrafo)
    // papelera.removeChild(parrafo)
    id_parrafo.parentNode.removeChild(id_parrafo)*/
    document.getElementById(id_parrafo).remove()
    console.log(`elemento ${id_parrafo} eliminado`)
})
