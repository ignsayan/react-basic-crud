import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import Loader from 'react-js-loader';
import Datatable from '../components/Datatable';
import Paginator from '../components/Paginator';
import { useSearchParams } from 'react-router-dom';
import { Search } from '../components/Search';

export default function Users() {

    const [users, setUsers] = useState({});
    const { response, error, loading, apiHandler } = useAxios();
    const [search, setSearch] = useState('');

    const fetchUsers = (page = 1) => {
        apiHandler({
            url: `/api/users?page=${page}&search=${search}`,
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
            fetchUsers();
        }, search != null ? 500 : 0);
        return () => clearTimeout(searchUsers);
    }, [search])

    return (
        <Container>
            <ToastContainer position='bottom-center' />
            <Search value={search} handleSearch={(e) => setSearch(e.target.value)} />
            {loading
                ? <Loader type="hourglass" bgColor="#212529" size={100} />
                : <>
                    <Datatable users={users?.data} />
                    <Paginator pagination={users}
                        onPageChange={handlePageChange} />
                </>
            }
        </Container>
    )
}
