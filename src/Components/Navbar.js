import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function AppNavbar() {
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/signin');
  }
  return (
    <Navbar fixed="top" bg="dark" expand="lg" data-bs-theme="dark">
      <Container fluid className="px-5 d-flex justify-content-between align-items-center">
        {/* Left - Brand */}
        <Navbar.Brand href="/" className='fw-bold'>sNotebook</Navbar.Brand>

        {/* Hamburger for smaller screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Right - Nav Links */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav >
            <Nav.Item>
              <Nav.Link as={Link} to="/" className='linkStyle'>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/about" className='linkStyle'>About</Nav.Link>
            </Nav.Item>
            {!localStorage.getItem('token') ?
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/signin" className='linkStyle'>Signin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/signup" className='linkStyle'>Signup</Nav.Link>
                </Nav.Item>
              </> : <Nav.Item>
                <Nav.Link as={Link} onClick={handleLogout} className='linkStyle'>Logout</Nav.Link>
              </Nav.Item>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
