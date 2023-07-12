//manejador
const jwt = require('jsonwebtoken');

const authCtl = {}

authCtl.verifyToken = async (req, res, next) => {
    //las llamadas a la API debieran tener un header authorization
    if (!req.headers.authorization) {
        res.json({ 'status': '0', 'msg': ' 1. Unauthorized request' })
        return;
    }

    var arrayTexto = req.headers.authorization.split(' ');
    var token = null;
    (arrayTexto.length >= 2) ? token = arrayTexto[1] : token = null;
    if (token == null) {
        res.json({ 'status': '0', 'msg': '2. Unauthorized request.' });
    } else {
        try {             
            const payload = jwt.verify(token, "secretkey");
            //payload retorna la información del user que se uso en el método de login
            req.userId = payload._id;
            
            next(); //se pasa a procesar el siguiente método del stack de la peticion

            
        } catch (error) {
            res.json({ 'status': '0', 'msg': '3. Unauthorized request.' });
        }
    }
}

module.exports = authCtl;