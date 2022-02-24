"use strict";
   
var tienda = new Tienda;
var oUsuarioLogueado = null;
var aCarrito = [];
var aUsuariosCarrito = [];
var nIndiceCarrito;

if(!localStorage.getItem("carrito"))
    localStorage.setItem("carrito",JSON.stringify([]));

if(localStorage.getItem("usuariosCarrito")) {
    aUsuariosCarrito = JSON.parse(localStorage.getItem("usuariosCarrito"));
}
else {
    localStorage.setItem("usuariosCarrito",aUsuariosCarrito);
}



let oXML = loadXMLDoc("productos.xml");
let oXMLAdmin = loadXMLDoc("productos.xml");
mostrarNavBar();
iniciarSesionUsuarioLogueado();
mostrarArea("areaHome","formularios/areaHome.html","js/index.js"); 

//Añadimos los manejadores de eventos

document.querySelector("#navProducto").addEventListener("click",function() {mostrarArea("areaProductos");},false);
document.querySelector("#navProductoLogueado").addEventListener("click",function() {mostrarArea("areaProductos");},false);
document.querySelector("#navProductoAdmin").addEventListener("click",function() {mostrarArea("areaAltaProducto","formularios/altaProducto.html","js/altaProducto.js");},false);

document.querySelector("#navRegistro").addEventListener("click",function() {mostrarArea("areaRegistroCliente","formularios/altaCliente.html","js/altaCliente.js");},false);
frmRegistroUsuario.botonAceptarRegistroUsuario.addEventListener("click",registroUsuario,false); 
document.querySelector("#navCerrarSesionLogueado").addEventListener("click",function(){desloguear(),false})
document.querySelector("#navCerrarSesionAdmin").addEventListener("click",function(){desloguear(),false})
//document.querySelector("#navListarUsuarios").addEventListener("click",function() {mostrarArea("areaListadoUsuarios");},false);

document.getElementById("navProducto").addEventListener("click", function(){mostrarArea("areaProductos","formularios/areaProductos.html","js/mostrarProductos.js")});
document.querySelector("#navProductoLogueado").addEventListener("click",function(){mostrarArea("areaProductos","formularios/areaProductos.html","js/mostrarProductos.js")});
document.querySelector("#navListadoAdminProducto").addEventListener("click",function(){mostrarArea("areaListadoAdmin","formularios/areaListadosAdmin.html", "js/mostrarListadosAdmin.js")});
document.querySelector("#navListarUsuarios").addEventListener("click",function() {mostrarArea("areaListadoUsuariosAdmin","formularios/areaListadoUsuariosAdmin.html", "js/mostrarUsuarios.js");});

document.querySelector("#navCarrito").addEventListener("click",function(){mostrarArea("areaCarrito","formularios/areaCarrito.html","js/areaCarrito.js")});
//document.getElementById("areaCarrito").addEventListener("click", seleccionarProducto);

//Fin manejadores de eventos


function mostrarArea(areaVisible, ubicacionHtml, ubicacionScript) {                     //CODIGO NUEVO MIGUEL
    
    // Oculto todos los formularios menos este
    $(".areaContenido:not(#"+areaVisible+")").hide("normal");

    if (!document.querySelector("#"+areaVisible)){
        $("#container").load(ubicacionHtml, function() {
            
            $("#"+areaVisible).show("normal");
            $.getScript(ubicacionScript);
        });

    } 
    
    else {
    
    $("#"+areaVisible).show("normal");
    }
}

function buscarCliente(email) {                     //CÓDIGO NUEVO MIGUEL

$.ajaxSetup({
    async: false
});
let oCliente;
$.getJSON('php/buscarCliente.php?email='+email, function( arrCliente ) {
    if(arrCliente) {
        oCliente = new Cliente(arrCliente.nombre,arrCliente.correo,arrCliente.dni,arrCliente.direccion,arrCliente.tipoSuscripcion,arrCliente.password);           
     }
     else 
     oCliente =  false;

     
  });
  $.ajaxSetup({
    async: true
});
  return oCliente;
}

