const { query } = require('express');
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
      connection.query("SELECT id,nombre,ruta from documento;",(error,results,fields) =>{
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

app.post('/documento',async(req,res)=>{
  try{
    connection.query(`INSERT INTO documento (nombre,autor,materia,ruta,id_us) values
    (${req.body.nombre},${req.body.user},${req.body.materia},${req.bosy.ruta},${req.body.idUsuario})`,(error,results,fields)=>{
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

app.put('/documento',async(req,res) =>{
  try{
    let sentencia = `UPDATE FROM docuemnto SET autor = ${req.body.user}`;
    if(req.body.nombre != null ){
      sentencia += `,nombre = ${req.body.nombre}`;
    }
    if(req.body.materia != null){
      sentencia += `,materia = ${req.body.materia}`;
    }
    if(req.body.ruta != null){
      sentencia += `,ruta = ${req.body.ruta}`; 
    }
    sentencia+=` WHERE id = ${req.body.id};`;

    connection.query(sentencia,(error,results,fields) =>{
      if(error){
        console.log(erro);
      }else{
        if(results.length > 0){
          res.json({"response": 200,"result":"Successful update"});
        }else{
          res.json({"reponse": 500,"result":"Update error"});
        }
      }
  });
  }catch(error){
    console.log(error);
  }
});

app.delete('/documento',async(req,res) => {
  try{
    if(req.body.id != null){
      connection.query(`DELETE FROM documento where id = ${req.body.id}`,(error,results,fields) => {
        if(error){
          console.log(error);
        }else{
          if(results.length > 0){
            res.json({"response": 200,"result": "Row deleted"});
          }else{
            res.json({"response": 500,"result": "Error while deleting"})
          }
        }
      });
    }
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