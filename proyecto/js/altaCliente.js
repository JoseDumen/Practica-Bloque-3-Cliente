  // Aquí creamos las declaraciones pertinentes y que hagan falta, por emplo botones y ese tipo de cosas//	//Aquí se abre//

  
  
  frmRegistroUsuario.botonAceptarRegistroUsuario.addEventListener("click",validarAltaPersona,false);                   

  let oAjax = null;
  //Aquí se cierra//


 
$("#botonAceptarRegistroUsuario").click(procesoAltaPersona);

function procesoAltaPersona() 
{

    if (validarAltaPersona()) 
    {
        // Proceso

        var oPersona = {
            dni: frmRegistroUsuario.txtDni.value.trim(),
            nombre: frmRegistroUsuario.txtNombreUsuario.value.trim(),
            direccion: frmRegistroUsuario.txtDireccion.value.trim(),
            correo: frmRegistroUsuario.txtEmail.value.trim(),
            password: frmRegistroUsuario.txtPassword.value.trim(),
            tipoSuscripcion: frmRegistroUsuario.lstSuscripcion.value.trim()


        };

        var sPersona = JSON.stringify(oPersona);
        var sParametros = "datos=" + sPersona;

        $.post("./php/altaCliente.php", sParametros, procesoRespuestaAltaPersona, 'json');
    }

}

function procesoRespuestaAltaPersona(oDatos, sStatus, oXHR) {

    if (oDatos.error) {
        alert(oDatos.mensaje);
    } else {
        alert(oDatos.mensaje);
        frmRegistroUsuario.reset();
        $("#areaRegistroCliente").hide("normal");
    }
}



var DNIExiste = false;

function validarAltaPersona() 
{

    var bValido = true;
    var sError = "";
    let bPrimerErrorEncontrado = false;

            let oAreaMail = frmRegistroUsuario.txtEmail;
            let sMail = oAreaMail.value.trim();

            oExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

            if(!oExp.test(sMail)) 
            {
                bValido = false;
                oAreaMail.classList.add("error");
                sError += "\r\n -Debe introducir un correo correcto.";

                if(!bPrimerErrorEncontrado) 
                {
                    bPrimerErrorEncontrado = true;
                    oAreaMail.focus();
                }
            }			
            else 
            {
                oAreaMail.classList.remove("error");
            }

            let oAreaPassword = frmRegistroUsuario.txtPassword;
            let sPassword = oAreaPassword.value.trim();
        
                    oExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        
                    if(!oExp.test(sPassword)) 
                    {
                        bValido = false;
                        oAreaPassword.classList.add("error");
                        sError += "\r\n -Debe introducir una contraseña correcta.";
        
                        if(!bPrimerErrorEncontrado) 
                        {
                            bPrimerErrorEncontrado = true;
                            oAreaPassword.focus();
                        }
                    }			
                    else 
                    {
                        oAreaPassword.classList.remove("error");
                    }

            let oAreaCliente = frmRegistroUsuario.txtNombreUsuario;
            let sCliente = oAreaCliente.value.trim();
        
                    oExp = /^[a-zA-Z0-9\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]{3,15}$/;
        
                    if(!oExp.test(sCliente)) 
                    {
                        bValido = false;
                        oAreaCliente.classList.add("error");
                        sError += "\r\n -Debe introducir un nombre correcto.";
        
                        if(!bPrimerErrorEncontrado) 
                        {
                            bPrimerErrorEncontrado = true;
                            oAreaCliente.focus();
                        }
                    }			
                    else 
                    {
                        oAreaCliente.classList.remove("error");
                    }


            let oAreaDireccion = frmRegistroUsuario.txtDireccion;
            let sDireccion = oAreaDireccion.value.trim();

            oExp = /^[a-zA-Z0-9\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]{3,15}$/;

            if(!oExp.test(sDireccion)) 
            {
                bValido = false;
                oAreaDireccion.classList.add("error");
                sError += "\r\n -Debe introducir una dirección.";

                if(!bPrimerErrorEncontrado) 
                {
                    bPrimerErrorEncontrado = true;
                    oAreaDireccion.focus();
                }
            }			
            else 
            {
                oAreaDireccion.classList.remove("error");
            }
   

            let oAreaDni = frmRegistroUsuario.txtDni;
            let sDni = oAreaDni.value.trim();

            oExp = /^\d{7,8}[A-z]{1}$/;

            if(!oExp.test(sDni)) 
            {
                bValido = false;
                oAreaDni.classList.add("error");
                sError += "\r\n -Debe introducir un DNI.";

                if(!bPrimerErrorEncontrado) 
                {
                    bPrimerErrorEncontrado = true;
                    oAreaDni.focus();
                }
            }

            else 
            {
                oAreaDni.classList.remove("error");
            }
    
    //Validar que no existe el DNI
    $.ajax(
        {
        url: "./php/validarDNI.php",
        type: "GET",
        async: false,
        data: "DNI=" + frmRegistroUsuario.txtDni.value.trim(),
        dataType: "text",
        success: procesoRespuestaValidarDNI
    });

    if (DNIExiste == true) 
    {
        sError += "El DNI ya existe";
        bValido = false;
    }

    if (bValido == false) 
    {
        alert(sError);
    }

    if(!bValido)
    window.alert(sError);
    return bValido;


    function procesoRespuestaValidarDNI(sRespuesta) 
    {
        if (sRespuesta == "EXISTE") 
        {
            DNIExiste = true;
        } 
        
        else 
        {
            DNIExiste = false;
        }
    }

 

}

$("button#botonAceptarRegistroUsuario").show();





