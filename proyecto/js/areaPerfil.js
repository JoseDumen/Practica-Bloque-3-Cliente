"use strict";
$("#botonAceptarEdicionUsuario").click(procesarEdicion);
frmEditaUsuario.botonAceptarEdicionUsuario.setAttribute("disabled","true");
cargarDatosPerfil();


/*
 mostrarArea("areaRegistro");
    let oCabecera = document.querySelector("#areaRegistro").querySelector(".cabecera");
    oCabecera.textContent = "Perfil de "+oUsuarioLogueado.Nombre; 
        if(!document.querySelector("[name=botonModificarUsuario]")) {
            let botonModificar = document.createElement("INPUT");
            botonModificar.setAttribute("name","botonModificarUsuario");
            botonModificar.setAttribute("type","button");
            botonModificar.classList.add("btn","btn-primary","w-25");
            botonModificar.setAttribute("value","Actualizar");
    
            let botonBorrable = document.querySelector("[name = botonAceptarRegistroUsuario]");
            botonBorrable.before(botonModificar);
            botonBorrable.style.display = "none";
    
            cargarDatosPerfil();
            frmRegistroUsuario.querySelector("#areaConfirmaMail").remove();
            frmRegistroUsuario.txtEmail.setAttribute("disabled","true");
            botonModificar.addEventListener("click",modificarDatos,"false");
            botonModificar.setAttribute("disabled","true");
        }

    
    function cargarDatosPerfil() {  
        
        frmRegistroUsuario.txtEmail.value = oUsuarioLogueado.Correo;
        frmRegistroUsuario.txtEmail2.value = oUsuarioLogueado.Correo;
        frmRegistroUsuario.txtPassword.value = oUsuarioLogueado.password;
        frmRegistroUsuario.txtNombreUsuario.value = oUsuarioLogueado.Nombre;
        frmRegistroUsuario.txtDni.value = oUsuarioLogueado.Dni;
        frmRegistroUsuario.txtDireccion.value = oUsuarioLogueado.Direccion;
    
        let oInputs = frmRegistroUsuario.querySelectorAll("input");
        
        for(let i=0;i<oInputs.length;i++){
            oInputs[i].addEventListener("input",habilitarBtnModificar,false);
        }
        
    }
    
    function habilitarBtnModificar() { 
        document.querySelector("[name = botonModificarUsuario]").removeAttribute("disabled");
    }
    
    function modificarDatos() {
        if(validarDatos()) {
            let sPassConfirmación = prompt("Para actualizar introduzca su contraseña actual");
         if (sPassConfirmación == sPassConfirmación) {
         oUsuarioLogueado.Correo = frmRegistroUsuario.txtEmail.value;
         oUsuarioLogueado.password = frmRegistroUsuario.txtPassword.value;
         oUsuarioLogueado.Nombre = frmRegistroUsuario.txtNombreUsuario.value;
         oUsuarioLogueado.Dni = frmRegistroUsuario.txtDni.value;
         oUsuarioLogueado.Direccion = frmRegistroUsuario.txtDireccion.value;
         let sTipoSus = frmRegistroUsuario.radioSuscripcion.value;
         let bTipoSus;
         
         if(sTipoSus == "premium")
         bTipoSus = true;
         else
         bTipoSus = false;
     
         oUsuarioLogueado.tipoSuscripcion = bTipoSus;
         mostrarNavBar();
         mensaje("Perfil actualizado correctamente.");
     } 
     else {
         mensaje("Contraseña incorrecta.");
     }
        }
     }
    

*/

function habilitarBtnModificar() { 
    document.querySelector("#botonAceptarEdicionUsuario").removeAttribute("disabled");
}

function procesarEdicion() {

    if(validarDatosEdicion()) {
      
        let oDatos = {
        correo: frmEditaUsuario.txtEmailEd.value,
        nuevoPassword: frmEditaUsuario.txtPasswordEd.value,
        nombre: frmEditaUsuario.txtNombreUsuarioEd.value,
        dni: frmEditaUsuario.txtDniEd.value,
        direccion: frmEditaUsuario.txtDireccionEd.value,
        tipoSuscripcion: frmEditaUsuario.radioSuscripcionEd.value
        }

        $.post("php/editarPerfil.php",oDatos,function(respuesta){
            console.log(respuesta);
            if(respuesta.error==0) {
                oUsuarioLogueado = buscarCliente(oUsuarioLogueado.Correo);
                mensaje(respuesta.mensaje,5000);
                mostrarNavBar();
                if(localStorage.getItem("usuarioLogueado")) {
                    guardaUsuarioLogueado();
                }
            }
            else {
                mensaje(respuesta.mensaje);
            }
        },"json");

    }
}


