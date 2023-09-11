import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header(){
    return(
        <>
        <div>
            <Navbar style={{position: 'fixed', width:"100%"}} collapseOnSelect expand="lg" bg="white" >
                <Container>
                    <Navbar.Brand href="#AddCard">Card System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#AddCard">Add Card</Nav.Link>
                            <Nav.Link href="#table2">View Cards</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#ConCountry">Configure Banned Countries</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        </>
    )
}