import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Container, Spinner, Alert as BsAlert, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AlertList = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/alerts');
                setAlerts(response.data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch alerts", err);
                setError("Failed to connect to backend API.");
                // Fallback mock data
                setAlerts([
                    { id: 1, alertId: "MOCK-001", severity: "High", status: "New", timestamp: new Date().toISOString() },
                    { id: 2, alertId: "MOCK-002", severity: "Medium", status: "InProgress", timestamp: new Date().toISOString() }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    const getSeverityBadge = (severity) => {
        const variant = severity === 'High' ? 'danger' : severity === 'Medium' ? 'warning' : 'info';
        return <Badge bg={variant}>{severity}</Badge>;
    };

    if (loading) return (
        <Container className="mt-5 text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading alerts...</p>
        </Container>
    );

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4 dashboard-header">
                <h2 className="mb-0">Security Alerts</h2>
                <Badge bg="secondary" pill>{alerts.length} Total</Badge>
            </div>

            {error && <BsAlert variant="warning" className="mb-4">{error} Showing cached/mock data.</BsAlert>}

            {/* Mobile View: Cards */}
            <div className="d-block d-md-none">
                {alerts.map(alert => (
                    <Card key={alert.id} className="mb-3 alert-card border-0 shadow-sm bg-surface">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <h5 className="card-title text-primary mb-0">{alert.alertId}</h5>
                                {getSeverityBadge(alert.severity)}
                            </div>
                            <p className="card-text text-muted small mb-2">
                                <i className="bi bi-clock me-1"></i>
                                {new Date(alert.timestamp).toLocaleString()}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className={`badge bg-dark border border-secondary`}>{alert.status}</span>
                                <Link to={`/alert/${alert.id}`}>
                                    <Button variant="outline-primary" size="sm">View Details</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {/* Desktop View: Table */}
            <div className="d-none d-md-block">
                <Card className="border-0 shadow-sm bg-surface">
                    <Table hover responsive className="mb-0 text-white" style={{ backgroundColor: 'transparent' }}>
                        <thead className="bg-dark text-white-50">
                            <tr>
                                <th className="py-3 ps-4">Alert ID</th>
                                <th className="py-3">Severity</th>
                                <th className="py-3">Status</th>
                                <th className="py-3">Timestamp</th>
                                <th className="py-3 text-end pe-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alerts.map(alert => (
                                <tr key={alert.id} className="align-middle">
                                    <td className="ps-4 fw-bold text-primary">{alert.alertId}</td>
                                    <td>{getSeverityBadge(alert.severity)}</td>
                                    <td><span className="badge bg-dark border border-secondary text-light">{alert.status}</span></td>
                                    <td className="text-secondary">{new Date(alert.timestamp).toLocaleString()}</td>
                                    <td className="text-end pe-4">
                                        <Link to={`/alert/${alert.id}`}>
                                            <Button variant="outline-primary" size="sm">View Details</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </div>
        </Container>
    );
};

export default AlertList;
