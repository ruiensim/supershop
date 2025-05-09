import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../slices/productApiSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';

const ProductListScreen = () => {
  
  const  {pageNumber} = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});

  const [createProduct, {isLoading : isLoadingCreate}] = useCreateProductMutation();

  const [deleteProduct, {isLoading: isLoadingDelete}] = useDeleteProductMutation();

  const deleteHandler = async(id) =>{
    if(window.confirm('Are u sure?')){
        try{
            await deleteProduct(id);
            toast.success('Deleted successfully')
            refetch();
        }catch(err){
            toast.error(err?.data.message || err.error);
        }
    }
  }

  const createProductHandler = async() =>{
        if(window.confirm('Are you sure create new product?')){
            try{
                await createProduct();
                refetch();
            }catch(error){
                toast.error(error?.data?.message || error.error);
            }
        }else{

        }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm m-3' onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoadingCreate && <Loader/>}
      {isLoadingDelete && <Loader/>}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
        <Table striped hover bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>RM{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm mx-2'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick = {() => deleteHandler(product._id)}>
                    <FaTrash style={{color: 'white'}} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
        </>
      )}
    </>
  );
};

export default ProductListScreen;