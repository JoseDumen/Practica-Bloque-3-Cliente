"use strict";

frmInicioSesion.botonAceptarInicioSesion.addEventListener("click",iniciarSesion,false);                   
// frmInicioSesion.botonAceptarInicioSesion.addEventListener("click",recuperarCookiesCarrito(),false);

function iniciarSesion()
{
    let bCorrecto = true;
    let bErrores = false;
    let sMensajeError = "";
    let oUsuarioTemporal;

    let oAreaMail = frmInicioSesion.txtEmailInicio;
    let sMail = oAreaMail.value.trim();
    let oExp =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(!oExp.test(sMail)) 
    {
        bCorrecto = false;
        oAreaMail.classList.add("error");
        sMensajeError += "\r\n -Introduzca el Email correctamente.";

        if(!bErrores) 
        {
            bErrores = true;
            oAreaMail.focus();
        }
    }

    else 
    {
       //le quitamos la clase error
        oAreaMail.classList.remove("error");
        oUsuarioTemporal = buscarCliente(sMail);

        if(!oUsuarioTemporal) 
        {
            bCorrecto = false;
            oAreaMail.classList.add("error");
            sMensajeError += "\r\n Ese usuario no existe.";
    
            if(!bErrores) 
            {
                bErrores = true;
                oAreaMail.focus();
            }
        }

        else 
        {
            oAreaMail.classList.remove("error");
        }
    }

    let oAreaPass = frmInicioSesion.txtPasswordInicio;
    let sPass = oAreaPass.value;

    if(oUsuarioTemporal){
        if(!sPass || sPass != oUsuarioTemporal.password) 
        {
            bCorrecto = false;
            oAreaPass.classList.add("error");
            sMensajeError += "\r\n -Contraseña incorrecta.";

            if(!bErrores) 
            {
                bErrores = true;
                oAreaPass.focus();
            }
        }
            
            else 
            {
                oAreaPass.classList.remove("error");
            }
    }

        if(bCorrecto)
        {
            sMensajeError = "\r\n Inicio de Sesión Correctamente"; 
            oUsuarioLogueado = oUsuarioTemporal;   
            mostrarNavBar();
            mostrarArea("areaHome","formularios/areaHome.html","js/index.js");
            
            //Si se desea mantener la sesion iniciada el usuario entra en una cookie
            if( document.querySelector('#checkboxMantenerSesion').checked )
            {
                guardaUsuarioLogueado(oUsuarioLogueado);
            }
            mensaje(sMensajeError,5000);
        }
        else{
        mensaje(sMensajeError);   
    }
       

}



//Para guardar en cookie el usuario logueado 
function guardaUsuarioLogueado(oUsuarioTemporal)
{
    let sUsuarioTemporal = JSON.stringify(oUsuarioTemporal);
    localStorage.setItem("usuarioLogueado",sUsuarioTemporal);
}
