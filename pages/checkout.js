import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Payment from '../components/Payment'

const CheckoutContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  align-items: start;
  justify-content: center;
  padding: 22px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    max-width: 90vw;
  }
`

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProductImage = styled.img`
  border-radius: 4px;
  width: 100%;
  max-width: 500px;
  height: auto;
`

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-top: 20px;
`

const ProductTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 16px;
`

const ProductPrice = styled.h5`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 32px;
`

export default function Checkout() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.")
    }
  }, [])

  return (
    <CheckoutContainer>
      <ProductContainer>
        <ProductImage
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <ProductDetails>
          <ProductTitle>MVP Application Architect and Build</ProductTitle>
          <ProductPrice>$5000.00</ProductPrice>
          <p>
            <b>this is a test purchas</b>e
          </p>
        </ProductDetails>
      </ProductContainer>
      <PaymentContainer>
        <Payment />
      </PaymentContainer>
    </CheckoutContainer>
  )
}
