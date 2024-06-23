import { edit, getAll, remove, save, selectOne } from "./firebase.js";

let id = 0;
let vehiculos = [];

document.addEventListener('DOMContentLoaded', (event) => {
    const btnGuardar = document.getElementById('btnGuardar');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', () => {
            document.querySelectorAll('.form-control').forEach(item => {
                verificar(item.id);
            });

            if (document.querySelectorAll('.is-invalid').length == 0) {
                const auto = {
                    run: document.getElementById('run').value,
                    pat: document.getElementById('patente').value,
                    mar: document.getElementById('marca').value.trim(),
                    mod: document.getElementById('modelo').value.trim(),
                    anio: document.getElementById('anio').value,
                    fecha: document.getElementById('fecha').value,
                    serv: document.getElementById('servicio').value,
                    valor: document.getElementById('valor').value
                };

                if (vehiculos.some(vehiculo => vehiculo.pat === auto.pat && vehiculo.id !== id)) {
                    Swal.fire({
                        title: "Error",
                        text: "La patente ingresada ya está registrada",
                        icon: "error"
                    });
                } else {
                    if (btnGuardar.value == 'Guardar') {
                        save(auto);
                    } else {
                        edit(id, auto);
                        id = 0;
                    }
                    limpiar();
                }
            }
        });
    }

    getAll(vehiculo => {
        vehiculos = [];
        let tabla = '';
        vehiculo.forEach(doc => {
            const item = doc.data();
            vehiculos.push({ id: doc.id, ...item });

            tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.pat}</td>
                <td>${item.mar}</td>
                <td>${item.mod}</td>
                <td>${item.anio}</td>
                <td>${item.fecha}</td>
                <td>${item.serv}</td>
                <td>${item.valor}</td>
                <td nowrap>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                </td>
            </tr>`;
        });
        const contenido = document.getElementById('contenido');
        if (contenido) {
            contenido.innerHTML = tabla;
        }

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id);
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado.",
                            icon: "success"
                        });
                    }
                });
            });
        });

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const emp = await selectOne(btn.id);
                const item = emp.data();
                document.getElementById('run').value = item.run;
                document.getElementById('patente').value = item.pat;
                document.getElementById('marca').value = item.mar;
                document.getElementById('modelo').value = item.mod;
                document.getElementById('anio').value = item.anio;
                document.getElementById('fecha').value = item.fecha;
                document.getElementById('servicio').value = item.serv;
                document.getElementById('valor').value = item.valor;
                document.getElementById('btnGuardar').value = 'Editar';
                document.getElementById('patente').readOnly = true;
                id = btn.id;
            });
        });
    });
});
