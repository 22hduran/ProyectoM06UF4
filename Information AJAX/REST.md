# REST

## ¿Qué es REST?

REST (Representational State Transfer) es un conjunto de interfaces que permiten la comunicación entre sistemas informáticos a través de Internet. Se basa en los principios de la arquitectura REST, que ofrecen una forma estandarizada de construir y acceder a servicios web.

## Principios de arquitectura REST

### 1. Arquitectura Cliente-Servidor

- **Separación de Responsabilidades:** El cliente y el servidor son entidades independientes y cada uno tiene roles específicos en la comunicación.

### 2. Sin Estado (Stateless)

- **Las Solicitudes Son Independientes:** Cada solicitud del cliente al servidor debe contener toda la información necesaria para ser entendida, sin depender de solicitudes anteriores. Esto simplifica la implementación del servidor y mejora la escalabilidad.

### 3. Interfaz Uniforme

- **Recursos Identificados Únicamente:** Cada recurso (como un documento o una imagen) debe ser identificado de manera única a través de URLs.
- **Operaciones Estándar:** Utiliza un conjunto de operaciones estándar como GET, POST, PUT y DELETE para acceder y manipular recursos.
- **Representación de Recursos:** Las representaciones de los recursos (como JSON o XML) deben estar claramente definidas.

### 4. Cacheable

- **Caches Explotables:** Las respuestas del servidor deben ser marcadas explícitamente como cacheables o no-cacheables, permitiendo el uso eficiente de la memoria caché.

### 5. Sistema en Capas

- **Separación de Capas:** El sistema se estructura en capas, con cada capa responsable de una función específica. Esto mejora la modularidad y la flexibilidad del sistema.

## Ejemplo de Uso de REST

Supongamos que tenemos una aplicación de un sistema de gestión de libros. Podríamos utilizar REST para acceder a este sistema desde diferentes clientes, como una aplicación web o móvil.

### Operaciones Comunes:

- **GET /libros:** Recupera una lista de todos los libros disponibles.
- **GET /libros/{id}:** Recupera los detalles de un libro específico.
- **POST /libros:** Añade un nuevo libro a la colección.
- **PUT /libros/{id}:** Actualiza los datos de un libro existente.
- **DELETE /libros/{id}:** Elimina un libro de la colección.

### Ejercicio de prueba:

Ahora supongamos que tenemos una empresa dedicada a vender videojuegos. Quiero que añadas las operaciones necesarias para añadir un nuevo juego, borrar ese juego, volver a añadir un juego, ver una lista de los juegos que tenemos, y buscar el último juego que has añadido por su id.
