var express = require('express');
var app = express();

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'repositorio'
});

const puerto = 3000;

app.listen(puerto,()=>{
    console.log("Servidor corriendo en el puerto ",puerto);
});

app.get('/documento', async(req, res) => {
  try {
      connection.query("SELECT nombre ruta from documento;",(error,results,fields) =>{
        if(error){
          console.log(error);
        }else{
          res.send(results);
        }
      });
  } catch (error) {
      console.log(error);
  }
})

app.get('/documento', async(req, res) => {
  try {
      connection.query("SELECT nombre ruta from documento;",(error,results,fields) =>{
        if(error){
          console.log(error);
        }else{
          res.send(results);
        }
      });
  } catch (error) {
      console.log(error);
  }
})

app.post('/docuemnto',async(req,res)=>{
  try{
    connection.query(`INSERT INTO documento (nombre,autor,materia,ruta,id_us) values
    (${req.body.nombre},${req.body.user},${req.body.materia},${req.body.idUsuario})`,(error,results,fields)=>{
      if(error){
        console.log(error);
      }else{
        if(results.length > 0){
          res.json({"response": 200,"result": "Successful upload"});
        }
      }
    });
  }catch(error){
    console.log(error);
  }
});

app.post('/login', async(req, res) => {
  try {
      connection.query(`SELECT username where username = ${req.body.username} and contra = ${req.body.password};`,(error,results,fields) =>{
        if(error){
          console.log(error);
        }else{
          if(results.length > 0){
            res.json({"response": 200,"result": "Successful login"});
          }
        }
      });
  } catch (error) {
      console.log(error);
  }
})


connection.connect();