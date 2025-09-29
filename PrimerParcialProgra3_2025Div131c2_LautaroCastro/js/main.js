/* Se realiza el Ejercicio 1 creando el array que contiene las frutas a vender, es un array de objetos con las 
propiedades correspondiente a cada fruta (en la sandia invente el precio porque no figuraba en la captura de modelo).
*/
let productos = [
    {id: 1, nombre: "arandano", precio: 5000, url_imagen: "imagenes/arandano.jpg"},
    {id: 2, nombre: "banana", precio: 1000, url_imagen: "imagenes/banana.jpg"},
    {id: 3, nombre: "frambuesa", precio: 4000, url_imagen: "imagenes/frambuesa.jpg"},
    {id: 4, nombre: "frutilla", precio: 3000, url_imagen: "imagenes/frutilla.jpg"},
    {id: 5, nombre: "kiwi", precio: 2000, url_imagen: "imagenes/kiwi.jpg"},
    {id: 6, nombre: "mandarina", precio: 800, url_imagen: "imagenes/mandarina.jpg"},
    {id: 7, nombre: "manzana", precio: 1500, url_imagen: "imagenes/manzana.jpg"},
    {id: 8, nombre: "naranja", precio: 9000, url_imagen: "imagenes/naranja.jpg"},
    {id: 9, nombre: "pera", precio: 2500, url_imagen: "imagenes/pera.jpg"},
    {id: 10, nombre: "anana", precio: 3000, url_imagen: "imagenes/anana.jpg"},
    {id: 11, nombre: "pomelo-amarillo", precio: 2000, url_imagen: "imagenes/pomelo-amarillo.jpg"},
    {id: 12, nombre: "pomelo-rojo", precio: 2000, url_imagen: "imagenes/pomelo-rojo.jpg"},
    {id: 13, nombre: "sandia", precio: 8500, url_imagen: "imagenes/sandia.jpg"}
];

//Inicializo variables que voy a usar
let datosAlumno = document.getElementById("datosAlumno");
let listadoProductos = document.getElementById("listadoProductos");
let barraBusqueda = document.getElementById("barraBusqueda");
let objetosCarrito = document.getElementById("elementos");
let contadorCarrito = document.getElementById("contadorCarrito");
let precioTotalCarrito = document.getElementById("precioTotalCarrito");
let botonOrdenarXNombre = document.getElementById("ordenarXNombre");
let botonOrdenarXPrecio = document.getElementById("ordenarXPrecio");
let carrito = [];

init();

function init(){
    crearCarrito();
    mostrarDatosAlumno();
    mostrarProductos(productos);
    mostrarCarrito();
    mostrarContadorCarrito();
}

/* Realizo ejercicio 2, creando la funcion solicitada don se agregan los datos del alumno en el nav y se muestran por consola
*/
function mostrarDatosAlumno(){
    const alumno = {
    dni: 40888395,
    nombre: "Lautaro",
    apellido: "Castro"
    };

    console.log(`Dni: ${alumno.dni}, Nombre: ${alumno.nombre}, Apellido: ${alumno.apellido}`); // Muestro los datos por consola
    datosAlumno.innerHTML = `
        <p>${alumno.nombre} ${alumno.apellido}</p>`;
};


/*
Realizo ejercicio 3 mostrando el listado de las frutas en el html, lo que hago es crear una funcion que recorra el array de
frutas y vaya agregando cada una en el section correspondiente, los datos a mostrar de cada fruta se toman de las propiedades
de cada objeto de fruta.
*/
function mostrarProductos(array){
    cartaProducto = ""; //Necesario resetear los divs previos
    array.forEach(producto =>{ // Creo un div por producto
        cartaProducto += ` 
            <div class="card-producto">
                <img src="${producto.url_imagen}" alt="">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <button onclick="agregarACarrito(${producto.id})">Agregar al carrito</button>
            </div> 
            `;
        });
    listadoProductos.innerHTML += cartaProducto;
};

