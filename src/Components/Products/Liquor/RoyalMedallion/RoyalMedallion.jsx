import React, { useEffect, useState } from "react";
import '../RoyalMedallion/RoyalMedallion.css';
import { HiArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import axios from "axios";
import { client } from '../../../../api/contentful.js';
import acDryGin from '../../../../Assets/hero01/dry-gin-new.png';
import acpOld from '../../../../Assets/hero01/slide-ac-old-1.png';



export const RoyalMedallion = () => {
    const [scrVideo, setScrVideo] = useState("");
    const [images, setImages] = useState({});
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track if it's a mobile screen

    useEffect(() => {
        // Fetch video data
        axios.get('https://api.jagatjit.com/api/videos')
            .then(response => {
                const data = response.data.data.find(el => el.name === "Royal Medallion");
                if (data) setScrVideo(data.video_file);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });

        // Fetch Contentful image data
        client.getEntries({ content_type: 'acPremiumOld' })
            .then(response => {
                const entry = response.items[0].fields;
                setImages({
                    section1Desktop: entry.firstsectionDesktop?.fields.file.url,
                    section1Mobile: entry.firstsectionMobile?.fields.file.url,
                    section2Desktop: entry.secondsectionDesktop?.fields.file.url,
                    section2Mobile: entry.secondsectionMobile?.fields.file.url,
                    section3Desktop: entry.thirdsectionDesktop?.fields.file.url,
                    section3Mobile: entry.thirdsectionMobile?.fields.file.url,
                });
            })
            .catch(error => {
                console.error('Error fetching Contentful data:', error);
            });
    }, []);

    useEffect(() => {
        // Handle resize and update isMobile
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Trigger the function on resize and component mount
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Function to decide which background image to use based on screen size
    const getBackgroundImage = (desktopImage, mobileImage) => {
        return isMobile ? mobileImage : desktopImage;
    };

    return (
        <section>
            {/* Section 1 */}
            <div className="rm-sec-1" style={{ backgroundImage: `url(${getBackgroundImage(images.section1Desktop, images.section1Mobile)})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="h1-primery">ROYAL<br />MEDALLION</h1>
                            <h2 className="g-heading-4-yellow">FRENCH XO BRANDY</h2>
                            <p className="global-p-2">In a tradition dating back to the royal family of Kapurthala, this premium brandy with superior, honeyed tones is crafted by French master blenders for today’s achievers.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div className="rm-sec-2" style={{ backgroundImage: `url(${getBackgroundImage(images.section2Desktop, images.section2Mobile)})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6 pt-5">
                            <h1 className="g-heading-4">A view from the top</h1>
                            <p className="global-p-2">Celebrating success, and the indomitable spirit of winners.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3 */}
            <section className="rm-sec-3" style={{ backgroundImage: `url(${getBackgroundImage(images.section3Desktop, images.section3Mobile)})` }}>
                <div className="container pt-5">
                    <div className="col-md-6 profile-icon-wrap">
                        <h1 className="g-heading-4">Royal with every sip</h1>
                        <div className="profile-icon-1 global-p-2">Luxuriously smooth and long finish</div>
                        <div className="profile-icon-2 global-p-2">Gold with an amber hue</div>
                        <div className="profile-icon-3 global-p-2">Heavy bodied, sweet like honey with a touch of<br />matured oaky vanilla and caramel.</div>
                        <div className="profile-icon-4 global-p-2">Intense fruity and floral, complemented with dried<br />fruits like raisin, prune & nuts</div>
                    </div>
                </div>
            </section>

            {/* Bottom Navigation */}
            <div className="container">
                <div className="acpNewarrowDiv">
                    <Link to={'/products/liquor/acdrygin'} className="acppremiumleftArrowDiv">
                        <div className="acpNewLeftDiv">
                            <h1 className="acpNpremiumarrowHeading">Aristocrat Dry Gin</h1>
                            <HiArrowLongLeft className="leftIconImg" />
                        </div>
                        <div className="acpNewleftSmallImg">
                            <img src={acDryGin} alt="block" />
                        </div>
                    </Link>
                    <Link to={'/products/liquor/acpremiumold'} className="acppremiumrightArrowDiv">
                        <div className="acpNewrightSmallImg">
                            <img src={acpOld} alt="block" />
                        </div>
                        <div className="acpNewRightDiv">
                            <h1 className="acpNpremiumarrowHeading">AC Premium (Old)</h1>
                            <HiOutlineArrowLongRight className="leftIconImg" />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};
