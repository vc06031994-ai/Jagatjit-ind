import React, { useEffect, useState } from "react";
import axios from "axios";
import '../AcBlack/AcBlack.css';
import { client } from '../../../../api/contentful.js';
import { HiArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import acpNew from '../../../../Assets/ArrowBottle/acpNew.png';
import RoyalPride from '../../../../Assets/ArrowBottle/royalPride-old.png';
import glass from '../../../../Assets//Products/Liquor/AcpremiumOld/elegant.svg';
import candle from '../../../../Assets//Products/Liquor/AcpremiumOld/deep.svg';
import hotglass from '../../../../Assets//Products/Liquor/AcpremiumOld/sweet.svg';
import lipglass from '../../../../Assets//Products/Liquor/AcpremiumOld/smooth.svg';



export const AcBlack = () => {
    const [scrVideo, setScrVideo] = useState("");
    const [currentImages, setCurrentImages] = useState({});

    useEffect(() => {
        axios.get('https://api.jagatjit.com/api/videos')
            .then(response => {
                const data = response.data.data.find((el) => el.name === "AC BLACK");
                setScrVideo(data.video_file);
            })
            .catch(error => console.error('Error fetching video:', error));
    }, []);

    useEffect(() => {
        client.getEntries({ content_type: 'acPremiumOld' })
            .then((response) => {
                const entry = response.items[5].fields;
                setCurrentImages({
                    section1Desktop: entry.firstsectionDesktop?.fields.file.url,
                    section1Mobile: entry.firstsectionMobile?.fields.file.url,
                    section2Desktop: entry.secondsectionDesktop?.fields.file.url,
                    section2Mobile: entry.secondsectionMobile?.fields.file.url,
                    section3Desktop: entry.thirdsectionDesktop?.fields.file.url,
                    section3Mobile: entry.thirdsectionMobile?.fields.file.url,
                });
            })
            .catch(error => console.error('Error fetching Contentful data:', error));
    }, []);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getBackgroundImage = (desktopImage, mobileImage) => {
        return windowWidth <= 768 ? mobileImage : desktopImage;
    };

    return (
        <section>
            <div
                className="acblackFirstDiv p-top-bottom"
                style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section1Desktop, currentImages.section1Mobile)})` }}
            >
                <div className="acsec1div container">
                    <div className="acblackRowContent space">
                        <h1 className="h1-primery">AC BLACK</h1>
                        <h4 className="g-heading-4-yellow">PURE GRAIN WHISKY</h4>
                        <p className="global-p-2">
                            Smooth taste and packaging embody a well-crafted melding of fine malt Whisky from Scotland, and the finest Indian grain spirits.
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="acblackSecondDiv"
                style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section2Desktop, currentImages.section2Mobile)})` }}
            >
                <div className="acblackColumnContent container">
                    <h2 className="g-heading-4-yellow">An Elegant,<br /> World Class Blend</h2>
                    <p className="acblackSecondDivParagraph global-p-2">
                        Lauded by the Confederation of Indian Alcoholic Beverage Companies, the body which represents the major liquor companies in India and overseas.
                    </p>
                </div>
            </div>

            <section className="acb-sec-3 p-top-bottom" style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section3Desktop, currentImages.section3Mobile)})` }}>
                <div className="container pt-5">
                    <div className="row gy-3">
                        <div className="col-md-6">
                            {/* Empty div for layout purposes */}
                        </div>
                        <div className="col-md-6 order-first order-sm-1">
                            <h2 className="g-heading-4-yellow">An homage to those who enjoy the finer things in life</h2>
                            <div className="row glass-section">
                                <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                                    <img src={glass} alt="elegant" className="img-fluid custom-img" />
                                    <p className="global-p-2 text-center">Elegant and long-lasting</p>
                                </div>
                                <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                                    <img src={candle} alt="deep gold" className="img-fluid custom-img" />
                                    <p className="global-p-2 text-center">Deep Gold</p>
                                </div>
                                <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                                    <img src={lipglass} alt="smooth" className="img-fluid custom-img" />
                                    <p className="global-p-2 text-center">Smooth on the palate, green apple and spices</p>
                                </div>
                                <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                                    <img src={hotglass} alt="honeyed" className="img-fluid custom-img" />
                                    <p className="global-p-2 text-center">Honeyed, floral, with malty notes and a touch of spices</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div>
                <div className="acpvideoDiv">
                    {scrVideo && (
                        <video
                            className="videoContent"
                            width="100%"
                            height="100%"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source src={scrVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>

                <div className="acpNewarrowDiv container">
                    <Link to={'/products/liquor/acpremium'} className="acppremiumleftArrowDiv">
                        <div className="acpNewLeftDiv">
                            <h1 className="acpNpremiumarrowHeading">Aristocrat Premium</h1>
                            <HiArrowLongLeft className="leftIconImg" />
                        </div>
                        <div className="acpNewleftSmallImg">
                            <img src={acpNew} alt="block" />
                        </div>
                    </Link>
                    <Link to={'/products/liquor/royalpride'} className="acppremiumrightArrowDiv">
                        <div className="acpNewrightSmallImg">
                            <img src={RoyalPride} alt="block" />
                        </div>
                        <div className="acpNewRightDiv">
                            <h1 className="acpNpremiumarrowHeading">Royal Pride</h1>
                            <HiOutlineArrowLongRight className="leftIconImg" />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};
