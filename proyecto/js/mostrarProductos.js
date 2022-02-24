"use strict";
//Cargar Tabla de Productos

document.getElementById("navProducto").addEventListener("click", cargarTabla);
document.querySelector("#botonFiltrar").addEventListener("click", filtrarTabla);
document.querySelector("#areaProductos").addEventListener("click", seleccionarProducto);
document.querySelector("#botonLimpiarSeleccionados").addEventListener("click", cargarTabla);
document.getElementById("botonComprarSeleccionados").addEventListener("click", comprarProductosSeleccionados);

cargarTabla();


function cargarTabla(){
    //mostrarArea("areaProductos");
    
    let oTablaDesplegada = document.querySelector("#areaProductos table");
    if(oTablaDesplegada != null){
        oTablaDesplegada.remove();
    }


    // Instanciar objeto Ajax
    var oAjax = instanciarXHR();

    //Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", encodeURI("./php/cargarTablaProductosXML.php"), false);

    //Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", procesoRespuestaCargarTablaProductos, false);

    //Hacer la llamada
    oAjax.send(null); 
}


function instanciarXHR() {
    var xhttp = null;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xhttp;
}

function procesoRespuestaCargarTablaProductos(){
    let oAjax = this;

    // Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) {
        //console.log(oAjax.responseText);
        let oXML = oAjax.responseXML; // Recojo un objeto XML

        construirTablaProductosXML(oXML);
    }
}

function construirTablaProductosXML(oXML){
    let productos = oXML.querySelectorAll("producto");
        // Crear Tabla
        let oTabla = document.createElement("TABLE");
        oTabla.classList.add("table");
        oTabla.classList.add("table-striped");
        oTabla.classList.add("table-hover");
    
        // Crear Encabezado
        let oTHead = oTabla.createTHead();
    
        // Crear Fila 
        let oFila = oTHead.insertRow(-1);
    
        // Crear Celdas
        let oCelda = document.createElement("TH");
        oCelda.textContent = "Nombre";
        oFila.appendChild(oCelda);
    
        oCelda = document.createElement("TH");
        oCelda.textContent = "Precio";
        oFila.appendChild(oCelda);
    
        oCelda = document.createElement("TH");
        oCelda.textContent = "Stock";
        oFila.appendChild(oCelda);
    
    
        oCelda = document.createElement("TH");
        oCelda.textContent = "Personaje";
        oFila.appendChild(oCelda);
    
        oCelda = document.createElement("TH");
        oCelda.textContent = "Caracteristica";
        oFila.appendChild(oCelda);
    
        // Crear Cuerpo de la Tabla
        let oTBody = document.createElement("TBODY");
        for(let i = 0; i< productos.length; i++){
            if(productos[i].querySelector("propietario").textContent == ""){

                oFila = oTBody.insertRow(-1);
                oFila.dataset.tipo = productos[i].querySelector("idproducto").textContent;
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = productos[i].querySelector("nombre").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = productos[i].querySelector("precio").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = productos[i].querySelector("stock").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = productos[i].querySelector("personaje").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = productos[i].querySelector("tipoMuneco").textContent;
            } else {
                oFila = oTBody.insertRow(-1);
                oFila.dataset.tipo = productos[i].querySelector("idproducto").textContent
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = productos[i].querySelector("nombre").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = productos[i].querySelector("precio").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = productos[i].querySelector("stock").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = productos[i].querySelector("propietario").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = productos[i].querySelector("material").textContent;
            }
        }
        
        // Agregar el cuerpo a la tablaa
        oTabla.appendChild(oTBody);
    
        document.querySelector("#areaProductos").appendChild(oTabla);
}


function filtrarTabla(){
    let iValor = parseFloat(frmTablasProductos.txtPrecio.value.trim());
    let bAscendente = frmTablasProductos.radioPrecio_0.checked;
    let bDescendente = frmTablasProductos.radioPrecio_1.checked;
    
    let bTodos = frmTablasProductos.radioTipo_0.checked;
    let bMunecos = frmTablasProductos.radioTipo_1.checked;
    let bVaritas = frmTablasProductos.radioTipo_2.checked;

    // Parametros
    let sParametros = "valor=" + iValor;
    
    if(bAscendente){
        sParametros += "&orden=mayor";
    } else {
        sParametros += "&orden=menor";
    }
    if(bTodos){
        sParametros += "&tipo=todos";
    } else if(bMunecos){
        sParametros += "&tipo=munecos";
    } else {
        sParametros += "&tipo=varitas";
    }

    fetch(encodeURI("php/cargarTablaProductosFiltros.php?" + sParametros))
    .then(respuesta => respuesta.text())
    .then(productos =>  {
        let oTablaDesplegada = document.querySelector("#areaProductos table");
        if(oTablaDesplegada != null){
            oTablaDesplegada.remove();
        }
        let parser = new DOMParser();
        let xml = parser.parseFromString(productos, "application/xml");
        construirTablaProductosXML(xml);
    }
    );
}

function seleccionarProducto(oEvento){
    let oE = oEvento || window.event;

    if(oE.target.nodeName == "TD"){
        oE.target.parentElement.classList.toggle("seleccionado");
    }
}

function limpiarSeleccionados(){
    let oFilasSeleccionados = document.querySelectorAll(".seleccionado");

    for(let i = 0; i<oFilasSeleccionados.length; i++){
        oFilasSeleccionados[i].classList.toggle("seleccionado");
    }

}

function comprarProductosSeleccionados(){
    let oObjetosSeleccionados = document.querySelectorAll(".seleccionado");
    let oProducto;
    

    if(oUsuarioLogueado == null){
        alert("Debe iniciar sesión para poder comprar");
    } 
    else 
    {
        if(oObjetosSeleccionados.length == 0){
            alert("Debe seleccionar productos primero");
        } else {
            for(let i=0;i<oObjetosSeleccionados.length;i++){
                oProducto = { nombre:oObjetosSeleccionados[i].children[0].textContent,
                              precio:oObjetosSeleccionados[i].children[1].textContent,
                              stock:oObjetosSeleccionados[i].children[2].textContent,
                              personaje:oObjetosSeleccionados[i].children[3].textContent,
                              caracteristica:oObjetosSeleccionados[i].children[4].textContent,
                              idObjeto: oObjetosSeleccionados[i].dataset.tipo 

                            }
                aCarrito.push(oProducto);
            }

                for(let x = 0; x<oObjetosSeleccionados.length;x++){
                    oObjetosSeleccionados[x].remove();
                }
                actualizaCookieCarrito();
                mostrarNavBar();
                alert("Producto/s añadido al carrito");
        }        

        }

    }
