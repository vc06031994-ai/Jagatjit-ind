import React, { useEffect, useState } from "react";
import '../DamnScotch/DamnScotch.css';
import { HiArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import firstSecimg from '../../../../Assets/Products/Liquor/DamnScotch/damn1stSecimg.png';
import secondSecimg from '../../../../Assets/Products/Liquor/DamnScotch/damn2ndSecimg.png';
import lastSecimg from '../../../../Assets/Products/Liquor/DamnScotch/damnlastSecimg.png';

import { Link } from "react-router-dom";
import royalPride from '../../../../Assets/ArrowBottle/RoyalPride.png';
import iceVodka from '../../../../Assets/ArrowBottle/iceVodka.png'; // Imported acpNew correctly
import acpsectiononelogo from '../../../../Assets/Products/Liquor/DamnScotch/largimglogo.png';
import acpsectiontwoimgs from '../../../../Assets/Products/Liquor/AcpremiumOld/sec1bottle1.png';
import flavourGroup from '../../../../Assets/Products/Liquor/DamnScotch/damngoodscotch.png';
import glass from '../../../../Assets/Products/Liquor/AcpremiumOld/glass.png';
import bottle from '../../../../Assets/Products/Liquor/AcpremiumOld/bottles.svg';
import distik from '../../../../Assets/Products/Liquor/AcpremiumOld/distiks.svg';

import axios from "axios";

export const DamnScotch = () => {
  const [scrVideo, setScrVideo] = useState("");

  useEffect(() => {
    axios.get('https://api.jagatjit.com/api/videos')
      .then(response => {
        let data = response.data.data.find((el) => el.name === "DAMN GOOD SCOTCH");
        if (data) {
          setScrVideo(data.video_file);
        }
      })
      .catch(error => {
        console.error('Error fetching video:', error);
      });
  }, []);

  return (
    <div className="acpremium-container">
      {/* Section 1 */}
      <div className="scotch-sec-1 ">
                <div className="container">
                    <div className="row ">
                <div className="col-md-6 ">
                    <h1 className="h1-primery">Damn<br></br>good scotch</h1>
                    <h2 className="g-heading-4-yellow">BLENDED SCOTCH WHISKEY</h2>
                    <p className="global-p-2">Exclusively distilled and aged for 3 years in wooden barrels in the Scottish Highlands, this amber-gold WHISKEY delivers unforgettable silken smoothness and is a favourite of WHISKEY connoisseurs.</p>
                </div>
             
                </div>
                </div>
            </div>
      {/* <div className="acpoldpagesRowDiv acpoldSecondPageSectionOneImage">
        <div className="container">
          <div className="rowdiv">
            <div className="acpsecDiv">
              <img src={acpsectiononelogo} alt="bottleImg" className="bottleImgLogo" />
              <h2 className="acpoldSecondHeading">BLENDED SCOTCH WHISKEY</h2>
              <p className="global-p-2">Exclusively distilled and aged for 3 years in wooden barrels in the Scottish Highlands, this amber-gold WHISKEY delivers unforgettable silken smoothness and is a favourite of WHISKEY connoisseurs.</p>
            </div>
            <img src={acpsectiontwoimgs} alt="bottleImg" className="bottleImg bottleImgfirst" />
          </div>
        </div>
      </div> */}

      {/* Section 2 */}
      <div className="scotch-sec-2">
                 <div className="container">
                   <div className="row"> 
                    <div className="col-md-6"></div>
                 <div className="col-md-6 pt-5">
                
                        <h1 className="g-heading-4">Royalty Redefined</h1>
            
                    <div>
                        <p className="global-p-2">A Scotch WHISKEY of rare character, KING HENRY VIII truly lives up to its name.</p>
                    </div>
                </div>
                </div>
                </div>
                 </div>

      {/* <div className="pagesTextDivTwo acpScondSectionTwoImage">
        <div className="pagesTextDiv">
          <div className="pageSecondText">
            <h1 className="sectionTwoHeading">Royalty</h1>
            <h1 className="sectionTwoHeading">Redefined</h1>
          </div>
          <div>
            <p className="global-p-2 sectionTwoParagraph">A Scotch WHISKEY of rare character, KING HENRY VIII truly lives up to its name. <span>honeyed and delightful experience</span> to its loyal patrons.</p>
          </div>
        </div>
      </div> */}

     
      {/* Section 4 */}
      <section className="scotch-sec-4">
                <div className="container pt-5">
                    <h2 className="g-heading-4-yellow">Aged for 3 years in <br /> The Scottish Highlands</h2>
              
                    <div>
                        <div className="imageText">
                            <img src={glass} alt="bottleImg" className="logoText" />
                            <div>
                                <p className="global-p-2">Best Enjoyed How You Like Your Scotch</p>
                                {/* <p className="logoTextParagraph global-p-2">Like Your Scotch</p> */}
                            </div>
                        </div>
                        
                        <div className="imageText">
                            <img src={bottle} alt="bottleImg" className="logoText" />
                            <div>
                                <p className="global-p-2">Bottled with care by state of the art bottling facilities</p>
                                {/* <p className="logoTextParagraph global-p-2">Of the Art Bottling Facilities</p> */}
                            </div>
                        </div>
                        <div className="imageText">
                            <img src={distik} alt="bottleImg" className="logoText" />
                            <div>
                                <p className=" global-p-2">Stored in Oak Wood Barrels from Scotland</p>
                                {/* <p className="logoTextParagraph global-p-2">Indian Spirits</p> */}
                            </div>
                        </div>
                       
                    </div>
                </div>
            </section>
   {/* Section 3 */}
   <section className="sectionThree scotch-sec-3" >                  
                    <div className="container">
                    <div class="row">
    <div class="col-md-6 center flex-c">
        <img src={flavourGroup} alt="groupBtl" class="small-img" />
    </div>
    <div class="col-md-6 profile-icon-wrap">
    <h1 className="g-heading-4">Our Smoothest Blend Yet</h1>
        <div class="profile-icon-1 global-p-2">Amber</div>
        <div class="profile-icon-2 global-p-2">Delicate, smooth and long-lasting</div>
        <div class="profile-icon-3 global-p-2">Medium-bodied, mildly sweet, nutty and malty flavors faintly<br></br> floral, with trace notes of honey and fruit</div>
        <div class="profile-icon-4 global-p-2">Malt, vanilla, fruity, lightly smoky and peaty</div>
    </div>
    
</div> 
</div>        
  </section>
      

      {/* <section className="sectionThree scotch-sec-3">
        <div className="flavourDiv">
          <h1 className="g-heading-4">Our Smoothest Blend Yet</h1>
          <img src={flavourGroup} alt="groupBtl" className="image favBotGroupImg" />
          <div className="profile-icon-wrap">
            <div className="profile-icon-1 global-p-2">Amber</div>
            <div className="profile-icon-2 global-p-2">Delicate, smooth and long-lasting</div>
            <div className="profile-icon-3 global-p-2">Medium-bodied, mildly sweet, nutty and malty flavors faintly floral, with trace notes of honey and fruit</div>
            <div className="profile-icon-4 global-p-2">Malt, vanilla, fruity, lightly smoky and peaty</div>
          </div>
        </div>
      </section> */}


      {/* Section 5: Video Section */}
      <div className="video-link-redirect">
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

        {/* Arrows to navigate */}
        <div className="acpNewarrowDiv container">
          <Link to={'/products/liquor/royalmedallion'} className="acppremiumleftArrowDiv">
            <div className="acpNewLeftDiv">
              <h1 className="acpNpremiumarrowHeading">Royal Pride</h1>
              <HiArrowLongLeft className="leftIconImg" />
            </div>
            <div className="acpNewleftSmallImg">
              <img src={royalPride} alt="Royal Pride" />
            </div>
          </Link>
          <Link to={'/products/liquor/iicevodka'} className="acppremiumrightArrowDiv">
            <div className="acpNewrightSmallImg">
              <img src={iceVodka} alt="IICE Vodka" />
            </div>
            <div className="acpNewRightDiv">
              <h1 className="acpNpremiumarrowHeading">IICE Vodka</h1>
              <HiOutlineArrowLongRight className="rightIconImg" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
