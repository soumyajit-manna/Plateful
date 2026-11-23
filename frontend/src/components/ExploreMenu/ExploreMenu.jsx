import { useCallback, useEffect, useRef, useState } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
    const menuRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = useCallback(() => {
        const menu = menuRef.current;
        if (!menu) return;

        setCanScrollLeft(menu.scrollLeft > 2);
        setCanScrollRight(menu.scrollLeft + menu.clientWidth < menu.scrollWidth - 2);
    }, []);

    useEffect(() => {
        const menu = menuRef.current;
        if (!menu) return undefined;

        updateScrollState();
        menu.addEventListener('scroll', updateScrollState, { passive: true });
        window.addEventListener('resize', updateScrollState);

        return () => {
            menu.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [updateScrollState]);

    const scrollCategories = (direction) => {
        const menu = menuRef.current;
        if (!menu) return;

        menu.scrollBy({
            left: direction * Math.round(menu.clientWidth * 0.72),
            behavior: 'smooth',
        });
    };

    return (
        <section className='explore-menu' id='explore-menu' aria-labelledby='explore-menu-title'>
            <div className='explore-menu-heading'>
                <div className='explore-menu-intro'>
                    <p className='explore-menu-eyebrow'>
                        <span className='explore-menu-eyebrow-mark' aria-hidden='true'>
                            <svg viewBox='0 0 16 16'><path d='M8 1.5 9.7 6.3 14.5 8l-4.8 1.7L8 14.5l-1.7-4.8L1.5 8l4.8-1.7L8 1.5Z' /></svg>
                        </span>
                        A MENU MADE FOR YOU
                    </p>
                    <h2 id='explore-menu-title'>
                        Find what <span>you&apos;re craving.</span>
                    </h2>
                    <p className='explore-menu-text'>
                        From feel-good favorites to comfort-food classics, choose a category and find your next favorite.
                    </p>
                </div>

                <div className='explore-menu-tools'>
                    <span className='explore-menu-count'>{menu_list.length} delicious categories</span>
                    <div className='explore-menu-controls' aria-label='Scroll menu categories'>
                        <button
                            className='explore-menu-scroll-button'
                            type='button'
                            aria-label='Scroll categories left'
                            onClick={() => scrollCategories(-1)}
                            disabled={!canScrollLeft}
                        >
                            <svg viewBox='0 0 20 20' aria-hidden='true'>
                                <path d='M12.5 4.5 7 10l5.5 5.5' />
                            </svg>
                        </button>
                        <button
                            className='explore-menu-scroll-button'
                            type='button'
                            aria-label='Scroll categories right'
                            onClick={() => scrollCategories(1)}
                            disabled={!canScrollRight}
                        >
                            <svg viewBox='0 0 20 20' aria-hidden='true'>
                                <path d='m7.5 4.5 5.5 5.5-5.5 5.5' />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className='explore-menu-carousel'>
                <ul className='explore-menu-list' ref={menuRef} aria-label='Menu categories'>
                    <li className='explore-menu-item' style={{ animationDelay: '0ms' }}>
                        <button
                            className={`explore-menu-card explore-menu-all-card${category === 'All' ? ' is-selected' : ''}`}
                            type='button'
                            aria-pressed={category === 'All'}
                            onClick={() => setCategory('All')}
                        >
                            <span className='explore-menu-all-icon' aria-hidden='true'>
                                <svg viewBox='0 0 48 48'>
                                    <rect x='9' y='9' width='12' height='12' rx='4' />
                                    <rect x='27' y='9' width='12' height='12' rx='4' />
                                    <rect x='9' y='27' width='12' height='12' rx='4' />
                                    <rect x='27' y='27' width='12' height='12' rx='4' />
                                </svg>
                            </span>
                            <span className='explore-menu-card-name'>All dishes</span>
                            <span className='explore-menu-card-hint'>
                                {category === 'All' ? 'Selected' : 'View dishes'}
                            </span>
                            <span className='explore-menu-card-check' aria-hidden='true'>
                                <svg viewBox='0 0 16 16'><path d='m3.5 8 3 3 6-6' /></svg>
                            </span>
                        </button>
                    </li>
                    {menu_list.map((item, index) => {
                        const isSelected = category === item.menu_name;

                        return (
                            <li
                                className='explore-menu-item'
                                key={item.menu_name}
                                style={{ animationDelay: `${Math.min((index + 1) * 45, 450)}ms` }}
                            >
                                <button
                                    className={`explore-menu-card${isSelected ? ' is-selected' : ''}`}
                                    type='button'
                                    aria-label={`Show ${item.menu_name} dishes`}
                                    aria-pressed={isSelected}
                                    onClick={() => setCategory(isSelected ? 'All' : item.menu_name)}
                                >
                                    <span className='explore-menu-image-wrap'>
                                        <img src={item.menu_image} alt='' />
                                        <span className='explore-menu-card-check' aria-hidden='true'>
                                            <svg viewBox='0 0 16 16'><path d='m3.5 8 3 3 6-6' /></svg>
                                        </span>
                                    </span>
                                    <span className='explore-menu-card-name'>{item.menu_name}</span>
                                    <span className='explore-menu-card-hint'>
                                        {isSelected ? 'Selected' : 'View dishes'}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className='explore-menu-divider' aria-hidden='true' />
        </section>
    );
};

export default ExploreMenu;
