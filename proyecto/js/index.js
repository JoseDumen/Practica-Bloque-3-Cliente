document.querySelector("#navHome").addEventListener("click",function() {mostrarArea("areaHome","formularios/areaHome.html","js/index.js");},false);                                       
document.querySelector("#navHomeLogueado").addEventListener("click",function() {mostrarArea("areaHome","formularios/areaHome.html","js/index.js");},false);                                       
document.querySelector("#navHomeAdmin").addEventListener("click",function() {mostrarArea("areaHome","formularios/areaHome.html","js/index.js");},false);
document.querySelector("#navIniciarSesion").addEventListener("click",function() {mostrarArea("areaIniciarSesion","formularios/iniciarSesion.html","js/iniciarSesion.js");},false); 
document.querySelector("#navPerfilLogueado").addEventListener("click",function(){mostrarArea("areaPerfil","formularios/areaPerfil.html","js/areaPerfil.js");},false);
//<!--Esto es la creación del funtion para el Menu( tanto para el alta de Clientes, como para los listados --!><!--Aquí se abre--!>

$(function() 
{
    $("#menu").menu();

     
     $("#mnuAltaCliente").click(function() 
     { 
         alert("Alta de Cliente");  $("#divfrmAltaCliente").show(); $("#divfrmListadoTurismo").hide();
         cargarFrmAltaPersona();
    });

     $("#mnuListadoClientes").click(function() 
     { 
         alert("Listados de Clientes");  $("#divfrmAltaCliente").hide(); $("#divfrmListadoTurismo").show();
     });


    $("#listadoMarcas").hide();
    $("#divfrmListadoTurismo").hide();
    $("#divfrmAltaCliente").hide();

});
//<!--Aquí se cierra--!>

function cargarFrmAltaPersona() 
{
    // Oculto todos los formularios menos este
    $("#formularios div:not('#divfrmAltaCliente')").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#divfrmAltaCliente').size() == 0) 
    {
        $("#formularios").load("formularios/altaCliente.html",
            function() 
            {
                $.getScript("js/altaCliente.js");
            });

    } 
    else 
    {
        // Lo muestro si está oculto
        $('#divfrmAltaCliente').show("normal");
    }
}


