const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: '',
    port: 465,
    // secure: true,
    auth:{
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

const mailOptions = {
    from: '...email from.....',
    to: EMAIL_USER,
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