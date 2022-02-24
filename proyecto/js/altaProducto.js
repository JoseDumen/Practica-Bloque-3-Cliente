//# sourceURL=altaProdcuto.js;

cargarDesplegableProductos();

 
frmAltaProducto.botonAceptarAltaProducto.addEventListener("click",altaProducto,false);                   


function cargarDesplegableProductos() 
{
    var oArrayUbicaciones = null;

    // Existe en almacenamiento local
    if (localStorage["producto"] != null) 
    {
        oArrayUbicaciones = JSON.parse(localStorage["producto"]);

        rellenaCombo(oArrayUbicaciones);
    } 
    
    else 
    {
        $.get('php/cargarProductos.php', null, tratarGetProducto, 'html'); 		//$.get puede ir con [json, xml, script, text o html]
    }
}



function rellenaCombo(oArrayUbicaciones) 
{
    $("#lstProducto").empty();

    $.each(oArrayUbicaciones, function(i, elemento) 
    {
        $('<option value="' + elemento.idProducto + '" >' + elemento.tipo + '</option>').appendTo("#lstProducto");

    });

}

function tratarGetProducto(oArrayUbicaciones, sStatus, oXHR) 
{

    rellenaCombo(oArrayUbicaciones);

    // Guardar en localStorage
    localStorage["producto"] = JSON.stringify(oArrayUbicaciones);
}






    
$("#botonAceptarAltaProducto").click(procesoAltaProducto); //Este boton manda la informacion a la base de datos y le da el alta

function procesoAltaProducto() 
{

    if (altaProducto()) 
    {
        // Proceso para altaTurismo con el uso del $.post Y recibe como parametro JSON

        var oProducto = 
        {
            idProducto: frmAltaProducto.txtIdProducto.value.trim(),
            nombre: frmAltaProducto.txtNombre.value.trim(),
            precio: frmAltaProducto.txtPrecio.value.trim(),
            stock: frmAltaProducto.txtStock.value.trim(),
            tipo: frmAltaProducto.lstProducto.value.trim(),
            personaje: frmAltaProducto.txtNombrePersonaje.value.trim(),
            tipoMuneco: frmAltaProducto.lstTipo.value.trim(),

        };

        var sProducto = JSON.stringify(oProducto);
        var sParametros = "datos=" + sProducto;

        $.post("php/altaProducto.php", sParametros, procesoRespuestaAltaProducto, 'json');
    }

}

function procesoRespuestaAltaProducto(oDatos, sStatus, oXHR) 
{

    if (oDatos.error) 
    {
        alert(oDatos.mensaje);
    } 
    else 
    {
        alert(oDatos.mensaje);
        frmAltaProducto.reset();
        $("#areaAltaProducto").hide("normal");
    }
}



function altaProducto() 
{
    
            let bValido = true;
            let sErrores = "";
            let bPrimerErrorEncontrado = false;


            let oAreaId = frmAltaProducto.txtIdProducto;
            let sId = oAreaId.value.trim();

            oExp = /^[a-zA-Z0-9\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]{3,15}$/;

            if(!oExp.test(sId)) 
            {
                bValido = false;
                oAreaId.classList.add("error");
                sErrores += "\r\n -Debe introducir un Id correcto.";

                if(!bPrimerErrorEncontrado) 
                {
                    bPrimerErrorEncontrado = true;
                    oAreaId.focus();
                }
            }			
            else 
            {
                oAreaId.classList.remove("error");
            }





            let oAreaProducto = frmAltaProducto.txtNombre;
            let sProducto = oAreaProducto.value.trim();

            oExp = /^[a-zA-Z0-9\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]{3,15}$/;

            if(!oExp.test(sProducto)) 
            {
                bValido = false;
                oAreaProducto.classList.add("error");
                sErrores += "\r\n -Debe introducir un nombre correcto.";

                if(!bPrimerErrorEncontrado) 
                {
                    bPrimerErrorEncontrado = true;
                    oAreaProducto.focus();
                }
            }			
            else 
            {
                oAreaProducto.classList.remove("error");
            }

            let oAreaPrecio = frmAltaProducto.txtPrecio;
            let sPrecio = oAreaPrecio.value.trim();
        
            oExp =  /^[0-9]{0,4}[,][0-9]{2}$/;
            if(!oExp.test(sPrecio)) 
            {
                bValido = false;
                oAreaPrecio.classList.add("error");
                sErrores += "\r -Debe introducir un precio correcto.";

                if(!bPrimerErrorEncontrado) 
                {
                    bPrimerErrorEncontrado = true;
                    oAreaPrecio.focus();
                }
            }

            else 
            {
                oAreaPrecio.classList.remove("error");
            }

            let oAreaStock = frmAltaProducto.txtStock;
            let sStcok = oAreaStock.value.trim();
            oExp =/^[0-10]{1,10}$/;

            if(!oExp.test(sStcok)) 
            {
                bValido = false;
                oAreaStock.classList.add("error");
                sErrores += "\r\n -Debe introducir un Número de Stock (entre 1-10).";

                if(!bPrimerErrorEncontrado) 
                {
                    bPrimerErrorEncontrado = true;
                    oAreaStock.focus();
                }
            }
                        
            else 
            {
                oAreaStock.classList.remove("error");
            }

            let oNombrePersonaje = frmAltaProducto.txtNombrePersonaje;
            let sNombrePersonaje = oNombrePersonaje.value.trim();
            oExp = /^[a-zA-Z0-9\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]{3,15}$/;

            if(!oExp.test(sNombrePersonaje)) 
            {
                bValido = false;
                oNombrePersonaje.classList.add("error");
                sErrores += "\r\n -Debe introducir un nombre correcto.";

                if(!bPrimerErrorEncontrado) 
                {
                    bPrimerErrorEncontrado = true;
                    oNombrePersonaje.focus();
                }
            }
                        
            else 
            {
                oNombrePersonaje.classList.remove("error");
            }

            if(!bValido)
            window.alert(sErrores);
            return bValido;

            
}

$("button#botonAceptarAltaProducto").show();

