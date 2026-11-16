import React from "react";
import '../Ethnol/Ethnol.css';
import bio from '../../../Assets/Products/Ethnol/biotank.png';
import grains from '../../../Assets/Products/Ethnol/grains.png';
import drop from '../../../Assets/Products/Ethnol/waterdrop.png';


export const Ethanol = () => {
    return (
        <>
         <div className="text-center mb-5 ethanolfirstDiv">
                <h1 className="heading-top">Manufacturing <br></br> Grain-Based Ethanol</h1>
                
            </div>
          
        <section className="container mt-5">
           
            <div>
                <h2 className="g-heading-4-yellow">What is Ethanol?</h2>
                <p className="global-p-2">
                    Ethanol is a green, low-carbon fuel. Also known as ethyl alcohol or grain alcohol, it is a versatile substance with a surprising number of uses. One of those various uses is blending ethanol with petrol, which reduces air pollution considerably.
                </p>
            </div>
            {/* Equal height columns */}
            <div className="row text-center  p-top">
                <div className="col-md-4 d-flex flex-column align-items-center justify-content-between">
                    <img src={grains} className="img-fluid mb-3" alt="Made from Rice and Maize" />
                    <p className="global-p-2">Made from Rice and Maize</p>
                </div>
                <div className="col-md-4 d-flex flex-column align-items-center justify-content-between">
                    <img src={bio} className="img-fluid mb-3" alt="Bio Fuel" />
                    <p className="global-p-2">Bio Fuel with low carbon emissions</p>
                </div>
                <div className="col-md-4 d-flex flex-column align-items-center justify-content-between">
                    <img src={drop} className="img-fluid mb-3" alt="Cleaner and Sustainable" />
                    <p className="global-p-2">Cleaner and Sustainable</p>
                </div>
            </div>
            <div className="p-top-bottom">
                <h2 className="g-heading-4-yellow">How we manufacture Ethanol?</h2>
                <p className="global-p-2">
                    JIL manufactures ethanol from rice grains and maize in a greenfield manufacturing facility at Hamira, Kapurthala district, Punjab, spread across 25 acres. It has the capacity to produce 200 kilolitres of Ethanol per day (200 KLPD) for supply to oil marketing companies. A production capacity of this size and scale underscores our commitment to sustainability by providing environmentally friendly fuel alternatives for India.
                </p>
                <p className="global-p-2">
                    This is especially so because our Ethanol production has received exclusive approval from the Government for supply to governmental entities only, aligning with the Government's strategic plan for blending Ethanol with petrol.
                </p>
                <p className="global-p-2">
                    The primary raw materials for our Ethanol production process are rice grains. This choice is part of our strategic approach to utilize renewable resources and promote agricultural sustainability, providing more jobs, cleaner air, and contributing to a sustainable future.
                </p>
            </div>
        </section>
        </>
    );
}
