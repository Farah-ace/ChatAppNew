// admin dashboard
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/router';

import styles from '../../styles/chatUserStyle.module.css';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const token = useSelector((state) => state.auth.token);
    //console.log(token);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(res.data);
                console.log(res.data);

            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/auth/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(res.data);

        } catch (err) {
            console.error('Failed to delete user:', err);
        }
    }
    const handleUpdate = async (id) => {
        console.log("User Updated");

        // try {
        //     const res = await axios.get(`http://localhost:5000/api/auth/user/${id}`, {
        //         headers: { Authorization: `Bearer ${token}` }
        //     });
        //     console.log(res.data);

        // } catch (err) {
        //     console.error('Failed to update user:', err);
        // }
    }

    return (
        <div className={styles.container}>
            <h2>Welcome to the Dashboard</h2>
            <ul className={styles.list}>
                {users
                    .filter((user) => user.role !== "admin")
                    .map((user) => (
                        <div className={styles.itemCard}>

                            <div className={styles.nameBox}>
                                <div className={styles.dp} style={{
                                    backgroundColor: `rgb(${Math.floor(Math.random() * 156 + 100)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 156 + 100)})`
                                }}
                                >
                                    <p className={styles.textInDp}>{user.name.charAt(0).toUpperCase()}</p>
                                </div>
                                <p>{user.name}</p>


                                <div className={styles.btnDiv}>
                                    <button onClick={() => handleUpdate(user._id)}
                                        className={styles.updateBtn}>update</button>
                                    <button onClick={() => handleDelete(user._id)}
                                        className={styles.deleteBtn}>delete</button>
                                </div>
                            </div>

                            <li className={styles.item}
                                key={user._id}>
                                {user.email}{' '}
                            </li>
                        </div>
                    ))}

            </ul>
        </div>
    );
}
