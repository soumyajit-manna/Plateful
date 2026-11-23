import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
    return (
        <section className="header">
            <div className="header-copy">
                <p className="header-eyebrow">
                    <span className="header-eyebrow-mark" aria-hidden="true">✦</span>
                    A LITTLE JOY, SERVED FRESH
                </p>
                <h1>
                    Your next
                    <span>great meal.</span>
                </h1>
                <p className="header-description">
                    Explore feel-good comfort food, flavorful favorites, and little treats
                    made for your kind of day.
                </p>
                <div className="header-actions">
                    <a className="header-primary-action" href="#explore-menu">
                        Explore the menu
                        <span className="header-action-arrow" aria-hidden="true">↗</span>
                    </a>
                    <a className="header-secondary-action" href="#app-download">
                        Discover our app
                    </a>
                </div>
                <div className="header-note">
                    <span className="header-note-icon" aria-hidden="true">♡</span>
                    <span>
                        <strong>Good food, good mood.</strong>
                        <small>Find something to love today</small>
                    </span>
                </div>
            </div>

            <div className="header-visual">
                <div className="header-image-frame">
                    <img
                        className="header-image"
                        src={assets.header_img}
                        alt="Bengali-style thali with rice, fish curry, vegetables, and traditional sides"
                        loading="eager"
                        fetchpriority="high"
                        decoding="async"
                    />
                    <div className="header-image-shade" aria-hidden="true" />
                    <div className="header-image-caption">
                        <span className="header-caption-dot" aria-hidden="true" />
                        <span>Make today delicious</span>
                    </div>
                </div>
                <div className="header-floating-note" aria-hidden="true">
                    <span>✦</span>
                    Your next favorite
                </div>
                <span className="header-orbit header-orbit-one" aria-hidden="true" />
                <span className="header-orbit header-orbit-two" aria-hidden="true" />
            </div>
        </section>
    )
}

export default Header
