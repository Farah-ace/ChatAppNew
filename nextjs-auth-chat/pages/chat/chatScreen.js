import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/chatScreenStyle.module.css';

const socket = io('http://localhost:5000');

export default function Chat() {
  const currentUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  // console.log(token)

  const router = useRouter();
  const { otherUserId, userName } = router.query;
  // console.log(userName);


  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      if (!otherUserId || !currentUser?._id) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/chat/messages/${currentUser._id}/${otherUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );
        const data = await res.json();

        setMessages(data);
        //console.log("messages:", data);

      } catch (err) {
        console.error('Error fetching chat history:', err);
      }
    };

    fetchMessages();
  }, [otherUserId, currentUser?._id, token]);

  useEffect(() => {
    if (!currentUser?._id) return;

    socket.emit('user_connected', currentUser._id);

    socket.on('private_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('private_message');
    };
  }, [currentUser]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socket.emit('private_message', {
      senderId: currentUser._id,
      receiverId: otherUserId,
      content: newMessage
    });

    setMessages((prev) => [...(Array.isArray(prev) ? prev : []), {
      senderId: currentUser._id,
      content: newMessage
    }]);
    setNewMessage('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.nameBox}>
          <div className={styles.dp} style={{
            backgroundColor: `rgb(${Math.floor(Math.random() * 156 + 100)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 156 + 100)})`
          }}
          >
            <p className={styles.textInDp}>{userName?.charAt(0).toUpperCase()}</p>
          </div>

          <p className={styles.headText}>{userName}</p>
        </div>
      </div>
      <div className={styles.subContainer}>

        {Array.isArray(messages) && messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: m.senderId === currentUser._id ? 'flex-end' : 'flex-start',
              padding: '5px 10px',
            }}
          >
            <div
              style={{
                backgroundColor: m.senderId === currentUser._id ? '#6F4D9F' : 'grey',
                padding: '10px 15px',
                borderRadius: '10px',
                color: 'white',
                maxWidth: '60%',
                wordWrap: 'break-word',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              }}
            >
              {m.content}
            </div>
          </div>
        ))}

      </div>
      <div className={styles.typeContainer}>
        <input className={styles.inputBox}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message"
        />
        {/* <FontAwesomeIcon icon="fa-solid fa-microphone" /> */}
        <button className={styles.button}
          onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
