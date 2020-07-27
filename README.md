# grupo_2_cursala


Cursala es un sitio de venta on-line de cursos de cocina.

Cursala esta orientado a cualquier persona, empresa y/u organizacion que desee mejorar sus habilidades y acceder a un recurso educativo para adquirir nuevos conocimientos

Algunos sitios de referencia que hemos tomado son:
l'atelier des chefs.



27/06/2020
ENTREGA SPRINT 4, 5, 6:

CREACION DE LA BBD => migration y seeders
// MODO ADMIN logearse con admin@admin.com PASSWORD: admin

Un WARNING aparece en la terminal al cerrar la session que no se a que no interpreto:

CERRAR SESION
GET /users/logout 302 2.389 ms - 54
GET /users/login 200 6.302 ms - 4145
Executing (default): SELECT `id`, `userId`, `token`, `expiresAt` FROM `tokens` AS `Token` WHERE `Token`.`token` = '$2a$04$Bs5uXtxjtz003Di.n43F8.uQN4wqWsPTBqzvFzX6wQ9Dk/.9Fq7gC' LIMIT 1;
GET /stylesheets/login.css 304 3.960 ms - -
GET /stylesheets/header.css 304 10.309 ms - -
GET /stylesheets/footer.css 304 10.873 ms - -
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (_http_outgoing.js:526:11)
    at ServerResponse.header (C:\Users\mirei\JSmireilleDH\grupo_2_cursala\node_modules\express\lib\response.js:767:10)
    at ServerResponse.append (C:\Users\mirei\JSmireilleDH\grupo_2_cursala\node_modules\express\lib\response.js:728:15)
    at ServerResponse.res.cookie (C:\Users\mirei\JSmireilleDH\grupo_2_cursala\node_modules\express\lib\response.js:853:8)
    at C:\Users\mirei\JSmireilleDH\grupo_2_cursala\site\services\loginService.js:33:25 {
  code: 'ERR_HTTP_HEADERS_SENT'
}
GET /js/login.js 304 17.447 ms - -
GET /images/logo.png 304 0.762 ms - -




