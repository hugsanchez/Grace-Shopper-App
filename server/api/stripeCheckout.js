const cors = require("cors");
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51ImoMPDR0fOunmqdng791kpEeP4y8orA2Hx71h1TxJKwvWtpOrSrCZdEpDLhTFO67N767ve8HUSye4lPDZP9mihx00VfEWPiK3"
);
//const uuid = require("uuid/v4");
const { v4: uuidv4 } = require("uuid");

router.use(cors());

// app.get("/", (req, res) => {
//   res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
// });

router.post("/", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencykey = uuidv4();
    console.log("key", idempotencykey);
    const charge = await stripe.charges.create(
      {
        amount: 1000,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased`,
        // shipping: {
        //   name: token.card.name,
        //   address: {
        //     line1: token.card.address_line1,
        //     line2: token.card.address_line2,
        //     city: token.card.address_city,
        //     country: token.card.address_country,
        //     postal_code: token.card.address_zip,
        //   },
        // },
      }
      // {
      //   idempotencykey,
      // }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

module.exports = router;
