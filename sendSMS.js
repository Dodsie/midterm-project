

const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);


function sendSMS (string) {
  client.messages.create({
    body: string,
    to: process.env.PHONE,
    from: '++19105656933'
 }).then(message => {
    console.log(message)

  })

   .catch(error => console.log(error))
}



module.exports = {sendSMS}
