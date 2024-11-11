







import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, ProgressBar, Alert } from 'react-bootstrap';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcriptWithTimestamp, setTranscriptWithTimestamp] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = handleSpeechResult;
      recognition.onerror = handleError;
      setRecognition(recognition);
    } else {
      setError("Your browser doesn't support speech recognition. Please try using Chrome or Edge.");
    }
  }, []);

  const handleSpeechResult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');
    
    if (event.results[0].isFinal) {
      const timestamp = new Date().toLocaleTimeString();
      setTranscriptWithTimestamp(prev => [...prev, { time: timestamp, text: transcript.trim() }]);
    }
  };

  const handleError = (event) => {
    setError(`Speech recognition error: ${event.error}`);
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setError(null);
    }
    setIsListening(!isListening);
  };

  const clearTranscript = () => {
    setTranscriptWithTimestamp([]);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4">AI Clinical Notes</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="d-flex justify-content-center mb-4">
                <Button
                  variant={isListening ? "danger" : "primary"}
                  size="lg"
                  onClick={toggleListening}
                  className="rounded-circle p-3"
                  disabled={!!error}
                >
                  {isListening ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
                </Button>
              </div>
              <p className="text-center mb-4">
                {isListening ? "Listening..." : "Click the microphone to start dictating"}
              </p>
              {isListening && (
                <ProgressBar animated now={100} className="mb-4" />
              )}
              <Card className="bg-light">
                <Card.Body>
                  <h5 className="card-title mb-3">Clinical Notes</h5>
                  <div className="transcript-box" style={{maxHeight: '300px', overflowY: 'auto'}}>
                    {transcriptWithTimestamp.map((item, index) => (
                      <p key={index} className="mb-2">
                        <strong>{item.time}:</strong> {item.text}
                      </p>
                    ))}
                  </div>
                  {transcriptWithTimestamp.length > 0 && (
                    <div className="text-center mt-3">
                      <a href="#" onClick={(e) => { e.preventDefault(); clearTranscript(); }} className="text-muted">
                        Clear notes
                      </a>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SpeechToText;







