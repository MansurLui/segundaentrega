// Acumulador de compra
let totalCompra = 0;

class Zapatilla {
    constructor(id, nombre, cantidad, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    //verificacion de stock
    verificarInventario = (cantidaddeseada) => {
        if(cantidaddeseada>this.cantidad){
            alert("Lamentamos el inconveniente\nNo tenemos stock disponible");
            return false;
        }
        else
            return true;
    }

    //descontar productro del inventario
    sacarDeInventario = (cantidad) => {
        this.cantidad = this.cantidad-cantidad;
    }

    busqueda = (nombre) => {
        if(this.nombre.toUpperCase() == nombre.toUpperCase())
            return true;
        else
            return false;
    }
}

// Inventario
let zapatillas = [];
zapatillas.push(new Zapatilla(1,"nike air max", 6, 89.99));
zapatillas.push(new Zapatilla(2,"nike air force ", 5, 24.99));
zapatillas.push(new Zapatilla(3,"adidas superstar", 2, 39.99));
zapatillas.push(new Zapatilla(4,"jordan", 1, 12.99));


//Verifica que se ingrese una opción valida en el menú
let validarMenu = (opcion) => {
    if(!Number(opcion)){
        alert("Ingresa solo numeros");
        return false;
    }
    else
    {
        if(parseInt(opcion)<0 || parseInt(opcion)>(zapatillas.length+2)){
            alert("Opción Fuera de rango");
            return false;
        }
        else{
            return true;
        }
    }
}

// Funcion que permite la compra del producto seleccionado en el menú de inicio
let comprarProductos = (opcion) => {
    let cantidadcompra = 0;

    cantidadcompra=prompt("Ingresa la cantidad de zapatillas que deseas comprar");
    // Verifica que la cantidad ingresada sea un número
    if(Number(cantidadcompra)){
        cantidadcompra = parseFloat(cantidadcompra);
        if(zapatillas[opcion-1].verificarInventario(cantidadcompra))
        {
            zapatillas[opcion-1].sacarDeInventario(cantidadcompra);
            totalCompra = totalCompra + (cantidadcompra*zapatillas[opcion-1].precio);
            alert(`Se agregaron ${cantidadcompra} prendas a tu carrito.\nTu cuenta asiende a: $${totalCompra}`);
        }
    }
    else{
        alert("Ingresa una cantidad valida");
    }
}

let buscarProductos = () => {
    let encontrado = false;
    nombre=prompt("Ingresa el nombre de la zapatilla que deseas buscar");
    for(const zapatilla of zapatillas)
    {
        if(zapatilla.busqueda(nombre))
            encontrado = true; 
    }
    return encontrado;
}

//Funcion principal donde se selecciona la prenda que se desea comprar
let menu = () => {
    let opcionmenu, resultadovalidacion, menuarmado, busqueda;
    alert("Bienvenid@ a la tienda de zapatillas");

    do{        
        //Armado de menú mostrado en prompt
        menuarmado="Selecciona los productos desde el siguiente menú"
        for(const zapatilla of zapatillas){
            menuarmado = `${menuarmado}
            ${zapatilla.id}) ${zapatilla.nombre} (Stock: ${zapatilla.cantidad})`
        }
        menuarmado=`${menuarmado}
            ${zapatillas.length+1}) Buscar zapatilla
            ${zapatillas.length+2}) Salir`
        opcionmenu = prompt(`${menuarmado}`);

        resultadovalidacion = validarMenu(opcionmenu);
        console.log(resultadovalidacion);
        if(resultadovalidacion)
        {
            if( opcionmenu!=(zapatillas.length+1) && opcionmenu!=(zapatillas.length+2))
                comprarProductos(parseInt(opcionmenu));
            // busqueda de zapatilla
            else{
                if(opcionmenu==(zapatillas.length+1))
                {
                    if(buscarProductos())
                        alert(`Tenemos disponible este producto`);
                    else
                        alert(`No tenemos disponible este producto`);  
                }

            }
        }

    }while(opcionmenu!=(zapatillas.length+2));
    alert(`Gracias por comprar \nEl total de tu compra es de: $${totalCompra}\nVuelva Pronto`);
}
//Llamada de función principal
menu();