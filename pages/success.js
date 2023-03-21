import React, { useEffect } from 'react'
import styled from 'styled-components'
import Confetti from 'react-confetti'
import useWindowSize from '../lib/use-window-size'

const PaymentSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const PaymentSuccess = () => {
  const size = useWindowSize()
  return (
    <>
      <Confetti recycle={false} width={size.width} height={size.height} />
      <PaymentSuccessContainer>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
      </PaymentSuccessContainer>
    </>
  )
}

export default PaymentSuccess
