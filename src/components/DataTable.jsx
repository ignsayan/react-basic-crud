import React from 'react'

export default function DataTable({ data }) {

    return (
        <>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone_no}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
