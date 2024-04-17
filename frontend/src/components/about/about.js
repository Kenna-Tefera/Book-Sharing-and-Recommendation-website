import React from "react";
import Navbar from "../navbar/navbar"; // Update the path to the Navbar component
import "./about.css"; // Import the CSS file for styling
import Footer from "../footer/footer";

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-content">
        <div className="about-image">{/* Add your image here */}</div>
        <div className="about-text">
          <h1>Who We Are</h1>
          <p>
            socialreads is the largest site for readers and book
            recommendations. Our mission is to help readers discover books they
            love and get more out of reading. socialeads launched in 2024.
          </p>

          <h2>A Few Things You Can Do On socialreads</h2>
          <ul>
            <li>See what books your friends are reading.</li>
            <li>
              Track the books you're reading, have read, and want to read.
            </li>
            <li>
              Check out your personalized book recommendations. Our
              recommendation engine analyzes to give suggestions tailored to
              your literary tastes.
            </li>
          </ul>

          <h2>A Message From Our Co-Founder</h2>
          <p>
            When I was in second grade, I discovered the Hardy Boys series. Ever
            since, I've loved to read — both for fun and to improve my mind. And
            I'm always looking for the next great book.
          </p>
          <p>
            One afternoon while I was scanning a friend's bookshelf for ideas,
            it struck me: when I want to know what books to read, I'd rather
            turn to a friend than any random person or bestseller list.
          </p>
          <p>
            So I decided to build a website – a place where I could see my
            friends' bookshelves and learn about what they thought of all their
            books. Elizabeth, my co-founder (and now my wife) wrote the site
            copy and I wrote the code. We started in my living room, motivated
            by the belief that there was a better way to discover and discuss
            good books, and that we could build it.
          </p>
          <p>
            Goodreads is that site. It is a place where you can see what your
            friends are reading and vice versa. You can create "bookshelves" to
            organize what you've read (or want to read). You can comment on each
            other's reviews. You can find your next favorite book. And on this
            journey with your friends you can explore new territory, gather
            information, and expand your mind.
          </p>
          <p>Knowledge is power, and power is best shared among readers.</p>
          <p>
            <strong>Otis Chandler</strong>
            <br />
            Co-Founder
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
