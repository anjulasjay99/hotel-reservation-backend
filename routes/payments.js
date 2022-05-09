const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51KxCGsI3mE7HAH3hXgCk4GH9ReDvNhQ2LHFXPRJnYY1kgoPSblcYRocLpZq3sJ5tlBs1H25aw5m0Ix1xISkTtkUw008C5TPQDn"
);

const rooms = new Map([
  [1, { priceInCents: 10000, name: "Wonder Lanka, Room 1" }],
  [2, { priceInCents: 20000, name: "Wonder Lanka, Room 2" }],
]);

router.route("/").post(async (req, res) => {
  const { roomId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: rooms.get(roomId).name,
            },
            unit_amount: rooms.get(roomId).priceInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/payment-success`,
      cancel_url: `http://localhost:3000/payment-unsuccessful`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
