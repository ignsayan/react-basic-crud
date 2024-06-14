import React, { useState } from 'react';
import { Pagination, Form, Button, Row, Col } from 'react-bootstrap';

export default function Paginator({ pagination, onPageChange }) {

    const currentPage = pagination?.current_page;
    const lastPage = pagination?.last_page;
    const totalPages = pagination?.total;
    const [pageInput, setPageInput] = useState('');

    const handlePageClick = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };
    const renderPaginationItems = () => {
        const pageNumbers = [];
        const maxPageLinks = 5;
        let startPage = Math.max(currentPage - Math.floor(maxPageLinks / 2), 1);
        let endPage = startPage + maxPageLinks - 1;

        if (endPage > lastPage) {
            endPage = lastPage;
            startPage = Math.max(endPage - maxPageLinks + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Pagination.Item key={i} active={i === currentPage}
                    onClick={() => handlePageClick(i)}>{i}
                </Pagination.Item>
            );
        }
        return pageNumbers;
    };

    const handleJumpToPage = (event) => {
        event.preventDefault();
        onPageChange(Number(pageInput));
        setPageInput('');
    };

    return (
        <>
            {pagination?.data?.length < totalPages &&
                <>
                    <Row>
                        <Col>
                            <Form onSubmit={handleJumpToPage}
                                className="d-flex">
                                <Form.Control
                                    type="number"
                                    min="1" max={lastPage}
                                    value={pageInput} required
                                    placeholder="Jump to page"
                                    onChange={(e) => setPageInput(e.target.value)}
                                    className="form-control"
                                    style={{ width: '150px', marginRight: '5px' }}
                                />
                                <Button type="submit" variant="primary">Go</Button>
                            </Form>
                        </Col>
                        <Col>
                            < Pagination className="justify-content-end">
                                <Pagination.First
                                    onClick={() => handlePageClick(1)}
                                    disabled={currentPage === 1} />
                                <Pagination.Prev
                                    onClick={() => handlePageClick(currentPage - 1)}
                                    disabled={currentPage === 1} >Prev
                                </Pagination.Prev>
                                {renderPaginationItems()}
                                <Pagination.Next
                                    onClick={() => handlePageClick(currentPage + 1)}
                                    disabled={currentPage === lastPage}>Next
                                </Pagination.Next>
                                <Pagination.Last
                                    onClick={() => handlePageClick(lastPage)}
                                    disabled={currentPage === lastPage} />
                            </Pagination>
                        </Col>
                    </Row>
                </>
            }
        </>
    );
};
