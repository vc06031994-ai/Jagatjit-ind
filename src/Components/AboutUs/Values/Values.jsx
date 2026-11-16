

import React from "react";
import '../Values/Values.css';
import responsibility from '../../../Assets/AboutUs/Values/responsibility.png';
import teamwork from '../../../Assets/AboutUs/Values/teamwork.png';
import respect from '../../../Assets/AboutUs/Values/respect.png';
import equality from '../../../Assets/AboutUs/Values/equality.png';
import creative from '../../../Assets/AboutUs/Values/creative.png';
import alwayslearning from '../../../Assets/AboutUs/Values/alwayslearning.png'
import more from '../../../Assets/AboutUs/Values/more.png';
import loyal from '../../../Assets/AboutUs/Values/loyal.png';
import smart from '../../../Assets/AboutUs/Values/smart.png';


export const Values = () => {
    return (
        <section className="valuesmainDiv">
            <div className="value-hero-wrapper">
            <div className="container">
            <div className="value-hero-content">
                <h1 className="heading-top">Our Core Values</h1>
                <p className="firstDivParagraph">What we believe in.</p>
            </div>
            </div>
            </div>
            {/* //1 */}
            <div className="logosec container">
            <div className="logoTextDiv">
                <div className="logoDiv">
                    <img src={responsibility} alt="alwayslearing" className="img valueImg" />
                    <h1 className="logoTxtHeader valuetitle">
                        Taking Ownership
                    </h1>
                    <p className="logoTxtParagraph valuepara">
                        We take ownership of the work we do.
                    </p>
                </div>
                <div className="logoDiv">
                    <img src={teamwork} alt="creative" className="img valueImg" />
                    <h1 className="logoTxtHeader valuetitle">
                        Team Work
                    </h1>
                    <p className="logoTxtParagraph valuepara">
                        We work collaboratively as a team to ensure success.
                    </p>
                </div>
                <div className="logoDiv">
                    <img src={respect} alt="alwayslearing" className="img valueImg" />
                    <h1 className="logoTxtHeader valuetitle">
                        Respect & Trust
                    </h1>
                    <p className="logoTxtParagraph valuepara">
                        We respect and trust each other.
                    </p>
                </div>
                <div className="logoDiv">
                    <img src={equality} alt="creative" className="img valueImg" />
                    <h1 className="logoTxtHeader valuetitle">
                        Gender Equality
                    </h1>
                    <p className="logoTxtParagraph valuepara">
                        We are not afraid to treat women as equals.
                    </p>
                </div>
                <div className="logoDiv">
                    <img src={creative} alt="alwayslearing" className="img valueImg" />
                    <h1 className="logoTxtHeader valuetitle">
                      Creativity
                    </h1>
                    <p className="logoTxtParagraph valuepara">
                        We encourage creativity and out of the box thinking.
                    </p>
                </div>
                <div className="logoDiv">
                    <img src={alwayslearning} alt="creative" className="img valueImg" />
                    <h1 className="logoTxtHeader valuetitle">
                        Constant Learning
                    </h1>
                    <p className="logoTxtParagraph valuepara">
                        We are never too old to learn..
                    </p>
                </div>
                <div className="logoDiv">
                    <img src={more} alt="alwayslearing" className="img valueImg" />
                    <h1 className="logoTxtHeader valuetitle">
                        Optimizing Resources
                    </h1>
                    <p className="logoTxtParagraph valuepara">
                        We do more with less.
                    </p>
                </div>
                <div className="logoDiv">
                    <img src={loyal} alt="creative" className="img valueImg" />
                    <h1 className="logoTxtHeader valuetitle">
                        Honesty
                    </h1>
                    <p className="logoTxtParagraph valuepara">
                        We do not cheat.
                    </p>
                </div>
                <div className="logoDiv">
                    <img src={smart} alt="creative" className="img valueImg" />
                    <h1 className="logoTxtHeader valuetitle">
                        Consistency
                    </h1>
                    <p className="logoTxtParagraph valuepara">
                        We will be consistent and efficient.
                    </p>
                </div>
            </div>

            </div>
         
        </section>
    )
}