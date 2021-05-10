//import React from 'react';
//var email = require ("./src/components/Contact.js");
const Hello = data => {

    return `
        <!DOCTYPE html>
        <html style = "margin: 0; padding: 0;">
            <head>
                <title>
                    Hi,
                </title>
            </head>
            <body style = "margin:0; padding:0">
                <br />
                <br />
                <div>Hello Priya,</div>
                <div>${data}<div>
                <br />
                <br />
            </body>
        </html>
        `;
};

module.exports = { Hello };