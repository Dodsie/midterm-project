

const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);


function sendSMS (obj) {
  client.messages.create({
    body: 'Hello from Node',
    to: '+17789281683',
    from: '++19105656933'
 }).then(message => {
    //console.log(message)
    //console.log(obj)
  })

   .catch(error => console.log(error))
}



module.exports = {sendSMS}
