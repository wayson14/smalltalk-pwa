import React from 'react';
import { UserContext } from '../services/UserContext';
import useAsyncState from '../services/useAsyncState';

const ChatEndView = ({type, contactUser}) => {
  return <div className="Chat-end-view">
      {type === 'reveal' ? 
      <div>
        <div className="container vertical">
        <h1>Gratulacje!</h1>
        <a href={contactUser}>
            Kontakt do użytkownika
        </a>
        <a href="/chat">Menu główne</a>
        </div>
      </div>
      :
      <>
        <h1>
            Spróbuj jeszcze raz!
        </h1>
        <a href="/chat">Menu główne</a>
    </>
    }
    </div> 
};

export default ChatEndView;
