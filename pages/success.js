import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import party from 'party-js'

const PartyThanks = () => {
  const thanksRef = useRef(null)

  useEffect(() => {
    if (thanksRef.current) {
      party.confetti(thanksRef.current)
    }
  }, [])

  return (
    <>
      <PaymentSuccessContainer ref={thanksRef}>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
      </PaymentSuccessContainer>
    </>
  )
}

const PaymentSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10rem;
  height: 100vh;
`

export default PartyThanks
