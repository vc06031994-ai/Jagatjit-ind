

import React, { useEffect, useState } from "react";
import '../AcDryGin/AcDryGin.css';
import { HiArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import acDryGinfirstImg from '../../../../Assets/Products/Liquor/AcDryGin/acdryginsec1img.png';
import acDryGinLastImg from '../../../../Assets/Products/Liquor/AcDryGin/aristocrat.png';
import damnscotch from '../../../../Assets/Products/Liquor/AcBlack/damnscotch.png';
import royalMedallon from '../../../../Assets/Products/Liquor/RoyalMedalon/royalmedalonlogo.png'
import { Link } from "react-router-dom";
import iceVodka from '../../../../Assets/hero01/slide-vodk-new.png';
import royalMedol from '../../../../Assets/hero01/slide-royal-m-new.png';
import axios from "axios";
import { client } from '../../../../api/contentful.js';




export const AcDryGin = () => {

    const [currentImages, setCurrentImages] = useState({});



    useEffect(() => {
        client.getEntries({ content_type: 'acPremiumOld' })
            .then((response) => {
                const entry = response.items[1].fields;
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
        <section className="acpremium-container">

             {/* //1 completed*/}
             <div className="ry-pr-sec ac-dry-1" style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section1Desktop, currentImages.section1Mobile)})` }}>
                <div className="container">
                    <div className="row ">
                <div className="col-md-6 space">
                    <h1 className="h1-primery">Extra Dry Gin</h1>
                   
                    <p className="global-p-2">Slow distilled from the finest grains and Indian botanicals, this gin creates fun and frolic wherever it goes.</p>
                </div>
             
                </div>
                </div>
            </div>


            {/* section-02  */}

            <div className="ry-pr-sec-2 ac-dry-2" style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section2Desktop, currentImages.section2Mobile)})` }}>
                 <div className="container">
                   <div className="row"> 
                    <div className="col-md-6"></div>
                 <div className="col-md-6 pt-5">
                
                        <h1 className="g-heading-4">Launched in 1978 </h1>
                    
            
                    <div>
                        <p className="global-p-2">Still going strong and enhancing celebrations in India and abroad</p>
                    </div>
                </div>
                </div>
                </div>
          </div>

    
             {/* section-03  */}

             
            <div className="ry-pr-sec-2 ac-dry-3" style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section3Desktop, currentImages.section3Mobile)})` }}>
                 <div className="container">
                   <div className="row"> 
                    <div className="col-md-6 pt-5">
                      
                    <h1 className="g-heading-4">Fun and Frolic</h1>
                    
            
                    <div>
                        <p className="global-p-2">Whether served straight up, as a classic gimlet or in trendy cocktails, this gin is smooth and delicious.</p>
                    </div>

                    </div>
                 <div className="col-md-6 pt-5">
                
                </div>
                </div>
                </div>
          </div>
          

             <div className="acpNewarrowDiv container">
                    <Link to={'/products/liquor/iicevodka'} className="acppremiumleftArrowDiv">
                        <div className="acpNewLeftDiv">
                            <h1 className="acpNpremiumarrowHeading">IICE Vodka</h1>
                            <HiArrowLongLeft className="leftIconImg" />
                        </div>
                        <div className="acpNewleftSmallImg">
                            <img src={iceVodka} alt="block" /> 
                        </div>
                    </Link>
                    <Link to={'/products/liquor/royalmedallion'} className="acppremiumrightArrowDiv">
                        <div className="acpNewrightSmallImg" >
                            <img src={royalMedol} alt="block" />
                        </div>
                        <div className="acpNewRightDiv">
                            <h1 className="acpNpremiumarrowHeading">Royal Medallion</h1>
                            <HiOutlineArrowLongRight className="leftIconImg" />
                        </div>
                    </Link>
                </div>  
          
          
        </section>
    )
} 