import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from "react-router-dom";
import { client } from '../../api/contentful.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';



const SliderComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await client.getEntries({ content_type: 'productSlider' });
        const slideData = response.items.reverse().map(item => ({
          id: item.sys.id,
          name: item.fields.name,
          heading: item.fields.heading,
          para: item.fields.description,
          smallImg: item.fields.smallImage?.fields?.file?.url || '',
          largeImg: item.fields.largeImage?.fields?.file?.url || '',
          link: item.fields.url || '#',
        }));
        setSlides(slideData);
      } catch (error) {
        console.error("Error fetching data from Contentful:", error);
      }
    };

    fetchSlides();
  }, []);

  const settings = {
    dots: false,
    infinite: slides.length > 4,
    speed: 500,
    slidesToShow: Math.min(4, slides.length),
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: Math.min(2, slides.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: Math.min(2, slides.length),
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (slides.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section id='sectionImage2'>
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <div className="imageDivsow">
              <img src={slides[currentSlide].largeImg} alt={slides[currentSlide].name} className="img-fluid left-img" />
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <div className="right-col">
              <div className="content-div">
                <h3 className='btnheading'>{slides[currentSlide].name}</h3>
                <p className='btnparagraph'>{slides[currentSlide].para}</p>
                <Link to={slides[currentSlide].link}>
                  <button className="section3Button slide-btn mt-3">Read More</button>
                </Link>
              </div>
              <div className="img-slider">
                <Slider {...settings}>
                  {slides.map((item, index) => (
                    <div className="small-bottle" key={index}>
                      <img src={item.smallImg} alt={item.name} className="img-fluid" />
                      <h4 className="global-p-2 center">{item.name}</h4>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderComponent;
