import React, { useEffect } from 'react'
import { Col, ListGroup, Row, Image, Form, Button, Card} from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetialsQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from '../slices/ordersApiSlice'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'


const OrderScreen = () => {

  const { id: orderId } = useParams();
  const {data : order, refetch, isLoading, error} = useGetOrderDetialsQuery(orderId);


  const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation();

  const [{isPending}, paypalDispatch] = usePayPalScriptReducer();

  const {data:paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);


 const onApproveTest = async () =>{
    await payOrder({orderId, detials:{payer: {}}});
    refetch();
    toast.success('Payment Successful');

 }

 const onApprove = (data,actions) =>{
    return actions.order.capture().then(
        async function (detials){
            try{
                await payOrder({orderId, detials});
                refetch();
                toast.success('Payment Successful');
            }catch(error){
                toast.error(error?.data?.message || error.message);
            }
        }
    )
 }

 const onError = (error) =>{
    toast.error(error.message);
    
 }

 const createOrder = (data, actions) =>{
    return actions.order.create(
        {
            purchase_units:[
                {
                    amount:{
                        value: order.totalPrice,
                    }
                }
            ]
        }
    ).then((orderId) => {
        return orderId;
    });
    
 }

 
  useEffect(() =>{
    if(!errorPayPal && !loadingPayPal && paypal.clientId){
        const loadPayPalScript = async () =>{
            paypalDispatch({
                type: 'resetOptions',
                value: {
                  'client-id': paypal.clientId,
                  currency: 'MYR', 
                }
            });
            paypalDispatch({type: 'setLoadingStatus', value: 'pending'});
        }
        if(order && !order.isPaid){
            if(!window.paypal){
                loadPayPalScript();
            }
        }
    }
  },[order,paypal]);

  return isLoading? <Loader/> : error? <Message variant='danger'/>
  :(
    <>
    <h1>Order {order._id}</h1>
    <Row>
        <Col md={8}>
        <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p> 
                    <strong>Name:</strong> {order.user.name}
                </p>
                <p>
                    <strong>Email:</strong> {order.user.email}
                </p>
                <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{order.shippingAddress.city},{''}
                    {order.shippingAddress.postalCode},{''}
                    {order.shippingAddress.country}
                </p>
                {order.isDelivered? (
                    <Message variant='success'>
                        Delivered on {order.deliveredAt.substring(0,10)}
                    </Message>
                ):(<Message variant='danger'>
                    Not Delivered
                </Message>)}
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                </p>
                {order.isPaid? (
                    <Message variant='success'>
                        Paid on {order.paidAt.substring(0,19)}
                    </Message>
                ):(<Message variant='danger'>
                    Not Paid
                </Message>)}
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.map((item, index) =>
                (
                    <ListGroup.Item key={index} > 
                        <Row>
                            <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded /> 
                            </Col>
                            <Col>
                            <Link to = {`/product/${item.product}`}>
                            {item.name}
                            </Link>
                            </Col>
                            <Col md={4}>
                            {item.qty} x RM{item.price} = RM{item.qty * item.price}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )
                )}
            </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Order Summary</h2>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Items:
                            </Col>
                            <Col>
                            RM{order.itemsPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Shipping:
                            </Col>
                            <Col>
                            RM{order.shippingPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Tax:
                            </Col>
                            <Col>
                            RM{order.taxPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Total:
                            </Col>
                            <Col>
                            RM{order.totalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup.Item>
                {!order.isPaid && (
                    <ListGroup.Item>
                        {loadingPay && <Loader/>}
                        {isPending? <Loader/> : (
                            <div>
                                {/* <Button onClick={ onApproveTest } style={{marginBottom: '15px'}}>Test</Button> */}
                                <div>
                                <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                                </div>                              
                            </div>
                        )}
                    </ListGroup.Item>
                )}
                
            </ListGroup>
        </Card>
        </Col>
    </Row>
    </>
  );
}

export default OrderScreen
