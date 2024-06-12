import React from 'react';
import { Table } from 'react-bootstrap';

export default function Datatable({ users }) {

    return (
        <>
            {users?.length > 0

                ? <Table striped bordered hover className='my-5'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone_no}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                : <Table striped bordered hover className='text-center my-5'>
                    <tbody>
                        <tr>
                            <td>No data found</td>
                        </tr>
                    </tbody>
                </Table>
            }
        </>
    )
}
