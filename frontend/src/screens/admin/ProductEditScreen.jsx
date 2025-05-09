import React, { useEffect, useState } from 'react'
import { Form,Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../slices/productApiSlice'
import FormContainer from '../../components/FormContainer'

const ProductEditScreen = () => {
  const {id: product_id} = useParams();

const [name, setName] = useState('');
const [price, setPrice] = useState(0);
const [description, setDescription] = useState('');
const [image, setImage] = useState('');
const [brand, setBrand] = useState('');
const [category, setCategory] = useState('');
const [countInStock, setCountInStock] = useState(0);

const [uploadProductImage, {isLoading: loadingUpload}] = useUploadProductImageMutation();

const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(product_id);

const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();

const navigate = useNavigate();

const uploadFileHandler = async(e) =>{

    const formData = new FormData();
    formData.append('image',e.target.files[0]);
    try{
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);
    }catch(err){
        toast.error(err?.data?.message || err.error);
    }
};

const submitHandler = async(e) =>{

    e.preventDefault();
    const updatedProduct = {
        product_id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
    };

    const result = await updateProduct(updatedProduct);
    if(result.error){
        toast.error(result.error);
    }else{
        toast.success('Product update');
        navigate('/admin/productlist');
    }

}
useEffect(() => {
if(product){
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
}
},
[product]);



  return (
    <>
    <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit Product</h1>
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
          <Form.Group controlId="price" className="my-2">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </Form.Group>
      <Row className="my-3">
  <Col>
  <Form.Label>Price</Form.Label>
    <Form.Control
      type="number"
      placeholder="长"

    />
  </Col>
  <Col>
  <Form.Label>Price</Form.Label>
    <Form.Control
      type="number"
      placeholder="宽"
   
    />
  </Col>
  <Col>
    <Form.Control
      type="number"
      placeholder="高"

   
    />
  </Col>
</Row>
      <Form.Group controlId="description" className="my-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="image" className="my-2">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Form.Control
            type='file'
            label='Choose File'
            onChange={uploadFileHandler}
        />
        {loadingUpload && <Loader/>}
      </Form.Group>
      <Form.Group controlId="brand" className="my-2">
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="category" className="my-2">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="countInStock" className="my-2">
        <Form.Label>Count In Stock</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter stock count"
          value={countInStock}
          onChange={(e) => setCountInStock(Number(e.target.value))}
        />
      </Form.Group>
             <Button 
             type='submit' 
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

export default ProductEditScreen
