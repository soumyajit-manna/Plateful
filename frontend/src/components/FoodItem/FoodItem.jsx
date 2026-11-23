import { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image, category, imagePriority = false, style }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
    const quantity = cartItems[id] || 0;

    return (
        <article className='food-item' style={style}>
            <div className='food-item-img-container'>
                <img
                    className='food-item-image'
                    src={`${url}/images/${image}`}
                    alt=''
                    loading='eager'
                    fetchpriority={imagePriority ? 'high' : 'auto'}
                    decoding='async'
                />
                <span className='food-item-image-shade' aria-hidden='true' />
                <div className='food-item-image-meta'>
                    {category && <span className='food-item-category'>{category}</span>}
                    <span className='food-item-rating' role='img' aria-label='Customer rating stars'>
                        <svg className='food-item-rating-stars' viewBox='0 0 120 24' aria-hidden='true'>
                            <path d='M12 1.5 15.1 8.3 22.4 9.2 17.1 14.3 18.3 21.5 12 18.1 5.7 21.5 6.9 14.3 1.6 9.2 8.9 8.3Z' />
                            <path d='M12 1.5 15.1 8.3 22.4 9.2 17.1 14.3 18.3 21.5 12 18.1 5.7 21.5 6.9 14.3 1.6 9.2 8.9 8.3Z' transform='translate(24 0)' />
                            <path d='M12 1.5 15.1 8.3 22.4 9.2 17.1 14.3 18.3 21.5 12 18.1 5.7 21.5 6.9 14.3 1.6 9.2 8.9 8.3Z' transform='translate(48 0)' />
                            <path d='M12 1.5 15.1 8.3 22.4 9.2 17.1 14.3 18.3 21.5 12 18.1 5.7 21.5 6.9 14.3 1.6 9.2 8.9 8.3Z' transform='translate(72 0)' />
                            <path d='M12 1.5 15.1 8.3 22.4 9.2 17.1 14.3 18.3 21.5 12 18.1 5.7 21.5 6.9 14.3 1.6 9.2 8.9 8.3Z' transform='translate(96 0)' fill='none' stroke='currentColor' strokeWidth='2' />
                        </svg>
                    </span>
                </div>
            </div>

            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <h3>{name}</h3>
                </div>
                <p className='food-item-desc'>{description}</p>
                <div className='food-item-footer'>
                    <p className='food-item-price'><span>₹</span>{price}</p>
                    {quantity === 0 ? (
                        <button
                            className='food-item-add'
                            type='button'
                            aria-label={`Add ${name} to cart`}
                            onClick={() => addToCart(id)}
                        >
                            <span className='food-item-add-icon' aria-hidden='true'>
                                <svg viewBox='0 0 24 24'>
                                    <path d='M12 5v14M5 12h14' />
                                </svg>
                            </span>
                            <span>Add</span>
                        </button>
                    ) : (
                        <div className='food-item-counter' role='group' aria-label={`Quantity controls for ${name}`}>
                            <button
                                type='button'
                                aria-label={`Remove one ${name}`}
                                onClick={() => removeFromCart(id)}
                            >
                                <svg viewBox='0 0 20 20' aria-hidden='true'>
                                    <path d='M4 10h12' />
                                </svg>
                            </button>
                            <span aria-live='polite'>{quantity}</span>
                            <button
                                type='button'
                                aria-label={`Add one ${name}`}
                                onClick={() => addToCart(id)}
                            >
                                <svg viewBox='0 0 20 20' aria-hidden='true'>
                                    <path d='M10 4v12M4 10h12' />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default FoodItem;
