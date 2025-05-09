import React, { useEffect, useState } from 'react'
import { Form,Button, Table } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import FormContainer from '../../components/FormContainer'
import { useGetUserDetialsQuery, useUpdateUserMutation } from '../../slices/userApiSlice'

const UserEditScreen = () => {
  const {id: userId} = useParams();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [isAdmin, setIsAdmin] = useState(false);

const { data: user, isLoading, refetch, error } = useGetUserDetialsQuery(userId);

const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation();

const navigate = useNavigate();

 
const submitHandler = async(e) =>{

    e.preventDefault();
    try{
        await updateUser({userId,name,email,isAdmin});
        toast.success('User updated successfully');
        refetch();
        console.log('hi1');
        navigate('/admin/userlist');
        console.log('hi');
    }catch(err){
        console.log('hi23');
        console.log('Caught error:', err);
        toast.error(err?.data?.message || err.error);
    }

}
useEffect(() => {
if(user){
    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
 
}
},
[user]);

  return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormContainer>
        <h1>User</h1>
        {loadingUpdate && <Loader/>}
        {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Form onSubmit = {submitHandler }>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="isAdmin" className="my-2">
        <Form.Label>Is Admin</Form.Label>
        <Form.Check
          type="checkbox"
          label="Is Admin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.value)}
        />
      </Form.Group>

     
             <Button 
             type='submit' 
             variant='primary'
            className='btn btn-block'
             >
             Update
             </Button>
        </Form>
      )}
    </FormContainer>
      
    </>
  )
}

export default UserEditScreen