function cargarDatosPerfil() {  
        
    frmEditaUsuario.txtEmailEd.value = oUsuarioLogueado.Correo;
    frmEditaUsuario.txtPasswordEd.value = oUsuarioLogueado.password;
    frmEditaUsuario.txtNombreUsuarioEd.value = oUsuarioLogueado.Nombre;
    frmEditaUsuario.txtDniEd.value = oUsuarioLogueado.Dni;
    frmEditaUsuario.txtDireccionEd.value = oUsuarioLogueado.Direccion;
    if(oUsuarioLogueado.tipoSuscripcion == 0)
    frmEditaUsuario.radioSuscripcionEd.value = "gratis";
    else
    frmEditaUsuario.radioSuscripcionEd.value = "premium";

    let oInputs = frmEditaUsuario.querySelectorAll("input");
        
    for(let i=0;i<oInputs.length;i++){
        oInputs[i].addEventListener("input",habilitarBtnModificar,false);
    }
}

function validarDatosEdicion() {  
    let bTodoOk = true;
    let bPrimerErrorEncontrado = false;
    let sMensajeError = "";



//contraseña
let oAreaPass = frmEditaUsuario.txtPasswordEd;
let sPass = oAreaPass.value.trim();
let oExp = /^[a-zA-Z0-9]{8,}$/;

if(!oExp.test(sPass)) {
    bTodoOk = false;
    oAreaPass.classList.add("error");
    sMensajeError += "\r\n -La contraseña debe estar compuesta por números y/o letras y tener al menos 8 caracteres.";

    if(!bPrimerErrorEncontrado) {
        bPrimerErrorEncontrado = true;
        oAreaPass.focus();
    }
}
else {
    oAreaPass.classList.remove("error");
}

//confirmación contraseña

let oAreaPass2 = frmEditaUsuario.txtPasswordEd2;
let sPass2 = oAreaPass2.value.trim();

if(!oAreaPass.classList.contains("error") && sPass2 != sPass) {
    bTodoOk = false;
    oAreaPass2.classList.add("error");
    sMensajeError += "\r\n -El password y su confirmación no coinciden.";

    if(!bPrimerErrorEncontrado) {
    bPrimerErrorEncontrado = true;
    oAreaPass2.focus();
    }
}
else {
    oAreaPass2.classList.remove("error");
}

//Nombre
let oAreaNombre = frmEditaUsuario.txtNombreUsuarioEd;
let sNombre = oAreaNombre.value.trim();
oExp = /^[a-zA-Z0-9\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]{5,15}$/;

if(!oExp.test(sNombre)) {
    bTodoOk = false;
    oAreaNombre.classList.add("error");
    sMensajeError += "\r -El nombre debe tener entre 5 y 15 caracteres.";

    if(!bPrimerErrorEncontrado) {
        bPrimerErrorEncontrado = true;
        oAreaNombre.focus();
    }
}
else {
    oAreaNombre.classList.remove("error");
}

//Dni

let oAreaDni =  frmEditaUsuario.txtDniEd;
let sDni = oAreaDni.value.trim();
oExp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;

if(!oExp.test(sDni)) {
    bTodoOk = false;
    oAreaDni.classList.add("error");
    sMensajeError += "\r\n -Debe introducir un DNI válido.";

    if(!bPrimerErrorEncontrado) {
        bPrimerErrorEncontrado = true;
        oAreaDni.focus();
    }
}
else {
    oAreaDni.classList.remove("error");
}

//Direccion
let oAreaDireccion = frmEditaUsuario.txtDireccionEd;
let sDireccion = oAreaDireccion.value.trim();

if(sDireccion == "") {
    bTodoOk = false;
    oAreaDireccion.classList.add("error");
    sMensajeError += "\r\n -Debe introducir una dirección.";
    if(!bPrimerErrorEncontrado) {
        bPrimerErrorEncontrado = true;
        oAreaDireccion.focus();
    } 
}
else {
    oAreaDireccion.classList.remove("error");
}

if(!bTodoOk)
mensaje(sMensajeError);

return bTodoOk;
}