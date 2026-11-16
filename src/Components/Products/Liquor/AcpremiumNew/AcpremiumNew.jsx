import React, { useEffect, useState } from "react";
import "../AcpremiumNew/AcpremiumNew.css";

import { HiArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

import curtainImg from '../../../../Assets/Products/Liquor/AcpremiumOld/sectionCurtain.png';
import flavourImgs from '../../../../Assets/Products/Liquor/AcpremiumNew/bottleimgsec.png';
import flavourGroup from '../../../../Assets/hero01/slide-aristocrat-new.png';
import bottle from '../../../../Assets/Products/Liquor/AcpremiumOld/bottles.svg';
import distik from '../../../../Assets/Products/Liquor/AcpremiumOld/distiks.svg';
import glass from '../../../../Assets/Products/Liquor/AcpremiumOld/glass.png';
import acpsectiononelogo from '../../../../Assets/Products/Liquor/AcpremiumNew/acpsectiononelogo.png';
import acpblack from '../../../../Assets/hero01/slide-acblack-new.png';
import acpOld from '../../../../Assets/hero01/slide-ac-old-1.png';
import axios from "axios";
import { client } from '../../../../api/contentful.js';



export const AcpremiumNew = () => {
    const [scrVideo, setScrVideo] = useState("");
    const [currentImages, setCurrentImages] = useState({});

    useEffect(() => {
        axios.get('https://api.jagatjit.com/api/videos')
            .then(response => {
                const videoData = response.data.data.find(el => el.name === "AC PREMIUM NEW");
                if (videoData) setScrVideo(videoData.video_file);
            })
            .catch(error => console.error('Error fetching video:', error));
    }, []);

    useEffect(() => {
        client.getEntries({ content_type: 'acPremiumOld' })
            .then((response) => {
                const entry = response.items[6].fields;
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
        <div className="acpremium-container">
            <div className="acpoldpagesRowDiv acpoldSecondPageSectionOneImagenew"
                 style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section1Desktop, currentImages.section1Mobile)})` }}>
                <div className="container">
                    <div className="rowdiv">
                        <div className="acpsecDiv">
                            <h1 className="acpNpremiumarrowHeading">THE ALL NEW</h1>
                            <h1 className="h1-primery golden">Aristocrat</h1>
                            <h2 className="g-heading-4 golden">Premium</h2>
                            <p className="global-p-2">One of India's most-loved Whisky brands with its iconic gold and deep-red bottle. Now Revamped.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pagesTextDivTwo acpScondSectionTwoImagenew"
                 style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section2Desktop, currentImages.section2Mobile)})` }}>
                <div className="pagesTextDiv">
                    <div className="pageSecondText">
                        <h1 className="g-heading-4-yellow">THE ESSENCE OF <br /> SOPHISTICATION</h1>
                    </div>
                    <div>
                        <p className="global-p-2 sectionTwoParagraph width-100">
                            Distinctive and refined in both taste and look, it is blended with pure grain and select imported Scotch malts,
                            bringing a <span>honeyed and delightful experience</span> to its loyal patrons.
                        </p>
                    </div>
                </div>
            </div>
            <section className="rm-sec-3"
                     style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section3Desktop, currentImages.section3Mobile)})` }}>
                <div className="container pt-5">
                    <h2 className="g-heading-4-yellow">BEYOND LUXURY LIES LEGACY.</h2>
                    <div>
                        <div className="imageText">
                            <img src={glass} alt="bottleImg" className="logoText" />
                            <div>
                                <p className="global-p-2">Best Enjoyed How You <br />Like Your Scotch</p>
                            </div>
                        </div>
                        <div className="imageText">
                            <img src={bottle} alt="bottleImg" className="logoText" />
                            <div>
                                <p className="global-p-2">Bottled With Care By State <br />Of the Art Bottling Facilities</p>
                            </div>
                        </div>
                        <div className="imageText">
                            <img src={distik} alt="bottleImg" className="logoText" />
                            <div>
                                <p className="global-p-2">Made With The Finest <br />Indian Spirits</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="video-link-redirect">
  <div className="acpvideoDiv">
                    {scrVideo && (
                        <video
                            className="videoContent"
                            width="100%"
                            height="100%"
                            // controls
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
                    <Link to={'/products/liquor/acpremiumold'} className="acppremiumleftArrowDiv">
                         <div className="acpNewLeftDiv">
                             <h1 className="acpNpremiumarrowHeading">AC Premium (Old)</h1>
                             <HiArrowLongLeft className="leftIconImg" />
                        </div>
                         <div className="acpNewleftSmallImg">
                             <img src={acpOld} alt="block" />
                         </div>
                     </Link>
                   <Link to={'/products/liquor/acpremiumblack'} className="acppremiumrightArrowDiv">
                        <div className="acpNewrightSmallImg" >
                             <img src={acpblack} alt="block" />
                         </div>
                        <div className="acpNewRightDiv">
                            <h1 className="acpNpremiumarrowHeading">Aristocrat Black</h1>
                           <HiOutlineArrowLongRight className="leftIconImg" />
                         </div>
                     </Link>
                 </div>  

        </div>
        </div>
    );
};
