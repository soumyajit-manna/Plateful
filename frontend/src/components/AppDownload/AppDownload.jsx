import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    return (
        <section className='app-download' id='app-download' aria-labelledby='app-download-title'>
            <div className='app-download-copy'>
                <p className='app-download-eyebrow'>
                    <span className='app-download-eyebrow-mark' aria-hidden='true'>✦</span>
                    THE PLATEFUL APP
                </p>
                <h2 id='app-download-title'>
                    Good food, <span>wherever life takes you.</span>
                </h2>
                <p className='app-download-description'>
                    Explore the menu, find your next favorite, and bring a little Plateful joy to your day.
                </p>

                <div className='app-download-platforms'>
                    <a
                        href='https://median.co/share/rnkdqq#apk'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='Get Plateful on Google Play'
                    >
                        <img src={assets.play_store} alt='Get it on Google Play' />
                    </a>
                    <a
                        href='https://median.co/share/rnkdqq#apk'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='Download Plateful on the App Store'
                    >
                        <img src={assets.app_store} alt='Download on the App Store' />
                    </a>
                </div>
            </div>

            <div className='app-download-visual' aria-hidden='true'>
                <span className='app-download-orbit app-download-orbit-one' />
                <span className='app-download-orbit app-download-orbit-two' />
                <div className='app-download-phone'>
                    <div className='app-download-phone-screen'>
                        <div className='app-download-phone-topbar'>
                            <span className='app-download-phone-brand'>
                                <span className='app-download-phone-brand-mark' />
                                Plate<span>ful</span>
                            </span>
                            <span className='app-download-phone-menu'>•••</span>
                        </div>
                        <p className='app-download-phone-eyebrow'>MADE FOR YOUR MOMENT</p>
                        <h3>Find your <span>next favorite.</span></h3>
                        <div className='app-download-phone-photo'>
                            <img src={assets.header_img} alt='' />
                            <span>Good food, good mood.</span>
                        </div>
                        <div className='app-download-phone-bottom'>
                            <span className='app-download-phone-dot' />
                            <span>Something delicious is close</span>
                            <span className='app-download-phone-arrow'>↗</span>
                        </div>
                    </div>
                </div>
                <div className='app-download-note'>
                    <span aria-hidden='true'>✦</span>
                    A little joy, one tap away
                </div>
            </div>
        </section>
    )
}

export default AppDownload
