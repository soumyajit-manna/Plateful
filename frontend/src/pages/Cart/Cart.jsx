import './Cart.css'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Cart = () => {
    const {
        cartItems,
        food_list,
        addToCart,
        removeFromCart,
        currency,
        getTotalCartAmount,
        url,
    } = useContext(StoreContext)
    const navigate = useNavigate()
    const cartProducts = food_list.filter((item) => cartItems[item._id] > 0)
    const itemCount = cartProducts.reduce((count, item) => count + cartItems[item._id], 0)
    const subtotal = getTotalCartAmount()
    const deliveryFee = subtotal === 0 ? 0 : 20
    const total = subtotal + deliveryFee

    return (
        <main className='cart-page'>
            <header className='cart-page-heading'>
                <p className='cart-page-eyebrow'>
                    <span className='cart-page-eyebrow-mark' aria-hidden='true' />
                    YOUR PLATEFUL BASKET
                </p>
                <h1>
                    Good choices, <span>coming right up.</span>
                </h1>
                <p className='cart-page-intro'>
                    Everything you picked, gathered in one lovely place.
                </p>
            </header>

            {cartProducts.length > 0 ? (
                <div className='cart-layout'>
                    <section className='cart-items-panel' aria-labelledby='cart-items-title'>
                        <div className='cart-items-heading'>
                            <div>
                                <p className='cart-panel-eyebrow'>YOUR SELECTION</p>
                                <h2 id='cart-items-title'>In your basket</h2>
                            </div>
                            <span className='cart-item-count' aria-live='polite'>
                                {itemCount} {itemCount === 1 ? 'item' : 'items'}
                            </span>
                        </div>

                        <div className='cart-items-list'>
                            {cartProducts.map((item) => (
                                <article className='cart-item' key={item._id}>
                                    <img
                                        className='cart-item-image'
                                        src={`${url}/images/${item.image}`}
                                        alt=''
                                    />
                                    <div className='cart-item-info'>
                                        <span className='cart-item-category'>{item.category}</span>
                                        <h3>{item.name}</h3>
                                        <p className='cart-item-unit-price'>
                                            {currency}{item.price} <span>each</span>
                                        </p>
                                    </div>
                                    <div className='cart-item-actions'>
                                        <div className='cart-quantity' role='group' aria-label={`Quantity for ${item.name}`}>
                                            <button
                                                type='button'
                                                aria-label={`Remove one ${item.name}`}
                                                onClick={() => removeFromCart(item._id)}
                                            >
                                                <svg viewBox='0 0 20 20' aria-hidden='true'>
                                                    <path d='M4 10h12' />
                                                </svg>
                                            </button>
                                            <span aria-live='polite'>{cartItems[item._id]}</span>
                                            <button
                                                type='button'
                                                aria-label={`Add one ${item.name}`}
                                                onClick={() => addToCart(item._id)}
                                            >
                                                <svg viewBox='0 0 20 20' aria-hidden='true'>
                                                    <path d='M10 4v12M4 10h12' />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className='cart-item-total'>
                                            <span>Item total</span>
                                            <strong>{currency}{item.price * cartItems[item._id]}</strong>
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <Link className='cart-continue-link' to='/#explore-menu'>
                            <span aria-hidden='true'>←</span>
                            Keep exploring
                        </Link>
                    </section>

                    <aside className='cart-summary' aria-labelledby='cart-summary-title'>
                        <p className='cart-panel-eyebrow'>A LITTLE SOMETHING DELICIOUS</p>
                        <h2 id='cart-summary-title'>Order summary</h2>
                        <p className='cart-summary-intro'>
                            {itemCount} {itemCount === 1 ? 'item' : 'items'} selected for your next good meal.
                        </p>

                        <div className='cart-summary-lines'>
                            <div className='cart-summary-line'>
                                <span>Subtotal</span>
                                <strong>{currency}{subtotal}</strong>
                            </div>
                            <div className='cart-summary-line'>
                                <span>Delivery</span>
                                <strong>{currency}{deliveryFee}</strong>
                            </div>
                        </div>

                        <div className='cart-summary-total'>
                            <span>Total</span>
                            <strong>{currency}{total}</strong>
                        </div>

                        <div className='cart-promocode'>
                            <label htmlFor='cart-promo-code'>Have a promo code?</label>
                            <div className='cart-promocode-input'>
                                <input id='cart-promo-code' type='text' placeholder='Enter code' />
                                <button type='button'>Apply</button>
                            </div>
                        </div>

                        <button className='cart-checkout-button' type='button' onClick={() => navigate('/order')}>
                            Continue to checkout
                            <span aria-hidden='true'>↗</span>
                        </button>
                        <p className='cart-summary-footnote'>
                            Delivery details are confirmed at checkout.
                        </p>
                    </aside>
                </div>
            ) : (
                <section className='cart-empty' aria-labelledby='cart-empty-title'>
                    <div className='cart-empty-plate' aria-hidden='true'>
                        <span />
                        <span />
                    </div>
                    <p className='cart-panel-eyebrow'>A FRESH PAGE, A FRESH CRAVING</p>
                    <h2 id='cart-empty-title'>
                        Your basket is waiting for <span>something delicious.</span>
                    </h2>
                    <p className='cart-empty-copy'>
                        Choose something you’re craving and add it to your basket.
                    </p>
                    <Link className='cart-empty-link' to='/#explore-menu'>
                        Explore the menu
                        <span aria-hidden='true'>↗</span>
                    </Link>
                </section>
            )}
        </main>
    )
}

export default Cart
