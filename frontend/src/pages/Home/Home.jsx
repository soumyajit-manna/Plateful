import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {

    const [category, setCategory] = useState('All')
    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <section className="home-how" id="how-it-works" aria-labelledby="home-how-title">
                <div className="home-how-panel">
                    <div className="home-how-heading">
                        <div>
                            <p className="home-how-eyebrow">
                                <span aria-hidden="true">✦</span>
                                GOOD FOOD, THREE LITTLE STEPS
                            </p>
                            <h2 id="home-how-title">From craving to <span>comfort.</span></h2>
                            <p className="home-how-description">
                                A feel-good meal is never far away. Here’s how to make it happen.
                            </p>
                        </div>
                        <a className="home-how-link" href="#explore-menu">
                            Find your favorite
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>

                    <div className="home-how-carousel">
                        <ol className="home-how-steps" aria-label="How Plateful works" aria-live="off">
                            <li className="home-how-step">
                                <div className="home-how-step-marker">
                                    <span>01</span>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <circle cx="10.8" cy="10.8" r="6.8" />
                                        <path d="m16 16 4.2 4.2" />
                                    </svg>
                                </div>
                                <h3>Find your craving</h3>
                                <p>Explore the menu and choose what sounds good today.</p>
                            </li>
                            <li className="home-how-step">
                                <div className="home-how-step-marker">
                                    <span>02</span>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="m4 10 2 10h12l2-10H4Z" />
                                        <path d="M3 10h18M8 10l4-6 4 6" />
                                    </svg>
                                </div>
                                <h3>Make it yours</h3>
                                <p>Add your favorites to the cart and share your delivery details.</p>
                            </li>
                            <li className="home-how-step">
                                <div className="home-how-step-marker">
                                    <span>03</span>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <rect x="4" y="4.5" width="16" height="15" rx="2" />
                                        <path d="M8 9h8M8 13h5M8 16h3" />
                                    </svg>
                                </div>
                                <h3>Stay in the loop</h3>
                                <p>After checkout, find your latest order status in My Orders.</p>
                            </li>
                            <li className="home-how-step home-how-clone" aria-hidden="true">
                                <div className="home-how-step-marker">
                                    <span>01</span>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <circle cx="10.8" cy="10.8" r="6.8" />
                                        <path d="m16 16 4.2 4.2" />
                                    </svg>
                                </div>
                                <h3>Find your craving</h3>
                                <p>Explore the menu and choose what sounds good today.</p>
                            </li>
                            <li className="home-how-step home-how-clone" aria-hidden="true">
                                <div className="home-how-step-marker">
                                    <span>02</span>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="m4 10 2 10h12l2-10H4Z" />
                                        <path d="M3 10h18M8 10l4-6 4 6" />
                                    </svg>
                                </div>
                                <h3>Make it yours</h3>
                                <p>Add your favorites to the cart and share your delivery details.</p>
                            </li>
                            <li className="home-how-step home-how-clone" aria-hidden="true">
                                <div className="home-how-step-marker">
                                    <span>03</span>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <rect x="4" y="4.5" width="16" height="15" rx="2" />
                                        <path d="M8 9h8M8 13h5M8 16h3" />
                                    </svg>
                                </div>
                                <h3>Stay in the loop</h3>
                                <p>After checkout, find your latest order status in My Orders.</p>
                            </li>
                        </ol>
                    </div>
                </div>
            </section>

            <section className="home-promise" aria-labelledby="home-promise-title">
                <div className="home-promise-heading">
                    <p className="home-promise-eyebrow">THE PLATEFUL PROMISE</p>
                    <h2 id="home-promise-title">A little care goes <span>a long way.</span></h2>
                    <p>
                        From the first menu scroll to the final update, we keep the experience
                        thoughtful and easy to follow.
                    </p>
                </div>

                <div className="home-promise-carousel">
                    <ol className="home-promise-list" aria-label="The Plateful promises" aria-live="off">
                        <li>
                            <span className="home-promise-number">01</span>
                            <div>
                                <h3>A menu for every mood</h3>
                                <p>Comfort-food favorites and new discoveries, all in one place.</p>
                            </div>
                        </li>
                        <li>
                            <span className="home-promise-number">02</span>
                            <div>
                                <h3>A clear view at checkout</h3>
                                <p>Review your items, delivery charge, and total before you order.</p>
                            </div>
                        </li>
                        <li>
                            <span className="home-promise-number">03</span>
                            <div>
                                <h3>Your order, easy to revisit</h3>
                                <p>Find the latest order status whenever you need it in My Orders.</p>
                            </div>
                        </li>
                        <li className="home-promise-clone" aria-hidden="true">
                            <span className="home-promise-number">01</span>
                            <div>
                                <h3>A menu for every mood</h3>
                                <p>Comfort-food favorites and new discoveries, all in one place.</p>
                            </div>
                        </li>
                    </ol>
                </div>
            </section>
            <AppDownload />
        </div>
    )
}

export default Home