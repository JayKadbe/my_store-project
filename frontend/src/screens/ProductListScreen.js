import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import { listProducts , deleteProduct, createProduct} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ( {history , match} ) => {
    const pageNumber = match.params.pageNumber || 1    

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, pages, page } = productList;

    const productDelete = useSelector(state => state.productDelete);
    const { loading : loadingDelete , error : errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, product, success: successCreate, product: createdProduct } = productCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET});
        if(!userInfo.isAdmin){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else {
            dispatch(listProducts('', pageNumber));
        }
    }, [dispatch, userInfo, history, successDelete, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
             dispatch(deleteProduct(id));    
        }
    }

    const createProductHandler = () => {
        // craete function to create product
        dispatch(createProduct());
    }

    return (
        <>
            <Row className='align-items-center' >
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right' >
                   <Button  onClick = {createProductHandler}
                   className='my-3'>
                      <i className='fas fa-plus'></i> 
                       Create Product
                   </Button> 
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            { loading ? (
                <Loader/>
            ) : error ? (
                <Message variant='danger' >{error}</Message>
            ) : (
                <>
                <Table className='table-sm' striped 
                    bordered hover responsive >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} >
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>
                                    ${product.price}
                                </td>
                                <td>
                                    {product.category}
                                </td>
                                <td>
                                    {product.brand}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`} >
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' ></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button className='btn-sm'
                                        variant='danger'
                                        onClick = { () => deleteHandler(product._id)}
                                      >
                                        <i className='fas fa-trash' ></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
                 
        </>
    )
}

export default ProductListScreen
