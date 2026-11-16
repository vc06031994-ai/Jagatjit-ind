import React from 'react';
import './About.css';
import productimg from '../../../Assets/AboutUs/Values/pro-1.png'

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <div className="hero-section">
     
        <h1 className="heading-top abt">About Us</h1>
  
        <div className="container about-text">
            <p className="global-p-2">
           Jagatjit Industries Limited (JIL) is one of world’s leaders in the premium drinks segment. We have the largest integrated distilleries manufacturing potable alcohol in Asia; and in India, we are the first to possess in-house capabilities for 
producing molasses and non-molasses based potable alcohol from fully automated distillation plants. JIL manufactures and 
markets alcoholic beverages, malt, malt extract, nutritious planned food, milk powder, ghee, and dairy products. We also manufacture malted milk foods.
           </p>
            </div>
         
      </div>
    
       

       <div className="product-wrapper">
       <div className="container products-section">
  <div className="row">
    
    <div className="col-lg-6 col-md-12 ">
      <h2 className="g-heading-4-yellow">Products</h2>
      <p className="global-p-2">
        JIL's spirited and extensive portfolio of Whisky (Single Malt and Scotch), Gin, Rum, Brandy and Vodka includes three IMFL (Indian Made Foreign Liquor) brands in the "Millionaires’ Club" — selling more than a million cases each. In India, JIL is a household name in North-East India, Andhra Pradesh, Telangana, Kerala, Odisha, West Bengal and Jharkhand. Besides this, JIL products are popular in UAE, Oman, Saudi Arabia, Bangladesh, Sri Lanka, Malaysia, the UK and several Eastern European and African countries.
      </p>
      <p className="global-p-2">
        JIL's food division has its own malt house and malt extract plant, which produces high quality malt — food, distillery & brewery grade — used in its own products, sold in the domestic market and exported. JIL also has a modern dairy and a malted milk food manufacturing unit.
      </p>
    </div>
   
    <div className="col-lg-6 col-md-12 end-img">
      <div className="img-wrapper">
      <img src={productimg} alt="img"  className='img-fluid'/>
      </div>
      
    </div>
  </div>
</div>
       </div>


      {/* Heritage Section */}
      <div className="heritage-section bd-none">
        <div className="container">
        <h2 className="g-heading-4">A Heritage of Quality</h2>
        <p className="global-p-2">
          JIL's guiding philosophy — "A Heritage of Quality" — finds expression through all the company's activities: quality in manufacturing, state-of-the-art technology, and nurturing relationships with employees, dealers and customers. Invested in evolving with times and trends, JIL constantly redefines its methodologies, and rejuvenates its brands. This includes embracing modernization, upgrading our technological and automation capabilities, honing marketing creativity, and ensuring a diverse, engaged and collaborative work culture. We believe in delivering value for our customers, shareholders and other stakeholders and in all aspects of our business, to script a story of market leadership.
        </p>
        <p className="global-p-2 mt-3">
          Moving forward, JIL's trajectory will continue to be propelled by the founding principles of the company, keeping intact the quality and customer delight inherent in the DNA of our brands.
        </p>
        </div>
       
      </div>

     
    </div>
  );
};

export default AboutUs;
