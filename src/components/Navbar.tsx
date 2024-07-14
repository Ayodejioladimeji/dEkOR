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

  //

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar fixed-top py-4">
      <Container className="main-container">
        <div className="toggle-section">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Link className="navbar-brand" href="/">
            <Logo />
          </Link>
        </div>

        <ul className="mobile-navbar">
          <li className="nav-item">
            <Search />
          </li>
          <li className="nav-item">
            <Link href="/favourites">
              <Heart />
              <div className="badge">{state?.favourite?.length}</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/cart">
              <Cart />
              <div className="badge">{state?.cart?.length}</div>
            </Link>
          </li>
          <li className="nav-item">
            <Profile />
          </li>
        </ul>

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
                    router.pathname === "/product" ? "active" : ""
                  }`}
                  href="/product"
                >
                  Products
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

          <ul className="navbar-nav web-nav ms-auto">
            <Nav>
              <li className="nav-item">
                <Search />
              </li>
              <li className="nav-item">
                <Link href="/favourites">
                  <Heart />
                  <div className="badge">{state?.favourite?.length}</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/cart">
                  <Cart />
                  <div className="badge">{state?.cart?.length}</div>
                </Link>
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
