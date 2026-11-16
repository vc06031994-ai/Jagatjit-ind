import React from "react";
import maltextraction from '../../../../Assets/Products/Mmf/mal-01.png';
import milingProcess from '../../../../Assets/Products/Mmf/mal-02.png';
import mashing from '../../../../Assets/Products/Mmf/mashing.png';
import evaporation from '../../../../Assets/Products/Mmf/evoparation.png';
import filter from '../../../../Assets/Products/Mmf/filter.png';
import "./MaltExtract.css"
import millingMachine from '../../../../Assets/Products/Mmf/milling-machine.png'
import weat from '../../../../Assets/Products/Mmf/weat.png'
import mashing01 from '../../../../Assets/Products/Mmf/mashing01.png'
import filtering from '../../../../Assets/Products/Mmf/filtering.png'

export const MaltExtract = () => {
    return (
        <section>
            <div className="text-center mb-5 malt-hero">
                <div className="overlay-01"></div>
                <h1 className="heading-top">Malt Food Extract</h1>
            </div>
        <div className="container my-5">
            

            <div className="mb-5">
                <p className="global-p-2 text-center">
                    Malt Extract is a blend of starch breakdown products containing mainly maltose (malt sugar), prepared from cereals like Barley, Wheat & Millets. 
                    The malt is specially processed with water to develop sweetness, and the liquid is then filtered and evaporated into a thick, sweet liquid extract. 
                    Since this special processing preserves most of the natural characteristics of the whole grain, Malt Extracts are nutritious and healthy. 
                    Malt Extracts are also functional, adding bulk, acting as a natural humectant, enhancing body and viscosity in liquids, and more. Malt Extracts add a malty flavor 
                    and color ranging from mild malty to caramel. JIL has extensive experience and process expertise to produce an array of Malt and Cereal Extracts, well received in Indian 
                    and international markets for their superior quality standards. High quality ingredients combine with modern production facilities for malt extraction that is effective and efficient.
                </p>
            </div>
            </div>
            <section class="text-white p-top-bottom eath-sec-2">
  <div class="container">
    <h2 class="text-center mb-5 text-size">The procedure of converting malted grain/cereals into Malt or Cereal Extracts involves the following stages.</h2>
    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="text-center h-100 malt-stages">
          <div class="card-bodys">
            <img src={millingMachine} alt=""  className="img-fluid"/>
            <h5 class="card-title mt-3 text-white malt-stages" >Milling</h5>
          </div>
          
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="text-center h-100 malt-stages">
          <div class="card-bodys">
            <img src={weat} alt="weat" className="img-fluid" />
            <h5 class="card-title mt-3 text-white malt-stages">Liquefaction of grain</h5>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="text-center h-100 malt-stages">
          <div class="card-bodys">
           <img src={mashing01} alt="mashing" className="img-fluid"/>
            <h5 class="card-title mt-3 text-white malt-stages">Mashing</h5>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="text-center h-100 malt-stages">
          <div class="card-bodys last-card">
            <img src={filtering} alt="filtering" className="img-fluid" />
            <h5 class="card-title mt-3 text-white malt-stages">Filtering and evaporation</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
          <div className="container">
            <div className="row mb-5 gy-3 p-top">
                <div className="col-md-6">
                    <h2 className="g-heading-4-yellow">Milling</h2>
                    <p className="global-p-2 text-malt-food">
                        To guarantee 100% extraction yield (= laboratory yield) as well as to guarantee the clearest possible wort, the malt must be milled very finely. 
                        For raw material with moisture content of 4% and over, we use a ventilated hammer mill with a horizontal shaft to finely grind malt, barley, sorghum and some cereals with moisture 
                        content up to 15%. The ventilated hammer mill overcomes the risk of the mill being blocked because of humidity and eliminates the risk of burning or explosion.
                    </p>
                </div>
                <div className="col-md-6">
                    <img src={maltextraction} alt="Milling Process" className="img-fluid" />
                </div>
            </div>

            <div className="row mb-5 gy-3">
                <div className="col-md-6">
                    <img src={mashing} alt="Mashing Process" className="img-fluid" />
                </div>
                <div className="col-md-6 order-first order-sm-1">
                    <h2 className="g-heading-4-yellow">Mashing</h2>
                    <p className="global-p-2 text-malt-food">
                        The milled, ground grain, called grist, is mixed with hot water or mashing liquor in mash vessels to form a thick mash as the starch converts to sugars. 
                        By entering the mash tun from the bottom, our machine takes care to avoid oxygen pick up and reduces shear forces during the brewing process thanks to special agitators. 
                        This technique encourages better mash filtration by preventing the formation of large molecules leading to high viscosity.
                    </p>
                </div>
            </div>

            <div className="row mb-5 gy-3">
                <div className="col-md-6">
                    <h2 className="g-heading-4-yellow">Filtration</h2>
                    <p className="global-p-2 text-malt-food">
                        Next, the liquid is passed through a mash filter to produce ‘wort’. The aim of malt extract/cereal extract production is to obtain the clearest possible wort as well as wort with the highest gravity. 
                        The low gravity or weak wort is used in the next mashing-in and, if required, partly during the initial sparging cycle of the mash filter to achieve high densities. 
                        Our mash filter ensures clear and dense wort between 25 and 30° before evaporation.
                    </p>
                </div>
                <div className="col-md-6">
                    <img src={filter} alt="Filtration Process" className="img-fluid" />
                </div>
            </div>

            <div className="row gy-3 mb-5">
                <div className="col-md-6 ">
                <img src={evaporation} alt="Evaporation Process" className="img-fluid" />
                </div>
                <div className="col-md-6 order-first order-sm-1">
                    
                    <h2 className="g-heading-4-yellow">Evaporation</h2>
                    <p className="global-p-2 text-malt-food">
                        This is the final step in manufacturing of Cereal Extract. The high-density wort is evaporated and concentrated down to 80% solids. 
                        The multiple effect thin falling film evaporation technique is used for concentration. A vapor compression system is incorporated to reduce steam consumption, 
                        using the heat enthalpy of vapors in the concentration of the extract. The final product is a viscous, amber-colored liquid.
                    </p>
                </div>
            </div>
        </div>
        </section>
    );
};
