import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MobileNav.css'; // Ensure the CSS file is updated accordingly
import logo from '../../Assets/jillogoheader.svg'; // Ensure the logo path is correct

const MobileNav = () => {
    
    const location = useLocation(); // Get the current location
    const [isOpen, setIsOpen] = useState(false); // State to track offcanvas visibility
    const [openAccordions, setOpenAccordions] = useState({
        ourStory: false,
        products: false,
        investors: false,
    });

    const toggleOffcanvas = () => {
        setIsOpen(!isOpen);
    };

    const closeOffcanvas = () => {
        setIsOpen(false);
    };

    const toggleAccordion = (accordion) => {
        setOpenAccordions((prevState) => ({
            ...prevState,
            [accordion]: !prevState[accordion],
        }));
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    

    useEffect(() => {
        closeOffcanvas();
        setOpenAccordions({
            ourStory: false,
            products: false,
            investors: false,
        });
    }, [location]);

    return (
        <>
            <nav  className={`navbar navbar-expand-lg d-md-block d-lg-none mobile-navbar sticky`}>
                <div className="container">
                    <Link className="navbar-brand" to="/home">
                        <img src={logo} alt="logo" className="logo-heading" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleOffcanvas} // Toggle offcanvas on button click
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

            {/* Offcanvas Component */}
            <div className={`offcanvas offcanvas-start ${isOpen ? 'show' : ''}`} id="offcanvasNavbar" tabIndex="-1" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close text-reset" onClick={closeOffcanvas} aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/home" aria-current="page">HOME</Link>
                        </li>
                        
                        {/* Accordion for Our Story */}
                        <li className="nav-item">
                            <div className="accordion" id="accordionOurStory">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className={`accordion-button ${openAccordions.ourStory ? '' : 'collapsed'}`}
                                            type="button"
                                            onClick={() => toggleAccordion('ourStory')}
                                            aria-expanded={openAccordions.ourStory}
                                            aria-controls="collapseOurStory"
                                        >
                                            OUR STORY
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOurStory"
                                        className={`accordion-collapse ${openAccordions.ourStory ? 'show' : 'collapse'}`}
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionOurStory"
                                    >
                                        <div className="accordion-body">
                                            <ul className="navbar-nav">
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/aboutus/about">About Us</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/aboutUs/heritage/timeline">Heritage</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/aboutus/ourteam/team">Our Team</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/aboutUs/values">Values</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/aboutus/press">Press</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* Accordion for Products */}
                        <li className="nav-item">
                            <div className="accordion" id="accordionProducts">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingProducts">
                                        <button
                                            className={`accordion-button ${openAccordions.products ? '' : 'collapsed'}`}
                                            type="button"
                                            onClick={() => toggleAccordion('products')}
                                            aria-expanded={openAccordions.products}
                                            aria-controls="collapseProducts"
                                        >
                                            PRODUCTS
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseProducts"
                                        className={`accordion-collapse ${openAccordions.products ? 'show' : 'collapse'}`}
                                        aria-labelledby="headingProducts"
                                        data-bs-parent="#accordionProducts"
                                    >
                                        <div className="accordion-body">
                                            <ul className="navbar-nav">
                                                {/* Accordion for Liquor */}
                                                <li className="nav-item">
                                                    <div className="accordion" id="accordionLiquor">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingLiquor">
                                                                <button
                                                                    className={`accordion-button ${openAccordions.liquor ? '' : 'collapsed'}`}
                                                                    type="button"
                                                                    onClick={() => toggleAccordion('liquor')}
                                                                    aria-expanded={openAccordions.liquor}
                                                                    aria-controls="collapseLiquor"
                                                                >
                                                                    Liquor
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="collapseLiquor"
                                                                className={`accordion-collapse ${openAccordions.liquor ? 'show' : 'collapse'}`}
                                                                aria-labelledby="headingLiquor"
                                                                data-bs-parent="#accordionLiquor"
                                                            >
                                                                <div className="accordion-body">
                                                                    <ul className="navbar-nav">
                                                                        <li className="nav-item">
                                                                            <Link className="nav-link" to="/products/liquor/acpremiumold">Acpremium</Link>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <Link className="nav-link" to="/products/liquor/acpremium">Acpremium (New)</Link>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <Link className="nav-link" to="/products/liquor/acpremiumblack">Ac Black</Link>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <Link className="nav-link" to="/products/liquor/royalpride">Royal Pride</Link>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <Link className="nav-link" to="/products/liquor/damngoodscotch">Damn Good Scotch</Link>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <Link className="nav-link" to="/products/liquor/iicevodka">Iice Vodka</Link>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <Link className="nav-link" to="/products/liquor/acdrygin">Ac Dry Gin</Link>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <Link className="nav-link" to="/products/liquor/royalmedallion">Royal Medallion</Link>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                {/* Accordion for MMF */}
                                                <li className="nav-item">
                                                    <div className="accordion" id="accordionMMF">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingMMF">
                                                                <button
                                                                    className={`accordion-button ${openAccordions.mmf ? '' : 'collapsed'}`}
                                                                    type="button"
                                                                    onClick={() => toggleAccordion('mmf')}
                                                                    aria-expanded={openAccordions.mmf}
                                                                    aria-controls="collapseMMF"
                                                                >
                                                                    MMF
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="collapseMMF"
                                                                className={`accordion-collapse ${openAccordions.mmf ? 'show' : 'collapse'}`}
                                                                aria-labelledby="headingMMF"
                                                                data-bs-parent="#accordionMMF"
                                                            >
                                                                <div className="accordion-body">
                                                                    <ul className="navbar-nav">
                                                                        <li className="nav-item">
                                                                            <Link className="nav-link" to="/products/mmf/foodproducts">Food Products</Link>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <Link className="nav-link" to="products/mmf/maltextract">MALT EXTRACT</Link>
                                                                        </li>
                                                                       
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                {/* Accordion for Non-Alcoholic */}
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/products/ethnol">ETHANOL</Link>
                                                </li>
                                               
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                         <Link className="nav-link" to="/ourprocess">OUR PROCESS</Link>
                        </li>
                    
                        {/* Accordion for Investors */}
                        <li className="nav-item">
                            <div className="accordion" id="accordionInvestors">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingInvestors">
                                        <button
                                            className={`accordion-button ${openAccordions.investors ? '' : 'collapsed'}`}
                                            type="button"
                                            onClick={() => toggleAccordion('investors')}
                                            aria-expanded={openAccordions.investors}
                                            aria-controls="collapseInvestors"
                                        >
                                            INVESTORS
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseInvestors"
                                        className={`accordion-collapse ${openAccordions.investors ? 'show' : 'collapse'}`}
                                        aria-labelledby="headingInvestors"
                                        data-bs-parent="#accordionInvestors"
                                    >
                                        <div className="accordion-body">
                                            <ul className="navbar-nav">
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/investors/financial">Reports</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/investors/csr">Csr</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/investors/codeofconduct">Code of conduct</Link>
                                                </li>
                                                {/* <li className="nav-item">
                                                <Link className="nav-link" to="/investors/preqip">PRE QIP</Link>
                                                </li>
                                                <li className="nav-item">
                                                <a className="nav-link" href="/post-qip.pdf" target="_blank" rel="noopener noreferrer">POST QIP</a>
                                                </li> */}
                                                {/* <li className="nav-item">
                                                    <a href="https://smartodr.in/login" className="nav-link" target="_blank" rel="noopener noreferrer">SMART ODR</a>
                                                </li> */}
                                             
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                         <Link className="nav-link" to="/contactus">CONTACT US</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MobileNav;
