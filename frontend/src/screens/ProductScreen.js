import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from  'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductsDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = ({ history,match }) => { 

    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, products} = productDetails

    useEffect( () => {
        dispatch(listProductsDetails(match.params.id))

    }, [dispatch,match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`) 
    }

    return (<>
    <Link className= 'btn btn-light my-3 '>Go Back </Link>
    {loading ? <Loader /> : error  ? <Message variant='danger'>{error}</Message> :
    (
        <Row>
        <Col md={6}>
            <Image src={products.image} alt={products.name} fluid/>

        </Col>
        <Col md={3}>
            <ListGroup variant='flush' >
                <ListGroup.Item>
                    <h3>{products.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={products.rating} text={`${products.numReviews} reviews`}>
                    </Rating>

                </ListGroup.Item>
                <ListGroupItem>Price: ${products.price}</ListGroupItem>
                <ListGroupItem>Description: {products.description}</ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <Row>
                            <Col>Price:</Col>
                            <Col><strong>${products.price}</strong></Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Status:</Col>
                            <Col>{products.countInStock > 0 ? 'In Stock' : 'Out of Stock'} </Col>
                        </Row>
                    </ListGroupItem>
                    {products.countInStock > 0 &&   (
                        <ListGroupItem>
                            <Row>
                            <Col>Qty</Col>
                            <Col>
                                <Form.Control as='select' value ={qty} onChange={(e) => setQty(e.target.value)}>
                                    {[...Array(products.countInStock).keys()].map((x) => (
                                        <option key= {x + 1} value = {x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            </Row>
                        </ListGroupItem>
                    )}
                    <ListGroupItem>
                       <Button onClick={addToCartHandler}
                       className='btn-block' type='button' disabled={products.countInStock ===0}>
                        Add To Cart
                       </Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>

    </Row>
    )}

    </>)}

export default ProductScreen
