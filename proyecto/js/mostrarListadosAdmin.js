"use strict";
mostrarProductosAdmin();
function mostrarProductosAdmin(){
        // Instanciar objeto Ajax
        var oAjax = instanciarXHR();

        //Configurar la llamada --> Asincrono por defecto
        oAjax.open("GET", encodeURI("./php/cargarTablaProductosAdmin.php"), false);
    
        //Asociar manejador de evento de la respuesta
        oAjax.addEventListener("readystatechange", procesoRespuestaCargarTablaProductosAdministrador, false);
    
        //Hacer la llamada
        oAjax.send(null); 
}

function procesoRespuestaCargarTablaProductosAdministrador(){
    let oAjax = this;

    // Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) {
        //console.log(oAjax.responseText);
        let oXML = oAjax.responseXML; // Recojo un objeto XML

        construirTablaProductosXMLAdministrador(oXML);
    }
}


function construirTablaProductosXMLAdministrador(oXML){
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
        let oH1 = document.createElement("H1");
        oH1.textContent = "Listado Productos";
    
        document.querySelector("#areaListadoAdmin").appendChild(oH1);
        document.querySelector("#areaListadoAdmin").appendChild(oTabla);


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