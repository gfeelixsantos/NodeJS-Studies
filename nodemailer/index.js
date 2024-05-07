const nodemailer = require('nodemailer')

const emailGmail = 'felix.devx@gmail.com';
const passGmail = '1416Felix$'

const transporter = nodemailer.createTransport({
    host: 'mail.cmsocupacional.com.br',
    port: 465,
    // secure: true,
    auth:{
        user: 'esocial@cmsocupacional.com.br',
        pass: 'esocial@2021'
    }
});

const mailOptions = {
    from: emailGmail,
    to: 'esocial@cmsocupacional.com.br',
    subject: 'Nodemailer teste de envio',
    html: `<h1>Este é um email teste utilizando nodemailer em NodeJS </h1>😄👍
    <img src="C:\\Users\\FELIX\\Pictures\\LOGO-GRASIFS.png" />`,
    
    attachments: {
        filename: 'MSG.csv',
        contentType: 'text/plain',
        path: __dirname + '/teste.csv',
    }
}

transporter.sendMail(mailOptions, (err, info) => {
    if(err){
        console.error('Falha ao enviar email', err)
    } else {
        console.log('Email enviado com sucesso!', info)
    }
})