// import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

const calculateTotalAmount = (items) => {
  let totalAmount = 0

  for (const item of items) {
    totalAmount += item.amount
  }

  return totalAmount
}

export default async function createPaymentIntent(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { items } = req.body
  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateTotalAmount(items),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
