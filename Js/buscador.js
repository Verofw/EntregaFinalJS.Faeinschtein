const buscarButton = document.getElementById("buscarBoton");
const resultadosContainer = document.getElementById("resultadosContainer");


busquedaInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        realizarBusqueda();
        resultadosContainer.scrollIntoView({
            behavior: "smooth"
        });
    }
});

buscarButton.addEventListener("click", function () {
    if (busquedaInput.style.display === "none" || busquedaInput.style.display === "") {
        busquedaInput.style.display = "inline-block"; 
        busquedaInput.focus();
    } else {
        busquedaInput.style.display = "none";
    }
    realizarBusqueda();
    resultadosContainer.scrollIntoView({
        behavior: "smooth"
    });
});

function realizarBusqueda() {
    const consulta = busquedaInput.value.toLowerCase();

    if (consulta.trim() === "") {
        const resultadosContainer = document.getElementById("resultadosContainer");
        resultadosContainer.innerHTML = "";
    } else {
        const resultados = buscarProductos(consulta);
        mostrarResultados(resultados);
    }
}

function buscarProductos(consulta) {
    return productos.filter((producto) => {
        return producto.nombre.toLowerCase().includes(consulta);
    });
}

function mostrarResultados(resultados) {
    const resultadosContainer = document.getElementById("resultadosContainer");
    resultadosContainer.innerHTML = "";

    if (resultados.length === 0) {
        const h5 = document.createElement("h5");
        h5.innerHTML = `<h5 class="sinResultados text-light m-2">No se encontraron resultados.</h5>`;
        resultadosContainer.appendChild(h5);
    } else {
        resultados.forEach((producto) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '18rem';
            card.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title tituloProductos">${producto.nombre} // $${producto.precio}</h5>
                <p class="card-text">${producto.detalle}</p>
                <div class="botones d-flex"> 
                    <button class="btn btn-light carritoPush">Agregar al carrito</button>
                </div>
            </div>`;
            resultadosContainer.appendChild(card);

            // Agrego el evento click al botón Agregar al carrito despues de filtrar, porque no me toma la class carritoPush
            const agregarAlCarritoButton = card.querySelector('.carritoPush');

            agregarAlCarritoButton.addEventListener('click', () => {
                const productoSeleccionado = producto;
                const indiceCarrito = carrito.findIndex((item) => item.producto.nombre === productoSeleccionado.nombre);

                if (indiceCarrito !== -1) {
                    carrito[indiceCarrito].cantidad++;
                } else {
                    const productoAgregado = new Item(productoSeleccionado, 1);
                    carrito.push(productoAgregado);
                }
                const mensaje = `${productoSeleccionado.nombre} se ha agregado al carrito.`;

                Toastify({
                    text: mensaje,
                    duration: 3000,
                    gravity: 'bottom',
                    position: 'center',
                }).showToast();

                localStorage.setItem('carrito', JSON.stringify(carrito));
                dibujarTabla();
            });
            // resultadosContainer.appendChild(card); esta duplicado, por eso lo comento, por si no llega a funcionar algo lo dejo 
        });
    }
}