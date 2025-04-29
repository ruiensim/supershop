import React, { useEffect, useState } from 'react'
import { Form ,Button, Row, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

function RegisterScreen() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');


  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [register, {isLoading}] = useRegisterMutation();

  const { userInfo } = useSelector(state => state.auth)

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if(userInfo){
        navigate(redirect);
    }
  },[userInfo,redirect,navigate])

  

  const submitHandler = async (e) =>{
    e.preventDefault()
    if(password !== confirmpassword){
        toast.error('Password do not match');
    }else{
        try{
            console.log('hi');
            const res = await register({name,email,password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
        }catch(error){
            console.log('gg');
            toast.error(error?.data?.message || error.error);
        }
    }
  }

  return (
    <FormContainer> 
        <h1>
            Sign Up
        </h1>
        <Form onSubmit={submitHandler}>
        <Form.Group>
             <Form.Label>Name</Form.Label>
             <Form.Control
             type='text'
             placeholder='Enter Name'
             value={name}
             onChange={(e) => setName(e.target.value)}
             >
             </Form.Control>
            </Form.Group>
            <Form.Group>
             <Form.Label>Email Address</Form.Label>
             <Form.Control
             type='email'
             placeholder='Enter Email'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             >
             </Form.Control>
            </Form.Group>
            <Form.Group>
             <Form.Label>PassWord</Form.Label>
             <Form.Control
             type='password'
             placeholder='Enter Password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             >
             </Form.Control>
            </Form.Group>
            <Form.Group>
             <Form.Label>Confirm PassWord</Form.Label>
             <Form.Control
             type='password'
             placeholder='Confirm Password'
             value={confirmpassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             >
             </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}> 
                Register
            </Button>
            {isLoading && <Loader />}
        </Form>
        <Row className='py-3'>
            <Col>
            Already Registered? <Link to = {redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen;
