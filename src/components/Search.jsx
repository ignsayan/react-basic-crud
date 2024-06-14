import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

export const Search = ({
    dateSearch,
    dateSearchFrom,
    dateSearchTo,
    handleSearch,
    onSearchChange,
    onDateChange,
    value
}) => {

    return (
        <Form className='mt-3'>
            <Row>
                <Col xs="auto">
                    <Form.Control
                        type="text"
                        placeholder="Search ....."
                        className=" mr-sm-2"
                        value={value}
                        onChange={(e) => handleSearch(e)}
                    />
                </Col>
                {/* <Col xs="auto">
                    <Button onClick={()=>handleSearch()} type="button">Submit</Button>
                </Col> */}
            </Row>
        </Form>
    )
}