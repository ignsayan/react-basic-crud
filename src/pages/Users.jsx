import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Table } from 'react-bootstrap';
import Loader from 'react-js-loader';
import Datatable from '../components/Datatable';
import Paginator from '../components/Paginator';
import { useSearchParams } from 'react-router-dom';
import { Search } from '../components/Search';

export default function Users() {

    const [search, setSearch] = useState('');
    const [users, setUsers] = useState({});
    const { response, error, loading, apiHandler } = useAxios();

    const fetchUsers = (page = 1) => {
        apiHandler({
            url: `/api/users?page=${page}`,
            method: 'GET',
        });
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (response) {
            setUsers(response);
        } else if (error) {
            toast.error(error.msg);
        }
    }, [response, error]);

    const handlePageChange = (page) => {
        fetchUsers(page);
    };

    useEffect(() => {
        const searchUsers = setTimeout(() => {
            ; (async function fetchUsers() {
                await apiHandler({
                    url: `/api/users?search=${search}`,
                    method: 'GET',
                })

            })();

        }, search != null ? 500 : 0);
        return () => clearTimeout(searchUsers);
    }, [search])

    return (
        <Container>
            <ToastContainer position='bottom-center' />
            <Search value={search} handleSearch={(e) => setSearch(e.target.value)} />
            {loading
                ? <Loader type="hourglass" bgColor="#212529" size={100} />
                : users?.data?.length > 0
                    ? <>
                        <Datatable users={users?.data} />
                        <Paginator pagination={users}
                            onPageChange={handlePageChange} />
                    </>
                    : <Table striped bordered hover className='text-center my-5'>
                        <tbody>
                            <tr>
                                <td>No data found</td>
                            </tr>
                        </tbody>
                    </Table>
            }
        </Container>
    )
}
