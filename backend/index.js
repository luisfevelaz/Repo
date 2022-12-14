//Credenciales para acceder a amazon s3
const AWS_ACCESS_KEY = 'AKIAXTJR7ARIW7M7ZXUQ';
const AWS_SECRET_ACCESS_KEY = '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';


const fs = require('fs');
const AWS = require('aws-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const cors = require('cors');
const nodemailer = require('nodemailer');
const configMensaje = require('./configMensaje');

var app = express();
app.use(cors())
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'repo',
  port:3306
});

var connectionValidator = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'repo',
  port:3306
});

const puerto = 3000;

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const multiPartMiddleware = multipart();

app.listen(puerto,()=>{
    console.log("Servidor corriendo en el puerto ",puerto);
});



app.get('/documento', async(req, res) => {
  try {
      connection.query("SELECT * from documento where aprobado=1;",(error,results,fields) =>{
        if(error){
          console.log(error);
          res.json({"response":500});
        }else{
          res.json({"response":200,"results": results});
        }
      });
  } catch (error) {
      console.log(error);
  }
})
app.get('/documentoCompleto', async(req, res) => {
  try {
      connection.query("SELECT * from documento;",(error,results,fields) =>{
        if(error){
          console.log(error);
          res.json({"response":500});
        }else{
          res.json({"response":200,"results": results});
        }
      });
  } catch (error) {
      console.log(error);
  }
})

app.post('/documentoID', async(req,res)=>{
  try{
    connection.query(`SELECT * FROM documento where id = ${req.body.id};`,(error,results,fields) =>{
      if(error){
        console.log(error);
      }else{
        
        if(results.length > 0){
          // console.log(results[0].id);
          res.json({"response": 200, "result": "User registered successfuly","documento": results[0]});
        }else{
          res.json({"response": 500,"result": "The user/password is wrong"});
        }
      }
    });
  }catch (error) {
    console.log(error);
  }
});

app.put('/documentoAprobado', async(req,res)=>{
  try{
    connection.query(`UPDATE documento SET aprobado=${req.body.aprobado} where id=${req.body.id};`,(error,results,fields) =>{
      if(error){
        console.log(error);
      }else{
        
        if(results.length > 0){
          // console.log(results[0].id);
          res.json({"response": 500, "result": "the documento could not be modified"});
        }else{
          res.json({"response": 200, "result": "the document was modified"});
        }
      }
    });
  }catch (error) {
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
          res.json({"response": 500,"result":"Update error"});
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
      connection.query(`SELECT id,username,nombre,is_admin FROM usuario where username = "${req.body.username}" and contra = "${req.body.password}";`,(error,results,fields) =>{
        if(error){
          console.log(error);
        }else{
          
          if(results.length > 0){
            // console.log(results[0].id);
            res.json({"response": 200, "result": "successful login ","idUser": results[0].id,"username": results[0].username,"nombre": results[0].nombre,"isAdmin":results[0].is_admin});
          }else{
            res.json({"response": 500,"result": "The user/password is wrong"});
          }
        }
      });
  } catch (error) {
      console.log(error);
  }
})

app.post('/user', async(req,res) => {
  try{
    connectionValidator.query(`SELECT * FROM usuario WHERE username = "${req.body.username}";`,(error,results,fields) =>{
      if(error){
        console.log(error);
      }else{
        if(results.length > 0){
          res.json({"response":500, "result":"The user already exists"});
        }else{
          connection.query(`INSERT INTO usuario (nombre,apellido_p,apellido_m,is_admin,username,contra)
          values("${req.body.nombre}",${req.body.apellidoP},${req.body.apellidoM},${req.body.isAdmin},"${req.body.username}","${req.body.password}");`,
          (error,results,fields) =>{
            if(error){
              console.log(error);
            }else{
              if(results.length > 0){
                res.json({"response": 500, "result": "the user could not be registered"});
              }else{
                res.json({"response": 200, "result": "User registered successfuly"});
              }
            }
          });
        }
      }
    });
  }catch (error) {
      console.log(error);
  }
});

app.put('/user', async(req,res) => {
  try{
    connection.query(`SELECT * FROM usuario WHERE username="${req.body.username}";`,(error,results,fields) =>{
      if(error){
        console.log(error);
      }else{
        if(results.length > 0){
          res.json({"response":500, "result":"The new username already exists"});
        }else{
          connection.query(`UPDATE usuario SET nombre = "${req.body.nombre}",username = "${req.body.username}",contra = "${req.body.password}";`,
          (error,results,fields) =>{
            if(error){
              console.log(error);
            }else{
              if(results.length > 0){
                res.json({"response": 500, "result": "the user could not be modified"});
              }else{
                res.json({"response": 200, "result": "User modified"});
              }
            }
          });
        }
      }
    });
  }catch (error) {
      console.log(error);
  }
});



app.post('/userData',async(req,res)=>{
  try{
    connection.query(`SELECT nombre, username, contra FROM usuario where id=${req.body.idUser};`,
    (error,results,fields) =>{
      if(error){
        console.log(error);
      }else{
        if(results.length > 0){
          res.json({"response": 200, "result": "User registered successfuly","userInfo": results[0]});
        }else{
          res.json({"response": 500,"result": "Server Error"});
        }
      }
    });
  }catch (error) {
      console.log(error);
  }

});

// PRUEBAS PARA EL ALMACENAMIENTO EN S3
app.post('/uploadDocs',multiPartMiddleware, async(req,res)=>{
  try{
    connection.query(`SELECT * FROM documento WHERE ruta="${req.files.file.originalFilename}";`,(error,results,fields) => {
      if(error){
        console.log(error);
      }else{
        if(results.length > 0){
          res.json({"response":500, "result":"The document already exists"});
        }else{
          const llave = req.files.file.originalFilename;
          const content = fs.readFileSync(req.files.file.path);
          const params = {
            Bucket: 'piperepo-mx',
            Key: llave,
            Body: content,
            ContentType:"application/pdf"
          }
          // console.log(params);
          s3.upload(params, function(s3Err, data) {
            if (s3Err){
              console.log("ERROR: \n",s3Err);
              res.json({"response":500,"result": "Error while uploading the file"});
            }
          });
          connection.query(`INSERT INTO documento (nombre,autor,materia,ruta,id_us) values
          ("${req.body.nombre}","${req.body.autor}","${req.body.materia}","${llave}","${req.body.idUser}")`,(error,results,fields)=>{
            if(error){
              console.log(error);
            }else{
              if(results.length > 0){
                res.json({"response": 500,"result": "Database error"});
              }else{
                res.json({"response": 200,"result": "Successful upload"});
              }
            }
          });
        }
      }
    });
  }catch(error){

  }

  
});

app.get('/docs', async(req,res)=>{
  const params = {
    Bucket: 'piperepo-mx',
    Key: 'UNIDAD TEMÁTICA XII.pdf'
  }
  // s3.getObject(params, function(err,data){
  //   if(err){
  //     console.log(err);
  //   }
  //   var object =
  //   console.log(object);
  // });
  res.attachment('UNIDAD TEMÁTICA XII.pdf');
  var fileStream = s3.getObject(params).createReadStream();
  console.log(fileStream);
  res.send({"message":"Hello World!"});

});

app.post('/formulario', (req, res) => {
  configMensaje(req.body);
  res.status(200).send();
});

connection.connect();