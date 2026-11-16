import React, { useState, useEffect } from 'react';
import { client } from '../../../api/contentful.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Heritage.css'; 
import mainImg1 from '../../../Assets/AboutUs/heritage/heritage01.png'
import mainImg2 from '../../../Assets/AboutUs/heritage/heritage02.png'
import mainImg3 from '../../../Assets/AboutUs/heritage/heritage03.png'
// import DemoTime from './DemoTime'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';



  
  const TimeLine = () => {
    const [achievements, setAchievements] = useState([]);
  
    useEffect(() => {
      const fetchAchievements = async () => {
        try {
          const response = await client.getEntries({
            content_type: 'achievementsheritage',
          });
  
          console.log('API data fetched successfully:', response.items); // Log API data to console
  
          setAchievements(response.items.reverse()); // Reverse the order here
        } catch (error) {
          console.error('Error fetching achievements:', error);
        }
      };
  
      fetchAchievements();
    }, []);
    return (
        <div className="heritage-container">
            <div className="first-section">
            <div className="heritage-heading">
               <h1 className="heading-top">Heritage</h1>
               </div>
               
            <div className="heritage-sec">
                <div className="container">
                <div className="row align-items-center heritage-item ">
                        <div className="col-md-9">
                            <h2 className="heritage-number mt-3">01</h2>
                            
                            <p className="heritage-text heritagepara">
                                Jagatjit Industries was founded in 1944 by the Late Mr. LP Jaiswal in the erstwhile state of Kapurthala,
                                under the patronage of its Maharaja Jagatjit Singh. Jagatjit Chemical and Pharmaceutical Works and 
                                the Jagatjit Laboratories were established in 1946, and the distillery began operations in 1948.
                                The company then obtained a license for the annual manufacture of malt extract of 1800 tons, the 
                                largest in the country at the time, and started production in 1963.
                            </p>
                        </div>
                        <div className="col-md-3 ">
                            <img src={mainImg1} alt="Maharaja Jagatjit Singh" className="img-fluid" />
                            <h3 className="heritage-title heritagemaintxt">Maharaja Jagatjit Singh</h3>
                        </div>
                    </div>
                    <div className="row align-items-center heritage-item">
                        <div className="col-md-3 ">
                        <img src={mainImg2} alt="Maharaja Jagatjit Singh" className="img-fuild" />
                        <h3 className="heritage-title">Late Mr. L.P Jaiswal </h3>
                        </div>
                        <div className="col-md-9 order-first order-sm-1">
                           
                            <h2 className="heritage-number mt-3 timline-number">02</h2>
                            
                            <p className="heritage-text">
                            The next few decades saw the development and introduction of several premium brands of liquor (including the iconic Aristocrat and Teachers whiskies), as well as malted milk food (Ovaltine/Maltova), which cemented the company’s pioneering position in the industry, and delivered on its promise of a ‘Heritage of Quality’. In 2023, JIL got approval for its Ethanol plant. 
                            </p>
                        </div>
                    </div>
                    <div className="row align-items-center heritage-item ">
                        <div className="col-md-9">
                            <h2 className="heritage-number mt-3">03</h2>
                            
                            <p className="heritage-text">
                            In 2015, Roshini Sanah Jaiswal took over as Promoter and Chief Restructuring Officer at Jagatjit Industries Limited (JIL), carrying forward a seventy-one-year-old legacy created by her father and grandfather. She has successfully leveraged that rich heritage by upgrading the company’s technology and automation capabilities to increase efficiency, ensuring future-ready agility and catalyzing dynamism in thought and deed. 
                            </p>
                        </div>
                        <div className="col-md-3 ">
                            <img src={mainImg3} alt="Maharaja Jagatjit Singh" className="img-fuild" />
                            <h3 className="heritage-title">Roshini Sanah Jaiswal</h3>
                        </div>
                    </div>
                     <p className='global-p-2 text-center'>Jagatjit Industries Limited (JIL) is now one of world’s leaders in the premium drinks segment. We have the largest 
                     integrated distilleries manufacturing potable alcohol in Asia; and in India, we are the first to possess in-house capabilities for producing molasses and non-molasses based potable alcohol from fully automated distillation plants. JIL manufactures and markets alcoholic beverages, malt, malt extract, nutritious planned food, milk powder, ghee, and dairy products. We also manufacture malted milk foods. JIL’s guiding philosophy – ‘A Heritage of Quality’ – finds expression through all the company’s activities: quality in manufacturing, state-of-the-art-technology, and enduring relationships with employees, dealers and customers.</p>
                </div>
            </div>
            </div>
             

        

            <div style={{ textAlign: 'justify' }} className='milestones-section'>
                <div className="container">
                <h1 className="g-heading-4 text-center">
                    Milestones
                </h1>
                <p className='global-p-2 text-center mb-5 mt-5' >Maharaja Jagatjit Singh assumed full ruling powers in November 1890 and then commenced a career as a world traveler and Francophile. He received the title of Maharaja in 1911. He builtpalaces and gardens in the city of Kapurthala; his main palace, Jagatjit Palace, was modelled on the Palace of Versailles. He served as the Indian Representative to the League of Nations GeneralAssembly in Geneva in 1926, 1927 and 1929 and attended the Round Table Conference in 1931
                and was Lt Governor of the PEPSU (Patiala and East Punjab State Union) at the time of his deathin 1949, aged 76.</p>
                </div>
                
                <VerticalTimeline animate={true}>
      {achievements.map((achievement, i) => (
        <VerticalTimelineElement
          key={achievement.sys.id} // Use a unique identifier from Contentful
          contentStyle={{ background: 'black' }}
          contentArrowStyle={{ borderRight: 'white' }}
          iconStyle={{ background: 'white' }}
          icon={<span className="icon-number">{i + 1}</span>} // Add numbers
        >
          <div>
            {achievement.fields.achievementImage && (
              <img src={achievement.fields.achievementImage.fields.file.url} alt={achievement.fields.title} className="img-fluid" />
            )}
            <p className="t-date">{achievement.fields.title}</p>
            <p className="global-p-2">{achievement.fields.description}</p>
          </div>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
            </div>
            
         
        </div>
    );
};

export default TimeLine;
