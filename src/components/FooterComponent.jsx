import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

export default function FooterComponent(props) {
    return (
        <div className="footer">
              <div className="footerContainer">
                <IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(0, 123, 255)"}}}>
                    <div className="twitter-icon">
                        <a href="https://twitter.com/crypto_gaijin" target="_blank" rel="noreferrer">
                            <FaTwitter />
                        </a>
                    </div>
                </IconContext.Provider>
                <IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(0, 0, 0)"}}}>
                    <div className="github-icon">
                        <a href="https://github.com/hyp3r5pace" target="_blank" rel="noreferrer">
                            <FaGithub />
                        </a>
                    </div>
                </IconContext.Provider>
                <IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(138, 58, 185)"}}}>
                    <div className="insta-icon">
                        <a href="https://www.instagram.com/sayan.kar2000/" target="_blank" rel="noreferrer">
                            <FaInstagram />
                        </a>
                    </div>
                </IconContext.Provider>
              </div>
              <div className="footerBottom">
                    <p className="trademark">
                        DeFindstarter © 2022
                    </p>
              </div>
          </div>
    );
}