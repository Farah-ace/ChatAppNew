import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import styles from '../../styles/chatUserStyle.module.css';

export default function UsersList() {
  const [users, setUsers] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  //console.log(currentUser);

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/chat/users', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleChatStart = (otherUserId, userName) => {
    router.push(`/chat/chatScreen?otherUserId=${otherUserId}&userName=${userName}`);
  };

  return (
    <div className={styles.container}>
      <h2>Select a user to chat with:</h2>
      <ul className={styles.list}>
        {users
          .filter((user) => user._id !== currentUser?._id)
          .map((user) => (
            <div onClick={() => handleChatStart(user._id, user.name)}
              className={styles.itemCard}>

              <div className={styles.nameBox}>
                <div className={styles.dp} style={{
                  backgroundColor: `rgb(${Math.floor(Math.random() * 156 + 100)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 156 + 100)})`
                }}
                >
                  <p className={styles.textInDp}>{user.name.charAt(0).toUpperCase()}</p>
                </div>
                <p>{user.name}</p>
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
