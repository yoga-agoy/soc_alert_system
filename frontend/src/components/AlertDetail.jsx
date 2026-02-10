import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, ListGroup, Badge, Button, Row, Col, Spinner, Alert as BsAlert } from 'react-bootstrap';
import axios from 'axios';

const AlertDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/alerts/${id}`);
                setData(response.data);
            } catch (err) {
                console.error("Failed to fetch details", err);
                setError("Failed to load alert details.");
                // Mock fallback
                setData({
                    alert: {
                        alertId: "MOCK-001",
                        severity: "High",
                        status: "New",
                        timestamp: new Date().toISOString(),
                        description: "Suspicious outbound traffic detected to known malicious IP address.",
                        recommendedAction: "Isolate host immediately and scan for malware.",
                        source: "Firewall",
                        eventType: "Outbound Traffic"
                    },
                    iocs: [
                        { id: 101, type: "IP", value: "192.168.1.100" },
                        { id: 102, type: "DOMAIN", value: "malicious.com" }
                    ],
                    threatIntel: {
                        101: [{ provider: "VirusTotal", verdict: "Clean", score: 0 }],
                        102: [{ provider: "VirusTotal", verdict: "Malicious", score: 90 }]
                    },
                    investigation: null
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" variant="primary" /></Container>;
    if (!data) return <Container className="mt-5"><BsAlert variant="danger">Alert not found</BsAlert></Container>;

    const { alert, iocs, threatIntel, investigation } = data;

    return (
        <Container className="py-5">
            <Link to="/" className="btn btn-outline-secondary mb-4 text-decoration-none">
                &larr; Back to Dashboard
            </Link>

            <Row className="gy-4">
                <Col lg={8}>
                    {/* Main Alert Info */}
                    <Card className="mb-4 border-0 shadow-sm bg-surface">
                        <Card.Header className="bg-transparent border-bottom border-secondary d-flex justify-content-between align-items-center py-3">
                            <h4 className="mb-0 text-primary">{alert.alertId}</h4>
                            <Badge bg={alert.severity === 'High' ? 'danger' : 'warning'} className="px-3 py-2">
                                {alert.severity}
                            </Badge>
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-4">
                                <Col md={6}>
                                    <p className="text-secondary mb-1">Status</p>
                                    <h5 className="text-light">{alert.status}</h5>
                                </Col>
                                <Col md={6}>
                                    <p className="text-secondary mb-1">Timestamp</p>
                                    <h5 className="text-light">{new Date(alert.timestamp).toLocaleString()}</h5>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col md={6}>
                                    <p className="text-secondary mb-1">Source</p>
                                    <p className="text-light lead">{alert.source || 'N/A'}</p>
                                </Col>
                                <Col md={6}>
                                    <p className="text-secondary mb-1">Event Type</p>
                                    <p className="text-light lead">{alert.eventType || 'N/A'}</p>
                                </Col>
                            </Row>

                            <div className="mb-4 p-3 rounded bg-dark border border-secondary">
                                <h6 className="text-primary text-uppercase small letter-spacing-1">Description</h6>
                                <p className="mb-0 text-light">{alert.description}</p>
                            </div>

                            <div className="p-3 rounded bg-dark border border-secondary">
                                <h6 className="text-warning text-uppercase small letter-spacing-1">Recommended Action</h6>
                                <p className="mb-0 text-light">{alert.recommendedAction}</p>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Consolidated Details: Host, User, Network, File */}
                    <Row className="mb-4">
                        <Col md={12}>
                            <Card className="border-0 shadow-sm bg-surface">
                                <Card.Header className="bg-transparent border-bottom border-secondary py-3">
                                    <h5 className="mb-0 text-primary">Contextual Details</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Row className="gy-4">
                                        {/* Host Details */}
                                        <Col md={6}>
                                            <h6 className="text-secondary text-uppercase small fw-bold mb-3">Host Information</h6>
                                            <ListGroup variant="flush" className="small">
                                                <ListGroup.Item className="bg-transparent px-0 py-1 d-flex justify-content-between">
                                                    <span className="text-muted">Hostname:</span>
                                                    <span className="fw-medium">{alert.hostHostname || 'N/A'}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="bg-transparent px-0 py-1 d-flex justify-content-between">
                                                    <span className="text-muted">IP Address:</span>
                                                    <span className="fw-medium">{alert.hostIpAddress || 'N/A'}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="bg-transparent px-0 py-1 d-flex justify-content-between">
                                                    <span className="text-muted">OS:</span>
                                                    <span className="fw-medium">{alert.hostOs || 'N/A'}</span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>

                                        {/* User Details */}
                                        <Col md={6}>
                                            <h6 className="text-secondary text-uppercase small fw-bold mb-3">User Information</h6>
                                            <ListGroup variant="flush" className="small">
                                                <ListGroup.Item className="bg-transparent px-0 py-1 d-flex justify-content-between">
                                                    <span className="text-muted">Username:</span>
                                                    <span className="fw-medium">{alert.userUsername || 'N/A'}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="bg-transparent px-0 py-1 d-flex justify-content-between">
                                                    <span className="text-muted">Domain:</span>
                                                    <span className="fw-medium">{alert.userDomain || 'N/A'}</span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>

                                        {/* Network Details */}
                                        <Col md={6}>
                                            <h6 className="text-secondary text-uppercase small fw-bold mb-3">Network Activity</h6>
                                            <ListGroup variant="flush" className="small">
                                                <ListGroup.Item className="bg-transparent px-0 py-1 d-flex justify-content-between">
                                                    <span className="text-muted">Dest IP:</span>
                                                    <span className="fw-medium">{alert.networkDestinationIp || 'N/A'}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="bg-transparent px-0 py-1 d-flex justify-content-between">
                                                    <span className="text-muted">Dest Port:</span>
                                                    <span className="fw-medium">{alert.networkDestinationPort || 'N/A'}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="bg-transparent px-0 py-1 d-flex justify-content-between">
                                                    <span className="text-muted">Protocol:</span>
                                                    <span className="fw-medium">{alert.networkProtocol || 'N/A'}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="bg-transparent px-0 py-1">
                                                    <span className="text-muted d-block">URL:</span>
                                                    <span className="fw-medium text-break">{alert.networkUrl || 'N/A'}</span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>

                                        {/* File Details */}
                                        <Col md={6}>
                                            <h6 className="text-secondary text-uppercase small fw-bold mb-3">File Information</h6>
                                            <ListGroup variant="flush" className="small">
                                                <ListGroup.Item className="bg-transparent px-0 py-1 border-0">
                                                    <span className="text-muted d-block">Filename:</span>
                                                    <span className="fw-medium text-break">{alert.fileFileName || 'N/A'}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="bg-transparent px-0 py-1">
                                                    <span className="text-muted d-block">SHA256:</span>
                                                    <code className="d-block bg-light p-1 rounded text-break">{alert.fileFileHashSha256 || 'N/A'}</code>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Investigation Summary */}
                    {investigation && (
                        <Card className="mb-4 border-success shadow-sm" style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)' }}>
                            <Card.Header className="bg-success text-white py-3">
                                <h5 className="mb-0"><i className="bi bi-shield-check me-2"></i>Investigation Summary</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        <p className="text-success-emphasis mb-1"><strong>Action Taken</strong></p>
                                        <Badge bg={investigation.analystAction === 'TP' ? 'danger' : 'success'} className="fs-6">
                                            {investigation.analystAction}
                                        </Badge>
                                    </Col>
                                    <Col md={8}>
                                        <p className="text-success-emphasis mb-1"><strong>Analyst Notes</strong></p>
                                        <p className="text-light">{investigation.notes}</p>
                                    </Col>
                                </Row>
                                <hr className="border-success opacity-50" />
                                <small className="text-success-emphasis">
                                    Investigated at: {new Date(investigation.investigatedAt).toLocaleString()}
                                </small>
                            </Card.Body>
                        </Card>
                    )}
                </Col>

                <Col lg={4}>
                    {/* IOCs Side Panel */}
                    <Card className="border-0 shadow-sm bg-surface h-100">
                        <Card.Header className="bg-transparent border-bottom border-secondary py-3">
                            <h5 className="mb-0 text-info">Indicators (IOCs)</h5>
                        </Card.Header>
                        <ListGroup variant="flush" className="bg-transparent">
                            {iocs && iocs.map((ioc, index) => (
                                <ListGroup.Item key={index} className="bg-transparent text-light border-secondary">
                                    <div className="mb-2 d-flex justify-content-between">
                                        <Badge bg="secondary" className="ioc-badge">{ioc.type}</Badge>
                                    </div>
                                    <code className="d-block mb-2 p-2 rounded bg-dark text-warning text-break">
                                        {ioc.value}
                                    </code>

                                    {threatIntel && threatIntel[ioc.id] && (
                                        <div className="mt-2">
                                            {threatIntel[ioc.id].map((ti, tiIdx) => (
                                                <div key={tiIdx} className={`d-flex align-items-center mb-1 small ${ti.verdict === 'Malicious' ? 'text-danger' : 'text-success'}`}>
                                                    <span className="me-2 fw-bold">{ti.provider}:</span>
                                                    <span>{ti.verdict} ({ti.score}/100)</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ListGroup.Item>
                            ))}
                            {(!iocs || iocs.length === 0) && (
                                <ListGroup.Item className="bg-transparent text-secondary">
                                    No IOCs extracted.
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        <Card.Footer className="bg-transparent border-top border-secondary p-3">
                            <div className="d-grid">
                                <Link to={`/investigate/${id}`} className={`btn btn-primary btn-lg ${investigation ? 'disabled' : ''}`}>
                                    {investigation ? 'Investigation Closed' : 'Take Analyst Action'}
                                </Link>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AlertDetail;
