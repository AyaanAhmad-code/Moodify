import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth"; // Ensure this path matches your project structure
import "./HomeLanding.scss";

export default function HomeLanding() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Destructure the user state and logout function from your auth hook
  const { user, handleLogout } = useAuth();

  const handleGetStarted = () => {
    // If the user is already logged in, send them straight to the app
    if (user) {
      navigate("/app");
    } else {
      navigate("/register");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const onLogoutClick = async () => {
    try {
      await handleLogout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of fixed nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav__container">
          {/* Logo wrapped in a Link to always return to the landing page */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="nav__logo">
              <span className="nav__logo-text">Moodify</span>
              <div className="nav__logo-accent"></div>
            </div>
          </Link>

          <div className="nav__links">
            <button
              className="nav__link"
              onClick={() => scrollToSection("features")}
            >
              Features
            </button>
            <button
              className="nav__link"
              onClick={() => scrollToSection("how-it-works")}
            >
              How it Works
            </button>
            <button
              className="nav__link"
              onClick={() => scrollToSection("demo")}
            >
              Demo
            </button>

            {/* Conditional Rendering based on Authentication Status */}
            {user ? (
              <>
                <button
                  className="nav__button nav__button--secondary"
                  onClick={onLogoutClick}
                >
                  Logout
                </button>
                <button
                  className="nav__button nav__button--primary"
                  onClick={() => navigate("/app")}
                >
                  Go to Player
                </button>
              </>
            ) : (
              <>
                <button
                  className="nav__button nav__button--secondary"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
                <button
                  className="nav__button nav__button--primary"
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Modern Hero Section */}
      <section className="hero">
        {/* Ambient Background Glows */}
        <div className="hero__glow hero__glow--primary"></div>
        <div className="hero__glow hero__glow--secondary"></div>

        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__badge">
              <span className="hero__badge-dot"></span>
              <span className="hero__badge-text">
                AI-Powered Music Experience
              </span>
            </div>

            <h1 className="hero__title">
              Your Face,
              <br />
              <span className="hero__title-accent">Your Mood,</span>
              <br />
              Your Perfect Song
            </h1>

            <p className="hero__description">
              Experience the future of music discovery. Our real-time AI
              analyzes your facial expressions to curate the ultimate soundtrack
              for exactly how you feel.
            </p>

            <div className="hero__actions">
              <button className="btn btn--primary" onClick={handleGetStarted}>
                {user ? "Launch Dashboard" : "Try Mood Detection"}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                className="btn btn--glass"
                onClick={() => scrollToSection("demo")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10,8 16,12 10,16 10,8" />
                </svg>
                Watch Demo
              </button>
            </div>
          </div>

          <div className="hero__visual">
            {/* Modern Glass Phone Mockup */}
            <div className="mockup-wrapper">
              <div className="glass-phone">
                <div className="glass-phone__notch"></div>
                <div className="glass-phone__screen">
                  <div className="detection-ui">
                    <div className="detection-ui__scanner"></div>
                    <div className="detection-ui__face">
                      <span className="emoji">😊</span>
                      <div className="status-badge">
                        <span className="status-dot"></span>
                        Happy Detected
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements behind phone */}
              <div className="floating-card floating-card--top">
                🎵 Upbeat Mix
              </div>
              <div className="floating-card floating-card--bottom">
                Analyzing...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features__container">
          <div className="features__header">
            <h2 className="features__title">Revolutionary Features</h2>
            <p className="features__subtitle">
              Cutting-edge technology meets intuitive design for the ultimate
              music experience
            </p>
          </div>
          <div className="features__grid">
            <div className="feature-card feature-card--primary">
              <div className="feature-card__icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <h3 className="feature-card__title">Real-Time Detection</h3>
              <p className="feature-card__description">
                Advanced computer vision algorithms analyze your facial
                expressions in real-time, detecting subtle emotional changes
                with industry-leading accuracy.
              </p>
              <div className="feature-card__metrics">
                <span className="metric">99.5% accuracy</span>
                <span className="metric">50+ emotions</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="feature-card__title">Smart Music Matching</h3>
              <p className="feature-card__description">
                Our AI-powered recommendation engine matches your detected mood
                with songs from our curated library, ensuring perfect emotional
                resonance.
              </p>
              <div className="feature-card__metrics">
                <span className="metric">10K+ songs</span>
                <span className="metric">AI-curated</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h3 className="feature-card__title">Privacy First</h3>
              <p className="feature-card__description">
                All processing happens locally in your browser. Your facial data
                never leaves your device, ensuring complete privacy and
                security.
              </p>
              <div className="feature-card__metrics">
                <span className="metric">Local processing</span>
                <span className="metric">Zero data collection</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="feature-card__title">Community Driven</h3>
              <p className="feature-card__description">
                Upload and tag your favorite songs by mood. Help build the most
                comprehensive mood-based music library in the world.
              </p>
              <div className="feature-card__metrics">
                <span className="metric">User uploads</span>
                <span className="metric">Community curated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="how-it-works__container">
          <div className="how-it-works__header">
            <h2 className="how-it-works__title">How It Works</h2>
            <p className="how-it-works__subtitle">
              Three simple steps to your perfect mood-matched soundtrack
            </p>
          </div>
          <div className="how-it-works__steps">
            <div className="step">
              <div className="step__number">01</div>
              <div className="step__content">
                <h3 className="step__title">Grant Camera Access</h3>
                <p className="step__description">
                  Allow your browser to access the camera. This enables
                  real-time facial analysis while keeping all processing local
                  to your device.
                </p>
              </div>
              <div className="step__visual">
                <div className="step__icon">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6M12 17v6M1 12h6M17 12h6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step__number">02</div>
              <div className="step__content">
                <h3 className="step__title">AI Detects Your Mood</h3>
                <p className="step__description">
                  Our advanced MediaPipe-powered facial landmark detection
                  analyzes your expressions and maps them to emotional states
                  with high precision.
                </p>
              </div>
              <div className="step__visual">
                <div className="step__icon">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step__number">03</div>
              <div className="step__content">
                <h3 className="step__title">Enjoy Curated Music</h3>
                <p className="step__description">
                  Instantly receive song recommendations that perfectly match
                  your detected mood. Stream, skip, and discover new favorites
                  effortlessly.
                </p>
              </div>
              <div className="step__visual">
                <div className="step__icon">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo" id="demo">
    <div className="demo__container">
        <div className="demo__content">
            <h2 className="demo__title">See It In Action</h2>
            <p className="demo__description">
                Watch how Moodify transforms facial expressions into personalized music experiences
            </p>
            
            <div className="demo__video-container">
                <video 
                    ref={videoRef}
                    className="demo__video-element"
                    poster="/demo_thumbnail.png" // Add a nice thumbnail image here
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    playsInline
                >
                    <source src="/Demo_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Custom Play Overlay - disappears when playing */}
                {!isPlaying && (
                    <div className="demo__video-overlay" onClick={handlePlayVideo}>
                        <div className="video-placeholder__icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                        <p>Click to Watch Demo</p>
                    </div>
                )}
                
                {/* Optional: Show mini-controls or a play/pause toggle when hovering */}
                {isPlaying && (
                    <button className="demo__video-pause-btn" onClick={handlePlayVideo}>
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                         </svg>
                    </button>
                )}
            </div>
        </div>
    </div>
</section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta__container">
          <div className="cta__content">
            <h2 className="cta__title">
              Ready to Experience the Future of Music?
            </h2>
            <p className="cta__description">
              Join thousands of users who have discovered their perfect
              mood-matched soundtracks
            </p>
            <div className="cta__actions">
              <button
                className="cta__button cta__button--primary"
                onClick={handleGetStarted}
              >
                {user ? "Go to Application" : "Start Your Musical Journey"}
              </button>

              {/* Hide Sign In button here if the user is already logged in */}
              {!user && (
                <button
                  className="cta__button cta__button--secondary"
                  onClick={handleLogin}
                >
                  Sign In to Account
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__content">
            <div className="footer__brand">
              <span className="footer__logo">Moodify</span>
              <p className="footer__tagline">
                Where AI meets emotion through music
              </p>
            </div>
            <div className="footer__links">
              <div className="footer__link-group">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#demo">Demo</a>
                <a href="#pricing">Pricing</a>
              </div>
              <div className="footer__link-group">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#blog">Blog</a>
                <a href="#careers">Careers</a>
              </div>
              <div className="footer__link-group">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#contact">Contact</a>
                <a href="#privacy">Privacy</a>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p>
              &copy; 2024 Moodify. All rights reserved. Built with ❤️ using
              React.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
