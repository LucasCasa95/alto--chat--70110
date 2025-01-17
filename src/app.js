//CHAT COMUNITARIO - PROGRAMACIÓN BACKEND

//Si quieren: npm i nodemon -D
//INSTALAMOS: npm i express express-handlebars socket.io

import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
const app = express(); 
const PUERTO = 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public")); 

//Configuramos Express-Handlebar
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.get("/", (req, res) => {
    res.render("index");
})

//Listen
//Me guardo una referencia del servidor
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`); 
});

//Creamos un array para almacenar los mensajes
const messages = []

//Generamos una instancia del Socket.io del lado del backend

const io = new Server(httpServer)

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado")
    socket.on("message", (data) => {
        messages.push(data)
        //Emitimos mensaje para el cliente con todo el array de datos:
        io.emit("messagesLogs", messages)
    })
    
})