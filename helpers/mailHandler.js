
const nodemailer = require("nodemailer")
const path = require('path');
var fs = require('fs');
var handlebars = require('handlebars');

let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'gianzolla9@gmail.com',
      pass: 'mbTFthYasqVcynH1',
    },
}); 

const readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

const sendMailVerification = async(to, code) => {
    try{
    let appDir = path.dirname(require.main.filename);
    
    readHTMLFile(appDir+'/public/template/verifikasi_email.html', function(err, html) {
        var template = handlebars.compile(html);

        var replacements = {
             code: code,
        };
        var htmlToSend = template(replacements);
        
        let mailOptions = {
            from: 'Testing Glory <no-reply-giannugraha76@gmail.com>',
            to: to,
            subject: 'Rolling Glory - Registration',
            html: htmlToSend
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log('error email');
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
    return true
}
catch(e){
    throw e
}
    
};

module.exports = {
    sendMailVerification
};