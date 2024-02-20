# Fetch
# Introducción a Fetch API y sus funcionalidades

La Fetch API es una interfaz moderna para realizar solicitudes de red en navegadores web y entornos Node.js. Proporciona una forma más poderosa y flexible de trabajar con recursos remotos en comparación con las técnicas tradicionales basadas en XMLHttpRequest (XHR).

## Características Principales

- **Simplicidad**: La Fetch API ofrece una sintaxis simple y fácil de entender, lo que facilita la realización de solicitudes HTTP.
- **Promesas**: Las solicitudes Fetch devuelven promesas, lo que permite un código más limpio y menos anidado.
- **Soporte nativo para JSON**: Fetch API convierte automáticamente las respuestas JSON en objetos JavaScript, simplificando el procesamiento de datos.
- **Control de CORS**: La Fetch API ofrece un control granular sobre las políticas de CORS (Cross-Origin Resource Sharing), lo que permite manejar las solicitudes entre dominios de manera segura.
- **Personalizable**: Permite configurar encabezados personalizados, autenticación y otras opciones de solicitud para adaptarse a las necesidades específicas de la aplicación.

## Uso Básico

**Crear (Create)**

```jsx
// Definición de la URL de la API
const url = 'https://api.example.com/usuarios';

// Definición de los datos del nuevo usuario
const nuevoUsuario = {
  nombre: 'Juan',
  apellido: 'Pérez',
  edad: 30
};

// Realización de una solicitud POST a la URL especificada
fetch(url, {
  method: 'POST', // Método de la solicitud: POST (creación de un nuevo recurso)
  headers: {
    'Content-Type': 'application/json' // Encabezados de la solicitud, indicando que el cuerpo es JSON
  },
  body: JSON.stringify(nuevoUsuario) // Cuerpo de la solicitud, convertido a JSON
})
// Manejo de la respuesta de la solicitud
.then(response => response.json()) // Convertir la respuesta a JSON
.then(data => console.log('Usuario creado:', data)) // Imprimir los datos del usuario creado en la consola
// Manejo de errores
.catch(error => console.error('Error al crear usuario:', error)); // Imprimir errores en la consola

```

**Leer (Read)**

```jsx
const url = 'https://api.example.com/usuarios';

fetch(url)
.then(response => response.json())
.then(data => console.log('Usuarios:', data))
.catch(error => console.error('Error al obtener usuarios:', error));

```

**Actualizar (Update)**

```jsx
const usuarioId = 123;
const url = `https://api.example.com/usuarios/${usuarioId}`;

const datosActualizados = {
  nombre: 'Carlos',
  apellido: 'Gómez',
  edad: 35
};

fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(datosActualizados)
})
.then(response => response.json())
.then(data => console.log('Usuario actualizado:', data))
.catch(error => console.error('Error al actualizar usuario:', error));

```

**Eliminar (Delete)**

```jsx
const usuarioId = 123;
const url = `https://api.example.com/usuarios/${usuarioId}`;

fetch(url, {
  method: 'DELETE'
})
.then(response => {
  if (response.ok) {
    console.log('Usuario eliminado exitosamente');
  } else {
    console.error('Error al eliminar usuario:', response.status);
  }
})
.catch(error => console.error('Error al eliminar usuario:', error));
```

### Ejercicio: Creación de una Lista de Tareas (To-Do List) con Fetch

Crear una aplicación web simple que permita a los usuarios agregar, eliminar y marcar como completadas tareas en una lista de tareas utilizando la API Fetch para interactuar con un backend simulado.
