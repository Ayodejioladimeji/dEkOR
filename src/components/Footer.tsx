import Link from "next/link";
import { useRouter } from "next/router";

//

const Footer = () => {
  const router = useRouter();
  //

  return (
    <footer>
      <div className="container">
        <div className="row footer-middle mt-5">
          <div className="col-lg-3 col-md-6 text-white">
            <small className="d-block my-3">Company</small>

            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 text-white">
            <small className="d-block my-3">Legal</small>

            <ul>
              <li>
                <Link href="/about-us">Terms</Link>
              </li>
              <li>
                <Link href="/howto">Privacy</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 text-white">
            <small className="d-block my-3">Quick Links</small>

            <ul>
              <li>
                <Link href="/faqs">Categories</Link>
              </li>
              <li>
                <Link href="/terms">New Products</Link>
              </li>
              <li>
                <Link href="/privacy">Top Deals</Link>
              </li>
              <li>
                <Link href="/privacy">Subscription</Link>
              </li>
              <li>
                <Link href="/privacy">Our Furniture Makers</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 text-white">
            <small className="d-block my-3">Help and Information</small>

            <ul>
              <li>
                <Link href="/faqs">Delivery Information</Link>
              </li>
              <li>
                <Link href="/terms">Shipping</Link>
              </li>
              <li>
                <Link href="/privacy">Help and Support</Link>
              </li>
              <li>
                <Link href="/privacy">FAQs</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="row footer-bottom mt-5 text-white">
          <div className="text-box">
            <span className="d-block">
              © {new Date().getFullYear()} dEKOR e-commerce
            </span>
          </div>

          {/* <div className="col-sm-6 icon-box">
            <div className="footer-icons">
              <a
                href="https://www.facebook.com/profile.php?id=100085724386292&mibextid=ZbWKwL"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="https://www.instagram.com/invites/contact/?i=1pqlgg45pg0nl&utm_content=pldblyb"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="https://twitter.com/Hapartment11?t=cmOAR5aAypWeGzbLvebt-A&s=09"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-twitter"></i>
              </a>

              <a
                href="https://www.linkedin.com/in/hapartment-rentals"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
