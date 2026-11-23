import './Navbar.css'
import { assets } from '../../assets/assets'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'

const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const navbar = document.querySelector('.navbar')
    const navOffset = navbar ? navbar.getBoundingClientRect().height + 20 : 20
    const sectionTop = window.scrollY + section.getBoundingClientRect().top - navOffset

    window.scrollTo({ top: Math.max(0, sectionTop), behavior: 'smooth' })
}

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState('home')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const { getTotalCartAmount, foodListLoaded, token, setToken } = useContext(StoreContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const sectionId = location.hash.slice(1)
        if (location.pathname === '/' && sectionId) {
            const waitsForMenuData = sectionId === 'app-download' || sectionId === 'footer'
            if (waitsForMenuData && !foodListLoaded) return
            window.requestAnimationFrame(() => scrollToSection(sectionId))
        }
    }, [location.pathname, location.hash, foodListLoaded])

    const handleSectionNavigation = (event, sectionId, menuName) => {
        event.preventDefault()
        setMenu(menuName)
        setMobileMenuOpen(false)

        if (location.pathname === '/' && location.hash === `#${sectionId}`) {
            scrollToSection(sectionId)
        } else {
            navigate(`/#${sectionId}`)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
        setProfileMenuOpen(false)
        toast.info("You've been logged out. Come back soon!");
        navigate("/")
    }

    return (
        <header className="navbar">
            <Link className="navbar-brand" to="/" aria-label="Plateful home">
                <span className="navbar-brand-symbol" aria-hidden="true" />
                <span className="navbar-brand-lockup">
                    <span className="navbar-brand-name">Plate<span>ful</span></span>
                    <span className="navbar-brand-kicker">GOOD FOOD / GOOD MOOD</span>
                </span>
            </Link>

            <nav id="navbar-navigation" className={`navbar-menu ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
                <Link to="/" onClick={() => { setMenu("home"); setMobileMenuOpen(false) }} className={location.pathname === '/' && menu === 'home' ? "active" : ""}>Home</Link>
                <Link to="/#explore-menu" onClick={(event) => handleSectionNavigation(event, 'explore-menu', 'menu')} className={menu === 'menu' ? "active" : ""}>Menu</Link>
                <Link to="/#app-download" onClick={(event) => handleSectionNavigation(event, 'app-download', 'mobile-app')} className={menu === 'mobile-app' ? "active" : ""}>Our app</Link>
                <Link to="/#footer" onClick={(event) => handleSectionNavigation(event, 'footer', 'contact us')} className={menu === 'contact us' ? "active" : ""}>Contact</Link>
                {token && (
                    <Link
                        to="/myorders"
                        onClick={() => { setMenu('my-orders'); setMobileMenuOpen(false) }}
                        className={location.pathname === '/myorders' ? "active" : ""}
                    >
                        My orders
                    </Link>
                )}
            </nav>

            <div className="navbar-actions">
                <Link className="navbar-cart" to="/cart" aria-label="Open your cart">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3.5 10h17l-1.7 9H5.2l-1.7-9Z" />
                        <path d="m7.5 10 3-5m6 5-3-5M8.2 13v3m3.8-3v3m3.8-3v3" />
                    </svg>
                    {getTotalCartAmount() > 0 && <span className="navbar-cart-dot" aria-label="Cart has items" />}
                </Link>

                {!token ? (
                    <button className="navbar-sign-in" type="button" onClick={() => setShowLogin(true)}>
                        Sign in
                    </button>
                ) : (
                    <div className={`navbar-profile ${profileMenuOpen ? 'is-open' : ''}`}>
                        <button
                            className="navbar-profile-trigger"
                            type="button"
                            aria-label="Open account menu"
                            aria-haspopup="true"
                            aria-expanded={profileMenuOpen}
                            onClick={() => setProfileMenuOpen((isOpen) => !isOpen)}
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="12" cy="8" r="3.25" />
                                <path d="M4.6 20c.5-3.3 3.5-5.5 7.4-5.5s6.9 2.2 7.4 5.5" />
                            </svg>
                        </button>
                        <ul className="nav-profile-dropdown">
                            <li>
                                <button type="button" onClick={logout}>
                                    <img src={assets.logout_icon} alt="" />
                                    <span>Log out</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                )}

                <button
                    className={`navbar-mobile-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
                    type="button"
                    aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={mobileMenuOpen}
                    aria-controls="navbar-navigation"
                    onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
                >
                    <span />
                    <span />
                </button>
            </div>

        </header>
    )
}

export default Navbar