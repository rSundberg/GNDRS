const functions = require('firebase-functions')
const admin = require('firebase-admin')
const stripe = require('stripe')('sk_test_NPv7E2dvbFs5FSUqOYcSXCrJ')

admin.initializeApp(functions.config().firebase);

exports.charge = functions.https.onRequest((request, response) => {
    // response.send(request.body)
    console.log('should log shit motherF')
    console.log('body:', request.body)

    stripe.charges.create({
        amount: 2000,
        currency: "sek",
        source: request.body.id, // obtained with Stripe.js
        description: "Charge for aubrey.taylor@example.com"
    }, function (err, charge) {
        // asynchronously called
        console.log('err:', err);
        console.log('charge', charge);
        if (err) {
            response.send(err)
        } else {
            response.send(charge)
        }
    });
})
