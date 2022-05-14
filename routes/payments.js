const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51KxCGsI3mE7HAH3hXgCk4GH9ReDvNhQ2LHFXPRJnYY1kgoPSblcYRocLpZq3sJ5tlBs1H25aw5m0Ix1xISkTtkUw008C5TPQDn"
);

const rooms = new Map([
  [
    1,
    {
      priceA: 25000,
      priceC: 10000,
      title: "Deluxe King Size",
      hotel: "Rivers Edge Nature Resorts",
    },
  ],
  [
    2,
    {
      priceA: 35000,
      priceC: 15000,
      title: "King Size Sleigh Bed",
      hotel: "Rivers Edge Nature Resorts",
    },
  ],
  [
    3,
    {
      priceA: 45000,
      priceC: 20000,
      title: "Compact Double",
      hotel: "Rivers Edge Nature Resorts",
    },
  ],
  [
    4,
    {
      priceA: 45000,
      priceC: 20000,
      title: "Deluxe Twin/Large Double",
      hotel: "Rivers Edge Nature Resorts",
    },
  ],
  [
    5,
    {
      priceA: 45000,
      priceC: 20000,
      title: "King Size Four Poster",
      hotel: "Rivers Edge Nature Resorts",
    },
  ],
]);

router.route("/").post(async (req, res) => {
  const { roomId, noOfChildren, noOfAdults } = req.body;

  let totalPayment =
    rooms.get(roomId).priceA * noOfAdults +
    rooms.get(roomId).priceC * noOfChildren;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "lkr",
            product_data: {
              name: rooms.get(roomId).title + ", " + rooms.get(roomId).hotel,
            },
            unit_amount: totalPayment * 100,
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

router.route("/CalculatePayment").post((req,res) =>{
  const { roomId, nAdults, nChildren } = req.body;
console.log(roomId);
console.log(nAdults);
console.log(nChildren);
console.log(rooms.get(roomId).priceA);
  let totalPayment =
  rooms.get(roomId).priceA * nAdults +
  rooms.get(roomId).priceC * nChildren;

  console.log(totalPayment);
  res.json(totalPayment);

})

module.exports = router;
