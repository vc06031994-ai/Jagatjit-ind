import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../Navbar/Navbar.css';
import logo from '../../Assets/jillogoheader.svg';
import { IoClose, IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import MobileNav from './MobileNav';
// Use static public path to avoid bundler asset collisions in production (Netlify)

function Navbar({ show, scrollStop }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false); 
    const [productsOpen, setProductsOpen] = useState(false); 
    const [liquorOpen, setLiquorOpen] = useState(false); 
    const [mmfOpen, setMmfOpen] = useState(false); 
    const [investorsOpen, setInvestorsOpen] = useState(false); 
    const location = useLocation(); // Get the current location

    // Handle window resize to set menu and dropdown states
    useEffect(() => {
        const handleResize = () => {
            const responsive = window.innerWidth;
            if (responsive > 768) {
                setMenuOpen(false);
                setAboutOpen(true);
                setProductsOpen(true);
                setLiquorOpen(true);
                setMmfOpen(true);
                setInvestorsOpen(true);
            } else {
                setAboutOpen(false);
                setProductsOpen(false);
                setLiquorOpen(false);
                setMmfOpen(false);
                setInvestorsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call it initially

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close the menu when the route changes
    useEffect(() => {
        if (menuOpen) {
            setMenuOpen(false);
        }
    }, [location]);

    // Disable background scrolling when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [menuOpen]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        scrollStop(!menuOpen);
    };

    const toggleAbout = () => {
        setAboutOpen(prev => !prev);
    };

    const toggleProducts = () => {
        setProductsOpen(prev => !prev);
    };

    const toggleLiquor = () => {
        setLiquorOpen(prev => !prev);
    };

    const toggleMmf = () => {
        setMmfOpen(prev => !prev);
    };

    const toggleInvestors = () => {
        setInvestorsOpen(prev => !prev);
    };

    return (
        <>
        <nav className={`main-navbar ${show ? 'fade-in-out' : ''}`} style={{ opacity: show ? 1 : 0}}>
            <div className="firstLogo">
                <div>
                    <Link to="/home" className="title">
                        <img src={logo} alt="logo" className="logo-heading" />
                    </Link>
                </div>
                <div id="menu" className="menu" onClick={toggleMenu}>
                </div>
            </div>
            
            <div className='headerNavBar'>
                <div className={menuOpen ? "open mainNavDiv" : "mainNavDiv"}>
                    <div className="navItem">
                        <Link to='/home' className='linkText'>HOME</Link>
                    </div>
                    <div className="navItem">
                        <div onClick={toggleAbout} className='linkText about'>OUR STORY<IoIosArrowForward size={18} className='arrow-f'/></div>
                        {aboutOpen && (
                            <div className="subItems">
                                <Link to="/aboutus/about">ABOUT US</Link>
                                <Link to='/aboutUs/heritage/timeline'>HERITAGE</Link>
                                <Link to="/aboutus/ourteam/team">OUR TEAM</Link>
                                <Link to='/aboutUs/values'>VALUES</Link>                        
                                <Link to="/aboutus/press">PRESS</Link>
                            </div>
                        )}
                    </div>
                    <div className="navItem1">
                        <div onClick={toggleProducts} className='linkText'>PRODUCTS <IoIosArrowForward size={18} className='arrow-f'/> </div>
                        {productsOpen && (
                            <div className="subItems1">
                                <div onClick={toggleLiquor} className='menu-link'>
                                    <h5>LIQUOR <IoIosArrowForward size={18} className='arrow-f'/></h5> 
                                    {liquorOpen && (
                                        <div className="liquorSubItems1">
                                            <Link to="/products/liquor/acpremiumold">AC PREMIUM (OLD)</Link>
                                            <Link to="/products/liquor/acpremium">AC PREMIUM</Link>
                                            <Link to="/products/liquor/acpremiumblack">AC BLACK</Link>
                                            <Link to="/products/liquor/royalpride">ROYAL PRIDE</Link>
                                            <Link to="/products/liquor/damngoodscotch">DAMN GOOD SCOTCH</Link>
                                            <Link to="/products/liquor/iicevodka">IICE VODKA</Link>
                                            <Link to="/products/liquor/acdrygin">AC DRY GIN</Link>
                                            <Link to="/products/liquor/royalmedallion">ROYAL MEDALLION</Link>
                                        </div>
                                    )}
                                </div>
                                <div className='navItem2'>
                                    <div className="subItem2">
                                        <div onClick={toggleMmf} className="menu-link">
                                            <h5>MMF <IoIosArrowForward size={18} className='arrow-f'/></h5>
                                            {mmfOpen && (
                                                <div className="liquorSubItems2">
                                                    <Link to="/products/mmf/foodproducts">FOOD PRODUCTS</Link>
                                                    <Link to='/products/mmf/maltextract'>MALT EXTRACT</Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Link to="/products/ethnol" className='ethanol'>ETHANOL</Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="secondLogo">
                    <Link to="/home" >
                        <img src={logo} alt='logo' className="logo-heading"/>
                        </Link>
                    </div>
                    <div className="navItem">
                        <Link to="/ourprocess" className='linkText'>OUR PROCESS</Link>
                    </div>
                    <div className="navItem" onClick={toggleInvestors}>
                        <h4>INVESTORS <IoIosArrowForward size={18} className='arrow-f'/></h4>
                        {investorsOpen && (
                            <div className="subItems">
                                <Link to="/investors/financial">FINANCIAL</Link>
                                <Link to="/investors/csr">CSR</Link>
                                <Link to="/investors/codeofconduct">CODE OF CONDUCT</Link>
                                {/*<Link to="/investors/preqip">PRE QIP</Link>
                                <a href="/post-qip.pdf" target="_blank" rel="noopener noreferrer">POST QIP</a>//*/}
                                {/* <a href="https://smartodr.in/login" target="_blank" rel="noopener noreferrer">SMART ODR</a> */}
                            </div>
                        )}
                    </div>
                    <div className="navItem">
                        <Link to="/contactus" className='linkText'>CONTACT US</Link>
                    </div>
                </div>
                
                {/* Close menu button */}
                <div className="menu" id="nav-close" style={{ zIndex: 2, marginRight: '7%' }} onClick={toggleMenu}>
                    {menuOpen ? <IoClose fontSize={90}/> : <IoMenu fontSize={90}/>}
                </div>
            </div>
        </nav>
        <MobileNav/>
        </>
    );
}

export default Navbar;
