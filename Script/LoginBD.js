
const IncioSesion = document.getElementById('IncioSesion');

IncioSesion.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const username = document.getElementById('Usuario').value;
    const password = document.getElementById('password').value;

    
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica si no hay usuarios creados por ser primera vez
    if (usuarios.length === 0) {
        
        const adminUser = {
            username: 'admin',
            password: '1234',
            rol: 'admin'
        };

        // Agregar el usuario admin a la lista de usuarios 
        usuarios.push(adminUser);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));   
        return; // Finaliza aquí para que no siga con la lógica de inicio de sesión
    }

    // Verificar si las credenciales existen en el array de usuarios
    const usuarioEncontrado = usuarios.find(usuario => usuario.username === username && usuario.password === password);

    if (usuarioEncontrado) {
        // Verificar si el usuario tiene rol de "admin"
        if (usuarioEncontrado.rol === 'admin') {
            alert('¡Bienvenido Administrador!');
            // Redirigir a la página de administración
            window.location.href = 'PaginaAdmin.html';
        } else {
            alert('¡Bienvenido Usuario!');
            // Redirigir a la página de usuario normal
            window.location.href = 'Punto2.html';
        }
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});
