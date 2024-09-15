// muestra lista de usuarios al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarUsuarios();
});

// Función para mostrar usuarios almacenados en localStorage
function mostrarUsuarios() {
    const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = ''; // Limpiar lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Mostrar cada usuario en la lista con sus botones
    usuarios.forEach((usuario, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${usuario.username} - Rol: ${usuario.rol} 
                        <button onclick="eliminarUsuario(${index})">Eliminar</button>
                        <button onclick="editarUsuario(${index})">Editar</button>`;
        listaUsuarios.appendChild(li);
    });
}

// Función para agregar un nuevo usuario
document.getElementById('gestionUsuarios').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nuevoUsuario = document.getElementById('nuevoUsuario').value;
    const nuevaPassword = document.getElementById('nuevaPassword').value;
    const rol = document.getElementById('rol').value;

    // Obtener lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar si estamos editando un usuario
    const indexUsuario = document.getElementById('indexUsuario').value;

    if (indexUsuario !== "") {
        // Modificar un usuario existente
        usuarios[indexUsuario] = { username: nuevoUsuario, password: nuevaPassword, rol: rol };
        document.getElementById('indexUsuario').value = ''; // Limpiar índice
    } else {
        // Agregar un nuevo usuario
        usuarios.push({ username: nuevoUsuario, password: nuevaPassword, rol: rol });
    }

    // Guardar lista de usuarios en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Limpiar formulario y actualizar lista
    document.getElementById('gestionUsuarios').reset();
    mostrarUsuarios();
});

// Función para eliminar un usuario
function eliminarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1); // Eliminar usuario de la lista
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Actualizar la bd de localStorage
    mostrarUsuarios(); // Actualizar la lista en la interfaz
}

// Función para editar un usuario (cargar datos en el formulario)
function editarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

    document.getElementById('nuevoUsuario').value = usuario.username;
    document.getElementById('nuevaPassword').value = usuario.password;
    document.getElementById('rol').value = usuario.rol;
    document.getElementById('indexUsuario').value = index; // Guardar índice del usuario en edición
}
