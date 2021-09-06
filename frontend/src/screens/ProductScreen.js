import React, {useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from  'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductsDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = ({ match }) => { 

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, products} = productDetails

    useEffect( () => {
        dispatch(listProductsDetails(match.params.id))

    }, [dispatch,match])

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
                    <ListGroupItem>
                       <Button className='btn-block' type='button' disabled={products.countInStock ===0}>
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
