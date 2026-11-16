
import React, { useEffect, useState } from "react";
import '../IceVodka/IceVodka.css';

import vodka1 from '../../../../Assets/Products/Liquor/Vodka/vodka001.png';
import iconBite from '../../../../Assets/Products/Liquor/Vodka/icon4-bite.svg';
import iconBare from '../../../../Assets/Products/Liquor/Vodka/icon4-bare.svg';
import iconorange from '../../../../Assets/Products/Liquor/Vodka/icon4-orange.svg';
import vodka2 from '../../../../Assets/Products/Liquor/Vodka/vodka002.png';
import vodka3 from '../../../../Assets/Products/Liquor/Vodka/vodka003.png';
import vodka4 from '../../../../Assets/Products/Liquor/Vodka/vodka005.png';
import bareitvod from '../../../../Assets/Products/Liquor/Vodka/bareitvod.png';
import vodkainfo1 from '../../../../Assets/Products/Liquor/Vodka/vodkainfo1.svg';
import vodkainfo2 from '../../../../Assets/Products/Liquor/Vodka/vodkainfo2.png';
import vodkainfo3 from '../../../../Assets/Products/Liquor/Vodka/vodkainfo3.svg';
import applevod from '../../../../Assets/Products/Liquor/Vodka/applevod.png';
import orangevid from '../../../../Assets/Products/Liquor/Vodka/orangevid.png';
import vodbg from '../../../../Assets/Products/Liquor/Vodka/vodbg.png';
import vodkatrio from '../../../../Assets/Products/Liquor/Vodka/vodkalastsec.jpg';
import vodkafamily from '../../../../Assets/Products/Liquor/Vodka/Vodkalastsecnew.png';
import { Link } from "react-router-dom";
import { HiArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import damnScotch from '../../../../Assets/hero01/slide-damn-good-new.png';
import acDryGin from '../../../../Assets/hero01/dry-gin-new.png';
import axios from "axios";
import glass from '../../../../Assets//Products/Liquor/AcpremiumOld/glass.png';
import bottle from '../../../../Assets/Products/Liquor/AcpremiumOld/bottles.svg';
import distik from '../../../../Assets/Products/Liquor/AcpremiumOld/distiks.svg';
import elegent from '../../../../Assets/Products/Liquor/AcpremiumOld/elegant.svg';
import sweet from '../../../../Assets/Products/Liquor/AcpremiumOld/sweet.svg';
import deep from '../../../../Assets/Products/Liquor/AcpremiumOld/deep.svg'
import smooth from '../../../../Assets/Products/Liquor/AcpremiumOld/smooth.svg'
import { client } from '../../../../api/contentful.js';



export const IceVodka = () => {
  const [scrVideo, setScrVideo] = useState("");
  const [currentImages, setCurrentImages] = useState({});
  useEffect(() => {
      axios.get('https://api.jagatjit.com/api/videos')
          .then(response => {
             
              let data = response.data.data.find((el) => {
                  return el.name == "IICE VODKA"
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
            const entry = response.items[2].fields;
            setCurrentImages({
                section1Desktop: entry.firstsectionDesktop?.fields.file.url,
                section1Mobile: entry.firstsectionMobile?.fields.file.url,
                section2Desktop: entry.secondsectionDesktop?.fields.file.url,
                section2Mobile: entry.secondsectionMobile?.fields.file.url,
                section3Desktop: entry.thirdsectionDesktop?.fields.file.url,
                section3Mobile: entry.thirdsectionMobile?.fields.file.url,
                section4Desktop: entry.forthsectionDesktop?.fields.file.url,
                section4Mobile: entry.forthsectionMobile?.fields.file.url,
                section5Desktop: entry.fifthsectionDesktop?.fields.file.url,
                section5Mobile: entry.fifthsectionMobile?.fields.file.url,
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
      <>
      <section>
        {/* section-01  */}
        <div className="ry-pr-sec vc-sec-1" style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section1Desktop, currentImages.section1Mobile)})` }}>
                <div className="container">
                    <div className="row ">
                <div className="col-md-6 ">
                    <div className="vodka-title space">
                    <h1 className="h1-primery">Vodka</h1>
                    <h2 className="g-heading-4-yellow">Premium</h2>
                    </div>
                   
                </div>
             
                </div>
                </div>
            </div>

   </section>
          
   
      {/* section-03  */}

      <section className=" vc-sec-3 change-f-color " style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section2Desktop, currentImages.section2Mobile)})` }}>
            
            <div className="container pt-5">
               <div className="row gy-3">
                <div className="col-md-6">
   
                </div>
                <div className="col-md-6  order-first order-sm-1 glass-sections ">
                <h2 className="g-heading-4-yellow">Bare It All</h2>
                <p className="global-p-2">The plain variant of IICE Vodka, Bare It All, has clean, fresh notes and is smooth and mellow on the tongue.</p>
                <div className="row mt-5 glass-section vcacb-glass-sec">
                  <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                  <img src={elegent} alt="elegent" className="img-fluid custom-img" />
                  <p className="global-p-2 text-center">Clean, Fresh Notes, With Elegant Neutral Notes</p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                  <img src={sweet} alt="sweet" className="img-fluid custom-img" />
                  <p className="global-p-2 text-center">Crystal, Clear</p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                  <img src={deep} alt="deep" className="img-fluid custom-img" />
                  <p className=" global-p-2 text-center">Clean, Smooth, Mellow</p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                  <img src={smooth} alt="smooth" className="img-fluid custom-img" />
                  <p className=" global-p-2 text-center">Smooth and Long Lasting</p>
                  </div>
                </div>
                </div>
               </div>
               
            </div>
        </section>
   

            {/* section-04  */}
            <section className=" vc-sec-4 change-f-color" style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section3Desktop, currentImages.section3Mobile)})` }}>
            
            <div className="container pt-5">
               <div className="row gy-3">
                <div className="col-md-6 order-first order-sm-1 glass-sections ">
                <h2 className="g-heading-4-yellow">Bite the apple</h2>
                <p className="global-p-2">With every sip you take of this flavored variant of IICE Vodka, you feel like you're biting into a fresh green apple. Made from natural ingredients, clear and smooth, with no added sugar, fresh and fruity to the end.</p>
                <div className="row mt-5 glass-section vcacb-glass-sec">
                  <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                  <img src={elegent} alt="elegent" className="img-fluid custom-img" />
                  <p className="global-p-2 text-center">Fresh Notes Of Green Pulpy Ripe Apples, With Elengant Neutral Notes</p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                  <img src={sweet} alt="sweet" className="img-fluid custom-img" />
                  <p className="global-p-2 text-center">Crystal, Clear</p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                  <img src={deep} alt="deep" className="img-fluid custom-img" />
                  <p className=" global-p-2 text-center">Clean, Mellow, Notes Of Rich Green Apples</p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                  <img src={smooth} alt="smooth" className="img-fluid custom-img" />
                  <p className=" global-p-2 text-center">Smooth, Sweet Long Lasting</p>
                  </div>
                </div>
                </div>
                <div className="col-md-6  order-first order-sm-1 ">
               
                </div>
               </div>
               
            </div>
        </section>


        {/* section-05  */}
        <section className=" vc-sec-5 change-f-color" style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section4Desktop, currentImages.section4Mobile)})` }}>
            
            <div className="container pt-5">
               <div className="row gy-3">
                <div className="col-md-6">
                  {/* <img src={vodka1} alt="vodka1" className="img-fluid" /> */}
                </div>
                <div className="col-md-6  order-first order-sm-1 glass-sections">
                <h2 className="g-heading-4-yellow">Undress The Orange</h2>
                <p className="global-p-2">Undress the Orange is a variant of IICE Vodka that delivers the freshness of a juicy orange with every drink. Popular among folks who savor a good cocktail with a zesty and citrus-based vibe.</p>
                <div className="row mt-5 glass-section vcacb-glass-sec">
                  <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                  <img src={elegent} alt="elegent" className="img-fluid custom-img" />
                  <p className="global-p-2 text-center">Clean, Fresh Deep Flavor Of Pulpy Oranges With Elegant Neutral Notes</p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                  <img src={sweet} alt="sweet" className="img-fluid custom-img" />
                  <p className="global-p-2 text-center">Crystal, Clear</p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                  <img src={deep} alt="deep" className="img-fluid custom-img" />
                  <p className=" global-p-2 text-center">Sweet, Smooth, Zest Of Ripe Oranges</p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-6 d-flex flex-column align-items-center">
                  <img src={smooth} alt="smooth" className="img-fluid custom-img" />
                  <p className=" global-p-2 text-center">Smooth, Sweet Long Lasting</p>
                  </div>
                  
                </div>
                </div>
               </div>
               
            </div>
        </section>
  {/* section-02  */}
  <div className="ry-pr-sec-2 vc-sec-2 change-f-color" style={{ backgroundImage: `url(${getBackgroundImage(currentImages.section5Desktop, currentImages.section5Mobile)})` }}>
                 <div className="container">
                   <div className="row"> 
                  
                 <div className="container pt-5">
                
                        <h1 className="h1-primery">Like i Like it </h1>
                       
            
                        <div className="imageText">
                            <img src={glass} alt="bottleImg" className="logoText" />
                            <div>
                                <p className="global-p-2">The Purest Grain</p>
                            
                            </div>
                        </div>
                        <div className="imageText">
                            <img src={bottle} alt="bottleImg" className="logoText" />
                            <div>
                                <p className="global-p-2">Made in India</p>
                              
                            </div>
                        </div>
                        <div className="imageText">
                            <img src={distik} alt="bottleImg" className="logoText" />
                            <div>
                                <p className=" global-p-2">Premium Quality</p>
                              
                            </div>
                        </div>
                </div>
                </div>
                </div>
          </div>
       

  <section className="mainVodkaSection">

 
                <div className="container">
                <div className="acpNewarrowDiv">
                    <Link to={'/products/liquor/damngoodscotch'} className="acppremiumleftArrowDiv">
                        <div className="acpNewLeftDiv">
                            <h1 className="acpNpremiumarrowHeading">Damn Good Scotch</h1>
                            <HiArrowLongLeft className="leftIconImg" />
                        </div>
                        <div className="acpNewleftSmallImg">
                            <img src={damnScotch} alt="block" />
                        </div>
                    </Link>
                    <Link to={'/products/liquor/acdrygin'} className="acppremiumrightArrowDiv">
                        <div className="acpNewrightSmallImg" >
                            <img src={acDryGin} alt="block" />
                        </div>
                        <div className="acpNewRightDiv">
                            <h1 className="acpNpremiumarrowHeading">Aristocrat Dry Gin</h1>
                            <HiOutlineArrowLongRight className="leftIconImg" />
                        </div>
                    </Link>
                </div>
                </div>
</section>
</>
    )
}