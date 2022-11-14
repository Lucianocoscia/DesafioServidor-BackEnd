import express from "express";
import Contenedor from "./contenedor.js";
const app = express();
const PORT = 8080;

const contenedor = new Contenedor("./productos.txt");

app.get("/", async (req, res) => {
  res.send(
    "<h1> Hay que agregar rutas /productos y /productoRandom para ver funcionalidad</h1>"
  );
});
app.get("/productos", async (req, res) => {
  //   res.send("[productos]");

  res.send(await contenedor.getAll()); //me trae todos los productos de productos.txt
});
app.get("/productoRandom", async (req, res) => {
  //   res.send("Producto random");
  res.send(await contenedor.getRandom()); // me trae un producto random de productos.txt
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
