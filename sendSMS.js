

const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);


<<<<<<< HEAD
function sendSMS(id) {
  client.messages.create({
    body: `New order Received! Order Number: ${id}. Please Enter an ETA in minutes. `,
    to: process.env.PHONE_NUMBER,
    from: '+12058919937'
  }).then(message => {
    console.log(message);
=======
function sendSMS (string) {
  client.messages.create({
    body: string,
    to: '+17789281683',
    from: '++19105656933'
 }).then(message => {
    console.log(message)
>>>>>>> 058baeb9b48dc07cf0ca679d80ddcc920acb9b9a

  })

    .catch(error => console.log(error));
}



module.exports = {sendSMS};
