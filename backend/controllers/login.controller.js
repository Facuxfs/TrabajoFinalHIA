const jwt = require('jsonwebtoken');
const Usuario= require('../models/usuario');
const Gestor= require('../models/gestor');
const Admin = require('../models/admin');
const loginCtl={};

 
loginCtl.loginUsuario = async (req, res) => {
    const criteria = {
      username: req.body.username,
      password: req.body.password
    };
  
    try {
      const user = await Usuario.findOne(criteria);
      if(user){
        const untoken= jwt.sign({id:user._id},"secretkey")
        res.json({
          status: "1",
          msg: "Encontrado",
          userName: user.username,
          password: user.password,
          tipo:"user",
          userId: user._id,
          token: untoken
        });
      }else{
        const gest=await Gestor.findOne(criteria);
        if(gest){
          const untoken= jwt.sign({id:gest._id},"secretkey")
          res.json({
            status: "1",
            msg: "Encontrado",
            userName: gest.username,
            password: gest.password,
            tipo:"gest",
            userId: gest._id,
            token:untoken
          });
        }else{
          const admin = await Admin.findOne(criteria);
          if(admin){
            const untoken= jwt.sign({id:admin._id},"secretkey");
            res.json({
              status: "1",
              msg: "Encontrado",
              userName: admin.username,
              password: admin.password,
              tipo:"admin",
              userId: admin._id,
              token:untoken
            });
          }else{
          res.json({
            status: "0",
            msg: "Usuario no encontrado"
          });
        }
        }
      }
    } catch (err) {
      res.json({
        status: "0",
        msg: "error: "+err
      });
    }
  }; 

module.exports = loginCtl;

