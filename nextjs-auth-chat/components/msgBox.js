import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


export default function Chat() {
    return (
        <div style={{
            display: 'flex',
            backgroundColor: 'white',
            color: 'grey',
            width: '600px',
            height: '40px',
            outline: '2px solid black',
            borderRadius: '10px',
        }}>
            {/* style it with border none and also on focus border none */}
            <input placeholder='Message' style={{ width: '88%', border: 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>

                <FontAwesomeIcon icon={faMicrophone} style={{ color: 'purple' }} />
                <FontAwesomeIcon icon={faPaperPlane} style={{ color: 'purple' }} />

            </div>
        </div>
    )
}