import fs from 'fs';

import express from "express";
const app = express();
const PORT = 8080;

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;

    this.contador = 0;

    this.array = [];
  }

  save(obj) {
    try {
      this.contador++;

      obj.id = this.contador;

      this.array.push(obj);

      fs.writeFileSync(this.nombre, JSON.stringify(this.array));
    } catch (err) {
      console.log("No se pudo guardar el archivo");
    }
  }

  getById(id) {
    try {
      const productos = this.getAll();

      return productos.find((producto) => id == producto.id);
    } catch (error) {
      console.log(error);
    }
  }

  getAll() {
    try {
      const contenido = fs.readFileSync(this.nombre);

      return JSON.parse(contenido);
    } catch (error) {
      console.log("No se pudo leer el archivo");
    }
  }

  deleteById(id) {
    try {
      const contenido = fs.readFileSync(this.nombre);

      const archivo = JSON.parse(contenido);

      let filtrado = archivo.filter((producto) => producto.id !== id);

      fs.writeFileSync(this.nombre, JSON.stringify(filtrado));

      return "id eliminado" + id;
    } catch (error) {
      console.log("Error: ", error);

      console.log("No se encuentra lo solicitado");
    }
  }
    async  getRandom() {  try {    

    const elements = await this.getAll();
    
      const foundElement = elements[Math.floor(Math.random() * elements.length)]
    
     return foundElement;  } catch (error) {   console.log(error);  } }

  deleteAll() {
    fs.writeFileSync(this.nombre, JSON.stringify([]));
  }
  
}

const documento = new Contenedor("productos");
const randomFunction=(limite)=>{
  return parseInt(Math.random()*limite) + 1
}
app.get("/productos",async (req,res)=>{

  let data = await documento.getAll()
  res.send(data)
  
  })
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
app.get('/productoRandom', async (req, res) => {
  res.send(await documento.getRandom())})
export  {Contenedor};
