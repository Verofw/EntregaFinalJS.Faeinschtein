function dibujarTabla() {
    const bodyTablaFactura = document.getElementById("bodyTablaFactura");
    bodyTablaFactura.innerHTML = ``;
    totalCarrito = 0;
    carrito.forEach((item, index) => {
        const subtotal = item.producto.precio * item.cantidad;
        totalCarrito += subtotal;
        const tr = document.createElement('tr');
        tr.innerHTML += `
                <td class="d-md-table-cell">${item.producto.nombre}</td>
                <td class="d-md-table-cell">$${item.producto.precio}</td>
                <td class="d-md-table-cell">${item.cantidad}</td>
                <td class="d-md-table-cell">$${subtotal}</td>
                <td> 
                    <button id="sumarItem-${index}" class= "btn btn-info mr-1 btnAgregarQuitar"> + </>
                    <button id="quitarItem-${index}" class= "btn btn-info mr-1 btnAgregarQuitar"> - </>
                    <button id= "eliminarFila-${index}" class= "btn btn-info btnAgregarQuitar"> <i class="fa-solid fa-trash"></i></>
                </td>
        `;
        bodyTablaFactura.appendChild(tr);

        //creo una funcion ya que lo uso dos veces en el proceso de eliminacion de productos este filtro
        function sweetAlertSeguridad() {
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
            })
        }

        document.querySelector(`#sumarItem-${index}`).addEventListener('click', () => {
            carrito[index].cantidad++;
            dibujarTabla();
        });
        document.querySelector(`#quitarItem-${index}`).addEventListener('click', () => {
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
                dibujarTabla();
            } else {
                sweetAlertSeguridad();
            }
        });

        document.querySelector(`#eliminarFila-${index}`).addEventListener('click', () => {
            sweetAlertSeguridad()
        })
    })
    const tfoot = document.createElement('tr');
    tfoot.innerHTML = `
        <td class="font-weight-bold" colspan="4"> 
            Total $${totalCarrito} 
        </td>
        <td colspan="3">
            <button type="button" class="btn btn-danger btnVaciar" id="vaciarCarrito">Vaciar Carrito</button>
        </td>
`;
    bodyTablaFactura.appendChild(tfoot);

    const vaciarCarrito = document.querySelector("#vaciarCarrito");
    vaciarCarrito.addEventListener('click', () => {
        if (carrito.length == 0) {
            Toastify({
                text: 'El carrito no tiene productos aún, volvé al Shop para cargarlos!',
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
