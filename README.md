# Pages

GitHub: https://github.com/HEVERHD/api-back-express

Deploy: https://prueba-tec.onrender.com

# Indice

# Para ejecutar en tu local

1. debes crear un archivo .env en toda la raiz del proyecto con esta informacion : DATABASE_URL=postgres://postgres:heverdj72@localhost:5432/atmr
JWT_KEY=123456

2. ejecutar npm install
3. ejectar npm run serve
4. para vistualizar las tablas,modelos y relaciones usa pdadmin(postgress) o desde la terminar de comandos

<ul>
  <li><a href="#admin-schema-refs">Endpoints</a></li>
  <li><a href="https://prueba-tec.onrender.com/api/product">GET /api/product</a></li>
  <li><a href="https://prueba-tec.onrender.com/api/product">POST /api/product</a></li>
  <li><a href="https://prueba-tec.onrender.com/api/register">GET /api/register/:id</a></li>
  <li><a href="https://prueba-tec.onrender.com/api/register">POST /api/register/:id</a></li>

</ul>


# Cuando pasa una ruta desconocida para el "Servidor"

```javascript
response.status(404).send({ error: "unknown endpoint" });
```

Cuando pasas un "id" no valido va a retornar

```javascript
response.status(400).send({ error: "malformatted id" });
```

Cuando ocurre un error al hacer un PUT o POST con el Schema va a retornar un message relacionado con el error.

```javascript
response.status(400).json({ error: error.message });
```

