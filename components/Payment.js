import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { useTheme } from 'next-themes'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is the test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51MnsmYF5Dr2aWdKVvOmGdyd599chvGV8a24J82NL7FDTkNNMLQYWwmXFxgbB1FNMQkZRQ6TSceC2jgm8AprDiPr900MiEVmPHg'
)

export default function Payment() {
  const [clientSecret, setClientSecret] = useState('')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    function getThemeFromStorage() {
      const storageKey = 'theme'
      const theme = localStorage.getItem(storageKey)
      return theme ? theme : null
    }

    const theme = getThemeFromStorage()
    setTheme(theme)
  })

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'mvp architect and build', amount: 5000 }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  const appearance = {
    theme: theme === 'dark' ? 'night' : 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}
