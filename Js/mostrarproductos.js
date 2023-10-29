const containerRemeras = document.querySelector('.containerRemeras');
const containerBuzos = document.querySelector('.containerBuzos');
const containerTazas = document.querySelector('.containerTazas');
const containerPosters = document.querySelector('.containerPosters');
const containerStickers = document.querySelector('.containerStickers');
let productos;

const busquedaInput = document.getElementById('busquedaInput');
const buscarBoton = document.getElementById('buscarBoton');

buscarBoton.addEventListener('click', function () {
    if (window.innerWidth <= 768) {
        // Si el ancho de la ventana es menor o igual a 768px, muestra/oculta el campo de búsqueda
        busquedaInput.style.display = (busquedaInput.style.display === 'none' || busquedaInput.style.display === '') ? 'block' : 'none';
    }
});


async function obtenerProductos() {
    const response = await fetch('../productos.json');
    if (response.ok) {
        productos = await response.json();
        return productos;
    }
};


async function mostrarProductos(condicion, contenedor) {
    if (!productos) {
        await obtenerProductos()
    };

    contenedor.innerHTML = '';

    productos.forEach((producto) => {
        if (condicion(producto)) {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('card');
            tarjeta.style.width = '18rem';

            tarjeta.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title tituloProductos">${producto.nombre} | $${producto.precio}</h5>
                    <p class="card-text">${producto.detalle}</p>
                    <div class="botones d-flex"> 
                        <button class="btn btn-light agregarCarrito">Agregar al carrito</button>
                    </div>
                </div>
            `;
            contenedor.appendChild(tarjeta);
        }
    });
}


// Llamo a la función para mostrar productos con la condición especificada
mostrarProductos(nombreRemera, containerRemeras);
mostrarProductos(nombreBuzo, containerBuzos);
mostrarProductos(nombreTaza, containerTazas);
mostrarProductos(nombrePoster, containerPosters);
mostrarProductos(nombreSticker, containerStickers);

function nombreRemera(producto) {
    return producto.nombre.toLowerCase().includes('remera');
}

function nombreBuzo(producto) {
    return producto.nombre.toLowerCase().includes('buzo');
}

function nombreTaza(producto) {
    return producto.nombre.toLowerCase().includes('taza');
}

function nombrePoster(producto) {
    return producto.nombre.toLowerCase().includes('poster');
}

function nombreSticker(producto) {
    return producto.nombre.toLowerCase().includes('sticker');
}

// funcion checkout 
const checkoutButton = document.querySelector("#checkout");

checkoutButton.addEventListener("click", () => {
    if (carrito.length === 0) {
        Toastify({
            text: 'El carrito no tiene productos aún',
            duration: 3000,
            gravity: 'top',
            position: 'center',
        }).showToast();
    } else {
        window.location.href = "./pages/form.html"
    }
});