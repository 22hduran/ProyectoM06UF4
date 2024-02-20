# Fetch


# Introducción a Fetch API y sus funcionalidades

La Fetch API es una interfaz moderna para realizar solicitudes de red en navegadores web y entornos Node.js. Proporciona una forma más poderosa y flexible de trabajar con recursos remotos en comparación con las técnicas tradicionales basadas en XMLHttpRequest (XHR).

## Características Principales

- **Simplicidad**: La Fetch API ofrece una sintaxis simple y fácil de entender, lo que facilita la realización de solicitudes HTTP.
- **Promesas**: Las solicitudes Fetch devuelven promesas, lo que permite un código más limpio y menos anidado en comparación con los callbacks.
- **Soporte nativo para JSON**: Fetch API convierte automáticamente las respuestas JSON en objetos JavaScript, simplificando el procesamiento de datos.
- **Control de CORS**: La Fetch API ofrece un control granular sobre las políticas de CORS (Cross-Origin Resource Sharing), lo que permite manejar las solicitudes entre dominios de manera segura.
- **Personalizable**: Permite configurar encabezados personalizados, autenticación y otras opciones de solicitud para adaptarse a las necesidades específicas de la aplicación.

## Uso Básico

**Crear (Create)**

```jsx
const url = 'https://api.example.com/usuarios';

const nuevoUsuario = {
  nombre: 'Juan',
  apellido: 'Pérez',
  edad: 30
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(nuevoUsuario)
})
.then(response => response.json())
.then(data => console.log('Usuario creado:', data))
.catch(error => console.error('Error al crear usuario:', error));

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
