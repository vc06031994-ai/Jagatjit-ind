
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Tooltip } from 'react-tooltip'
import '../Home/Home.css';
import { Link } from "react-router-dom";

import distilImage from '../../Assets/Home/magic-2.png';
import brewImage from '../../Assets/Home/magic-1.png';
import storageImage from '../../Assets/Home/magic-3.png';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import acpremiumNew from '../../Assets/Products/Liquor/AcpremiumNew/aristocrat-new.png'

import image1 from '../../Assets/Home/SectionThreeImages/sec1.svg';
import image2 from '../../Assets/Home/SectionThreeImages/sec2.svg';
import image3 from '../../Assets/Home/SectionThreeImages/sec3.svg';
import imagemob1 from '../../Assets/Home/SectionThreeImages/secmob1.svg';
import imagemob2 from '../../Assets/Home/SectionThreeImages/secmob2.svg';
import imagemob3 from '../../Assets/Home/SectionThreeImages/secmob3.svg';

import candle from '../../Assets/Products/Liquor/RoyalPride/candle.png';
import hotglass from '../../Assets/Products/Liquor/RoyalPride/hotglass.png';
import lipglass from '../../Assets/Products/Liquor/RoyalPride/lipglass.png';
import glass from '../../Assets/Products/Liquor/RoyalPride/glass.png';
import royalpridethirdImg from '../../Assets/Products/Liquor/RoyalPride/royalpridethirdimg.png'
// import LogoIcon from '../../Assests/LogoIcon.png'

import bottle1 from '../../Assets/Home/SectionTwoImages/RoyalPride.png';
import bottle2 from '../../Assets/Home/SectionTwoImages/bottles2.png';
import bottle3 from '../../Assets/Home/SectionTwoImages/bottles3.png';
import bottle4 from '../../Assets/Home/SectionTwoImages/bottles4.png';
import bottle5 from '../../Assets/Home/SectionTwoImages/bottles5.png';
import bottle6 from '../../Assets/Home/SectionTwoImages/bottles6.png';
import bottle7 from '../../Assets/Home/SectionTwoImages/bottles7.png';

import bottle1main from '../../Assets/Home/SectionTwoImages/bottles1main.png';
import bottle2main from '../../Assets/Home/SectionTwoImages/bottles2main.png';
import bottle3main from '../../Assets/Home/SectionTwoImages/bottles3main.png';
import bottle4main from '../../Assets/Home/SectionTwoImages/bottles4main.png';
import bottle5main from '../../Assets/Home/SectionTwoImages/bottles5main.png';
import bottle6main from '../../Assets/Home/SectionTwoImages/bottles6main.png';
import bottle7main from '../../Assets/Home/SectionTwoImages/bottles7main.svg';
import Footer from "../Footer/Footer";
import SliderComponent from '../Slider/SliderComponent';
import allBottel from '../../Assets/Home/all-bottle-transparante.png'
import { client } from '../../api/contentful.js';





const section = [
    {
        id: 1,
        name: 'ROYAL PRIDE',
        heading: "EXQUISITE WHISKY",
        para: "Reinvent yourself with Every sip.",
        smallImg: bottle1,
        largeImg: bottle1main,
        link: '/products/liquor/royalpride',
    },
    {
        id: 2,
        name: 'ARISTOCRAT',
        heading: "PREMIUM WHISKY",
        para: "One of india's most loved Whisky.",
        smallImg: bottle2,
        largeImg: bottle2main,
        link: '/products/liquor/acpremium',
    },
    {
        id: 3,
        name: 'ARISTOCRAT',
        heading: "PREMIUM WHISKY",
        para: "Old is gold, our best in the most recognixable bottle.",
        smallImg: bottle3,
        largeImg: bottle3main,
        link: '/products/liquor/acpremiumold',
    },
    {
        id: 4,
        name: 'DAMN GOOD SCOTCH',
        heading: "BLENDED SCOTCH WHISKY",
        para: "A drink made for kings.",
        smallImg: bottle4,
        largeImg: bottle4main,
        link: '/products/liquor/damngoodscotch',
    },
    {
        id: 5,
        name: 'AC BLACK',
        heading: "EXQUISITE WHISKY",
        para: "Just endless possibilities.",
        smallImg: bottle5,
        largeImg: bottle5main,
        link: '/products/liquor/acpremiumblack',
    },
    {
        id: 6,
        name: 'ROYAL MEDALLION',
        heading: "FRENCH XO BRANDY",
        para: "Heritage of Quality.",
        smallImg: bottle6,
        largeImg: bottle6main,
        link: '/products/liquor/royalpride',
    },
    {
        id: 7,
        name: 'IICE',
        heading: "PREMIUM VODKA",
        para: "Like I Like it",
        smallImg: bottle7,
        largeImg: bottle7main,
        link: '/products/liquor/iicevodka',
    }
]

