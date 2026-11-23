import { useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext)
    const [currState, setCurrState] = useState('Login')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const isSignUp = currState === 'Sign Up'

    useEffect(() => {
        const previousOverflow = document.body.style.overflow
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setShowLogin(false)
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', closeOnEscape)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', closeOnEscape)
        }
    }, [setShowLogin])

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(currentData => ({ ...currentData, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        if (isSubmitting) return

        const endpoint = isSignUp ? '/api/user/register' : '/api/user/login'
        setIsSubmitting(true)

        try {
            const response = await axios.post(url + endpoint, data)

            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                setShowLogin(false)
                if (isSignUp) {
                    toast.success("Welcome to the Plateful family! Let's make every bite amazing.❤️");
                } else {
                    toast.success("Welcome back, foodie! Your cravings are just a click away!");
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'We could not complete your request. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div
            className='login-popup'
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) setShowLogin(false)
            }}
        >
            <section
                className={`login-popup-container ${isSignUp ? 'is-sign-up' : ''}`}
                role='dialog'
                aria-modal='true'
                aria-labelledby='login-popup-heading'
            >
                <aside className='login-popup-story' aria-label='About Plateful'>
                    <img src={assets.auth_editorial} alt='' />
                    <div className='login-popup-story-shade' />
                    <div className='login-popup-brand'>
                        <span className='login-popup-brand-mark' aria-hidden='true'>P</span>
                        <span>Plate<i>ful</i></span>
                    </div>
                    <div className='login-popup-story-copy'>
                        <p>GOOD FOOD, GOOD MOOD</p>
                        <h2>{isSignUp ? 'There’s always room at the table.' : 'Your next favorite is waiting.'}</h2>
                        <span>Freshly made moments, delivered with care.</span>
                    </div>
                    <span className='login-popup-image-note'>A LITTLE JOY, SERVED FRESH</span>
                </aside>

                <form onSubmit={onLogin} className='login-popup-form' aria-busy={isSubmitting}>
                    <button
                        className='login-popup-close'
                        type='button'
                        onClick={() => setShowLogin(false)}
                        aria-label='Close sign in'
                    >
                        <svg viewBox='0 0 20 20' aria-hidden='true'>
                            <path d='m5 5 10 10M15 5 5 15' />
                        </svg>
                    </button>

                    <div className='login-popup-heading'>
                        <p className='login-popup-eyebrow'>
                            <span aria-hidden='true' />
                            {isSignUp ? 'YOUR SEAT IS READY' : 'WELCOME BACK'}
                        </p>
                        <h1 id='login-popup-heading'>
                            {isSignUp ? 'Join the table.' : 'Come on in.'}
                        </h1>
                        <p>
                            {isSignUp
                                ? 'Create your account and keep all your favorites close.'
                                : 'Sign in for the good stuff, right when you want it.'}
                        </p>
                    </div>

                    <div className='login-popup-inputs'>
                        {isSignUp && (
                            <label className='login-popup-field'>
                                <span>Your name</span>
                                <input
                                    name='name'
                                    onChange={onChangeHandler}
                                    value={data.name}
                                    type='text'
                                    placeholder='e.g. Alex Morgan'
                                    autoComplete='name'
                                    required
                                />
                            </label>
                        )}
                        <label className='login-popup-field'>
                            <span>Email address</span>
                            <input
                                name='email'
                                onChange={onChangeHandler}
                                value={data.email}
                                type='email'
                                placeholder='you@example.com'
                                autoComplete='email'
                                required
                            />
                        </label>
                        <label className='login-popup-field'>
                            <span>Password</span>
                            <input
                                name='password'
                                onChange={onChangeHandler}
                                value={data.password}
                                type='password'
                                placeholder='Enter your password'
                                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                                required
                            />
                        </label>
                    </div>

                    <label className='login-popup-condition'>
                        <input type='checkbox' required />
                        <span>
                            By continuing, I agree to the <strong>Terms of Use</strong> and <strong>Privacy Policy</strong>.
                        </span>
                    </label>

                    <button className='login-popup-submit' type='submit' disabled={isSubmitting}>
                        <span>
                            {isSubmitting
                                ? (isSignUp ? 'Creating your account…' : 'Signing you in…')
                                : (isSignUp ? 'Create account' : 'Sign in')}
                        </span>
                        {!isSubmitting && <span className='login-popup-submit-arrow' aria-hidden='true'>↗</span>}
                    </button>

                    <p className='login-popup-switch'>
                        {isSignUp ? 'Already part of the table?' : 'New to Plateful?'}
                        <button
                            type='button'
                            onClick={() => setCurrState(isSignUp ? 'Login' : 'Sign Up')}
                        >
                            {isSignUp ? 'Sign in' : 'Create an account'}
                        </button>
                    </p>
                </form>
            </section>
        </div>
    )
}

export default LoginPopup
