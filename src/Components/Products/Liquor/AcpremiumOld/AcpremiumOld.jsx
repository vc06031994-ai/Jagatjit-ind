
import React, { useEffect, useState } from 'react';
import { client } from '../../../../api/contentful.js';


import "../AcpremiumOld/AcpremiumOld.css";
import { HiArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

import curtainImg from '../../../../Assets/Products/Liquor/AcpremiumOld/sectionCurtain.png';
import flavourImg from '../../../../Assets/Products/Liquor/AcpremiumOld/sectionFlavours.png';
import flavourGroup from '../../../../Assets/Products/Liquor/AcpremiumOld/flavourGroup.png';
import bottle from '../../../../Assets/Products/Liquor/AcpremiumOld/bottles.svg';
import distik from '../../../../Assets/Products/Liquor/AcpremiumOld/distiks.svg';
import glass from '../../../../Assets/Products/Liquor/AcpremiumOld/glass.png';
import acpsectiononelogo from '../../../../Assets/Products/Liquor/AcpremiumNew/acpsectiononelogo.png';
import acpsectiontwoimgs from '../../../../Assets/Products/Liquor/AcpremiumOld/sec1bottle1.png';
import acpblack from '../../../../Assets/Products/Liquor/AcpremiumNew/damnlink.svg';
import acpnewImg from '../../../../Assets/Products/Liquor/AcpremiumNew/acpnewlink.svg';
import acplast from '../../../../Assets/Products/Liquor/AcpremiumNew/acplastImg.png';

import royalMedol from '../../../../Assets/hero01/slide-royal-m-new.png';
import acpNew from '../../../../Assets/hero01/slide-aristocrat-new.png';
import axios from "axios";
import bg_01 from '../../../../Assets/Products/Liquor/AcpremiumOld/AC-Premium-01.jpg';
import bg_02 from '../../../../Assets/Products/Liquor/AcpremiumOld/AC-Premium-02.jpg';
import bg_03 from '../../../../Assets/hero01/slide-ac-old-1.png';
import bg_04 from '../../../../Assets/Products/Liquor/AcpremiumOld/AC-Premium-04.jpg';
import bg_mobile_01 from '../../../../Assets/Products/Liquor/AcpremiumOld/AC-Premium-01-mobile.jpg';
import acp_old from '../../../../Assets/Products/Liquor/AcpremiumOld/acp_old.png'




export const AcpremiumOld = () => {
    const [scrVideo, setScrVideo] = useState("");
    const [currentImages, setCurrentImages] = useState({});

    useEffect(() => {
        let isMounted = true;

        axios.get('https://api.jagatjit.com/api/videos')
            .then(response => {
                if (isMounted) {
                    let data = response.data.data.find(el => el.name === "acpremiumold");
                    setScrVideo(data.video_file);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });

        return () => {
            isMounted = false; // Cleanup on unmount
        };
    }, []);

   
  
    useEffect(() => {
        client.getEntries({ content_type: 'acPremiumOld' })
            .then((response) => {
                const entry = response.items[7].fields;
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
            {/* section-01  */}
            <div className="ry-pr-sec"  style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section1Desktop, currentImages.section1Mobile)})` }}>
                <div className="container">
                    <div className="row ">
                <div className="col-md-6 space">
                    <h1 className="h1-primery">Aristocrat</h1>
                    <h2 className="g-heading-4-yellow">premium CLASSIC WHISKY</h2>
                    <p className="global-p-2">One of India's most-loved Whisky brands with its iconic gold and deep-red bottle.</p>
                </div>
          
             
                </div>
                </div>
            </div>
     
               {/* section-2  */}

               <div className="ry-pr-sec-2 " style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section2Desktop, currentImages.section2Mobile)})` }}>
                 <div className="container">
                   <div className="row"> 
                    <div className="col-md-6"></div>
                 <div className="col-md-6 pt-5">
                
                        <h1 className="g-heading-4">THE ESSENCE OF </h1>
                        <h1 className="g-heading-4">SOPHISTICATION </h1>
            
                    <div>
                        <p className="global-p-2">Distinctive and refined in both taste and look, it is blended with pure grain and select imported Scotch malts, bringing a honeyed and delightful experince to its loyal patrons</p>
                    </div>
                </div>
                </div>
                </div>
          </div>

             {/* section-04  */}
             <section className=" ry-pr-sec-3 " style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section3Desktop, currentImages.section3Mobile)})` }}>
                <div className="container pt-5">
                    <h2 className="g-heading-4-yellow">BEYOND LUXURY LIES LEGACY.</h2>
              
                    <div>
                        <div className="imageText">
                            <img src={glass} alt="bottleImg" className="logoText" />
                            <div>
                                <p className="global-p-2">Best Enjoyed How You</p>
                                <p className="global-p-2">Like Your Scotch</p>
                                
                            </div>
                        </div>
                        
                        <div className="imageText">
                            <img src={bottle} alt="bottleImg" className="logoText" />
                            <div>
                                <p className="global-p-2">Bottled With Care By State</p>
                                <p className="global-p-2">Of the Art Bottling Facilities</p>
                               
                            </div>
                        </div>
                        <div className="imageText">
                            <img src={distik} alt="bottleImg" className="logoText" />
                            <div>
                                <p className=" global-p-2">Made With The Finest</p>
                                <p className=" global-p-2">Indian Spirits</p>
                                
                            </div>
                        </div>
                      
                    </div>
                </div>
            </section>

            
            {/* //3 */}          
            <section className="sectionThree" >                  
                    <div className="container">
                    <div className="row reverse">
    <div className="col-md-6 center flex-c">
        <img src={bg_03} alt="groupBtl" className="small-img" />
    </div>
    <div className="col-md-6 profile-icon-wrap">
    <h1 className="g-heading-4">FLAVOUR PROFILE</h1>
        <div className="profile-icon-1 global-p-2">Elegant and Long Lasting</div>
        <div className="profile-icon-2 global-p-2">Sweet, Floral with a touch of spices</div>
        <div className="profile-icon-3 global-p-2">Deep Gold to the eyes</div>
        <div className="profile-icon-4 global-p-2">Smooth, with a hint of Fruit & Spices</div>
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
                    <Link to={'/products/liquor/royalmedallion'}  className="acppremiumleftArrowDiv">
                        <div className="acpNewLeftDiv">
                            <h1 className="acpNpremiumarrowHeading">Royal Medallion</h1>
                            <HiArrowLongLeft className="leftIconImg" />
                        </div>
                        <div className="acpNewleftSmallImg">
                            <img src={royalMedol} alt="block" /> 
                        </div>
                    </Link>
                    <Link to={'/products/liquor/acpremium'}  className="acppremiumrightArrowDiv">
                        <div className="acpNewrightSmallImg" >
                            <img src={acpNew} alt="block" />
                        </div>
                        <div className="acpNewRightDiv">
                            <h1 className="acpNpremiumarrowHeading">Aristocrat Premium</h1>
                            <HiOutlineArrowLongRight className="leftIconImg" />
                        </div>
                    </Link>
                </div>  
            </div>
        </div>
    )
};

