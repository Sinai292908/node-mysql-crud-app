const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 5000;

// crear conexión a la base de datos
// la función mysql.createConnection toma un objeto de configuración que contiene el host, el usuario, la contraseña y el nombre de la base de datos.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'socka'
});

// conectarse a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configurar  middleware
app.set('port', process.env.port || port); // configurar express para usar este puerto
app.set('views', __dirname + '/views'); // configure express para buscar en esta carpeta para representar nuestra vista
app.set('view engine', 'ejs'); // configurar el motor de plantillas
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //analizar cliente de datos de formulario
app.use(express.static(path.join(__dirname, 'public'))); // configurar express para usar la carpeta pública
app.use(fileUpload()); // configurar la carga de archivos

// routes para la aplicación

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);


// configurar la aplicación para escuchar en el puerto

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});