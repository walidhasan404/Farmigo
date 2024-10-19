import React, { useState } from 'react';
import useSpeechRecognition from './hooks/useSpeechRecognition';

const VoiceCommandComponent: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleVoiceCommand = (command: string) => {
    if (command.includes('weather')) {
      setMessage('Fetching weather...');
    } else if (command.includes('payment')) {
      setMessage('Redirecting to payment...');
    } else if (command.includes('chat')) {
      setMessage('Opening chat...');
    } else {
      setMessage('Sorry, I didn’t understand.');
    }
  };

  const { isListening } = useSpeechRecognition(handleVoiceCommand);

  return (
    <div>
      <h1>Voice Command Support</h1>
      <p>Try saying: "weather", "payment", or "chat"</p>
      <p>Current Status: {isListening ? 'Listening...' : 'Not Listening'}</p>
      <p>{message}</p>
    </div>
  );
};

export default VoiceCommandComponent;
