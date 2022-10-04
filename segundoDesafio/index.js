import fs from 'fs';

import express from "express";
const app = express();
const PORT = 8080;

class Contenedor {
  name = "";
  constructor(name) {
    this.name = `./${name}.txt`;
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.name, "utf-8");
      return data;
    } catch (err) {
      await fs.promises.writeFile(this.name, JSON.stringify([], null, 3));
      return [];
    }
  }

  async save(data) {
    try {
      const items = await this.getAll();
      let id;
      if (items.length === 0) {
        id = 1;
      } else {
        id = items[items.length - 1].id + 1;
      }
      data.id = id;
      items.push(data);
      await fs.promises.writeFile(this.name, JSON.stringify(items, null, 3));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const items = await this.getAll();
      const item = items.find((item) => item.id === id);
      return item;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
        const items = await this.getAll();
        const newitems = items.filter((item) => item.id !== id);
        await fs.promises.writeFile(this.name, JSON.stringify(newitems, null, 3));
    } catch (err) {
        console.log(err);
    }
    
  }


  async deleteAll(){
    try {
        await fs.promises.writeFile(this.name, JSON.stringify([], null, 3));
    } catch (err) {
        console.log(err);
    }
  }
}

const documento = new Contenedor("productos");
documento.save({
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
},
{
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
},
{
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
}
);
app.get('/productos',(req,res)=>{
  let data = documento.getAll()
  console.log(data)
})
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

export  {Contenedor};
