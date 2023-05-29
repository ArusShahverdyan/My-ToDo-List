import { memo } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import styles from "./navBar.module.css"


const activeLinkClassName = ({ isActive }) => {
  const classes = [styles.pageLinks];
  if (isActive) {
    classes.push(styles.active);
  }
  return classes.join(' ');
};


function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClose = () => setMenuOpen(false)
  const handleShow = () => setMenuOpen(true)
  return (

    <Navbar bg="light" expand='sm' className="m-2">
      <Container fluid>
        <NavLink to="/" className={activeLinkClassName}>Todo</NavLink>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-sm`}
          onClick={handleShow}
        />
        <Navbar.Offcanvas

          aria-labelledby={`offcanvasNavbarLabel-expand-expand`}
          placement="end"
          show={menuOpen}
          onHide={handleClose}
        >

          <Offcanvas.Header closeButton> </Offcanvas.Header>
          <Offcanvas.Body >

            <Nav className="justify-content-start flex-grow-1 pe-3" >
              {/* <NavLink to="/task" className={activeLinkClassName} onClick={handleClose} > */}
                {/* Tasks */}
              {/* </NavLink> */}
              <NavLink to="about" className={activeLinkClassName} onClick={handleClose}>About</NavLink>
              <NavLink to="/contact" className={activeLinkClassName} onClick={handleClose}>Contact us</NavLink>
            </Nav>

          </Offcanvas.Body>
        </Navbar.Offcanvas>

      </Container>
    </Navbar>

  );
}

export default memo(NavBar);