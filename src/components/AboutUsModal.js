import React from "react";
import Modal from "../utilities/Modal";

import myPicture from "../assets/images/me.jpeg";
import "../assets/styles/aboutusmodal.scss";

const AboutUsModal = (props) => {
  const hideModal = () => {
    props.hideModal();
  };

  return (
    <Modal
      isShow={props.isAboutUsModalShow}
      hideModal={hideModal}
      maxWidth="500px"
    >
      <Modal.Header />

      <Modal.Body>
        <main className="about-us__modal">
          <img
            className="developer-image"
            src={myPicture}
            alt="asia-property-developer"
          />
          <h4 className="developer-title">Chen Frederick</h4>
          <p className="developer-subtitle">
            Fullstack Developer of Asia-Property
          </p>

          <div className="social-buttons">
            <a
              href="https://www.chenfrederick.com"
              target="blank"
              className="social-icon"
            >
              <i className="icon icon-earth" />
            </a>
            <a
              href="https://github.com/Frederick-88"
              target="blank"
              className="social-icon"
            >
              <i className="icon icon-github" />
            </a>
            <a
              href="https://www.linkedin.com/in/chen-frederick"
              target="blank"
              className="social-icon"
            >
              <i className="icon icon-linkedin-solid" />
            </a>
            <a
              title="me@chenfrederick.com"
              href="mailto:me@chenfrederick.com?subject=Hi Fred!&body=I'm (name) from (where) (please kindly drop your message here)"
              className="social-icon"
            >
              <i className="icon icon-mail" />
            </a>
          </div>

          <p className="developer-description">
            Frederick is an enthusiastic and passionate person who empower
            learning and hardwork is the key to deliver quality in advance, So
            he always give maximum effort in his works.
          </p>
          <p className="developer-description">
            He is a MERN & MEVN Fullstack Javascript Developer who thrives in
            fast-paced environment, keen to learn and pay attention to detail.
            See more about his skills & projects in his Linkedin!
          </p>
        </main>
      </Modal.Body>

      <Modal.Footer />
    </Modal>
  );
};

export default AboutUsModal;
