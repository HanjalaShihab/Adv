import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import profilePhoto from "../../assets/manik.jpeg";
import "./Home.css";
import { buildApiUrl } from "../../api.js";
import {
  caseHighlights,
  credentials,
  heroStats,
  practiceAreas,
  profile,
  timeline,
  values,
} from "../../data/portfolioData.js";

function Home() {
  const [cases, setCases] = useState(caseHighlights);
  const [activeSection, setActiveSection] = useState("hero");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sectionRefs = useRef({});
  const parallaxRef = useRef(null);

  // Track mouse for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection Observer for section activation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Load cases from API
  useEffect(() => {
    let isMounted = true;
    let abortController = new AbortController();

    const loadCases = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(buildApiUrl("/api/cases"), {
          signal: abortController.signal,
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (isMounted && Array.isArray(data) && data.length > 0) {
          setCases(data);
        }
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Error loading cases:", error);
        setError("Failed to load cases");
        setCases(caseHighlights);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadCases();
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return (
    <div className="home" ref={parallaxRef}>
      {/* Navigation Dots */}
      <div className="nav-dots">
        {["hero", "profile", "practice", "cases", "contact"].map((section) => (
          <button
            key={section}
            className={`nav-dot ${activeSection === section ? "active" : ""}`}
            onClick={() => {
              sectionRefs.current[section]?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            aria-label={`Scroll to ${section}`}
          />
        ))}
      </div>

      {/* Hero Section - Minimal & Bold */}
      <section
        id="hero"
        className="hero-section"
        ref={(el) => (sectionRefs.current.hero = el)}
      >
        <div className="hero-backdrop">
          <div
            className="gradient-sphere"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          />
          <div
            className="gradient-sphere secondary"
            style={{
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            }}
          />
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-tag">⚖️ ADVOCATE</span>
            <h1 className="hero-title hero-title-inline">
              <span className="title-line">Adv. Gazi Nazrul Islam</span>
              <span className="title-line gradient">{profile.nickname}</span>
            </h1>
            <p className="hero-description">
              কৌশলগত মামলা পরিচালনা, নির্ভুল ডকুমেন্টেশন ও স্পষ্ট পরামর্শ।
              প্রতিটি ধাপে পেশাদার নির্দেশনা।
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="primary-btn">
                <span>পরামর্শ নিন</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4.16666 10H15.8333M15.8333 10L11.6667 5.83333M15.8333 10L11.6667 14.1667"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link to="/projects" className="secondary-btn">
                মামলা দেখুন
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="profile-ring">
              <div className="ring"></div>
              <div className="ring delayed"></div>
              <img
                src={profilePhoto}
                alt={profile.name}
                className="profile-image"
              />
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Stats Strip - Minimal */}
      <div className="stats-strip">
        {heroStats.map((stat, index) => (
          <div key={stat.label} className="stat-item">
            <span className="stat-number">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Profile Section - Editorial Style */}
      <section
        id="profile"
        className="profile-section"
        ref={(el) => (sectionRefs.current.profile = el)}
      >
        <div className="profile-grid">
          <div className="profile-info">
            <span className="home-section-tag">● ABOUT</span>
            <h2 className="home-section-title">
              বিশ্বাসযোগ্য
              <br />
              <span className="gradient">আইনি পরামর্শ</span>
            </h2>

            <blockquote className="profile-quote">
              “প্রতিটি কেসে কৌশলগত চিন্তা, নির্ভুল নথিপত্র ও স্পষ্ট যোগাযোগের
              মাধ্যমে দৃঢ় প্রতিনিধিত্ব নিশ্চিত করি।”
            </blockquote>

            <div className="profile-milestones">
              {timeline.slice(0, 3).map((item) => (
                <div key={item.year} className="milestone">
                  <span className="milestone-year">{item.year}</span>
                  <span className="milestone-title">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-values">
            <h3>মূল নীতিমালা</h3>
            <div className="values-cloud">
              {values.map((value) => (
                <span key={value} className="value-tag">
                  {value}
                </span>
              ))}
            </div>

            <div className="credentials-minimal">
              {credentials.slice(0, 3).map((cred) => (
                <div key={cred.label} className="cred-item">
                  <span className="cred-label">{cred.label}</span>
                  <span className="cred-value">{cred.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas - Floating Elements */}
      <section
        id="practice"
        className="practice-section"
        ref={(el) => (sectionRefs.current.practice = el)}
      >
        <div className="practice-header">
          <span className="home-section-tag">● PRACTICE AREAS</span>
          <h2 className="home-section-title">
            প্র্যাকটিস
            <br />
            <span className="gradient">এরিয়া</span>
          </h2>
        </div>

        <div className="practice-showcase">
          {practiceAreas.map((area, index) => (
            <div
              key={area.title}
              className="showcase-item"
              style={{
                transform: `translate(${mousePosition.x * (index + 1) * 0.5}px, ${mousePosition.y * (index + 1) * 0.5}px)`,
              }}
            >
              <div className="item-icon">
                {index === 0 && "⚖️"}
                {index === 1 && "🔒"}
                {index === 2 && "🏢"}
                {index === 3 && "📄"}
              </div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cases Section - Minimal Grid */}
      <section
        id="cases"
        className="cases-section"
        ref={(el) => (sectionRefs.current.cases = el)}
      >
        <div className="cases-header">
          <div>
            <span className="home-section-tag">● FEATURED CASES</span>
            <h2 className="home-section-title">
              সাম্প্রতিক
              <br />
              <span className="gradient">মামলার ফলাফল</span>
            </h2>
          </div>
          <Link to="/projects" className="view-all">
            সবগুলি দেখুন
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4.16666 10H15.8333M15.8333 10L11.6667 5.83333M15.8333 10L11.6667 14.1667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="cases-masonry">
          {cases.slice(0, 3).map((item, index) => (
            <div
              key={item.id || item.title}
              className={`case-block block-${index + 1}`}
            >
              <div className="case-content">
                <span className="case-category">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <span className="case-result">{item.outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Banner - Full Width */}
      <section
        id="contact"
        className="contact-banner"
        ref={(el) => (sectionRefs.current.contact = el)}
      >
        <div className="banner-content">
          <h2 className="banner-title">
            আইনি পরামর্শ
            <br />
            <span className="gradient">প্রয়োজন?</span>
          </h2>
          <p className="banner-text">
            আজই যোগাযোগ করুন এবং আপনার মামলা নিয়ে বিস্তারিত আলোচনা করুন।
          </p>
          <Link to="/contact" className="primary-btn large">
            ফ্রি পরামর্শ নিন
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4.16666 10H15.8333M15.8333 10L11.6667 5.83333M15.8333 10L11.6667 14.1667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
