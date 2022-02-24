mostrarCarrito();
document.querySelector("#areaCarrito").addEventListener("click", seleccionarProducto);

function mostrarCarrito() {
    
    if(document.querySelector("#areaCarrito").querySelector("table"))
    document.querySelector("#areaCarrito").querySelector("table").remove();

    if(document.querySelector("#areaCarrito").querySelector(".h2"))
    document.querySelector("#areaCarrito").querySelector(".h2").remove();

    let precioTotal = 0;
    let oTabla = document.createElement("table");
    oTabla.classList.add("table");
    let oCabecera = oTabla.createTHead();
    let oLineaCabecera = oCabecera.insertRow();

    let oCeldaCabNombre = document.createElement("th");
    oCeldaCabNombre.textContent = "Nombre";

    let oCeldaCabPrecio = document.createElement("th");
    oCeldaCabPrecio.textContent = "Precio";

    let oCeldaCabStock = document.createElement("th");
    oCeldaCabStock.textContent = "Stock";

    let oCeldaCabPersonaje = document.createElement("th");
    oCeldaCabPersonaje.textContent = "Personaje";

    let oCeldaCabCaracteristica = document.createElement("th");
    oCeldaCabCaracteristica.textContent = "Característica";
    
    oLineaCabecera.appendChild(oCeldaCabNombre);
    oLineaCabecera.appendChild(oCeldaCabPrecio);
    oLineaCabecera.appendChild(oCeldaCabStock);
    oLineaCabecera.appendChild(oCeldaCabPersonaje);
    oLineaCabecera.appendChild(oCeldaCabCaracteristica);

    for(let producto of aCarrito) {
    
    let oLinea = oTabla.insertRow();
    oLinea.classList.add("lineaproducto");
    oLinea.dataset.tipo = producto.idObjeto;

    let oCeldaNombre = oLinea.insertCell();
    oCeldaNombre.textContent = producto.nombre;

    let oCeldaPrecio = oLinea.insertCell();
    oCeldaPrecio.textContent = producto.precio;
    precioTotal = precioTotal + parseFloat(producto.precio);

    let oCeldaStock = oLinea.insertCell();
    oCeldaStock.textContent = producto.stock;

    let oCeldaPersonaje = oLinea.insertCell();
    oCeldaPersonaje.textContent = producto.personaje;

    let oCeldaCaracteristica = oLinea.insertCell();
    oCeldaCaracteristica.textContent = producto.caracteristica;

    }

    let oPiePrecio = oTabla.createTFoot();
    let oLineaPrecioT = oPiePrecio.insertRow();
    let oCeldaPieTexto = document.createElement("th");
    oCeldaPieTexto.textContent = "Precio Total";
    let oCeldaPieTotal = document.createElement("th");
    oCeldaPieTotal.textContent = precioTotal.toFixed(2);

    oLineaPrecioT.appendChild(oCeldaPieTexto);
    oLineaPrecioT.appendChild(oCeldaPieTotal);
    oCeldaPieTexto.setAttribute("colspan","4");
    

    if(oTabla.querySelectorAll("tr").length>2) {
    document.querySelector("#areaCarrito").appendChild(oTabla);
    crearBotonesCarrito();
    }
    else {
        let oMensaje = document.createElement("div");
        oMensaje.classList.add("h2");;
        oMensaje.textContent = "No hay productos en el carrito."
        document.querySelector("#areaCarrito").appendChild(oMensaje);
    }
    mostrarArea("areaCarrito");
}

