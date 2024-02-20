# ProyectoM06UF4

# API REST: Una Introducció

## Què és una API REST?

Una API REST (Representational State Transfer) és un conjunt d'interfícies que permeten la comunicació entre sistemes informàtics a través d'Internet. Es basa en els principis de l'arquitectura REST, que ofereixen una forma estandarditzada de construir i accedir a serveis web.

## Principis Clau de REST

### 1. Arquitectura Client-Servidor
- **Separació de Responsabilitats:** El client i el servidor són entitats independents i cadascun té rols específics en la comunicació.

### 2. Sense Estat (Stateless)
- **Les Sol·licituds Són Independents:** Cada sol·licitud del client al servidor ha de contenir tota la informació necessària per ser entesa, sense dependre de sol·licituds anteriors. Això simplifica la implementació del servidor i millora l'escalabilitat.

### 3. Interfície Uniforme
- **Recursos Identificats Únicament:** Cada recurs (com ara un document o una imatge) ha de ser identificat de manera única a través d'URLs.
- **Operacions Estàndard:** Utilitza un conjunt d'operacions estàndard com GET, POST, PUT i DELETE per accedir i manipular recursos.
- **Representació de Recursos:** Les representacions dels recursos (com ara JSON o XML) han d'estar clarament definides.

### 4. Cacheable
- **Caches Explotables:** Les respostes del servidor han de ser marcades explícitament com a cacheables o no-cacheables, permetent l'ús eficient de la memòria cau.

### 5. Sistema en Capes
- **Separació de Capes:** El sistema s'estructura en capes, amb cada capa responsable d'una funció específica. Això millora la modularitat i la flexibilitat del sistema.

## Exemple d'Ús de REST API

Suposem que tenim un sistema de gestió de llibres. Podríem utilitzar una API REST per accedir a aquest sistema des de diferents clients, com ara una aplicació web o mòbil.

### Operacions Bàsiques:

- **GET /llibres:** Recupera una llista de tots els llibres disponibles.
- **GET /llibres/{id}:** Recupera els detalls d'un llibre específic.
- **POST /llibres:** Afegeix un nou llibre a la col·lecció.
- **PUT /llibres/{id}:** Actualitza les dades d'un llibre existent.
- **DELETE /llibres/{id}:** Elimina un llibre de la col·lecció.

Aquestes operacions segueixen els principis de REST, permetent una comunicació eficient i flexible entre els clients i el servidor.

Amb una comprensió bàsica d'API REST i els seus principis, pots començar a dissenyar i implementar serveis web robustos i escalables. Segueix explorant i practicant per dominar aquesta poderosa tecnologia!
