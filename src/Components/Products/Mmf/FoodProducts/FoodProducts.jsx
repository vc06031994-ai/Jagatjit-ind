
import React from "react";
import '../FoodProducts/FoodProducts.css';
import milkproducts from '../../../../Assets/Products/Mmf/milkfood.png';
import mainImg from '../../../../Assets/Products/Mmf/foodimg.png';
import mailtimg from '../../../../Assets/Products/Mmf/malt.png';
import dairyimg from '../../../../Assets/Products/Mmf/dairy.png'

export const FoodProducts = () => {
    return (
        <>
    <div className="food-products text-white">
      {/* Header Section */}
      
      <div className="food-header text-center py-5 food-hero">
        <h1 className="heading-top">FOOD PRODUCTS</h1>
      </div>

      {/* Content Section */}
      <div className="container py-5">
      <p className="global-p-2">Jagatjit Industries Limited’s food division is versatile and diverse. JIL has a malt house, malt extract plant, a modern dairy and a malted milk food manufacturing unit. The malted milk food division has two units with a capacity to manufacture 120 tons per day of high quality malted milk food. JIL manufactures primer malted milk food for Unilever formerly know as GlaxoSmithKline Consumer Healthcare Ltd’s makers of Boost, Maltova and Horlicks, the leading brands in the country. Our own brands, Champion and Compleat are exported and loved in international markets.</p>
        {/* Malt Section */}
        <section className="mb-5 mt-5">
          <div className="row gy-3">
         <div className="col-lg-10 col-md-10">
         <h2 className="mb-4 global-h2 foodtextheadsmall">Malt</h2>
          <p className="global-p-2">
          The modern malt house produces malt from the best barley sourced after strict inspection, and undergoing our quality control processes from select farms which produce the best grains in Punjab. This malt is used to meet JIL’s own requirements in both the malted milk food division and the distillery division.
          </p>
          <p className="global-p-2 mt-3">
          All three grades of malt made by JIL – food, distillery & brewery grade – are sold in the domestic and international markets. JIL enjoys a well-earned reputation for the quality of its malt extract, meeting the high standards demanded by customers like Kraft Foods Ltd., Cadbury (India) Ltd., GlaxoSmithKline Consumer Healthcare Ltd., Kellogg India Ltd., AB Foods Ltd. (Thailand) and more.
          </p>
         </div>
         <div className="col-lg-2 col-md-2">
                 <div className="food-img">
                    <img src={mailtimg} alt="Smart milk product" className="img-fluid" />
                </div>
         </div>
          </div>
        </section>

        {/* Dairy Section */}
        <section className="mb-5">
            <div className="row gy-3">
            <div className="col-lg-10 col-md-10">
            <h2 className="mb-4 global-h2 foodtextheadsmall">Dairy</h2>
          <p className="global-p-2">
          The dairy plant produces milk powder, dairy whitener, baby food, malt extract powder, malted milk food (spray dried) and clarified butter or ‘pure ghee’.
          </p>
            </div>
            <div className="col-lg-2 col-md-2">
                <div className="food-img">
                    <img src={dairyimg} alt="Smart milk product" className="img-fluid" />
                </div>
            </div>
         
            </div>
         
        </section>

        {/* Smart Milk Section */}
        <section className="mb-5">
            <div className="row gy-3">
            <div className="col-lg-10 col-md-10">
            <h2 className="mb-4 global-h2 foodtextheadsmall">Smart Milk</h2>
          <p className="global-p-2">
          This nutritious malt-based food product manufactured by us is supplied to the Indian army for its personnel. It is available in the domestic market as well as exported.
          </p>
            </div>
            <div className="col-lg-2 col-md-2">
                 <div className="food-img">
                    <img src={milkproducts} alt="Smart milk product" className="img-fluid" />
                </div>
            </div>
           
            </div>
         
        </section>
      </div>

    </div>

        
        </>
    )
        
       
}
