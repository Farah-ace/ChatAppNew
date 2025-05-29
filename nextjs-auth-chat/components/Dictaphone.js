import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from '../styles/DictaphoneStyle.module.css'


const Dictaphone = ({ onTextSubmit, onClose }) => {
  const [inputText, setInputText] = useState('');
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    setInputText(transcript);
  }, [transcript]);

  const startRecognition = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopRecognition = () => {
    SpeechRecognition.stopListening();
  };

  const handleSend = () => {
    onTextSubmit(inputText);
    onClose();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className={styles.popupStyle}>
        <div className={styles.startStopDiv}>
            <button className={styles.button} onClick={startRecognition}>Start</button>
        <button className={styles.button} onClick={stopRecognition}>Stop</button>
      
        </div>
      <input className={styles.inputBox}
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className={styles.button} onClick={handleSend}>Send</button>
    </div>
  );
};

export default Dictaphone;
