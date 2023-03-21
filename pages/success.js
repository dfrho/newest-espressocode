import React, { useEffect } from 'react'
import styled from 'styled-components'
import Confetti from 'react-confetti'

const PaymentSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
`

const PaymentSuccess = () => {
  return (
    <PaymentSuccessContainer>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <Confetti />
    </PaymentSuccessContainer>
  )
}

export default PaymentSuccess
