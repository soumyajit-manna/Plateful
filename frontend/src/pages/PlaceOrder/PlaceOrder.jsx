import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { toast } from 'react-toastify';
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = () => {

    const { getTotalCartAmount, currency, token, food_list, cartItems, url, isInitialDataLoaded } = useContext(StoreContext)

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }


    const placeOrder = async (e) => {
        e.preventDefault()
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 20
        }
        let response = await axios.post(url + '/api/order/place', orderData, { headers: { token } })

        if (response.data.success) {
            const { session_url } = response.data
            window.location.replace(session_url)
        }
        else {
            toast.error("Something Went Wrong")
        }
    }
    const navigate = useNavigate()
    const subtotal = getTotalCartAmount()

    useEffect(() => {
        if (!isInitialDataLoaded) return

        if (!token) {
            toast.error("To place an order sign in first")
            navigate('/cart')
        } else if (subtotal === 0) {
            navigate('/cart')
        }
    }, [isInitialDataLoaded, token, subtotal, navigate])

    const deliveryFee = subtotal === 0 ? 0 : 20
    const total = subtotal + deliveryFee
    const itemCount = food_list.reduce((count, item) => count + (cartItems[item._id] || 0), 0)

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <header className='place-order-heading'>
                <p className='place-order-eyebrow'>
                    <span className='place-order-eyebrow-mark' aria-hidden='true' />
                    ONE LAST STEP
                </p>
                <h1>
                    Let&apos;s get it <span>to your table.</span>
                </h1>
                <p>Share where to deliver your Plateful favorites.</p>
            </header>

            <div className='place-order-layout'>
                <section className='place-order-left' aria-labelledby='delivery-title'>
                    <div className='place-order-section-heading'>
                        <span className='place-order-step-number'>01</span>
                        <div>
                            <p className='place-order-section-eyebrow'>DELIVERY DETAILS</p>
                            <h2 id='delivery-title'>Where should we bring it?</h2>
                        </div>
                    </div>
                    <p className='place-order-section-intro'>
                        Add your details and we&apos;ll take it from here.
                    </p>

                    <div className='place-order-fields'>
                        <div className='place-order-field-row'>
                            <div className='place-order-field'>
                                <label htmlFor='firstName'>First name</label>
                                <input
                                    required
                                    id='firstName'
                                    name='firstName'
                                    onChange={onChangeHandler}
                                    value={data.firstName}
                                    type='text'
                                    autoComplete='given-name'
                                    placeholder='e.g. Alex'
                                />
                            </div>
                            <div className='place-order-field'>
                                <label htmlFor='lastName'>Last name <span>OPTIONAL</span></label>
                                <input
                                    id='lastName'
                                    name='lastName'
                                    onChange={onChangeHandler}
                                    value={data.lastName}
                                    type='text'
                                    autoComplete='family-name'
                                    placeholder='e.g. Morgan'
                                />
                            </div>
                        </div>

                        <div className='place-order-field'>
                            <label htmlFor='email'>Email address</label>
                            <input
                                required
                                id='email'
                                name='email'
                                onChange={onChangeHandler}
                                value={data.email}
                                type='text'
                                autoComplete='email'
                                placeholder='you@example.com'
                            />
                        </div>

                        <div className='place-order-field'>
                            <label htmlFor='street'>Street address</label>
                            <input
                                required
                                id='street'
                                name='street'
                                onChange={onChangeHandler}
                                value={data.street}
                                type='text'
                                autoComplete='street-address'
                                placeholder='House number and street'
                            />
                        </div>

                        <div className='place-order-field-row'>
                            <div className='place-order-field'>
                                <label htmlFor='city'>City</label>
                                <input
                                    required
                                    id='city'
                                    name='city'
                                    onChange={onChangeHandler}
                                    value={data.city}
                                    type='text'
                                    autoComplete='address-level2'
                                    placeholder='Your city'
                                />
                            </div>
                            <div className='place-order-field'>
                                <label htmlFor='state'>State</label>
                                <input
                                    required
                                    id='state'
                                    name='state'
                                    onChange={onChangeHandler}
                                    value={data.state}
                                    type='text'
                                    autoComplete='address-level1'
                                    placeholder='Your state'
                                />
                            </div>
                        </div>

                        <div className='place-order-field-row'>
                            <div className='place-order-field'>
                                <label htmlFor='zipcode'>Zip code</label>
                                <input
                                    required
                                    id='zipcode'
                                    name='zipcode'
                                    onChange={onChangeHandler}
                                    value={data.zipcode}
                                    type='text'
                                    autoComplete='postal-code'
                                    placeholder='Postal code'
                                />
                            </div>
                            <div className='place-order-field'>
                                <label htmlFor='country'>Country</label>
                                <input
                                    required
                                    id='country'
                                    name='country'
                                    onChange={onChangeHandler}
                                    value={data.country}
                                    type='text'
                                    autoComplete='country-name'
                                    placeholder='Your country'
                                />
                            </div>
                        </div>

                        <div className='place-order-field'>
                            <label htmlFor='phone'>Phone number</label>
                            <input
                                required
                                id='phone'
                                name='phone'
                                onChange={onChangeHandler}
                                value={data.phone}
                                type='text'
                                autoComplete='tel'
                                placeholder='Your contact number'
                            />
                        </div>
                    </div>
                </section>

                <aside className='place-order-right' aria-labelledby='order-summary-title'>
                    <div className='place-order-progress' role='group' aria-label='Checkout progress'>
                        <span className='is-current'><b>01</b> Delivery</span>
                        <span className='place-order-progress-line' aria-hidden='true' />
                        <span><b>02</b> Payment</span>
                    </div>

                    <p className='place-order-summary-eyebrow'>A LITTLE SOMETHING DELICIOUS</p>
                    <h2 id='order-summary-title'>Order summary</h2>
                    <p className='place-order-summary-intro'>
                        {itemCount} {itemCount === 1 ? 'item is' : 'items are'} almost on the way.
                    </p>

                    <div className='place-order-summary-lines'>
                        <div className='place-order-summary-line'>
                            <span>Subtotal</span>
                            <strong>{currency}{subtotal}</strong>
                        </div>
                        <div className='place-order-summary-line'>
                            <span>Delivery</span>
                            <strong>{currency}{deliveryFee}</strong>
                        </div>
                    </div>

                    <div className='place-order-summary-total'>
                        <span>Total</span>
                        <strong>{currency}{total}</strong>
                    </div>

                    <button className='place-order-submit' type='submit'>
                        Continue to payment
                        <span aria-hidden='true'>↗</span>
                    </button>
                    <p className='place-order-secure-note'>
                        Your order details are ready. Payment follows in the next step.
                    </p>
                </aside>
            </div>
        </form>
    )
}

export default PlaceOrder