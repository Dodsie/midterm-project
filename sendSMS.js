

const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);


function sendSMS(id) {
  client.messages.create({
    body: `New order Received! Order Number: ${id}. Please Enter an ETA in minutes. `,
    to: process.env.PHONE_NUMBER,
    from: '+12058919937'
  }).then(message => {
    console.log(message);

  })

    .catch(error => console.log(error));
}



module.exports = {sendSMS};
