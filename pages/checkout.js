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
  overflow-x: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 12px;
  }
  // Assign the grid areas to a child element
  & > div.test-button-container {
    grid-area: test-button;
    width: 100%;
  }
`

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
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

const TestButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProductImage = styled.img`
  border-radius: 4px;
  max-width: 500px;
  height: auto;
`

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-top: 22px;
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

  @media (max-width: 768px) {
    min-width: 12px;
    min-height: 12px;
  }

  &:hover {
    cursor: pointer;
  }
`

const CopyButton = styled.button`
  background-color: #5868cd;
  border: 1px solid gray;
  padding: 4px 16px;
  border-radius: 4px;
  margin-right: 16px;
  cursor: pointer;
  color: #fff;
  font-family: Arial, sans-serif;
  border: 0;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  @media (max-width: 640px) {
    min-width: 3rem;
    min-height: 1.5rem;
    margin-right: 0px;
  }
`

//make a styled component for text that is centered in mobile view but flush left in desktop view
const CopyButtonText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  text-align: center;
  margin-top: 8px;
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
  const [showCopyButton, setShowCopyButton] = useState(true)

  const handleCopyClick = (event) => {
    event.preventDefault()
    navigator.clipboard.writeText('5555 5555 5555 4444')
    setCopied(true)
    setTimeout(() => {
      setShowCopyButton(false)
    }, 3000)
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
            src="/static/images/design-build.webp"
            alt="The cover of Stubborn Attachments"
          />
          <ProductDetails>
            <ProductTitle>MVP Application Architect and Build</ProductTitle>
            <ProductPrice>$5000.00</ProductPrice>
          </ProductDetails>
        </ProductContainer>
        <PaymentContainer>
          <Payment />
          {showCopyButton && (
            <TestButtonContainer>
              <div className="test-button">
                <CopyButton onClick={handleCopyClick}>
                  <CopyButtonDiv>
                    {!copied && <CopyIcon as={copyLightIcon} />}
                    {copied ? 'Copied! Use any Exp/CVC' : 'Copy Test CC Number'}
                  </CopyButtonDiv>
                </CopyButton>
                <CopyButtonText>(this is a test purchase)</CopyButtonText>
              </div>
            </TestButtonContainer>
          )}
        </PaymentContainer>
      </CheckoutContainer>
    </>
  )
}
