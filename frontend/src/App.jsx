import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlertList from './components/AlertList';
import AlertDetail from './components/AlertDetail';
import AnalystAction from './components/AnalystAction';
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">SOC Alert System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Dashboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<AlertList />} />
        <Route path="/alert/:id" element={<AlertDetail />} />
        <Route path="/investigate/:id" element={<AnalystAction />} />
      </Routes>
    </Router>
  );
}

export default App;
