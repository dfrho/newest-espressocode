import React, { useEffect } from 'react'
import styled from 'styled-components'

const PaymentSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
`

const Confetti = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;

  & > div {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #f0d369;
    border-radius: 50%;
    animation: confetti 1s ease-in-out infinite;
  }

  & > div:nth-child(1) {
    left: 50%;
    animation-delay: 0.2s;
  }

  & > div:nth-child(2) {
    left: 40%;
    animation-delay: 0.4s;
  }

  & > div:nth-child(3) {
    left: 60%;
    animation-delay: 0.6s;
  }

  & > div:nth-child(4) {
    left: 30%;
    animation-delay: 0.8s;
  }

  & > div:nth-child(5) {
    left: 70%;
    animation-delay: 1s;
  }

  @keyframes confetti {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }
`

const PaymentSuccess = () => {
  useEffect(() => {
    // Add confetti on page load
    const confettiContainer = document.createElement('div')
    confettiContainer.innerHTML = `<div></div><div></div><div></div><div></div><div></div>`
    document.body.appendChild(confettiContainer)

    return () => {
      // Remove confetti on component unmount
      document.body.removeChild(confettiContainer)
    }
  }, [])

  return (
    <PaymentSuccessContainer>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <Confetti />
    </PaymentSuccessContainer>
  )
}

export default PaymentSuccess
