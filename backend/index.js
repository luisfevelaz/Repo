const AWS_ACCESS_KEY ='AKIAXTJR7ARIU2HS2ZFH';
const AWS_SECRET_ACCESS_KEY='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';


const fs = require('fs');
const AWS = require('aws-sdk');
const express = require('express');
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty');

var app = express();

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'repo'
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

  const fileName = req.body.ruta;
  const llave = req.body.nombre+'.pdf';
  fs.readFile(fileName,(err,data) =>{
    if(err){
      throw err;
    }
    const params = {
      Bucket: 'piperepo-mx',
      Key: llave,
      Body: JSON.stringify(data,null,2)
    }
    s3.upload(params, function(s3Err,data){
      if(s3Err) throw s3Err
      console.log("Archivo subido exitosamente");
    })
  });


  try{
    connection.query(`INSERT INTO documento (nombre,autor,materia,ruta,id_us) values
    ("${req.body.nombre}","${req.body.user}","${req.body.materia}","${llave}","${req.body.idUsuario}")`,(error,results,fields)=>{
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
      connection.query(`SELECT username FROM usuario where username = "${req.body.username}" and contra = "${req.body.password}";`,(error,results,fields) =>{
        if(error){
          console.log(error);
        }else{
          console.log(results);
          if(results.length > 0){
            console.log(results);
            res.json({"response": 200, "result": "User registered successfuly"});
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
  }catch (error) {
      console.log(error);
  }
});


app.post('/uploadDocs',multiPartMiddleware, async(req,res)=>{
  console.log(req.files.file);
  const content = fs.readFileSync(req.files.file.path);
  const params = {
    Bucket: 'piperepo-mx',
    Key: req.files.file.originalFilename,
    Body: content
  }
  console.log(params);
  s3.upload(params, function(s3Err, data) {
    if (s3Err){
      console.log("ERROR: \n",s3Err);
      res.send({"response":500})
    }
    console.log(`File uploaded successfully`);
    res.send({"response":200});
  });

  // res.send({"response":200});
  
});

connection.connect();