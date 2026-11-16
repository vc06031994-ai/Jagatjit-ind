
import React, { useEffect, useState } from "react";
import axios from "axios";
import '../RoyalPride/RoyalPride.css'
import { HiArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import royalpridefirstImg from '../../../../Assets/Products/Liquor/RoyalPride/royalpridefirstimg.png';
import royalpridelastimage from '../../../../Assets/Products/Liquor/RoyalPride/royalpridelastimg.png'
import candles from '../../../../Assets/Products/Liquor/AcBlack/candles.png';
import candle from '../../../../Assets//Products/Liquor/AcpremiumOld/deep.svg';
import glass from '../../../../Assets//Products/Liquor/AcpremiumOld/glass.png';
import hotglass from '../../../../Assets//Products/Liquor/AcpremiumOld/sweet.svg';
import lipglass from '../../../../Assets//Products/Liquor/AcpremiumOld/smooth.svg';
import royalpridethirdImg from '../../../../Assets/hero01/slide-royalpride-new.png'
import bottle from '../../../../Assets/Products/Liquor/AcpremiumOld/bottles.svg';
import distik from '../../../../Assets/Products/Liquor/AcpremiumOld/distiks.svg';
import glasss from '../../../../Assets/Products/Liquor/AcpremiumOld/glass.png';
import acblack from '../../../../Assets/Products/Liquor/AcBlack/acblack1.png';
// import damnscotch from '../../../../Assets/Products/Liquor/AcBlack/damnscotch.png';
import acpblack from '../../../../Assets/hero01/slide-acblack-new.png';
import damnScotch from '../../../../Assets/hero01/slide-damn-good-new.png';
import { Link } from "react-router-dom";
import { client } from '../../../../api/contentful.js';


export const RoyalPride = () => {

    const [scrVideo, setScrVideo] = useState(""); 
    const [currentImages, setCurrentImages] = useState({});
    useEffect(() => {
        axios.get('https://api.jagatjit.com/api/videos')
            .then(response => {
                let data = response.data.data.find((el) => {
                    return el.name == "ROYAL PRIDE"
                });

                setScrVideo(data.video_file)
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

   
  
    useEffect(() => {
        client.getEntries({ content_type: 'acPremiumOld' })
            .then((response) => {
                const entry = response.items[4].fields;
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
        <section >
            {/* //1 completed*/}
            <div className="ry-pr-sec " style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section1Desktop, currentImages.section1Mobile)})` }}>
                <div className="container">
                    <div className="row ">
                <div className="col-md-6">
                    <h1 className="h1-primery">ROYAL PRIDE</h1>
                    <h2 className="g-heading-4-yellow">EXQUISITE WHISKY</h2>
                    <p className="global-p-2">From the Highland, Speyside and Islay regions of Scotland comes a Whisky exquisitely blended and artfully crafted - a pleasure for every palate which transports one to those fabled lands of folktales and snow with just one sip.</p>
                </div>
             
                </div>
                </div>
            </div>
              
              {/* section-2  */}

             <div className="ry-pr-sec-2" style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section2Desktop, currentImages.section2Mobile)})` }}>
                 <div className="container">
                   <div className="row"> 
                    <div className="col-md-6"></div>
                 <div className="col-md-6 pt-5">
                
                        <h1 className="g-heading-4">Made with the</h1>
                        <h1 className="g-heading-4">finest grains </h1>
            
                    <div>
                        <p className="global-p-2">Launched in 2022, Royal Pride is crafted by our Scottish master blenders with the finest grain spirits and imported Scotch malts.</p>
                    </div>
                </div>
                </div>
                </div>
          </div>
                  
                  {/* section-04  */}
                  <section className=" ry-pr-sec-3" style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section3Desktop, currentImages.section3Mobile)})` }}>
                <div className="container pt-5">
                    <h2 className="g-heading-4">Crafted for your Inner Connoisseur</h2>
              
                    <div>
                        <div className="imageText">
                            <img src={glass} alt="bottleImg" className="logoText" />
                            <div>
                                <p className="global-p-2">Best Enjoyed How You Like Your Whisky</p>
                                {/* <p className="logoTextParagraph global-p-2">Like Your Scotch</p> */}
                            </div>
                        </div>
                        
                        <div className="imageText">
                            <img src={bottle} alt="bottleImg" className="logoText" />
                            <div>
                                <p className="global-p-2">Bottled With Care By State Of The Art Bottling Facilities</p>
                                {/* <p className="logoTextParagraph global-p-2">Of the Art Bottling Facilities</p> */}
                            </div>
                        </div>
                        <div className="imageText">
                            <img src={distik} alt="bottleImg" className="logoText" />
                            <div>
                                <p className=" global-p-2">Made With The Finest Indian Spirits</p>
                                {/* <p className="logoTextParagraph global-p-2">Indian Spirits</p> */}
                            </div>
                        </div>
                      
                    </div>
                </div>
            </section>
        
               {/* section-03  */}

               <section className="sectionThree ry-pr-sec-4" >                  
                    <div className="container">
                    <div className="row reverse">
    <div className="col-md-6 center flex-c">
        <img src={royalpridethirdImg} alt="groupBtl" className="small-img" />
    </div>
    <div className="col-md-6 profile-icon-wrap small-glass">
    <h1 className="g-heading-4">Reinvent yourself with every sip.</h1>
        <div className="profile-icon-1 global-p-2">Deep Gold</div>
        <div className="profile-icon-2 global-p-2 ">Light on the Palate with flavors of roasted malt & spices</div>
        <div className="profile-icon-3 global-p-2">Malty Notes. Subtly Spicy</div>
        <div className="profile-icon-4 global-p-2">Elegant and Full Bodied</div>
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


 
               <div className="container">
                <div className="acpNewarrowDiv">
                    <Link to={'/products/liquor/acpremiumblack'} className="acppremiumleftArrowDiv">
                        <div className="acpNewLeftDiv">
                            <h1 className="acpNpremiumarrowHeading">Aristocrat Black</h1>
                            <HiArrowLongLeft className="leftIconImg" />
                        </div>
                        <div className="acpNewleftSmallImg">
                            <img src={acpblack} alt="block" />
                        </div>
                    </Link>
                    <Link to={'/products/liquor/damngoodscotch'} className="acppremiumrightArrowDiv">
                        <div className="acpNewrightSmallImg" >
                            <img src={damnScotch} alt="block" />
                        </div>
                        <div className="acpNewRightDiv">
                            <h1 className="acpNpremiumarrowHeading">Damn Good Scotch</h1>
                            <HiOutlineArrowLongRight className="leftIconImg" />
                        </div>
                    </Link>
                </div>
                </div> 
            </div>
        </section>
    )
}

