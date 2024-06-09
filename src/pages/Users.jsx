import React from 'react'
import { Container } from 'react-bootstrap'

export default function Users() {

    return (
        <Container>
            {
                localStorage.getItem('user') && (
                    <pre className='mt-3'>
                        {JSON.stringify(JSON.parse(localStorage.getItem('user')), null, 2)}
                    </pre>
                )
            }
        </Container>
    )
}
