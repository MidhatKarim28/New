


import React, { useState } from 'react';
import { Button, Container, Form, Card, Row, Col } from 'react-bootstrap';

const SpeechToText = () => {
  const [transcriptWithTimestamp, setTranscriptWithTimestamp] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSimulateSpeech = () => {
    if (inputText.trim()) {
      const timestamp = new Date().toLocaleTimeString();
      setTranscriptWithTimestamp(prev => [...prev, { time: timestamp, text: inputText.trim() }]);
      setInputText('');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg">
        <Card.Body>
          <h1 className="text-center mb-4">Speech to Text Simulator</h1>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Type your speech here"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="form-control-lg"
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSimulateSpeech}
                  className="mb-3"
                >
                  Simulate Speech
                </Button>
              </div>
              <Card className="mt-4">
                <Card.Body>
                  <h5 className="card-title mb-3">Transcript</h5>
                  <div className="transcript-box" style={{maxHeight: '300px', overflowY: 'auto'}}>
                    {transcriptWithTimestamp.map((item, index) => (
                      <p key={index} className="mb-2">
                        <strong>{item.time}:</strong> {item.text}
                      </p>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SpeechToText;