/*
Realizo el ejercicio 4: utilizo el input del html donde el usuario va a ingresar el texto que se usara para filtrar la busqueda
lo convierto a minusculas con la funcion .toLowerCase() para poder empatar el ingreso con los nombres de las futas del array y
evitar que la busqueda sea key sensitive.
*/
barraBusqueda.addEventListener("keyup", function(){
    let valorBusqueda = barraBusqueda.value.toLowerCase();
    let productosFiltrados = productos.filter(producto => producto.nombre.toLocaleLowerCase().includes(valorBusqueda));
       console.table(productosFiltrados); // Le saco las mayusculas al nombre del producto para que coincida
       mostrarProductos(productosFiltrados); // Muestro al usuario el resultado de su busqueda
});

/*
Realizo el punto 5: se agrega una funcion que lee cuando el cliente hace click en el boton "Agregar al carrito" para asi
agregar el producto al array del carrito validandolo por id.
*/
function agregarACarrito(id){ 
    let productoSeleccionado =  productos.find(producto => producto.id == id) ; // Busco el producto por id
    carrito.push(productoSeleccionado); // Lo agrego a la lista del carrito
    mostrarCarrito(); // Se lo muestro al usuario
    console.log(carrito); // Se muestra el array de carrito por console.log()
    guardarCarritoLocal();
};

function mostrarCarrito() {
    let cartaCarrito = ""; //Creo el listado de productos vacio
    //Recorro el array de productos agregados al carrito y voy generando su item para mostrarlo en el ul 
    carrito.forEach((producto, i) => {
        cartaCarrito += `
        <li class="bloque-item" id="productoSeleccionado"> 
            <p class="nombre-item">${producto.nombre} - ${producto.precio}</p>
            <button class="boton-eliminar" onclick="eliminarProducto(${i})">Eliminar</button>
        </li>
        `;
    });
    objetosCarrito.innerHTML = cartaCarrito;
    mostrarContadorCarrito();
    mostrarTotalCarrito();
};

/*
Creo la funcion eliminarProducto() que recibe el indice del producto a eliminar y lo borra del array del carrito.
*/ 
function eliminarProducto(indice) {
    /*El parametro indice, le dice desde donde arrancar y el segundo parametro indica la cantidad
    de elementos a eliminar.*/
    carrito.splice(indice, 1); 
    mostrarCarrito(); // vuelvo a mostarlo, actualizado
    guardarCarritoLocal();
};

/*
Realizo el punto 6: almaceno en localStorage el carrito que el usuario fue creando.
*/ 
function guardarCarritoLocal(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

function crearCarrito(){
    let guardado = localStorage.getItem("carrito");
    if(guardado != null){
        carrito = JSON.parse(localStorage.getItem("carrito"));
        mostrarCarrito();
    };
};

/*
Realizo el ejercicio 7: creo una funcion que utiliza el metodo .reduce() para contar la cantidad de productos y retornar el total de productos que hay agregados en el carrito y los agrega en el nav-bar del html.
*/
function mostrarContadorCarrito(){
    let cantidadProductos = carrito.length;
    contadorCarrito.innerHTML = `<p id="totalCarrito">Carrito: ${cantidadProductos}</p>`;
}

// Creo la funcion encargadad de mostrar el total, valida si hay elementos en el carrito y muestra su total, si el carrito
// esta vacio no muestra nada.
function mostrarTotalCarrito(){
    if(carrito.length == 0){
        precioTotalCarrito.innerHTML = `<p>Total: $0</p>`;
        console.log("Carrito Vacio");
    }else{
        let precioTotal = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
        precioTotalCarrito.innerHTML = `<p>Total: $${precioTotal}</p>`;
        console.log(`"Carrito con productos" ${precioTotal}`);
    }
}

/* 
Realizo el ejercicio 8: verifico si se hace click en algunos de los dos botones de ordenamiento y depende en cual se haga
click le paso por parametro el tipo de ordenamiento a la funcion que los ordena
*/

function ordenarProductos(tipoOrdenamiento){
    if(tipoOrdenamiento == 'nombre'){
        productos = productos.sort((a,b)=> a.nombre.localeCompare(b.nombre));
        console.log(productos);
    }else{
        productos = productos.sort((a,b)=> a.precio - b.precio);
        console.log(productos);
    };
}