const markers = [
    {
        name: "Angola",
        coordinates: [17.8739, -11.2027]
    },
    {
        name: "United Arab Emirates",
        coordinates: [53.8478, 23.4241]
    },
    {
        name: "Democratic Republic of the Congo",
        coordinates: [21.7587, -4.0383]
    },
    {
        name: "Ghana",
        coordinates: [-1.0232, 7.9465]
    },
    {
        name: "Guinea",
        coordinates: [-9.6966, 9.9456]
    },
    {
        name: "India",
        coordinates: [78.9629, 20.5937]
    },
    {
        name: "Italy",
        coordinates: [12.5674, 41.8719]
    },
    {
        name: "Kenya",
        coordinates: [36.8219, -1.2921]
    },
    {
        name: "Mali",
        coordinates: [-3.9962, 17.5707]
    },
    {
        name: "Oman",
        coordinates: [55.9754, 21.4735]
    },
    {
        name: "Togo",
        coordinates: [0.8248, 8.6195]
    },
    {
        name: "United States",
        coordinates: [-95.7129, 37.0902]
    },
    {
        name: "South Africa",
        coordinates: [22.9375, -30.5595]
    },
    {
        name: "Zambia",
        coordinates: [27.8493, -13.1339]
    },
    {
        name: "Mauritius",
        coordinates: [57.5522, -20.3484]
    },
    {
        name: "Singapore",
        coordinates: [103.8198, 1.3521]
    }
];

