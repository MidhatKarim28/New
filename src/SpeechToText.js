
import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcriptWithTimestamp, setTranscriptWithTimestamp] = useState([]);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      const timestamp = new Date().toLocaleTimeString();
      setTranscriptWithTimestamp(prev => [...prev, { time: timestamp, text: transcript }]);
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  const handleToggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening(!isListening);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Speech to Text</h1>
      <Button
        variant={isListening ? "danger" : "primary"}
        onClick={handleToggleListening}
        className="mb-3"
      >
        {isListening ? "Stop Speaking" : "Start Speaking"}
      </Button>
      <Form.Control
        as="textarea"
        rows={10}
        readOnly
        value={transcriptWithTimestamp.map(item => `${item.time}: ${item.text}`).join('\n')}
      />
    </Container>
  );
};

export default SpeechToText;
