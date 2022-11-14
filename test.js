import Contenedor from "./contenedor.js";
const log = (p) => console.log(p);

// new Contenedor('productos.txt')

// DATOS DE PRUEBA

const item1 = {
  title: "Escuadra",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};

const item2 = {
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
};

const item3 = {
  title: "Globo Terráqueo",
  price: 345.67,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
};
const item4 = {
  title: "Escuadra",
  price: 12343,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};

async function main() {
  // creando instancia
  const contenedor = new Contenedor("./productos.txt");

  // Data deberia estar vacia => [] probando el getall y si esta vacio
  let datos1 = await contenedor.getAll();
  log(datos1);

  // Debe tener 1 elemento y retornar 1 (archivo debe crearse )
  let id1 = await contenedor.save(item1);
  log(id1);

  // Debe tener 2 elemento y retornar 2
  let id2 = await contenedor.save(item2);
  log(id2);

  // Data deberia TENER DOS ELEMENTOS PINTADO POR CONSOLA
  let datos2 = await contenedor.getAll();
  log(datos2);

  // BUSCAR POR ID 1  // name deber ser escuadra
  let busca1 = await contenedor.getByID(1);
  log(busca1);

  // BUSCAR POR ID 2 q no existe
  let busca2 = await contenedor.getByID(10);
  log(busca2);

  // Debe salir un mensaje de error
  let id3 = await contenedor.save(item4);
  log(id3);

  /*   // BORRAR EL ID 1, deberia de tener 1 elemento, solamente el id 2
  await contenedor.deleteById(1);
  let delete1 = await contenedor.getAll();
  log(delete1);

  // BORRAR TODO NO deberia DE TENER ELEMENTOS
  await contenedor.deleteAll();
  let delete2 = await contenedor.getAll();
  log(delete2); */
}

main();
