import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AnalystAction = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [action, setAction] = useState('TP');
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post(`http://localhost:8080/api/alerts/${id}/investigate`, {
                action,
                notes
            });
            navigate(`/alert/${id}`);
        } catch (err) {
            console.error("Failed to submit investigation", err);
            setError("Failed to submit investigation. Backend might be unreachable.");
            setSubmitting(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="border-0 shadow bg-surface">
                        <Card.Header className="bg-primary text-white py-3">
                            <h4 className="mb-0">Investigate Alert #{id}</h4>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="text-secondary text-uppercase small fw-bold">Verdict</Form.Label>
                                    <Form.Select
                                        value={action}
                                        onChange={(e) => setAction(e.target.value)}
                                        className="bg-dark text-light border-secondary p-3"
                                    >
                                        <option value="TP">True Positive (TP) - Threat Confirmed</option>
                                        <option value="FP">False Positive (FP) - Safe</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="text-secondary text-uppercase small fw-bold">Investigation Notes</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={6}
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        required
                                        placeholder="Enter your analysis findings, actions taken, and recommended next steps..."
                                        className="bg-dark text-light border-secondary p-3"
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Button variant="outline-light" className="px-4" onClick={() => navigate(-1)}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={submitting} className="px-5">
                                        {submitting ? 'Submitting...' : 'Submit Investigation'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AnalystAction;
