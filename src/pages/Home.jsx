import React from 'react'

export default function Home() {
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <h1><i>{import.meta.env.VITE_APP_NAME}</i></h1>
        </div>
    )
}
