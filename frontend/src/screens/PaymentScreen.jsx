import React, { useEffect, useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'

const PaymentScreen = () => {
  
  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeOrder');
  }

  useEffect(
    () => {
       if(!shippingAddress){
         navigate('/shipping');
       } 
    },[shippingAddress.navigate]
  )

  return (
    <FormContainer>
        <CheckOutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={ submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                    type='radio'
                    className='my-2'
                    label = 'Paypal or Credit Card'
                    id = 'Paypal'
                    name = 'paymentMethod'
                    value = 'PayPal'
                    checked
                    onChange = {(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
