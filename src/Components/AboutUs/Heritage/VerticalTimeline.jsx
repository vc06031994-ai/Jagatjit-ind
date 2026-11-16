import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VerticalTimeline.css'; // Import custom CSS

const VerticalTimeline = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">Milestones</h2>
      <div className="customline position-relative">
        {/* Timeline Item 1 */}
        <div className="row mb-4 align-items-center ">
          <div className="col-lg-6 order-lg-1 text-end customline-content mx-3">
            <h5 className="text-warning">1944</h5>
            <p>
              The Company incorporated as "Jagatjit Distillery & Allied Industries Ltd." in Kapurthala under the patronage of its Maharaja, H.E Sardar Jagatjit Singh.
            </p>
          </div>
          <div className="col-lg-6 order-lg-2 text-start customline-image">
            <img src="path/to/image1.png" className="img-fluid" alt="1944 event" />
          </div>
          <span className="customline-marker">1</span>
        </div>

        {/* Timeline Item 2 */}
        <div className="row mb-4 align-items-center">
          <div className="col-lg-6 order-lg-2 text-start customline-content">
            <h5 className="text-warning">1948</h5>
            <p>
              The first Distillery plant was set up in Kapurthala.
            </p>
          </div>
          <div className="col-lg-6 order-lg-1 text-end customline-image">
            <img src="path/to/image2.png" className="img-fluid" alt="1948 event" />
          </div>
          <span className="customline-marker">2</span>
        </div>

        {/* Timeline Item 3 */}
        <div className="row mb-4 align-items-center">
          <div className="col-lg-6 order-lg-1 text-end customline-content">
            <h5 className="text-warning">1953</h5>
            <p>
              Entered into an agreement with Schweppes Overseas Ltd. & Pepsi Cola Ltd. to set up bottling & soft drinks plant.
            </p>
          </div>
          <div className="col-lg-6 order-lg-2 text-start customline-image">
            <img src="path/to/image3.png" className="img-fluid" alt="1953 event" />
          </div>
          <span className="customline-marker">3</span>
        </div>

        {/* Timeline Item 4 */}
        <div className="row mb-4 align-items-center">
          <div className="col-lg-6 order-lg-2 text-start customline-content">
            <h5 className="text-warning">1968</h5>
            <p>
              Hyderabad brewery Ltd. was bought over. A new health drink by the name of VIVA was launched.
            </p>
          </div>
          <div className="col-lg-6 order-lg-1 text-end customline-image">
            <img src="path/to/image4.png" className="img-fluid" alt="1968 event" />
          </div>
          <span className="customline-marker">4</span>
        </div>
      </div>
    </div>
  );
};

export default VerticalTimeline;
