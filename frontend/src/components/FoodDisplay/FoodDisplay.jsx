import { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list, foodListLoaded } = useContext(StoreContext);
    const visibleFood = food_list.filter((item) => category === 'All' || category === item.category);

    return (
        <section className='food-display' id='food-display' aria-labelledby='food-display-title'>
            <div className='food-display-heading'>
                <div className='food-display-intro'>
                    <p className='food-display-eyebrow'>
                        <span className='food-display-eyebrow-mark' aria-hidden='true' />
                        GOOD FOOD, GOOD MOOD
                    </p>
                    <h2 id='food-display-title'>
                        Top dishes <span>near you.</span>
                    </h2>
                    <p className='food-display-description'>
                        {category === 'All'
                            ? 'Comforting favorites, bright flavors, and something new to fall for.'
                            : `A few delicious ${category.toLowerCase()} picks, made for your next craving.`}
                    </p>
                </div>
                <div className='food-display-count' aria-live='polite'>
                    <strong>{visibleFood.length}</strong>
                    <span>{visibleFood.length === 1 ? 'dish to discover' : 'dishes to discover'}</span>
                </div>
            </div>

            <div className='food-display-list' aria-busy={!foodListLoaded}>
                {!foodListLoaded ? (
                    <div className='food-display-loading' role='status'>
                        <span className='food-display-loading-spinner' aria-hidden='true' />
                        <span>Getting your dishes ready...</span>
                    </div>
                ) : (
                    visibleFood.map((item, index) => (
                        <FoodItem
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            category={item.category}
                            imagePriority={index < 3}
                            style={{ animationDelay: `${Math.min(index * 35, 280)}ms` }}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default FoodDisplay;
