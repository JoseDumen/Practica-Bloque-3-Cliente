"use strict";

class Tienda {
    constructor() {
    this.arrClientes = [];
    }

    altaNuevoCliente(nombre,correo,dni,direccion,tipoSuscripcion,password){
        let oNuevoCliente = new Cliente(nombre,correo,dni,direccion,tipoSuscripcion,password);
        this.arrClientes.push(oNuevoCliente);
    }
    
    buscarCliente(email) {  //Busca un cliente en el array pasándole el email como parámetro. Devuelve el cliente si existe o false si no existe.
       let oCliente = false;
        
        for(let i=0;i<this.arrClientes.length;i++) {
                if(this.arrClientes[i].Correo == email){
                oCliente = this.arrClientes[i];
                }
        }
      
        return oCliente;
    }
}

class Producto {
    constructor(sNombre,fPrecio,iStock,iIdProducto){
        this.Nombre = sNombre;
        this.Precio = fPrecio;
        this.Stock = iStock;
        this.IdProducto = iIdProducto;
    }
}

class Varita extends Producto {
    constructor(sNombre,fPrecio,iStock,iIdProducto,sPropietario,sMaterial){
        super(sNombre,fPrecio,iStock,iIdProducto);
        this.Propietario = sPropietario;
        this.Material = sMaterial;
    }
}

class Muneco extends Producto {
    constructor(sNombre,fPrecio,iStock,iIdProducto,sPersonaje,sTipo){
        super(sNombre,fPrecio,iStock,iIdProducto);
        this.Personaje = sPersonaje;
        this.Tipo = sTipo;
    }
}

class Cliente {
    constructor(sNombre,sCorreo,sDni,sDireccion,sTipoSubscripcion,password){
        this.Nombre = sNombre;
        this.Correo = sCorreo;
        this.Dni = sDni;
        this.Direccion = sDireccion;
        this.tipoSuscripcion = sTipoSubscripcion;
        this.password = password;
    }
}

class Venta {
    constructor() {
        this.cliente;
    }
}

