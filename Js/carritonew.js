// ESTE ARHIVO DEBERIA PODER BORRARLO; VER 


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
            resultadosContainer.appendChild(card);




            // VERSION ANTERIOR DE CARRITO 

            const btnAgregar = document.querySelectorAll('.agregarCarrito');

btnAgregar.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const productoSeleccionado = productos[index];
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
});