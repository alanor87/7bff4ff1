import React, { useState } from "react";
import JSConfetti from "js-confetti";
import classNames from "classnames";
const jsConfetti = new JSConfetti();

const Footer = ({ activeTab }) => {
  const [aboutText, setAboutText] = useState("About");

  const onAboutClick = () => {
    setAboutText('Thanks for the challenge!')
    jsConfetti.addConfetti();
    setTimeout(() => setAboutText('About'), 3000)
  };

  return (
    <footer
      className={classNames({ archivedSelected: activeTab === "Archived" })}
    >
      <span className="about" onClick={onAboutClick}>
        {aboutText}
      </span>
    </footer>
  );
};

export default Footer;
