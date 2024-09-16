// Función para guardar los datos del formulario en localStorage
function guardarDatos() {
    const formulario = document.getElementById('formularioDatos');
    const datos = {
        documento: formulario.documento.value,
        primerNombre: formulario.primerNombre.value,
        segundoNombre: formulario.segundoNombre.value,
        primerApellido: formulario.primerApellido.value,
        segundoApellido: formulario.segundoApellido.value,
        telefono: formulario.telefono.value,
        email: formulario.email.value,
        direccion: formulario.direccion.value,
        edad: formulario.edad.value,
        genero: formulario.genero.value
    };

    // Guardar en localStorage
    let datosAlmacenados = JSON.parse(localStorage.getItem('datosFormulario'));
    
    // Si datosAlmacenados es null o no es un array, inicialízalo como un array vacío
    if (!Array.isArray(datosAlmacenados)) {
        datosAlmacenados = [];
    }
    
    datosAlmacenados.push(datos);
    localStorage.setItem('datosFormulario', JSON.stringify(datosAlmacenados));

    alert('Datos guardados exitosamente!');

    formulario.reset();
}




// Función para realizar consultas sobre los datos almacenados
function realizarConsultas() {
    const datos = JSON.parse(localStorage.getItem('datosFormulario')) || [];
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = ''; // Limpiar resultados anteriores

    if (datos.length === 0) {
        resultados.innerHTML = '<div class="resultado">No hay datos disponibles.</div>';
        return;
    }

    // 1. Consultar el nombre completo de todas las personas
    const nombresCompletos = datos.map(d => `${d.primerNombre || ''} ${d.segundoNombre || ''} ${d.primerApellido || ''} ${d.segundoApellido || ''}`).join('<br>');
    resultados.innerHTML += `<div class="resultado"><strong>Nombre completo de todas las personas:</strong><br>${nombresCompletos}</div>`;

    // 2. Cuántas mujeres hay?
    const mujeres = datos.filter(d => d.genero && d.genero.toLowerCase() === 'femenino').length;
    resultados.innerHTML += `<div class="resultado"><strong>Cantidad de mujeres:</strong> ${mujeres}</div>`;

    // 3. Cuántos hombres hay?
    const hombres = datos.filter(d => d.genero && d.genero.toLowerCase() === 'masculino').length;
    resultados.innerHTML += `<div class="resultado"><strong>Cantidad de hombres:</strong> ${hombres}</div>`;

    // 4. El nombre completo de la persona con mayor edad
    const edades = datos.map(d => parseInt(d.edad, 10)).filter(e => !isNaN(e));
    if (edades.length === 0) {
        resultados.innerHTML += '<div class="resultado"><strong>No se puede determinar la persona con mayor edad. No hay edades válidas.</strong></div>';
        return;
    }
    const mayorEdad = Math.max(...edades);
    const personaMayorEdad = datos.find(d => parseInt(d.edad, 10) === mayorEdad);
    const nombreMayorEdad = `${personaMayorEdad.primerNombre || ''} ${personaMayorEdad.segundoNombre || ''} ${personaMayorEdad.primerApellido || ''} ${personaMayorEdad.segundoApellido || ''}`;
    resultados.innerHTML += `<div class="resultado"><strong>Nombre completo de la persona con mayor edad:</strong> ${nombreMayorEdad}</div>`;

    // 5. El promedio de la edad
    const edadesTotales = datos.map(d => parseInt(d.edad, 10)).filter(e => !isNaN(e));
    if (edadesTotales.length === 0) {
        resultados.innerHTML += '<div class="resultado"><strong>No se puede calcular el promedio de edad. No hay edades válidas.</strong></div>';
        return;
    }
    const promedioEdad = edadesTotales.reduce((sum, e) => sum + e, 0) / edadesTotales.length;
    resultados.innerHTML += `<div class="resultado"><strong>Promedio de edad:</strong> ${promedioEdad.toFixed(2)}</div>`;
}
