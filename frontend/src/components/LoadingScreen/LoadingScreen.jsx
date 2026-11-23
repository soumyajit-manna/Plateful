import './LoadingScreen.css'

const LoadingScreen = () => (
    <div className="plateful-loading-screen" role="status" aria-label="Loading Plateful">
        <div className="plateful-loading-content">
            <div className="plateful-loading-brand">
                <svg viewBox="0 0 32 32" aria-hidden="true">
                    <circle cx="16" cy="16" r="13" />
                    <circle cx="16" cy="16" r="9" />
                    <circle cx="16" cy="16" r="2" />
                </svg>
                <span>Plateful</span>
            </div>

            <div className="plateful-loading-plate" aria-hidden="true">
                <span className="plateful-loading-orbit" />
                <svg viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="17" />
                    <circle cx="24" cy="24" r="12" />
                    <path d="M18 26c2-5 7-8 12-8-1 5-4 9-9 10" />
                    <path d="M20 28c2-3 5-5 8-7" />
                </svg>
            </div>

            <p className="plateful-loading-eyebrow">GOOD FOOD, GOOD MOOD</p>
            <h1>
                A little comfort
                <span> is on its way.</span>
            </h1>
            <p className="plateful-loading-caption">Setting your table</p>
            <div className="plateful-loading-progress" aria-hidden="true">
                <span />
            </div>
        </div>
    </div>
)

export default LoadingScreen
