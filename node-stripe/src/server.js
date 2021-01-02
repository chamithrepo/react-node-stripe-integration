require('dotenv').config()
const cors = require("cors")
const express = require("express")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { v4: uuidv4 } = require('uuid');

const app = express()

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.send("Get route working")
})

app.post("/payment", async (req, res) => {

    const { product, token } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        if (token.type === 'card') {
            const idempotencyKey = uuidv4();
            const charge = await stripe.charges.create(
                {
                    amount: 1 * 100,//product.price * 100
                    currency: 'usd',
                    customer: customer.id,
                    description: product.name,
                },
                {
                    idempotencyKey,
                }
            );
            console.log('charge:');
            console.log(JSON.stringify(charge));
        } else {
            throw Error(`Unrecognized Stripe token type`);
        }

    } catch (err) {
        console.error(err);
        error = err;
    }
})

app.listen(8181, () => {
    console.log("LISTENING AT PORT 8181")
})