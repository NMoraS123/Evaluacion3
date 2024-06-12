const verificar = (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);

    input.classList.remove('is-invalid', 'is-valid');
    
    if (input.value.trim() == '') {
        input.classList.add('is-invalid');
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>';
    } else {
        input.classList.add('is-valid');
        div.innerHTML = '';
        
        if (id == 'coste') {
            if (input.value < 25000) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">Coste de servicio no puede ser menor a $25000</span>';
            }
        }
        if (id == 'run') {
            if (!validarRun(input.value)) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">El run ingresado no es válido</span>';
            }
        }
        if (id == 'fecha') {
            if (validarFecha(input.value) < 1) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">Fecha inválida</span>';
            }
        }
        if (id === 'patente' && !validarPatente(input.value)) {
            input.classList.add('is-invalid');
            div.innerHTML = '<span class="badge bg-danger">Patente inválida</span>';
        }
    }
}

const limpiar = () => {
    const form = document.querySelector('form');
    if (!form) {
        console.error('Form not found');
        return;
    }
    
    form.reset();
    
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid', 'is-valid');
        const errorDiv = document.getElementById('e-' + item.id);
        if (errorDiv) {
            errorDiv.innerHTML = '';
        }
    });
    document.getElementById('patente').readOnly = false;
    document.getElementById('btnGuardar').value = 'Guardar';
}

const soloNumero = (evt) => {
    const charCode = evt.keyCode || evt.which;
    if (charCode >= 48 && charCode <= 57) {
        return true;
    }
    evt.preventDefault();
    return false;
}

const validarFecha = (fecha) => {
    const hoy = new Date();
    fecha = new Date(fecha);
    const resta = hoy - fecha;
    const dia = (resta / (1000 * 60 * 60 * 24));
    return dia.toFixed(0);
}

const validarRun = (run) => {
    const Fn = {
        validaRut: function (rutCompleto) {
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) {
                return false;
            }
            const tmp = rutCompleto.split('-');
            let digv = tmp[1];
            const rut = tmp[0];
            if (digv == 'K') digv = 'k';
            return (Fn.dv(rut) == digv);
        },
        dv: function (T) {
            let M = 0, S = 1;
            for (; T; T = Math.floor(T / 10)) {
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            }
            return S ? S - 1 : 'k';
        }
    }
    return Fn.validaRut(run);
}

const validarPatente = (patente) => {
    const regex = /^[a-zA-Z0-9]{6}$/;
    return regex.test(patente);
}