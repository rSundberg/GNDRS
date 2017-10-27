const functions = require('firebase-functions')
const admin = require('firebase-admin')
const stripe = require('stripe')(functions.config().stripe.key_live)
const cors = require('cors')({ origin: true })

admin.initializeApp(functions.config().firebase);

exports.charge = functions.https.onRequest((request, response) => {
    console.log(request.body)
    cors(request, response, () => {
        stripe.charges.create({
            amount: request.body.amount,
            currency: "sek",
            source: request.body.id, // obtained with Stripe.js
            receipt_email: request.body.email,
            description: `Charge for ${request.body.email}`
        }, function (err, charge) {
            // asynchronously called
            console.log('err:', err);
            console.log('charge', charge);
            if (err) {
                response.send(err)
            } else {
                response.send(charge)
            }
        })
    })
})
