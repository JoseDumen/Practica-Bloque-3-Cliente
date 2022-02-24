"use strict";
mostrarUsuariosAdmin();
function mostrarUsuariosAdmin(){
        // Instanciar objeto Ajax
        var oAjax = instanciarXHR();

        //Configurar la llamada --> Asincrono por defecto
        oAjax.open("GET", encodeURI("./php/cargarTablaUsuarios.php"), false);
    
        //Asociar manejador de evento de la respuesta
        oAjax.addEventListener("readystatechange", procesoRespuestaCargarTablaUsuariosAdministrador, false);
    
        //Hacer la llamada
        oAjax.send(null); 
}

function procesoRespuestaCargarTablaUsuariosAdministrador(){
    let oAjax = this;

    // Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) {
        //console.log(oAjax.responseText);
        let oXML = oAjax.responseXML; // Recojo un objeto XML

        construirTablaUsuariosXMLAdministrador(oXML);
    }
}


function construirTablaUsuariosXMLAdministrador(oXML){
    let cliente = oXML.querySelectorAll("cliente");
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
        oCelda.textContent = "DNI";
        oFila.appendChild(oCelda);
    
        oCelda = document.createElement("TH");
        oCelda.textContent = "Correo";
        oFila.appendChild(oCelda);
    
        oCelda = document.createElement("TH");
        oCelda.textContent = "Nombre";
        oFila.appendChild(oCelda);
    
    
        oCelda = document.createElement("TH");
        oCelda.textContent = "Direccion";
        oFila.appendChild(oCelda);
    
        oCelda = document.createElement("TH");
        oCelda.textContent = "Tipo Suscripcion";
        oFila.appendChild(oCelda);
    
        // Crear Cuerpo de la Tabla
        let oTBody = document.createElement("TBODY");
        for(let i = 0; i< cliente.length; i++){
                oFila = oTBody.insertRow(-1);
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = cliente[i].querySelector("dni").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = cliente[i].querySelector("correo").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = cliente[i].querySelector("nombre").textContent;

                oCelda = oFila.insertCell(-1);
                oCelda.textContent = cliente[i].querySelector("direccion").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = cliente[i].querySelector("tipoSuscripcion").textContent == 0 ? "Normal" : "Premium";

        }
        
        // Agregar el cuerpo a la tablaa
        oTabla.appendChild(oTBody);
        let oH1 = document.createElement("H1");
        oH1.textContent = "Listado Usuarios";
    
        document.querySelector("#areaListadoUsuariosAdmin").appendChild(oH1);
        document.querySelector("#areaListadoUsuariosAdmin").appendChild(oTabla);
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