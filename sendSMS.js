const client = require('twilio')('AC0f90a880ab97c87fcd9ca8e3ef0f2dd1', 'c4f3f3733a1c96be9e7a46a2d528fc6a');


function sendSMS () {
  client.messages.create({
    body: 'Hello from Node',
    to: '+17789281683',
    from: '++19105656933'
 }).then(message => console.log(message))
   // here you can implement your fallback code
   .catch(error => console.log(error))
}

module.exports = {sendSMS}