function Home() {

    const [data, setData] = useState(section[0]);
    const [content, setContent] = useState("");
    const [activeId, setActiveId] = useState(section[0]?.id);
    const [isHovered, setIsHovered] = useState(false);
    const [Herodata, setHeroData] = useState(null);

     // Handle when a slider change happens
  const handleSliderChange = (index) => {
    setData(section[index]); // Update the main content based on the active slide
    setActiveId(section[index].id);
  };

// Slick slider settings
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 3 images at a time (adjust as needed)
    slidesToScroll: 1,
    centerMode: true, // Center mode for slider
    focusOnSelect: true,
    afterChange: (current) => handleSliderChange(current), // Change content on slide change
    responsive: [
      {
        breakpoint: 1024, // Adjusting for tablet viewports (1024px and below)
        settings: {
          slidesToShow: 2, // Show 2 slides on tablet
          slidesToScroll: 1,
          centerMode: false, // Disable centering on smaller screens
        },
      },
      {
        breakpoint: 768, // For smaller screens like mobile phones
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false, // Disable centering on smaller screens
        },
      },
    ],
  };
  
  

    const secondSectionRef = useRef(null);

    useEffect(() => { 

        if (section.length > 0) {
            setData(section[0]);
        }
    }, [section, setData]);

    const handleClick = (id) => {
        setActiveId(id);
    };

    const handleButtonClick = (item) => {
        setData(item);
        handleClick(item.id);
    };

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const firstRef = useRef(null);

    const wrapperRef = useRef(null);

    useLayoutEffect(() => {
        // gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context((self) => {
            const tl = gsap
                .timeline({
                    defaults: {
                        ease: "none",
                    },
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        pin: true,
                        scrub: 1.5,
                        end: () => "+=100%",
                        ease:"power1.inOut"
                    },
                });

             
            // Timeline for firstRef
            const firstTimeline = gsap.timeline().fromTo(firstRef.current, {
                scale: 1.6,
                rotate: '30deg',
                marginTop: getMarginTop(),
                marginLeft: getMarginLeft(),
            }, {
                scale: 1,
                rotate: 0,
                marginTop: getMarginTopReset(),
                marginLeft: getMarginLeftreset(),
                // height: '100vh',
            });
            function getMarginTop() {
                const vh = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                if (vh < 768) {
                    return '30vh';
                } else if (vh >= 768 && vh < 1024) {
                    return '25vh';
                } else {
                    return '35vh';
                }
            }
            function getMarginLeft() {
                const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                if (vw < 768) {
                    return '20vw';
                } else if (vw >= 768 && vw < 1024) {
                    return '30vw';
                } else {
                    return '35vw';
                }
            }
            function getMarginTopReset() {
                const vh = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                if (vh < 768) {
                    return '15vh';
                } else if (vh >= 768 && vh < 800) {
                    return '35vh';
                }
                else if (vh >= 768 && vh < 1024) {
                    return '20vh';
                } else {
                    return '10vh';
                }
            }
            function getMarginLeftreset() {
                const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                if (vw < 768) {
                    return '38vw';
                } else if (vw >= 768 && vw < 1024) {
                    return '65vw';
                } else {
                    return '65vw';
                }
            }
            tl.add([firstTimeline]);
        }, [wrapperRef, firstRef]);

        return () => ctx.revert();

       
        
    }, []);

    const isHighlightedCountry = (countryName) => {
        return markers.some(marker => marker.name.includes(countryName));
    };

    const handleBrowseMoreClick = () => {
        if (secondSectionRef.current) {
            gsap.to(window, { duration: 1, scrollTo: secondSectionRef.current });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await client.getEntries({ content_type: 'homePage' });
            if (response.items.length > 0) {
       
              const entry = response.items[0].fields;
              setHeroData({
                since: entry.since,
                firstTitle: entry.firstTitle,
                secondTitle: entry.secondTitle,
                heroImage: entry.heroImage.fields.file.url,
                section1Image:entry.bannerImage.fields.file.url,
              });
            }
          } catch (error) {
            console.error('Error fetching data from Contentful:', error);
          }
        };
    
        fetchData();
      }, []);
    
      if (!Herodata) return <div>Loading...</div>;


    return (
        <div>

<section className="main" id="sectionImage1" data-pin="true"  style={{ backgroundImage: `url(${Herodata.section1Image})` }}>
  <div className="container">
    <div className="row">
      <div className="col-md-8 col-12 d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-start space">
      <span className="since-span">{Herodata.since}</span>
            <h1 className="h1-primery">{Herodata.firstTitle}</h1>
            <h1 className="h1-primery">{Herodata.secondTitle}</h1>
        <button className="btn section3Button mt-3" onClick={handleBrowseMoreClick}>
          BROWSE MORE
        </button>
      </div>
      <div className="col-md-4 col-12 d-flex justify-content-center">
        <img
          className="img-fluid first-img mt-4 mt-md-0"
          src={Herodata.heroImage}
          alt="WHISKY bottle"
        />
      </div>
    </div>
  </div>
</section>



            {/* //2 */}
            <SliderComponent/>
 
             <section id="sectionImage-3"  ref={secondSectionRef}>
             <div className="container py-5">
        <div className="row min-vh-50 align-items-center">
            <div className="col-md-12 text-center">
                <div className="lc-block mb-4">
                    <div editable="rich">
                        <span className="g-span text-black">Almost sold</span>
                        <h2 className="display-3 fw-bolder g-heading-2 mt-2 text-black">Billion bottles</h2>
                        <h3 className="g-heading-3 text-black">of Aristocrat Premium Whisky till now</h3>
                        <p className="btnparagraph mt-3 text-black">Explore our history to find out how we did it.</p>

                    </div>
                </div>
                <div className="lc-block">
                <Link to="/aboutUs/heritage/timeline">
                        <button className='section3Button box-color'>HERITAGE</button>
                    </Link>
                </div>
              
     
            </div>
        </div>
    </div>
             <div>
             <img src={allBottel} alt="section3Image"  className="img-fluid "/>
             </div>
             </section>




      
 
<section id="sectionImage4" >
             <div className="container py-5">
        <div className="row min-vh-50 align-items-center">
            <div className="col-md-12 text-center">
                <div className="lc-block mb-4">
                    <div editable="rich">                      
                        <h2 className="display-3 fw-bolder g-heading-4 pt-5 ">Where does all the magic come from ?</h2>                 
                    </div>
                </div>
               <div className="flex-center">
                <div className="row mt-5 width">
                <div className="col-md-4 mb-4">
        <div className="text-center h-100">
          <div className="card-bodys">
          <img src={brewImage} alt='Img' className='section5Image' />
          </div>
          
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="text-center h-100">
          <div className="card-bodys">
          <img src={distilImage} alt='Img' className='section5Image' />
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="text-center h-100">
          <div className="card-bodys last-card">
          <img src={storageImage} alt='Img' className='section5Image' />
          </div>
        </div>
      </div>

  </div>
  </div>
  <div className="lc-block mt-5">
                <Link to="/ourprocess">
                        <button className='section3Button'>OUR PROCESS</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
             </section>

            <div className="lastsecmainDiv">
                <h1 className='g-heading-4 text-center'>JIL's Presence & Reach</h1>
                <div className="container">
                    <Tooltip id="my-tooltip" />
                    <div className="svg-height">
                        <ComposableMap data-tooltip-id="my-tooltip" data-tooltip-content={content} className="imageMapContainer">
                            <Geographies geography="/features.json">
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const { name } = geo.properties;
                                        const isHighlighted = isHighlightedCountry(name);

                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                style={{
                                                    default: {
                                                        fill: isHighlighted ? "#D38A14" : "gray",
                                                        outline: "none"
                                                    },
                                                    hover: {
                                                        fill: isHighlighted ? "#D38A14" : "gray",
                                                        outline: "none"
                                                    },
                                                    pressed: {
                                                        fill: isHighlighted ? "#D38A14" : "gray",
                                                        outline: "none"
                                                    }
                                                }}
                                            />
                                        );
                                    })
                                }
                            </Geographies>
                            {markers.map(({ name, coordinates }) => (
                                <Marker
                                    key={name}
                                    coordinates={coordinates}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <a data-tooltip-id="my-tooltip" data-tooltip-content={name}>
                                        <circle
                                            className={!isHovered ? 'pulse' : ''}
                                            r={6}
                                            fill="#fff"
                                        />
                                        <circle
                                            r={6}
                                            fill="#fff"
                                        />
                                    </a>
                                </Marker>
                            ))}
                        </ComposableMap>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;
