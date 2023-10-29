let carrito = JSON.parse (localStorage.getItem ("carrito"));
dibujarTabla();

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
const tipoTarjeta = document.getElementById("tipo-tarjeta");


const cajasTexto = document.querySelectorAll (".cajaTexto");
const vaciar = document.getElementById ("btnVaciar");
const pagar = document.getElementById ("btnPagar");



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

let letrasRegex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/;

function validarTexto (info) {
    if (!letrasRegex.test(info.value.trim())) {
        info.classList.add('border-danger');
        Toastify({
            text: 'Por favor ingrese datos válidos',
            duration: 3000,
            gravity: 'top',
            position: 'center',
        }).showToast();;
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
        return false;
    }
}

cajaMail.addEventListener ('change', validarCorreo);

function validarAltura() {
    const altura = cajaAltura.value;
    if (altura.trim() !== '' && !isNaN(altura) && altura.length < 6) {
        return true;
    } else {
        Toastify({
            text: 'Por favor ingrese una altura del domicilio válida',
            duration: 3000,
            gravity: 'top',
            position: 'center',
        }).showToast();
        return false;
    }
}

cajaAltura.addEventListener('blur', validarAltura);

function validarCp (){
    const cp = cajaCp.value;
    if (cp.trim() !== '' && !isNaN(cp) && cp.length === 4) {
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
}

cajaCp.addEventListener ('blur', validarCp);

function validarNroTj (){
    const valor = numeroTj.value;
    if (valor.trim() !== '' && !isNaN(valor) && valor.length === 16) {
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
}

numeroTj.addEventListener('blur', validarNroTj);

function validarVto() {
    const vto = fechaVto.value;
    const formatoValido = /^\d{2}\/\d{2}$/;

    if (formatoValido.test(vto)) {
        return true;
    } else {
        Toastify({
            text: 'Ingrese una fecha de vencimiento válida xx/xx',
            duration: 3000,
            gravity: 'top',
            position: 'center',
        }).showToast();
        return false;
    }
}


fechaVto.addEventListener ('blur', validarVto);

function validarCodigo (){
    const codigo = codigoTj.value;
    if (codigo.trim() !== '' && !isNaN(codigo) && codigo.length === 3){
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
}

codigoTj.addEventListener ('blur', validarCodigo);




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

            retiro.checked = false;
            envio.checked = true;
            textoRetiro.style.display = 'block';
            formEnvio.style.display = 'none';

            efectivo.checked = true;
            tarjeta.checked = false;
            textoEfectivo.style.display = 'block';
            datosTj.style.display = 'none';

            location.reload();
        }
    })
})

// Validacion campos general
function validarDomicilio() {
    if (envio.checked) {
        let calleValida = validarTexto(cajaCalle);
        let alturaValida = validarAltura(cajaAltura);
        let cpValido = validarCp(cajaCp);
        return calleValida && alturaValida && cpValido;
    } else if (retiro.checked) {
        return true;
    }
}
function validarTarjeta() {
    if (tarjeta.checked) {
        let nombreTarjeta = validarTexto(nombreTt);
        let numeroTarjetaValido = validarNroTj(numeroTj);
        let fechaVtoValida = validarVto(fechaVto);
        let codigoSeguridadValido = validarCodigo(codigoTj);
        return nombreTarjeta && numeroTarjetaValido && fechaVtoValida && codigoSeguridadValido;
    } else if (efectivo.checked) {
        return true;
    }
}


function validarCampos() {
    let nombreValido = validarTexto(cajaNombre);
    let apellidoValido = validarTexto(cajaApellido);
    let mailValido = validarCorreo();
    let domicilioValido = validarDomicilio();
    let tarjetaValida = validarTarjeta();
    return nombreValido && apellidoValido && mailValido && domicilioValido && tarjetaValida;
}

function pagarOk() {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'El carrito está vacío',
            text: 'Agrega productos a tu carrito antes de realizar una compra.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        }) .then ((result) =>{
            if (result.isConfirmed){
                window.location.href = '../index.html';
            }
        })
    } else if (validarCampos()) {
        Swal.fire({
            title: 'Compra Realizada con éxito!',
            text: 'Lo estaremos contactando vía email en los próximos minutos',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '../index.html';
            }
        });
        localStorage.clear();
        dibujarTabla();
    } 
}


pagar.addEventListener('click', function(event) {
    event.preventDefault();
    pagarOk();
});


