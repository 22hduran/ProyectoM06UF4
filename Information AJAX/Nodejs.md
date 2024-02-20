# Node.js

Node.js es un entorno de ejecución de JavaScript que se utiliza para construir aplicaciones de servidor. Fue creado por Ryan Dahl en 2009 y está basado en el motor de JavaScript V8 de Google Chrome. Node.js utiliza un modelo de entrada/salida no bloqueante y orientado a eventos, lo que lo hace ideal para aplicaciones en tiempo real que necesitan manejar una gran cantidad de conexiones simultáneas.

## Características principales

- **JavaScript en el servidor:** Node.js permite a los desarrolladores utilizar JavaScript tanto en el cliente como en el servidor, lo que facilita la creación de aplicaciones web completas con un solo lenguaje de programación.

- **Modelo de entrada/salida no bloqueante:** Node.js permite manejar un gran número de conexiones simultáneas sin utilizar una gran cantidad de recursos.

- **npm:** npm es el gestor de paquetes de Node.js y es utilizado por millones de desarrolladores en todo el mundo para instalar y gestionar dependencias de proyectos. **npm** ofrece acceso a un repositorio con miles de paquetes de código abierto que pueden ser utilizados en proyectos de Node.js.

- **Asincronía:** Node.js se basa en el paradigma de programación asincrónica, lo que significa que las operaciones de entrada/salida no bloqueantes se realizan de manera asíncrona y se manejan mediante callbacks, promesas o async/await.

## Ejemplo de código

A continuación, se muestra un ejemplo de un servidor HTTP simple en Node.js:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello, world!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

```
# Explicación sobre Express.js

Express.js es un framework para Node.js que proporciona una serie de características que facilitan la construcción de aplicaciones web y API REST de manera rápida y sencilla. Express.js es uno de los frameworks más populares para Node.js y es ampliamente utilizado en la industria para la creación de aplicaciones web y API REST.

## Características principales

- **Routing:** Express.js proporciona un sistema de enrutamiento que permite definir las rutas de la aplicación y asociarlas con funciones de controlador que manejan las solicitudes entrantes. Esto facilita la creación de rutas para diferentes endpoints de la API y la definición de acciones específicas para cada ruta.

- **Static Files:** Express.js permite servir archivos estáticos, como imágenes, CSS y JavaScript, desde un directorio específico en el servidor.

- **Error Handling:** Express.js proporciona un sistema de manejo de errores que permite capturar y manejar errores en la aplicación de manera centralizada.

- **Debugging:** Express.js proporciona herramientas de depuración que facilitan la identificación y corrección de errores en la aplicación.

## Ejemplo de uso

A continuación, se muestra un ejemplo básico de cómo crear una aplicación web utilizando Express.js:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Definir una ruta para la página de inicio
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Definir una ruta para una página de contacto
app.get('/contact', (req, res) => {
  res.send('Contact us at contact@example.com');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
