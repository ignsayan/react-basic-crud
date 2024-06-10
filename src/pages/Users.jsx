import React, { useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import Loader from "react-js-loader";
import DataTable from '../components/DataTable';

export default function Users() {

    const [users, setUsers] = useState([]);
    const { response, error, loading, apiHandler } = useAxios();

    useEffect(() => {
        apiHandler({
            url: '/api/users',
            method: 'GET',
        });
    }, [])

    useEffect(() => {
        if (response) {
            setUsers(response.data);
            toast.success('Users fetched successfully');
        } else {
            toast.error(error?.msg);
        }
    }, [response, error])

    return (
        <Container>
            <ToastContainer position='bottom-center' />
            {loading
                ? <Loader type="hourglass" bgColor="#212529" size={100} />
                : <DataTable data={users}/>
            }
        </Container>
    )
}
