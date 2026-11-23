import { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import './MyOrders.css'

const orderStages = ['Preparing', 'On its way', 'Delivered']

const getOrderStage = (status = '') => {
    const normalizedStatus = status.toLowerCase()
    if (normalizedStatus.includes('delivered')) return 2
    if (normalizedStatus.includes('delivery')) return 1
    return 0
}

const formatOrderDate = (date) => {
    const parsedDate = new Date(date)
    if (Number.isNaN(parsedDate.getTime())) return null

    return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(parsedDate)
}

const MyOrders = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [hasError, setHasError] = useState(false)
    const { url, token, currency } = useContext(StoreContext);

    const fetchOrders = useCallback(async () => {
        if (!token) return

        setHasError(false)
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            if (!response.data?.success || !Array.isArray(response.data.data)) {
                throw new Error(response.data?.message || 'Could not load your orders.')
            }
            setData(response.data.data)
        } catch (error) {
            console.error('Could not fetch orders:', error)
            setHasError(true)
        } finally {
            setIsLoading(false)
            setIsRefreshing(false)
        }
    }, [token, url])

    useEffect(() => {
        if (token) {
            setIsLoading(true)
            fetchOrders()
        } else {
            setIsLoading(false)
        }
    }, [fetchOrders, token])

    const handleRefresh = () => {
        if (!isRefreshing) {
            setIsRefreshing(true)
            fetchOrders()
        }
    }

    const activeOrderCount = data.filter((order) => getOrderStage(order.status) < 2).length

    return (
        <main className='my-orders'>
            <header className='my-orders-heading'>
                <div>
                    <p className='my-orders-eyebrow'>
                        <span className='my-orders-eyebrow-mark' aria-hidden='true' />
                        YOUR PLATEFUL JOURNAL
                    </p>
                    <h1>
                        Good things are <span>on their way.</span>
                    </h1>
                    <p className='my-orders-intro'>
                        Follow every delicious order from our kitchen to your door.
                    </p>
                </div>
                {token && !isLoading && !hasError && data.length > 0 && (
                    <div className='my-orders-summary' aria-label={`${activeOrderCount} active orders`}>
                        <span className='my-orders-summary-mark' aria-hidden='true' />
                        <span>
                            <strong>{activeOrderCount}</strong>
                            {activeOrderCount === 1 ? ' order in progress' : ' orders in progress'}
                        </span>
                    </div>
                )}
            </header>

            {hasError && (
                <div className='my-orders-error' role='alert'>
                    <p>We couldn&apos;t refresh your orders just now. Please try again.</p>
                    <button type='button' onClick={handleRefresh} disabled={isRefreshing}>
                        {isRefreshing ? 'Trying again…' : 'Try again'}
                    </button>
                </div>
            )}

            {isLoading ? (
                <div className='my-orders-loading' role='status' aria-label='Loading your orders'>
                    {[0, 1].map((item) => (
                        <div className='my-orders-skeleton' key={item}>
                            <span />
                            <div>
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    ))}
                </div>
            ) : !token ? (
                <section className='my-orders-empty' aria-labelledby='my-orders-empty-title'>
                    <div className='my-orders-empty-mark' aria-hidden='true'>P</div>
                    <p className='my-orders-empty-eyebrow'>YOUR NEXT GOOD MEAL</p>
                    <h2 id='my-orders-empty-title'>Sign in to find your orders.</h2>
                    <p>Your orders will be waiting here once you sign in from the menu above.</p>
                    <Link to='/#explore-menu' className='my-orders-empty-link'>
                        Explore the menu <span aria-hidden='true'>↗</span>
                    </Link>
                </section>
            ) : !hasError && data.length === 0 ? (
                <section className='my-orders-empty' aria-labelledby='my-orders-empty-title'>
                    <div className='my-orders-empty-mark' aria-hidden='true'>P</div>
                    <p className='my-orders-empty-eyebrow'>A FRESH PAGE, A FRESH CRAVING</p>
                    <h2 id='my-orders-empty-title'>Nothing on your table just yet.</h2>
                    <p>Your next favorite is only a few clicks away. Let&apos;s find it.</p>
                    <Link to='/#explore-menu' className='my-orders-empty-link'>
                        Explore the menu <span aria-hidden='true'>↗</span>
                    </Link>
                </section>
            ) : (
                <section className='my-orders-list' aria-label='Your order history'>
                    {data.map((order, index) => {
                        const orderItems = Array.isArray(order.items) ? order.items : []
                        const stage = getOrderStage(order.status)
                        const quantity = orderItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0)
                        const dateLabel = formatOrderDate(order.date)
                        const reference = order._id ? order._id.slice(-6).toUpperCase() : `#${index + 1}`

                        return (
                            <article
                                className='my-order-card'
                                key={order._id || `${order.date}-${index}`}
                                style={{ '--order-index': index }}
                            >
                                <header className='my-order-card-heading'>
                                    <div className='my-order-reference'>
                                        <span>ORDER</span>
                                        <strong>#{reference}</strong>
                                        <i aria-hidden='true'>·</i>
                                        <time>{dateLabel || 'Placed recently'}</time>
                                    </div>
                                    <span className={`my-order-status my-order-status--${stage}`}>
                                        <span aria-hidden='true' />
                                        {order.status || 'Food Processing'}
                                    </span>
                                </header>

                                <div className='my-order-card-body'>
                                    <div className='my-order-items'>
                                        <div className='my-order-photos' aria-hidden='true'>
                                            {orderItems.slice(0, 3).map((item, itemIndex) => (
                                                item.image ? (
                                                    <img
                                                        key={`${item._id || item.name}-${itemIndex}`}
                                                        src={`${url}/images/${item.image}`}
                                                        alt=''
                                                        loading='lazy'
                                                    />
                                                ) : (
                                                    <span
                                                        className='my-order-photo-fallback'
                                                        key={`${item.name}-${itemIndex}`}
                                                    >
                                                        {item.name?.charAt(0) || 'P'}
                                                    </span>
                                                )
                                            ))}
                                            {orderItems.length > 3 && (
                                                <span className='my-order-photo-more'>+{orderItems.length - 3}</span>
                                            )}
                                        </div>
                                        <div className='my-order-items-copy'>
                                            <span className='my-order-detail-label'>IN THIS ORDER</span>
                                            <p>
                                                {orderItems.slice(0, 2).map((item, itemIndex) => (
                                                    <span key={`${item._id || item.name}-${itemIndex}`}>
                                                        {item.name} <i>× {item.quantity}</i>
                                                    </span>
                                                ))}
                                                {orderItems.length > 2 && (
                                                    <span className='my-order-more-items'>
                                                        + {orderItems.length - 2} more delicious {orderItems.length === 3 ? 'pick' : 'picks'}
                                                    </span>
                                                )}
                                                {orderItems.length === 0 && <span>Order details unavailable</span>}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='my-order-total'>
                                        <span className='my-order-detail-label'>ORDER TOTAL</span>
                                        <strong>{currency}{Number(order.amount || 0).toLocaleString('en-IN')}</strong>
                                        <span>{quantity} {quantity === 1 ? 'item' : 'items'}</span>
                                    </div>
                                </div>

                                <ol className='my-order-progress' aria-label={`Order progress: ${order.status || 'Food Processing'}`}>
                                    {orderStages.map((label, stageIndex) => (
                                        <li
                                            className={[
                                                'my-order-progress-step',
                                                stageIndex <= stage ? 'is-complete' : '',
                                                stageIndex === stage ? 'is-current' : '',
                                            ].filter(Boolean).join(' ')}
                                            key={label}
                                            aria-current={stageIndex === stage ? 'step' : undefined}
                                        >
                                            <span className='my-order-progress-marker' aria-hidden='true'>
                                                {stageIndex <= stage ? '✓' : stageIndex + 1}
                                            </span>
                                            <span className='my-order-progress-label'>{label}</span>
                                        </li>
                                    ))}
                                </ol>

                                <footer className='my-order-card-footer'>
                                    <p>
                                        <span className='my-order-live-dot' aria-hidden='true' />
                                        Status updates from our kitchen
                                    </p>
                                    <button
                                        type='button'
                                        onClick={handleRefresh}
                                        disabled={isRefreshing}
                                        aria-label={`Refresh status for order ${reference}`}
                                    >
                                        <svg className={isRefreshing ? 'is-spinning' : ''} viewBox='0 0 20 20' aria-hidden='true'>
                                            <path d='M16.5 9.2A6.6 6.6 0 0 0 5 5.4L3.5 7M3.5 7V3.8M3.5 7h3.2M3.5 10.8A6.6 6.6 0 0 0 15 14.6l1.5-1.6m0 0v3.2m0-3.2h-3.2' />
                                        </svg>
                                        {isRefreshing ? 'Checking…' : 'Check for updates'}
                                    </button>
                                </footer>
                            </article>
                        )
                    })}
                </section>
            )}
        </main>
    )
}

export default MyOrders
