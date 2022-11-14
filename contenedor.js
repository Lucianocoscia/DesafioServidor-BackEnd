import fs from "fs";

class Contenedor {
  // Constructor que recibe el nombre del archivo productos.txt
  constructor(ruta) {
    this.ruta = ruta;
  }

  // Save(object)
  // TODO: Q NO SE REPITA EL OBJECT
  async save(obj) {
    // Obtenemos todos los objetos
    const listado = await this.getAll();

    // si existe el producto no agregar nada
    if (listado.length > 0 && listado.some((el) => el.title === obj.title)) {
      // throw new Error(`el producto ya se encuentra en el catalogo`);
      console.log("el producto ya se encuentra en el catalogo");
      return;
    }

    // Indentificamos el ultimo id y lo incrementamos
    // let id = listado.length + 1;
    let nuevoId;

    // Manejar dos casos
    //  Caso 1 no hay data

    if (listado.length == 0) {
      nuevoId = 1;
    }
    //  Caso dos  si hay data [...] [1] => 0
    else {
      nuevoId = listado[listado.length - 1].id + 1;
    }

    // Asignar el nuevo id a mi objeto
    const nuevoObjConId = { ...obj, id: nuevoId };

    //Insertar mi objeto al listado
    listado.push(nuevoObjConId);

    // Lo guardamos usando fs  y try catch
    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify(listado, null, 2));
      return nuevoId;
    } catch (error) {
      //Todo error
      throw new Error(`Error al guardar un nuevo objeto ${error}`);
    }
  }

  // FUNCION GETALL
  // Funcion para obtener los objetos usando async await
  // Asumimos q tenemos el txt y que tiene data

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.ruta, "utf8");
      return JSON.parse(data);
    } catch (error) {
      // Todo: ERROR
      return [];
    }
  }

  // Para el desafio crear servidor
  async getRandom() {
    try {
      const data = await fs.promises.readFile(this.ruta, "utf8");
      const parseoData = JSON.parse(data);
      return parseoData[Math.floor(Math.random() * parseoData.length)];
    } catch (error) {
      return [];
    }
  }
  // FUNCION GETBYID
  //  Funcion para obtener un objeto por ID
  //TODO : validar que deevuelva el null

  async getByID(id) {
    try {
      const listado = await this.getAll();
      return listado.find((item) => item.id === id) ?? null;
    } catch (error) {
      // TODO: VALIDAR  dead code -
      throw new Error(`No se encontro el dato: ${error}`);
    }
  }

  // FUNCION DELETEBYID

  async deleteById(id) {
    const listado = await this.getAll(); /* [] */

    // Filtramos el id
    const nuevoListado = listado.filter((item) => item.id !== id);

    // Sobreescribimos la data
    try {
      await fs.promises.writeFile(
        this.ruta,
        JSON.stringify(nuevoListado, null, 2)
      );
    } catch (error) {
      throw new Error(`No se  pudo borrar la data: ${error}`);
    }
  }

  // FUNCION DELETEALL
  //  Funcion para borrar todo
  // Asumimos q tenemos el txt y que tiene data

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error(`No se  pudo borrar la data: ${error}`);
    }
  }
}

// module.exports = Contenedor;
export default Contenedor;
