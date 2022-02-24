
 
let oFrmAltaProducto = document.querySelector("#formuMenuListados");
oFrmAltaProducto.listadoSelecionado.addEventListener("click", procesaXML)

var oAjaxListado = null;

function procesoListado()
{

    var seleccion= $('[name=formuMenuListados]').serialize();

    var sParametroGET = seleccion;

    var sURL = encodeURI("formularios/listados.php?");

    llamadaAjaxListado(sURL,sParametroGET);

}

function llamadaAjaxListado(sURL,sParametroGET)
{

    oAjaxListado = objetoXHR();
    console.log(sURL+sParametroGET);
    oAjaxListado.open("GET",sURL+sParametroGET,true);

    oAjaxListado.onreadystatechange = respuestaListado;

    oAjaxListado.send(null);
}

function respuestaListado()
{

    if(oAjaxListado.readyState == 4 && oAjaxListado.status ==200)	
    {

        var oXML = oAjaxListado.responseXML;
        console.log(oXML);
        procesaXML(oXML);
    }

}


function objetoXHR() 
{
    if (window.XMLHttpRequest) 
    {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) 
    {
        var versionesIE = new Array('Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP');
        for (var i = 0; i < versionesIE.length; i++) 
        {
            try 
            {
                return new ActiveXObject(versionesIE[i]);
            } 
            catch (errorControlado) {} //Capturamos el error,
        }
    }
    throw new Error("No se pudo crear el objeto XMLHttpRequest");
}


$("#listadoSelecionado").click(procesaXML); //Este boton manda la informacion a la base de datos y le da el alta

function procesaXML(oXML)
{

    if(oXML.getElementsByTagName("cliente").length > 0)
    {
        var oRespuestaXML = oXML.getElementsByTagName("cliente");
        $('<tr><th>DNI</th><th>Correo</th><th>Nombre</th><th>Direccion</th><th>Tipo Suscripcion</th><th>Password</th></tr>').appendTo(jqTabla);

        for(var i=0;i<oRespuestaXML.length;i++)
        {
            $('<tr>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('dni')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('correo')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('nombre')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('direccion')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('tipoSuscripcion')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('password')[0].textContent+'</td>' +
                '</tr>').appendTo(jqTabla);
        }
    }


    if(oXML.getElementsByTagName("producto").length > 0)
    {
        var oRespuestaXML = oXML.getElementsByTagName("producto");
        $('<tr><th>ID Producto</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Tipo</th><th>Propietario</th><th>Material</th><th>Personaje</th><th>Tipo Muñeco</th></tr>').appendTo(jqTabla);

        for(var i=0;i<oRespuestaXML.length;i++)
        {
            $('<tr>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('idProducto')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('nombre')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('precio')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('stock')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('tipo')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('propietario')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('material')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('personaje')[0].textContent+'</td>' +
                '<td>'+oRespuestaXML[i].getElementsByTagName('tipoMuneco')[0].textContent+'</td>' +

                '</tr>').appendTo(jqTabla);
        }
    }

    jqTabla.appendTo("#divFormMenuListados");


}

$("button#listadoSelecionado").show();
