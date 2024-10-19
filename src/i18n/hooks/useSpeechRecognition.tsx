import { useState, useEffect } from 'react';

const useSpeechRecognition = (onCommand: (command: string) => void) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set language here
    recognition.continuous = true;

    const startListening = () => {
      recognition.start();
      setIsListening(true);
    };

    const stopListening = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      onCommand(command); // Pass recognized command to the callback
    };

    recognition.onend = () => {
      if (isListening) recognition.start(); // Restart on end to ensure continuous listening
    };

    // Start listening when the component mounts
    startListening();

    return () => stopListening(); // Cleanup when the component unmounts
  }, [isListening, onCommand]);

  return { isListening, setIsListening };
};

export default useSpeechRecognition;
