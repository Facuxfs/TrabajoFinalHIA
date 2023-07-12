const loginCtl = require('../controllers/login.controller');

const express = require('express')
const route = express.Router();

route.post("/login",loginCtl.loginUsuario);

module.exports=route;
