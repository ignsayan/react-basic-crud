import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Container } from 'react-bootstrap';
import Loader from 'react-js-loader';
import Datatable from '../components/Datatable';
import Paginator from '../components/Paginator';
import { Search } from '../components/Search';
import { PackagePaginator } from '../components/PackagePaginator';
import { ProfilePicture } from '../components/ProfilePicture';

export default function Users() {

    const [users, setUsers] = useState({});
    const { response, error, loading, apiHandler } = useAxios();
    const [search, setSearch] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    const [imagePath, setImagePath] = useState('');
    const fetchUsers = (page = 1) => {
        apiHandler({
            url: `/api/users?page=${page}&search=${search}`,
            method: 'GET',
        });
    };
    useEffect(() => {
        const searchUsers = setTimeout(() => {
            fetchUsers();
        }, search != null ? 500 : 0);
        return () => clearTimeout(searchUsers);
    }, [search]);

    useEffect(() => {
        if (response) {
            setUsers(response);
        } else if (error) {
            toast.error(error.msg);
        }
    }, [response, error]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file)

            reader.onload = (e) => {
                setImagePath(e.target.result);
            };
            // console.log(imagePath);
            
        }
    };
    return (
        <Container>
            <ToastContainer position='bottom-center' />
            <Search value={search} handleSearch={(e) => setSearch(e.target.value)} />
            {loading
                ? <Loader type="hourglass" bgColor="#212529" size={100} />
                : <>
                    {/* <ProfilePicture circularCrop={false}/> */}
                    {showImageModal && <ProfilePicture circularCrop={true} src={imagePath} hide={() => setShowImageModal(false)}/>}
                    <input type="file" onChange={handleFileChange} />
                    <Button onClick={() => setShowImageModal(true)}>Open Editor</Button>
                    <Datatable users={users?.data} />
                    {/* <Paginator pagination={users}
                        onPageChange={(page) => fetchUsers(page)} /> */}
                    <PackagePaginator total_records={users?.total} per_page={users?.per_page} onPageClick={(page) => fetchUsers(page)} />
                    {/* universal paginator */}
                </>
            }
        </Container>
    )
}
