import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Cart, Heart, Logo, Profile, Search } from "../../public/assets";
import { useContext } from "react";
import { DataContext } from "@/store/GlobalState";
import Link from "next/link";

//

function Header() {
  const router = useRouter();
  const { state } = useContext(DataContext);

  console.log(state?.cart);

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
                <Link
                  className={`nav-link ${
                    router.pathname === "/" ? "active" : ""
                  }`}
                  href="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    router.pathname === "/about" ? "active" : ""
                  }`}
                  href="#"
                >
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    router.pathname === "/contact" ? "active" : ""
                  }`}
                  href="#"
                >
                  Contact
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    router.pathname === "/categories" ? "active" : ""
                  }`}
                  href="#"
                >
                  Categories
                </Link>
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
                <div className="badge">{state?.cart?.length}</div>
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
