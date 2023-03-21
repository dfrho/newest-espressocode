import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Payment from '../components/Payment'
import copyLightIcon from '../public/static/icons/copylight.svg'
import { PageSEO } from '../components/SEO'

const CheckoutContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  align-items: start;
  justify-content: center;
  padding: 0px 22px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 12px;
  }
  //
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
  padding-top: 12px;
`

const ProductTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  padding-top: 10px;
`

const ProductPrice = styled.h5`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
`

const CopyIcon = styled.svg`
  width: 12px;
  height: 12px;
  color: #fff;
  margin-right: 8px;

  &:hover {
    cursor: pointer;
  }
`

const CopyButton = styled.button`
  display: inline-block;
  background-color: green;
  border: 1px solid gray;
  padding: 4px 16px;
  border-radius: 4px;
  margin-right: 16px;
  cursor: pointer;
  color: #fff;
  outline: none;
  &:hover {
    background-color: darkgreen;
  }
  @media (max-width: 640px) {
    min-width: 3rem;
    min-height: 1.5rem;
  }
`

const CopyButtonDiv = styled.div`
  display: flex;
  align-items: center;
  max-width: content;
  padding: 5px;
`

export default function Checkout() {
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const handleCopyClick = (event) => {
    event.preventDefault()
    navigator.clipboard.writeText('5555 5555 5555 4444')
    setCopied(true)
  }

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
    <>
      <PageSEO title="Checkout" description="checkout page for design/build work" />
      <CheckoutContainer>
        <ProductContainer>
          <ProductImage
            src="https://i.imgur.com/EHyR2nP.png"
            alt="The cover of Stubborn Attachments"
          />
          <ProductDetails>
            <ProductTitle>MVP Application Architect and Build</ProductTitle>
            <ProductPrice>$5000.00</ProductPrice>
            <span>
              <CopyButton onClick={handleCopyClick}>
                <CopyButtonDiv>
                  {!copied && <CopyIcon as={copyLightIcon} />}
                  {copied ? 'Copied! Use any Exp/CSV' : 'Copy Test CC Number'}
                </CopyButtonDiv>
              </CopyButton>
              <b>(this is a test purchase)</b>
            </span>
          </ProductDetails>
        </ProductContainer>
        <PaymentContainer>
          <Payment />
        </PaymentContainer>
      </CheckoutContainer>
    </>
  )
}
