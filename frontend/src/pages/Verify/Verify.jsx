import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import './Verify.css'
import { StoreContext } from '../../context/StoreContext';

const verificationDuration = 5900

const Verify = () => {
    const { url } = useContext(StoreContext)
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const [step, setStep] = useState(0)
    const [hasError, setHasError] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        let isActive = true
        let stepTimer
        let durationTimer
        const startedAt = Date.now()

        const waitForMinimumDuration = () => new Promise((resolve) => {
            const remaining = Math.max(0, verificationDuration - (Date.now() - startedAt))
            if (remaining === 0) {
                resolve()
                return
            }
            durationTimer = window.setTimeout(resolve, remaining)
        })

        stepTimer = window.setInterval(() => {
            const elapsed = Date.now() - startedAt
            setStep(elapsed < 1900 ? 0 : elapsed < 3900 ? 1 : 2)
        }, 100)

        const verifyPayment = async () => {
            try {
                const response = await axios.post(url + "/api/order/verify", { success, orderId });
                await waitForMinimumDuration()
                if (!isActive) return

                if (response.data.success) {
                    navigate("/myorders");
                }
                else {
                    navigate("/")
                }
            } catch (verificationError) {
                console.error('Payment verification request failed:', verificationError)
                await waitForMinimumDuration()
                if (isActive) setHasError(true)
            }
        }

        verifyPayment()

        return () => {
            isActive = false
            window.clearInterval(stepTimer)
            window.clearTimeout(durationTimer)
        }
    }, [navigate, orderId, success, url])

    if (hasError) {
        return (
            <main className='verify' aria-live='polite'>
                <section className='verify-card verify-card--error'>
                    <div className='verify-emblem verify-emblem--error' aria-hidden='true'>!</div>
                    <p className='verify-eyebrow'>PAYMENT UPDATE</p>
                    <h1>We couldn&apos;t confirm just yet.</h1>
                    <p className='verify-copy'>
                        Your payment status is taking longer to reach us. Check your orders before trying again.
                    </p>
                    <Link className='verify-return' to='/myorders'>Check my orders <span aria-hidden='true'>↗</span></Link>
                </section>
            </main>
        )
    }

    const steps = ['Connecting securely', 'Confirming payment', 'Finalizing verification']

    return (
        <main className='verify' aria-live='polite' aria-busy='true'>
            <section className='verify-card'>
                <div className='verify-orbit' aria-hidden='true'>
                    <span className='verify-orbit-ring' />
                    <span className='verify-emblem'>
                        <svg viewBox='0 0 32 32' fill='none'>
                            <path d='M16 3.5 26 7v7.4c0 6.5-4.1 11.6-10 14.1-5.9-2.5-10-7.6-10-14.1V7l10-3.5Z' />
                            <path d='m11.5 15.8 3 3 6-6.2' />
                        </svg>
                    </span>
                </div>
                <p className='verify-eyebrow'>SECURE CHECKOUT</p>
                <h1>Making sure everything&apos;s just right.</h1>
                <p className='verify-copy'>
                    We&apos;re checking your payment and getting your order ready. Keep this page open for a moment.
                </p>

                <div className='verify-progress' aria-hidden='true'>
                    {steps.map((label, index) => (
                        <span className={index <= step ? 'is-active' : ''} key={label} />
                    ))}
                </div>
                <p className='verify-status' role='status'>
                    <span className='verify-status-dot' aria-hidden='true' />
                    {steps[step]}
                </p>

                <div className='verify-loading-track' aria-hidden='true'>
                    <span />
                </div>
                <p className='verify-note'>Your order is being verified securely.</p>
            </section>
        </main>
    )
}

export default Verify
