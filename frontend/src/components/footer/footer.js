import React from "react";
import styles from "./footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import AboutPage from "../about/about";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h2>COMPANY</h2>
          <ul>
            <li>
              <a href="/about/us">About Us</a>
            </li>
            <br />
            <li>
              <a href="/terms">Terms</a>
            </li>
            <br />
            <li>
              <a href="/privacy">Privacy</a>
            </li>
            <br />
            <li>
              <a href="/help">Help</a>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>WORK WITH US</h2>
          <ul>
            <li>
              <a href="/authors">Authors</a>
            </li>
            <br />
            <li>
              <a href="/advertise">Advertise</a>
            </li>
            <br />
          </ul>
        </div>
        <div className={styles.section}>
          <h2>CONNECT</h2>
          <ul className={styles.socialLinks}>
            <li>
              <a href="https://www.facebook.com">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com">
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <p>&copy; {currentYear} Socialreads, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
