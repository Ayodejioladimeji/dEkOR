import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Cart, Heart, Logo, Profile, Search } from "../../public/assets";

//

function Header() {
  const router = useRouter();

  //

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar fixed-top py-4">
      <Container className="d-flex align-items-center justify-content-between">
        <a className="navbar-brand" href="/">
          <Logo />
        </a>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <ul className="navbar-nav nav-top ms-auto">
            <Nav>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    router.pathname === "/" ? "active" : ""
                  }`}
                  href="/about-us"
                >
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${
                    router.pathname === "/about" ? "active" : ""
                  }`}
                  href="/advertise"
                >
                  About
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${
                    router.pathname === "/contact" ? "active" : ""
                  }`}
                  href="/howto"
                >
                  Contact
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${
                    router.pathname === "/categories" ? "active" : ""
                  }`}
                  href="/contact"
                >
                  Categories
                </a>
              </li>
            </Nav>
          </ul>

          <ul className="navbar-nav ms-auto">
            <Nav>
              <li className="nav-item">
                <Search />
              </li>
              <li className="nav-item">
                <Heart />
              </li>
              <li className="nav-item">
                <Cart />
              </li>
              <li className="nav-item">
                <Profile />
              </li>
            </Nav>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;