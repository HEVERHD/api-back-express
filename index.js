const express = require("express");
const app = express();
const path = require("path");

//configuraciones de express
app.set("port", 3000);

//middlewares para acceder a los datos estaticos
app.use(express.static(path.join(__dirname, "public")));


//rutas
app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.listen(app.get("port"), () => {
  console.log(`App is running on port ${app.get("port")}`);
});