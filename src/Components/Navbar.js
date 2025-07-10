import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/snote.png';
import '../index.css'; // we'll define styles here

function AppNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <Navbar fixed="top" bg="dark" expand="lg" data-bs-theme="dark" className="custom-navbar">
      <Container fluid className="px-5 d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 brand-logo">
          <div className="logo-wrapper">
            <img
              src={logo}
              alt="sNotebook Logo"
              className="brand-img"
            />
          </div>
          <span className="brand-text">sNotebook</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/" className="linkStyle">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="linkStyle">About</Nav.Link>
            {!localStorage.getItem('token') ? (
              <>
                <Nav.Link as={Link} to="/signin" className="linkStyle">Signin</Nav.Link>
                <Nav.Link as={Link} to="/signup" className="linkStyle">Signup</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout} className="linkStyle">Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
