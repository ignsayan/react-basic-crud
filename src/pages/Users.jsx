import React, { useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import Loader from "react-js-loader";
import DataTable from '../components/DataTable';
import { Search } from '../components/Search';
import { useSearchParams } from 'react-router-dom';

export default function Users() {

    const [search, setSearch] = useState('');
    const { response, error, loading, apiHandler } = useAxios();
    useEffect(() => {
        const searchUsers = setTimeout(() => {
            ; (async function fetchUsers() {
                await apiHandler({
                    url: `/api/users?search=${search}`,
                    method: 'GET',
                })

            })();
            
        }, search!=null ? 500 : 0);
        return () => clearTimeout(searchUsers);
    }, [search])
    // useEffect(() => {
    //     if (response) {
    //         setUsers(response.data);
    //         toast.success('Users fetched successfully');
    //     } else {
    //         toast.error(error?.msg);
    //     }
    // }, [response, error])
    const onSearchChange = (e) => {
        setSearch(e);
    }
    return (
        <Container>
            <ToastContainer position='bottom-center' />
            <Search  onSearchChange={(e) => onSearchChange(e.target.value)} />
            {loading
                ? <Loader type="hourglass" bgColor="#212529" size={100} />
                : error?.msg ? <>{error.msg}</> : <DataTable data={response?.data ?? []} />
            }
        </Container>
    )
}
