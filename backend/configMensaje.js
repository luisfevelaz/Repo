const nodemailer = require('nodemailer');
module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: 'criizec@gmail.com', 
 pass: 'zoixwufxgfocqijk' 
 }
 });
const mailOptions = {
 from: `"${formulario.nombre}" <${formulario.email}>`,
 to: 'luisfevelaz00@gmail.com', // Cambia esta parte por el destinatario
 subject: 'Problemas con PipeRepo',
 html: `
 <strong>Nombre:</strong> ${formulario.name+" "+formulario.last} <br/>
 <strong>E-mail de quien te contacto:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.mensaje}
 `
 };
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}