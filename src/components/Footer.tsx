import Link from "next/link";

//

const Footer = () => {
  //

  return (
    <footer>
      <div className="container">
        <div className="row footer-middle mt-5">
          <div className="col-lg-3 col-md-6 text-white">
            <small className="d-block my-3">Company</small>

            <ul>
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 text-white">
            <small className="d-block my-3">Legal</small>

            <ul>
              <li>
                <Link href="#">Terms</Link>
              </li>
              <li>
                <Link href="#">Privacy</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 text-white">
            <small className="d-block my-3">Quick Links</small>

            <ul>
              <li>
                <Link href="#">Categories</Link>
              </li>
              <li>
                <Link href="#">New Products</Link>
              </li>
              <li>
                <Link href="#">Top Deals</Link>
              </li>
              <li>
                <Link href="#">Subscription</Link>
              </li>
              <li>
                <Link href="#">Our Furniture Makers</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 text-white">
            <small className="d-block my-3">Help and Information</small>

            <ul>
              <li>
                <Link href="#">Delivery Information</Link>
              </li>
              <li>
                <Link href="#">Shipping</Link>
              </li>
              <li>
                <Link href="#">Help and Support</Link>
              </li>
              <li>
                <Link href="#">FAQs</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <small className="text-white">
            copyright &copy; {new Date().getFullYear()} Dekor All rights
            reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
