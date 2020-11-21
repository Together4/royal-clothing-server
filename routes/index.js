import express from "express";
import stripe from "stripe";

const router = express.Router();
const key = process.env.STRIPE_SECRET_KEY;
const stripeAccount = stripe(key);

router.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };
  stripeAccount.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      console.log(stripeErr.raw.message);
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

export default router;
