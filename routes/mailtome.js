const mailer = require ('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const {Hello} = require("./hello_template.js");
const {Thanks} = require("./hello_template.js");
require('dotenv').config({ path: '/Users/karvangum/projects/Portfolio/.env' });

const getEmailData = (to, message, template)=> {
    let data = null;
    switch(template){
        case "hello":
                data = {
                    from: "newtonvithi@gmail.com",
                    to:"newtonvithi@gmail.com",
                    subject: `Please include to your world ${to}`,
                    html: Hello(message)
                }
                break;
        case "thanks":
            data = {
                from: "newtonvithi@gmail.com",
                to: "newtonvithi@gmail.com",
                subject: 'Portfolio Message',
                html: Thanks()
            }
            break;
        default:
            data;
    }
    return data;
}

    


const sendEmail = async (to, message, type) => {
    
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      )
      
      oauth2Client.setCredentials({
          refresh_token: process.env.REFRESH_TOKEN
      })
      
    const accessToken = await oauth2Client.getAccessToken();
    
    const smtpTransport = mailer.createTransport({
            
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
            
          },
        tls: {
            rejectUnauthorized: false
        }   
    });
    
    const mail = getEmailData(to, message, type)
    
    await smtpTransport.sendMail(mail, function(error, response){
        if(error) {
            console.log(error);
        } else {
            console.log(mail);
            console.log("email sent successfully")
        } 
       // smtpTransport.close();
    })  
}


module.exports = {sendEmail};