import express from 'express'; // Using sucrase to implements this syntax..

import routes from "./routes"; // Using sucrase to implements this syntax..

import './database';
class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json()); //Permite o tratamento do formato JSON com o Express.
  }

  routes() {
    this.app.use(routes); //Utilizar das rotas criadas no arquivo routes.js
  }
}

export default new App().app; // Using sucrase to write this syntax.
