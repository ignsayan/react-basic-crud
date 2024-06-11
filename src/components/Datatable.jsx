import React from 'react';
import { Table } from 'react-bootstrap';

export default function Datatable({ users }) {

    return (
        <>
            <Table striped bordered hover className='my-5'>
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
        </>
    )
}
