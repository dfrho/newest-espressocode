import React, { useEffect, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px;
  transform: translateZ(0);

  &:before,
  &:after {
    content: '';
    border-radius: 50%;
    position: absolute;
  }

  &:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    transform-origin: 10.4px 10.2px;
    animation: ${spin} 2s infinite ease 1.5s;
  }

  &:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    transform-origin: 0px 10.2px;
    animation: ${spin} 2s infinite ease;
  }
`

const StyledButton = styled.button`
  background: #5469d4;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;

  &:hover {
    filter: contrast(115%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`
const PaymentForm = styled.form`
  width: 90vw; /* Adjusted width for mobile */
  max-width: 500px;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1),
    0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 10px;

  @media only screen and (min-width: 768px) {
    /* Adjusted styles for larger screens */
    width: 30vw;
    min-width: 500px;
  }
`

//create a styled component div to hold the payment element and center it
const PaymentElementContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  //   const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!')
          break
        case 'processing':
          setMessage('Your payment is processing.')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.')
          break
        default:
          setMessage('Something went wrong.')
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // TODO: Make sure to change this to your payment completion page
        return_url: 'https://espressocode.tech/success',
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: 'accordion',
  }

  return (
    <PaymentElementContainer>
      <PaymentForm id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <StyledButton disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">{isLoading ? <Spinner id="spinner" /> : 'Pay now'}</span>
        </StyledButton>
        {message && <div id="payment-message">{message}</div>}
      </PaymentForm>
    </PaymentElementContainer>
  )
}
