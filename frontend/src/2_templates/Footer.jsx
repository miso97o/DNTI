import "../4_css/Footer.css";
import {
  faFacebookF,
  faGooglePlusG,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className=" bg-gray-500">
      <div className="footer-content">
        <div className="flex gap-2">
          <img src="./img/logo-all-white.png" alt="" className="w-28" />
        </div>
        <div>
          <ul className="f-menu flex gap-12">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
          <div className="footer-bottom">
            <p>© 2022 Dnti. All rights reserved.</p>
          </div>
        </div>
        <div className="footer-menu">
          <ul className="socials">
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