function crearBotonesCarrito() {
    if(!document.querySelector("#areaCarrito").querySelector("#btnCarritoBorrar")) {
    let oBotonBorrar = document.createElement("button");
    oBotonBorrar.classList.add("btn");
    oBotonBorrar.classList.add("btn-primary");
    oBotonBorrar.classList.add("me-2");
    oBotonBorrar.setAttribute("id","btnCarritoBorrar");
    oBotonBorrar.textContent = "Borrar";
    document.querySelector("#areaCarrito").appendChild(oBotonBorrar);   
    oBotonBorrar.addEventListener("click",borrarProductosSeleccionados,false);
    }
    else {
        let oBotonBorrar = document.querySelector("#areaCarrito").querySelector("#btnCarritoBorrar");
        document.querySelector("#areaCarrito").appendChild(oBotonBorrar);
    }

if(!document.querySelector("#btnCarritoPagar")) {
    let oBotonPagar = document.createElement("button");
    oBotonPagar.classList.add("btn");
    oBotonPagar.classList.add("btn-primary");
    oBotonPagar.classList.add("ms-2");
    oBotonPagar.setAttribute("id","btnCarritoPagar");
    oBotonPagar.textContent = "Pagar";
    document.querySelector("#areaCarrito").appendChild(oBotonPagar);
    oBotonPagar.addEventListener("click",pagarCarrito,false);   
    }
    else {
        let oBotonPagar = document.querySelector("#areaCarrito").querySelector("#btnCarritoPagar");
        document.querySelector("#areaCarrito").appendChild(oBotonPagar);
        }
}



function pagarCarrito() {

let oListaLineas = document.querySelectorAll(".lineaproducto");
let arrayIds = [];

for(let i=0;i<oListaLineas.length;i++) {
    let oProducto = oListaLineas[i];
    arrayIds.push(oProducto.dataset.tipo);
}
let oDatos = {
    listaIds: arrayIds,
    idComprador: oUsuarioLogueado.Dni
}

let datos = "datos="+JSON.stringify(oDatos);

$.post("php/procesarCompra.php",datos,procesarCompra,'json');


}

function procesarCompra(respuesta) {
    if(respuesta.error == 0) {
    
        aCarrito = [];
        actualizaCookieCarrito()
        document.querySelector("#btnCarritoPagar").remove();
        document.querySelector("#btnCarritoBorrar").remove();
        mostrarCarrito();
        document.querySelector("#navCarrito").textContent = "Carrito("+ aCarrito.length +")";
        alert("Compra realizada");
    } 
    else {
        alert("Se ha producido un error en la compra: " + respuesta.mensaje);
    }

}


function borrarProductosSeleccionados()
{
    let oObjetosSeleccionados = document.querySelectorAll(".seleccionado");
    let posicion;

    if(oObjetosSeleccionados.length == 0)
    {
        alert("Debe seleccionar productos primero");
    }
    else
    {
        for (let objeto of oObjetosSeleccionados)
        {
            for(let iCarrito of aCarrito)
            {
                if(objeto.querySelector("td").textContent==iCarrito.nombre)
                {
                    posicion = aCarrito.indexOf(iCarrito);
                    aCarrito.splice(posicion,1);
                }
            }
        }
    }
    actualizaCookieCarrito()
    mostrarCarrito();
    document.querySelector("#navCarrito").textContent = "Carrito("+ aCarrito.length +")";
}

function seleccionarProducto(oEvento){
    let oE = oEvento || window.event;

    if(oE.target.nodeName == "TD"){
        oE.target.parentElement.classList.toggle("seleccionado");
    }
}

function borrarProductosSeleccionados(){
    let oObjetosSeleccionados = document.querySelectorAll(".seleccionado");
    let oObjetosProducto = document.querySelectorAll(".lineaproducto");
    let oProducto;

    

    if(oUsuarioLogueado == null){
        alert("Debe iniciar sesión para poder comprar");
    } 
    else 
    {
        if(oObjetosSeleccionados.length == 0){
            alert("Debe seleccionar productos primero");
        } else {
   

            for(let i=0;i<oObjetosProducto.length;i++){
                oProducto = oObjetosProducto[i];

                if(oProducto.classList.contains("seleccionado"))
               aCarrito.splice(i,1);

            }
           

                /*for(let x = 0; x<oObjetosSeleccionados.length;x++){
                    oObjetosSeleccionados[x].remove();
                }*/
                mostrarCarrito();
                actualizaCookieCarrito();
                mostrarNavBar();
        }        

        }

}




/*
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
                              caracteristica:oObjetosSeleccionados[i].children[4].textContent
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

   

*/