function ocultarNavBar() {
   let listaNavs = document.getElementById("containerNavs").querySelectorAll(".row");
   for(let barra of listaNavs) {
       barra.style.display = "none";
   }
}

function mostrarNavBar() {     
    ocultarNavBar();

    if(!oUsuarioLogueado) 
        document.querySelector("#navBarNoLogueado").style.display = "flex";
    
    else {

        if(document.querySelector("#navNombre"))
            document.querySelector("#navNombre").remove();

        let oTexto = document.createElement("a");
        oTexto.classList.add("nav-link");
        oTexto.style.cursor = "default";
        oTexto.style.userSelect = "none";
        oTexto.setAttribute("id","navNombre");

        if(oUsuarioLogueado.Correo=="admin@hotmail.com") {   
            oTexto.textContent = "ADMIN";
            document.querySelector("#navCerrarSesionAdmin").before(oTexto);
            document.querySelector("#navBarAdmin").style.display = "flex";
        }
         else {
            oTexto.textContent = oUsuarioLogueado.Nombre;
            document.querySelector("#navPerfilLogueado").before(oTexto); 
            document.querySelector("#navBarLogueado").style.display = "flex";
            document.querySelector("#navCarrito").textContent = "Carrito("+ aCarrito.length +")";
        }
    }
}

