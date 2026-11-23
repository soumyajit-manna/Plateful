import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <footer className="footer" id="footer">
            <div className="footer-inner">
                <div className="footer-hero">
                    <div className="footer-hero-copy">
                        <p className="footer-eyebrow">
                            <span className="footer-eyebrow-dot" aria-hidden="true" />
                            GOOD FOOD, GOOD MOOD
                        </p>
                        <h2>
                            Make room for
                            <span> something delicious.</span>
                        </h2>
                    </div>
                    <Link className="footer-cta" to="/#explore-menu">
                        Explore the menu
                        <span className="footer-cta-arrow" aria-hidden="true">↗</span>
                    </Link>
                </div>

                <div className="footer-main">
                    <div className="footer-brand">
                        <Link className="footer-logo-link" to="/" aria-label="Plateful home">
                            <span className="footer-brand-symbol" aria-hidden="true" />
                            <span className="footer-brand-name">Plate<span>ful</span></span>
                        </Link>
                        <p className="footer-brand-copy">
                            Your cravings, our kitchen. Fresh favorites made to brighten your day
                            and delivered right to your door.
                        </p>
                        <div className="footer-socials" aria-label="Social links">
                            <a
                                href="https://twitter.com/Mindwrap_Error"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Twitter profile"
                            >
                                <img src={assets.twitter_icon} alt="" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/soumyajit-manna-731372270?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BmnVLky%2BnQlW81FOwJVONuQ%3D%3Dm"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn profile"
                            >
                                <img src={assets.linkedin_icon} alt="" />
                            </a>
                        </div>
                    </div>

                    <nav className="footer-links" aria-label="Footer navigation">
                        <h3>Explore</h3>
                        <Link to="/">Home</Link>
                        <Link to="/#explore-menu">Browse the menu</Link>
                        <Link to="/cart">Your basket</Link>
                        <Link to="/myorders">My orders</Link>
                    </nav>

                    <div className="footer-contact">
                        <h3>Let’s talk</h3>
                        <p>Questions, feedback, or just saying hello?</p>
                        <a href="tel:+919382869803">+91 93828 69803</a>
                        <a href="mailto:mannasoumyajit47@gmail.com">mannasoumyajit47@gmail.com</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Plateful. Made for moments worth sharing.</p>
                    <p className="footer-credit">
                        Designed &amp; developed by <span>Soumyajit Manna</span>
                    </p>
                    <button className="footer-back-to-top" type="button" onClick={scrollToTop}>
                        Back to top
                        <span aria-hidden="true">↑</span>
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer
