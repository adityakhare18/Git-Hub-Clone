import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../authContext';
import Layout from '../layout/Layout';
import './home.css';

const Home = () => {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Layout>
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Build and ship software on a<br />single, collaborative platform</h1>
            <p className="hero-subtitle">Join the world's most widely adopted AI-powered developer platform.</p>

            <div className="hero-signup">
              {currentUser ? (
                <Link to="/dashboard" className="dashboard-button">Go to dashboard</Link>
              ) : (
                <>
                  <div className="signup-form">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="email-input"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <Link to="/signup" className="signup-button">Sign up for GitHub</Link>
                  </div>
                  <Link to="#" className="try-copilot-button">Try GitHub Copilot</Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Company Logos Section */}
        <section className="company-logos-section">
          <h2 className="section-title">GitHub is used by</h2>
          <div className="logo-container">
            <div className="logo-item">
              <img src="https://github.githubassets.com/assets/shopify-3fed3011ac81.svg" alt="Shopify" />
            </div>
            <div className="logo-item">
              <img src="https://github.githubassets.com/assets/ey-7434b194d68c.svg" alt="EY" />
            </div>
            <div className="logo-item">
              <img src="https://github.githubassets.com/assets/figma-04e0038c0fef.svg" alt="Figma" />
            </div>
            <div className="logo-item">
              <img src="https://github.githubassets.com/assets/duolingo-ea3a0aa56fa5.svg" alt="Duolingo" />
            </div>
            <div className="logo-item">
              <img src="https://github.githubassets.com/assets/newyorktimes-9d76d7f338f5.svg" alt="New York Times" />
            </div>
            <div className="logo-item">
              <img src="https://github.githubassets.com/assets/mercedes-b9190458c80e.svg" alt="Mercedes Benz" />
            </div>
          </div>
        </section>

        {/* GitHub Features Section */}
        <section className="features-section">
          <h2 className="section-title">GitHub features</h2>

          <div className="features-tabs">
            <div className="tabs-navigation">
              <button className="tab-button active">Code</button>
              <button className="tab-button">Plan</button>
              <button className="tab-button">Collaborate</button>
              <button className="tab-button">Automate</button>
              <button className="tab-button">Secure</button>
            </div>

            <div className="tab-content active">
              <div className="tab-content-container">
                <div className="tab-text">
                  <h3 className="tab-title">Code</h3>
                  <p className="tab-description">Build code quickly and more securely with GitHub Copilot embedded throughout your workflows.</p>
                  <Link to="#" className="tab-link">Learn more about coding with GitHub →</Link>
                </div>
                <div className="tab-image">
                  <div className="code-editor-preview">
                    <div className="code-editor-header">
                      <span className="editor-title">GitHub Copilot Chat</span>
                    </div>
                    <div className="code-editor-body">
                      <div className="chat-message">
                        <span className="chat-prompt">Refactor this duplicated logic and extract it into a reusable function</span>
                        <div className="code-snippet">
                          <pre><code>function calculateTotal() {
  // Code to be refactored
}</code></pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accelerate Performance Section */}
        <section className="accelerate-section">
          <div className="section-header">
            <h2 className="section-title">Accelerate performance</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">With GitHub Copilot embedded throughout the platform, you can simplify your toolchain, automate tasks, and improve the developer experience.</p>
          </div>

          <div className="accelerate-content">
            <div className="accelerate-stat">
              <h3 className="stat-title">Work 55% faster.</h3>
              <p className="stat-description">Increase productivity with AI-powered coding assistance, including code completion, chat, and more.</p>
              <Link to="#" className="feature-link">Explore GitHub Copilot</Link>
            </div>

            <div className="accelerate-image">
              <div className="copilot-chat-preview">
                <div className="chat-window">
                  <div className="chat-header">
                    <span>Copilot Chat</span>
                  </div>
                  <div className="chat-body">
                    <div className="chat-message">
                      <span className="chat-prompt">@Sentry List the latest issues</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section className="collaboration-section">
          <div className="section-header">
            <h2 className="section-title">The complete developer platform</h2>
            <p className="section-subtitle">GitHub helps your team collaborate, build, and ship code securely.</p>
          </div>

          <div className="collaboration-features">
            <div className="collaboration-feature">
              <h3 className="collaboration-title">Collaborative coding</h3>
              <p className="collaboration-description">
                Work together seamlessly with pull requests, discussions, and code reviews.
              </p>
            </div>

            <div className="collaboration-feature">
              <h3 className="collaboration-title">Automation & CI/CD</h3>
              <p className="collaboration-description">
                Build, test, and deploy your code with GitHub Actions and Packages.
              </p>
            </div>

            <div className="collaboration-feature">
              <h3 className="collaboration-title">Security</h3>
              <p className="collaboration-description">
                Find and fix vulnerabilities across your entire codebase.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <div className="cta-container">
            <h2 className="cta-title">Millions of developers and businesses call GitHub home</h2>
            <p className="cta-subtitle">Whether you're scaling your development process or just learning how to code, GitHub is where you belong. Join the world's most widely adopted AI-powered developer platform to build the technologies that redefine what's possible.</p>

            <div className="cta-actions">
              <div className="cta-signup">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="cta-email-input"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Link to="/signup" className="cta-signup-button">Sign up for GitHub</Link>
              </div>
              <Link to="#" className="cta-copilot-button">Try GitHub Copilot</Link>
            </div>
          </div>
        </section>

        {/* Footer Notes Section */}
        <section className="footnotes-section">
          <div className="footnotes-container">
            <h3 className="footnotes-title">Footnotes</h3>
            <ol className="footnotes-list">
              <li className="footnote-item">
                <a href="https://github.blog/news-insights/research/survey-ai-wave-grows/" className="footnote-link">
                  Survey: The AI wave continues to grow on software development teams, 2024.
                </a>
              </li>
              <li className="footnote-item">
                This 7X times factor is based on data from the industry's longest running analysis of fix rates Veracode State of Software Security 2023, which cites the average time to fix 50% of flaws as 198 days vs. GitHub's fix rates of 72% of flaws with in 28 days which is at a minimum of 7X faster when compared.
              </li>
            </ol>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
