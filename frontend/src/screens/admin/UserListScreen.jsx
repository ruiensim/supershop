import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaTimes, FaTrash,FaEdit,FaCheck } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/userApiSlice'
import { toast } from 'react-toastify'

const UserListScreen = () => {

  const { data: users, refetch,isLoading, error } = useGetUsersQuery();

  const [deleteUser,{isLoading: isDeleting}] = useDeleteUserMutation();

  const deleteHandler = async(id) =>{
    if(window.confirm('Are u sure')){
        try{
            await deleteUser(id);
            toast.success('Successfully deleted');
            refetch();
           
        }catch(error){
            toast.error(error?.data?.message || error.meassage)
        }
    }
  }

  return (
    <>
      <h1>Users</h1>
      {isDeleting && <Loader/>}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/userlist/${user._id}/edit`}>
                    <Button className='btn-sm' variant='light'>
                      <FaEdit/>
                    </Button>
                  </LinkContainer>
                  <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={()=>deleteHandler(user._id)}>
                    <FaTrash style={{color: 'white'}}/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;