function validarDatos() {  
    let bTodoOk = true;
    let bPrimerErrorEncontrado = false;
    let sMensajeError = "";

    //email
    let oAreaMail = frmRegistroUsuario.txtEmail;
    let sMail = oAreaMail.value.trim();
    let oExp =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(!oExp.test(sMail)) {
        bTodoOk = false;
        oAreaMail.classList.add("error");
        sMensajeError += "\r\n -El e-mail no tiene un formato correcto.";

        if(!bPrimerErrorEncontrado) {
            bPrimerErrorEncontrado = true;
            oAreaMail.focus();
        }

    }
    else if(!oUsuarioLogueado){
        let bExiste = tienda.buscarCliente(sMail);

        if(bExiste) {
            bTodoOk = false;
            oAreaMail.classList.add("error");
            sMensajeError += "\r\n -Ese usuario ya existe.";
    
            if(!bPrimerErrorEncontrado) {
                bPrimerErrorEncontrado = true;
                oAreaMail.focus();
            }
        }
        else {
        oAreaMail.classList.remove("error");
        }
    }

//confirmacion email 
if(!oUsuarioLogueado) {
let oAreaMail2 = frmRegistroUsuario.txtEmail2;
let sMail2 = oAreaMail2.value.trim();

if(!oAreaMail.classList.contains("error") && sMail2 != sMail ) {
    bTodoOk = false;
    oAreaMail2.classList.add("error");
    sMensajeError += "\r\n -El e-mail y su confirmación no coinciden.";

    if(!bPrimerErrorEncontrado) {
        bPrimerErrorEncontrado = true;
        oAreaMail2.focus();
    }
}
else {
    oAreaMail2.classList.remove("error");
}
}

//contraseña
let oAreaPass = frmRegistroUsuario.txtPassword;
let sPass = oAreaPass.value.trim();
oExp = /^[a-zA-Z0-9]{8,}$/;

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

let oAreaPass2 = frmRegistroUsuario.txtPassword2;
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
let oAreaNombre = frmRegistroUsuario.txtNombreUsuario;
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

let oAreaDni = frmRegistroUsuario.txtDni;
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
let oAreaDireccion = frmRegistroUsuario.txtDireccion;
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

function registroUsuario() { 

if(validarDatos()){

    let sMail = frmRegistroUsuario.txtEmail.value;
    let sPass = frmRegistroUsuario.txtPassword.value;
    let sNombre = frmRegistroUsuario.txtNombreUsuario.value;
    let sDni = frmRegistroUsuario.txtDni.value;
    let sDireccion = frmRegistroUsuario.txtDireccion.value;
    
    let sTipoSus = frmRegistroUsuario.radioSuscripcion.value;
    let bTipoSus;
    
    if(sTipoSus == "premium")
    bTipoSus = true;
    else
    bTipoSus = false;

    tienda.altaNuevoCliente(sNombre,sMail,sDni,sDireccion,bTipoSus,sPass)
    mensaje("Usuario registrado correctamente. ¡Bienvenido/a!");   
}

}


function desloguear() {
    oUsuarioLogueado = null;
    localStorage.removeItem("usuarioLogueado"); 
    location.reload();
}


function mensaje(cadena,tiempo) {
let oMensaje = document.querySelector("#mensaje");
oMensaje.textContent = cadena;
oMensaje.style.display = "block";
    if(tiempo) {
        setTimeout(ocultarMensaje,tiempo);
    }
}

function ocultarMensaje() {
    document.querySelector("#mensaje").style.display="none";
}


    
    

//Para recuperar el carrito del usuario
function recuperarCookiesCarrito()
    
{
let cookieCarrito;
    if(localStorage.getItem("carrito")) {
        let sCookieCarrito = localStorage.getItem("carrito");
        if (sCookieCarrito.length > 0)
        {
            cookieCarrito = JSON.parse(sCookieCarrito);
            aCarrito = cookieCarrito[nIndiceCarrito];
        }
    }
}

//Actualizar la cookie del carrito cada vez que se añada o elimine un producto del carrito
function actualizaCookieCarrito()
{
    let sCookieCarrito = localStorage.getItem("carrito");
    let cookieCarrito;
    
    if (sCookieCarrito.length > 0)
    {
        cookieCarrito = JSON.parse(sCookieCarrito);
        cookieCarrito[nIndiceCarrito]=aCarrito;
    }
    sCookieCarrito = JSON.stringify(cookieCarrito);
    localStorage.setItem("carrito",sCookieCarrito);
}

function comprobarUsuariosCarrito() { 
    if(aUsuariosCarrito.indexOf(oUsuarioLogueado.Correo)==-1){
    aUsuariosCarrito.push(oUsuarioLogueado.Correo);

    guardarUsuariosCarrito();
    nuevoCarrito();
    }
    nIndiceCarrito = aUsuariosCarrito.indexOf(oUsuarioLogueado.Correo);
}

function nuevoCarrito() {
    let arrlistaCarritos = JSON.parse(localStorage.getItem("carrito"));
    arrlistaCarritos.push(aCarrito);
    localStorage.setItem("carrito",JSON.stringify(arrlistaCarritos));
}

function guardarUsuariosCarrito() {
    localStorage.setItem("usuariosCarrito",JSON.stringify(aUsuariosCarrito));
}

//Para guardar en cookie el usuario logueado 
function guardaUsuarioLogueado(oUsuarioTemporal)
{
    let sUsuarioTemporal = JSON.stringify(oUsuarioTemporal);
    setCookie("usuarioLogueado",sUsuarioTemporal,30);
}



//Si hay cookie de un usuario para mantener la sesion iniciada

function iniciarSesionUsuarioLogueado()
{
 
  let usuarioRegistradoEmail;
    let cookieUsuarioLogueado = localStorage.getItem("usuarioLogueado");                            //CAMBIO DE CÓDIGO AQUÍ MIGUEL
 if(cookieUsuarioLogueado) { 
    if (cookieUsuarioLogueado.length > 0)
    {
        
        let oUsuarioInicioSesion = JSON.parse(cookieUsuarioLogueado);

        //Busco si hay un usuario con ese mismo email y lo saco a una variable
        usuarioRegistradoEmail = buscarCliente(oUsuarioInicioSesion.Correo);

        //Lo comparo para ver si existe el usuario en el registro de usuario
        if (usuarioRegistradoEmail.password == oUsuarioInicioSesion.password)
        {
            //Usuario se inicia
            oUsuarioLogueado = oUsuarioInicioSesion;
   

           comprobarUsuariosCarrito();

            
            recuperarCookiesCarrito();
            mostrarNavBar();
        }
    }
    }

}

//Cargar Tabla de Productos
function cargarTabla(){
    mostrarArea("areaProductos");
    
    let oTablaDesplegada = document.querySelector("#areaProductos table");
    if(oTablaDesplegada != null){
        oTablaDesplegada.remove();
    }

    let oMunecos = oXML.querySelectorAll("muneco producto");
    let oVaritas = oXML.querySelectorAll("varita producto");

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
    for(let i = 0; i< oMunecos.length; i++){
        oFila = oTBody.insertRow(-1);
        oFila.dataset.tipo = "muneco";
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oMunecos[i].querySelector("nombre").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oMunecos[i].querySelector("precio").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oMunecos[i].querySelector("stock").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oMunecos[i].querySelector("personaje").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oMunecos[i].querySelector("tipo").textContent;
    }

    for(let i = 0; i< oVaritas.length; i++){
        oFila = oTBody.insertRow(-1);
        oFila.dataset.tipo = "varita";
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oVaritas[i].querySelector("nombre").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oVaritas[i].querySelector("precio").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oVaritas[i].querySelector("stock").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oVaritas[i].querySelector("propietario").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oVaritas[i].querySelector("material").textContent;
    }
    
    // Agregar el cuerpo a la tablaa
    oTabla.appendChild(oTBody);

    document.getElementById("areaProductos").appendChild(oTabla);
    
}

function filtrarTabla(){
    cargarTabla();
    let iValor = parseFloat(frmTablasProductos.txtPrecio.value.trim());
    let bAscendente = frmTablasProductos.radioPrecio_0.checked;
    let bDescendente = frmTablasProductos.radioPrecio_1.checked;
    
    let bTodos = frmTablasProductos.radioTipo_0.checked;
    let bMunecos = frmTablasProductos.radioTipo_1.checked;
    let bVaritas = frmTablasProductos.radioTipo_2.checked;

    let oObjetosFiltradosTipo = [];
    let oObjetosEliminar = [];

    let oTabla = document.querySelector("#areaProductos table");
    let iNumeroRegistros = oTabla.children[1].children.length;


    if(iValor >0){
        if(bTodos){
            if(bAscendente){
                for(let i = 0; i< iNumeroRegistros;i++){
                    if(parseFloat(oTabla.children[1].children[i].children[1].textContent) < iValor){
                        oObjetosEliminar.push(oTabla.children[1].children[i]);
                    }
                }
            } 
            
            if(bDescendente){
                for(let i = 0; i< iNumeroRegistros;i++){
                    if(parseFloat(oTabla.children[1].children[i].children[1].textContent) > iValor){
                        oObjetosEliminar.push(oTabla.children[1].children[i]);
                    }
                }
            }
    
            for(let x = 0; x < oObjetosEliminar.length; x++){
                oObjetosEliminar[x].remove();
            } 
            
        } else if(bMunecos){
            for(let i = 0; i< iNumeroRegistros; i++){
            if(oTabla.children[1].children[i].dataset.tipo == "muneco"){
                oObjetosFiltradosTipo.push(oTabla.children[1].children[i]);
                }
            }
    
            oTabla.children[1].remove();
    
            let oTBody = document.createElement("TBODY");
            let oMunecos = oXML.querySelectorAll("muneco producto");
    
            if(bAscendente){
            for(let i = 0; i< oMunecos.length; i++){
                if(parseFloat(oMunecos[i].querySelector("precio").textContent) > iValor){
                let oFila = oTBody.insertRow(-1);
                oFila.dataset.tipo = "muneco";
                let oCelda = oFila.insertCell(-1);
                oCelda.textContent = oMunecos[i].querySelector("nombre").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = oMunecos[i].querySelector("precio").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = oMunecos[i].querySelector("stock").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = oMunecos[i].querySelector("personaje").textContent;
        
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = oMunecos[i].querySelector("tipo").textContent;                
                }
                
            }
    
            // Agregar el cuerpo a la tablaa
            oTabla.appendChild(oTBody);
        
            document.getElementById("areaProductos").appendChild(oTabla);
    
            } else {
                for(let i = 0; i< oMunecos.length; i++){
                    if(parseFloat(oMunecos[i].querySelector("precio").textContent) < iValor){
                    let oFila = oTBody.insertRow(-1);
                    oFila.dataset.tipo = "muneco";
                    let oCelda = oFila.insertCell(-1);
                    oCelda.textContent = oMunecos[i].querySelector("nombre").textContent;
            
                    oCelda = oFila.insertCell(-1);
                    oCelda.textContent = oMunecos[i].querySelector("precio").textContent;
            
                    oCelda = oFila.insertCell(-1);
                    oCelda.textContent = oMunecos[i].querySelector("stock").textContent;
            
                    oCelda = oFila.insertCell(-1);
                    oCelda.textContent = oMunecos[i].querySelector("personaje").textContent;
            
                    oCelda = oFila.insertCell(-1);
                    oCelda.textContent = oMunecos[i].querySelector("tipo").textContent;                
                    }
                    
                }
        
                // Agregar el cuerpo a la tablaa
                oTabla.appendChild(oTBody);
            
                document.getElementById("areaProductos").appendChild(oTabla);  
            }
    
            } else {
                for(let i = 0; i< iNumeroRegistros; i++){
                if(oTabla.children[1].children[i].dataset.tipo == "varita"){
                    oObjetosFiltradosTipo.push(oTabla.children[1].children[i]);
                    }
                }        
        
                oTabla.children[1].remove();        
        
                let oTBody = document.createElement("TBODY");
                let oVaritas = oXML.querySelectorAll("varita producto");
        
                if(bAscendente){
                for(let i = 0; i< oVaritas.length; i++){
                    if(parseFloat(oVaritas[i].querySelector("precio").textContent) > iValor){
                    let oFila = oTBody.insertRow(-1);
                    oFila.dataset.tipo = "varita";
                    let oCelda = oFila.insertCell(-1);
                    oCelda.textContent = oVaritas[i].querySelector("nombre").textContent;
            
                    oCelda = oFila.insertCell(-1);
                    oCelda.textContent = oVaritas[i].querySelector("precio").textContent;
            
                    oCelda = oFila.insertCell(-1);
                    oCelda.textContent = oVaritas[i].querySelector("stock").textContent;
            
                    oCelda = oFila.insertCell(-1);
                    oCelda.textContent = oVaritas[i].querySelector("propietario").textContent;
            
                    oCelda = oFila.insertCell(-1);
                    oCelda.textContent = oVaritas[i].querySelector("material").textContent;                
                    }
                    
                }
        
                // Agregar el cuerpo a la tablaa
                oTabla.appendChild(oTBody);
            
                document.getElementById("areaProductos").appendChild(oTabla);
        
                } else {
                    for(let i = 0; i< oVaritas.length; i++){
                        if(parseFloat(oVaritas[i].querySelector("precio").textContent) < iValor){
                        let oFila = oTBody.insertRow(-1);
                        oFila.dataset.tipo = "varita";
                        let oCelda = oFila.insertCell(-1);
                        oCelda.textContent = oVaritas[i].querySelector("nombre").textContent;
                
                        oCelda = oFila.insertCell(-1);
                        oCelda.textContent = oVaritas[i].querySelector("precio").textContent;
                
                        oCelda = oFila.insertCell(-1);
                        oCelda.textContent = oVaritas[i].querySelector("stock").textContent;
                
                        oCelda = oFila.insertCell(-1);
                        oCelda.textContent = oVaritas[i].querySelector("propietario").textContent;
                
                        oCelda = oFila.insertCell(-1);
                        oCelda.textContent = oVaritas[i].querySelector("material").textContent;                
                        }
                        
                    }
            
                    // Agregar el cuerpo a la tablaa
                    oTabla.appendChild(oTBody);
                
                    document.getElementById("areaProductos").appendChild(oTabla);  
                }
            }
    }
    
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

//Devuelve un objeto oTabla con la tabla de listar usuarios pintada en su interior
function pintaTablaListarUsuarios()
{
    //Creo la tabla con bordes
    let oTabla = document.createElement("TABLE");
    oTabla.classList.add("table");
    oTabla.classList.add("table-striped");
    oTabla.classList.add("table-hover");

    //Recorro la tabla de los clientes insertando los datos en el "body" de la tabla
    for(let cliente of tienda.arrClientes)
    {
        let usuario = cliente;
        let oFila = oTabla.insertRow();

        let sDato = usuario.Nombre;
        let oDivTabla = oFila.insertCell();
        oDivTabla.textContent = sDato;

        sDato = usuario.Correo;
        oDivTabla = oFila.insertCell();
        oDivTabla.textContent = sDato;

        sDato = usuario.Dni;
        oDivTabla = oFila.insertCell();
        oDivTabla.textContent = sDato;

        sDato = usuario.Direccion;
        oDivTabla = oFila.insertCell();
        oDivTabla.textContent = sDato;

        sDato = usuario.tipoSuscripcion;

        let sDatoTabla;
        if(sDato)
            sDatoTabla = "Premium";
        else
            sDatoTabla = "Standard";
        oDivTabla = oFila.insertCell();
        oDivTabla.textContent = sDatoTabla;
        
    }

    //Pinto el Encabezado de la tabla
    let oEncabezado = oTabla.createTHead();
    let oFilaEncabezado = oEncabezado.insertRow();

    let oDivNombre = document.createElement("TH");
    oDivNombre.textContent = "Nombre";
    oFilaEncabezado.appendChild(oDivNombre);

    let oDivCorreo = document.createElement("TH");
    oDivCorreo.textContent = "Correo";
    oFilaEncabezado.appendChild(oDivCorreo);
    
    let oDivDNI = document.createElement("TH");
    oDivDNI.textContent = "DNI";
    oFilaEncabezado.appendChild(oDivDNI);

    let oDivDireccion = document.createElement("TH");
    oDivDireccion.textContent = "Direccion";
    oFilaEncabezado.appendChild(oDivDireccion);

    let oDivTipoSubscripcion = document.createElement("TH");
    oDivTipoSubscripcion.textContent = "Tipo de Subscripción";
    oFilaEncabezado.appendChild(oDivTipoSubscripcion);
    
    return oTabla;
}




function cargarTablaProductosAdmin()
{


let oTablaDesplegada = document.querySelector("#areaProductosAdmin table");
    if(oTablaDesplegada != null)
    {
        oTablaDesplegada.remove();
    }

    let oMunecos = oXMLAdmin.querySelectorAll("muneco producto");
    let oVaritas = oXMLAdmin.querySelectorAll("varita producto");

    //crear tabla//
    let oTabla = document.createElement("TABLE");
    oTabla.classList.add("table");
    oTabla.classList.add("table-striped");
    oTabla.classList.add("table-hover");

    //crear encabezado/
    let oTHead = oTabla.createTHead();

    //crear fila//
    let oFila = oTHead.insertRow(-1);

    //crear celdas//
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

    //cuerpo de la Tabla//
    let oTBody = document.createElement("TBODY");
    for(let i = 0; i< oMunecos.length; i++)
    {
        oFila = oTBody.insertRow(-1);
        oFila.dataset.tipo = "muneco";
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oMunecos[i].querySelector("nombre").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oMunecos[i].querySelector("precio").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oMunecos[i].querySelector("stock").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oMunecos[i].querySelector("personaje").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oMunecos[i].querySelector("tipo").textContent;
    }

    for(let i = 0; i< oVaritas.length; i++)
    {
        oFila = oTBody.insertRow(-1);
        oFila.dataset.tipo = "varita";
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oVaritas[i].querySelector("nombre").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oVaritas[i].querySelector("precio").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oVaritas[i].querySelector("stock").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oVaritas[i].querySelector("propietario").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oVaritas[i].querySelector("material").textContent;
    }
    
    // Agregar el cuerpo a la tablaa
    oTabla.appendChild(oTBody);

return oTabla;

}


function seleccionarProductoAdmin(oEvento)
{
    let oE = oEvento || window.event;

    if(oE.target.nodeName == "TD"){
        oE.target.parentElement.classList.toggle("seleccionado");
    }
}
