import React, { useState } from "react";
const BadWordsNext = require('bad-words-next');
const en = require('bad-words-next/lib/en'); // Import the English dictionary
const badwords = new BadWordsNext({ data: en });

export default function badDetect() {

    const [input, setInput] = useState('');
    const [hasBadWords, setHasBadWords] = useState(false);


    const checkBadWords = () => {

        try {
            // Check for bad words
            console.log(input);
            const containsBadWords = badwords.check(input);
            console.log(containsBadWords);
            setHasBadWords(containsBadWords);
            if(containsBadWords === true){
                //Notify to admin about Current user and other user
            }

        }
        catch (err) {
            console.log(err);
        }

    }
    return (
        <div>
            <h1>Bad Words Detecter</h1>
            <input
                value={input}
                onChange={(e) => { setInput(e.target.value) }}
            />
            <button onClick={checkBadWords}>check</button>
            {hasBadWords && <p style={{ color: 'red' }}>Inappropriate language detected!</p>}
        </div>

    )
}