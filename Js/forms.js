const cajaNombre = document.getElementById ("cajaNombre");
const cajaApellido = document.getElementById ("cajaApellido");
const cajaMail = document.getElementById ("cajaMail");

const envio = document.getElementById("envioDomicilio");
const retiro = document.getElementById("retiroSucursal");
const formEnvio = document.getElementById("cargaDomicilio");
const cajaCalle = document.getElementById ("cajaCalle");
const cajaAltura = document.getElementById ("cajaAltura");
const cajaCp = document.getElementById ("cajaCp");
const textoRetiro = document.getElementById("leyendaRetiro");

const efectivo = document.getElementById("optionEfectivo");
const textoEfectivo = document.getElementById("textoEfectivo");
const tarjeta = document.getElementById("optionTj");
const datosTj = document.getElementById("cargaTarjeta");


const nombreTt = document.getElementById ("nombre-titular");
const numeroTj = document.getElementById ("numero-tarjeta");
const fechaVto = document.getElementById ("fecha-expiracion");
const codigoTj = document.getElementById ("codigo-seguridad");

const cajasTexto = document.querySelectorAll (".cajaTexto");
const vaciar = document.getElementById ("btnVaciar");
const pagar = document.getElementById ("btnPagar;");

// Mostrar información de retiro en sucursal y ocultar formulario de envío al inicio
textoRetiro.style.display = 'none';
formEnvio.style.display = 'block';

retiro.addEventListener('change', () => {
    if (retiro.checked) {
        textoRetiro.style.display = 'block';
        formEnvio.style.display = 'none';
    }
});

envio.addEventListener('change', () => {
    if (envio.checked) {
        textoRetiro.style.display = 'none';
        formEnvio.style.display = 'block';
    }
});

// Mostrar información de pago
textoEfectivo.style.display = 'block';
datosTj.style.display = 'none';

efectivo.addEventListener('change', () => {
    if (efectivo.checked) {
        textoEfectivo.style.display = 'block';
        datosTj.style.display = 'none';
    }
});

tarjeta.addEventListener('change', () => {
    if (tarjeta.checked) {
        textoEfectivo.style.display = 'none';
        datosTj.style.display = 'block';
    }
});

function validarTexto (info) {
    if (info.value.trim() === '') {
        info.classList.add('border-danger');
        return false;
    } else {
        info.classList.remove('border-danger'); 
        return true;
    }
}
cajasTexto.forEach(function(campo) {
    campo.addEventListener('blur', function() {
        validarTexto(this);
    });
});

function validarCorreo() {
    if (cajaMail.checkValidity()) {
        return true
    } else {
        Toastify({
            text: 'Por favor ingrese un mail válido',
            duration: 3000,
            gravity: 'top',
            position: 'center',
        }).showToast();;
    }
}

cajaMail.addEventListener ('change', validarCorreo);

cajaCp.addEventListener ('change', () =>{
    const cp = cajaCp.value;
    if (!isNaN(cp) && cp.length === 4) {
        return true;
    }else{
        Toastify({
            text: 'Por favor ingrese un Codigo Postal de 4 numeros',
            duration:3000,
            gravity: 'top',
            position: 'center',
        }).showToast();;
        return false;
        }
    })

numeroTj.addEventListener('change', () => {
    const valor = numeroTj.value;
    if (!isNaN(valor) && valor.length === 16) {
        return true;
    } else {
        Toastify({
            text: 'Por favor ingrese un número de tarjeta válido (16 dígitos)',
            duration: 3000,
            gravity: 'top',
            position: 'center',
            }).showToast();
        return false;
        }
});

fechaVto.addEventListener ('change', ()=> {
    const vto = fechaVto.value;
    if (vto.length === 5) {
        return true;
    } else {
        Toastify({
            text: 'Ingrese una fecha de vencimiento váilida xx/xx',
            duration: 3000,
            gravity: 'top',
            position: 'center',
        }).showToast();
        return false;
    }
})

codigoTj.addEventListener ('change', () =>{
    const codigo = codigoTj.value;
    if (!isNaN(codigo) && codigo.length === 3){
        return true;
    } else{
        Toastify({
            text: 'El código de seguridad brindado es incorrecto',
            duration: 3000,
            gravity: 'top',
            position: 'center',
        }) .showToast();
        return false;
    }
})

vaciar.addEventListener ('click', () =>{
    Swal.fire({
        title: '¿Está seguro que desea vaciar los campos?',
        text: 'Al realizar ésta opcion se perderá la información hasta ahora brindada',
        icon: 'warning',
        confirmButtonText: 'Borrar Campos',
        confirmButtonColor: '#FF0000',
        showCancelButton: true,
        cancelButtonText: 'No, continuar cargando los datos',
        cancelButtonColor: '#008000',
    }).then((result) => {
        if (result.isConfirmed) {      
            cajaNombre.value= "";
            cajaApellido.value= "";
            cajaMail.value= "";
            cajaCalle.value= "";
            cajaCp.value= "";
            cajaAltura.value= "";
            numeroTj.value = "";
            nombreTt.value = "";
            fechaVto.value = "";
            codigoTj.value= "";
            // ver si puedo hacer que se recargue la pagina despues de esto
        }
    })
})
// Validacion campos general

// ME FALTA LA FUNCION DEL SUBMIT ACA Y LA VALORACION DE TODO, CON LO DEL and and anda TODO TRUE


// dejo este alert para el cierre del form depues de "pagar"
// Swal.fire({
//     title: 'Compra Realizada con éxito!',
//     text: 'Lo estaremos contactando via mail en las proximas horas para coordinar entrega',
//     icon: 'success',
//     confirmButtonText: 'Aceptar'
// })
// carrito.length = 0;
// localStorage.clear;



// despues me falta cargar aca la api con el pais/provincia/localidades
// y me falta cambiar los productos a un json y no en un productos para que los levante de ahi con fetch, async await y todo lo de la penultima/ultima clase
