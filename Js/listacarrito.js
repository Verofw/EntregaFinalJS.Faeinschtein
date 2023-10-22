
function dibujarTabla() {
    const bodyTabla = document.getElementById("bodyTabla");
    bodyTabla.innerHTML = ``;
    totalCarrito = 0;
    carrito.forEach((item, index) => {
        const subtotal = item.producto.precio * item.cantidad;
        totalCarrito += subtotal;
        const tr = document.createElement('tr');
        tr.innerHTML += `
                <td>${item.producto.nombre}</td>
                <td>$${item.producto.precio}</td>
                <td>${item.cantidad}</td>
                <td>$${subtotal}</td>
                <td>
                    <button id="sumarItem-${index}" class= "btn btn-info mr-1"> + </>
                    <button id="quitarItem-${index}" class= "btn btn-info mr-1"> - </>
                    <button id= "eliminarFila-${index}" class= "btn btn-info"> <i class="fa-solid fa-trash"></i></>
                </td>
        `;
        bodyTabla.appendChild(tr);

        //creo una funcion ya que lo uso dos veces en el proceso de eliminacion de productos este filtro
        function sweetAlertSeguridad (){
            Swal.fire({
            title: 'Seguro que desea eliminar el producto de su carrito?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#red',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#grey',
        }).then((result) => {
            if (result.isConfirmed) {
                carrito.splice(index, 1);
                dibujarTabla();
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }
        })}

        document.querySelector(`#sumarItem-${index}`).addEventListener('click', () => {
            carrito[index].cantidad++;
        });
        document.querySelector(`#quitarItem-${index}`).addEventListener('click', () => {
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
            } else {
                sweetAlertSeguridad();
            }
        });
        
        document.querySelector(`#eliminarFila-${index}`).addEventListener('click', () => {
            sweetAlertSeguridad()
        })
    })
    const tfoot = document.createElement('tfoot');
    tfoot.innerHTML = `
        <tr>
            <td class="font-weight-bold">Total $${totalCarrito}</td>
        </tr>
        <tr>
            <td>
                <button type="button" class="btn btn-danger" id="vaciarCarrito">Vaciar Carrito</button>
                <button type="button" class="btn btn-primary" id="checkout">CheckOut</button>
            </td>
        </tr>
    `;
    bodyTabla.appendChild(tfoot);

    const carritoLista = document.getElementById("carritoLista");
    const carritoIcon = document.getElementById("carritoIcon");

    carritoIcon.addEventListener('click', () => {
        const tablaVisible = carritoLista.style.display === 'block';
        if (tablaVisible) {
            carritoLista.style.display = 'none';
        } else {
            carritoLista.style.display = 'block';
            dibujarTabla();
        }
    })
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

    const vaciarCarrito = document.querySelector("#vaciarCarrito");
    vaciarCarrito.addEventListener('click', () => {
        if (carrito.length == 0) {
            Toastify({
                text: 'El carrito no tiene productos aún',
                duration: 3000,
                gravity: 'top',
                position: 'center',
            }).showToast();
        } else {
            Swal.fire({
                title: '¿Está seguro que desea vaciar el carrito?',
                text: 'Al realizar ésta opcion se perderá el contenido de su carrito',
                icon: 'warning',
                confirmButtonText: 'Vaciar Carrito',
                confirmButtonColor: '#FF0000',
                showCancelButton: true,
                cancelButtonText: 'No, continuar comprando',
                cancelButtonColor: '#008000',
            }).then((result) => {
                if (result.isConfirmed) {
                    carrito = [];
                    localStorage.setItem('carrito', carrito);
                    dibujarTabla();
                    Swal.fire({
                        title: 'El carrito fue correctamente vaciado',
                        icon: 'success',
                    })
                }
            })
        }
    })
}
