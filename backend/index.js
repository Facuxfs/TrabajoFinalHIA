const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoose } = require('./database');
var app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

// Cargamos el modulo de direccionamiento de rutas

app.use('/api/admin', require('./routes/admin.route.js'));
app.use('/api/resenia', require('./routes/resenia.route.js'));

app.use('/api/gestor', require('./routes/gestor.route.js'));
app.use('/api/usuario', require('./routes/usuario.route'));
app.use('/api/turismo', require('./routes/login.route'));

app.use('/api/resenia', require('./routes/resenia.route.js'));
app.use('/api/servicio', require('./routes/servicio.route.js'));
app.use('/api/reserva', require('./routes/reserva.route.js'));


app.use('/api/correo', require('./routes/correoRoute'));

app.set('port', process.env.PORT || 3000);

app.listen(3000,() => {});
// app.listen(app.get('port'), () => {
//     console.log(`Server started on port`, app.get('port'));
// });
