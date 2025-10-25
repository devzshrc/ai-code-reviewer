import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';
import Markdown from 'react-markdown';
import axios from 'axios';
import './App.css';

const App = () => {
  const [code, setCode] = useState(`function sum (){return 1 + 1}`);
  const [review, setReview] = useState(``);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://ai-code-reviewer-3ws1.onrender.com/ai/get-review',
        { code },
      );
      setReview(response.data);
    } catch (err) {
      console.error('Error fetching review:', err);
      setReview('⚠️ Unable to connect to review service.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app-container">
      <div className="grid-background"></div>

      <header>
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 4L14 10L6 16V4Z" fill="currentColor" />
              </svg>
            </div>
            <span>CODEREVIEW</span>
          </div>
          <nav>
            <a href="#">DOCUMENTATION</a>
            <a href="#">EXAMPLES</a>
            <a href="#">API</a>
          </nav>
        </div>
      </header>

      <main>
        <div className="main-inner">
          <div className="intro-section">
            <div className="intro-meta">
              <span className="issue-number">ISSUE Nº 001</span>
              <span className="divider">—</span>
              <span className="date">
                {new Date()
                  .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                  .toUpperCase()}
              </span>
            </div>
            <h1>INTELLIGENT CODE ANALYSIS</h1>
            <p className="subtitle">
              AI-powered code review with instant feedback, best practice recommendations,
              and architectural insights delivered in real-time.
            </p>
          </div>

          <div className="workspace">
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">
                  <span className="panel-number">01</span>
                  <span>SOURCE CODE</span>
                </div>
                <div className="panel-meta">
                  <span className="language-badge">JAVASCRIPT</span>
                </div>
              </div>
              <div className="panel-body">
                <Editor
                  value={code}
                  onValueChange={(code) => setCode(code)}
                  highlight={(code) =>
                    Prism.highlight(code, Prism.languages.javascript, 'javascript')
                  }
                  padding={24}
                  style={{
                    fontFamily: '"Victor Mono", "Fira Code", monospace',
                    fontSize: 14,
                    minHeight: '500px',
                    lineHeight: '1.6',
                  }}
                />
              </div>
              <div className="panel-footer">
                <button
                  onClick={reviewCode}
                  className={`action-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      ANALYZING
                    </>
                  ) : (
                    <>
                      ANALYZE CODE
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8h10M13 8l-4 4M13 8l-4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">
                  <span className="panel-number">02</span>
                  <span>AI ANALYSIS</span>
                </div>
                <div className="panel-meta">
                  {review && <span className="status-badge">COMPLETE</span>}
                </div>
              </div>
              <div className="panel-body scrollable">
                {review ? (
                  <div className="markdown-content">
                    <Markdown>{review}</Markdown>
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <circle
                          cx="32"
                          cy="32"
                          r="24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          opacity="0.3"
                        />
                        <path
                          d="M32 20v24M32 48v1"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <p className="empty-title">AWAITING ANALYSIS</p>
                    <p className="empty-description">
                      Submit your code for AI-powered review and insights
                    </p>
                  </div>
                )}
              </div>
              <div className="panel-footer">
                <div className="footer-info">
                  <span className="info-label">POWERED BY AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="footer-line"></div>
          <div className="footer-content">
            <p>© {new Date().getFullYear()} CODEREVIEW — A DEVELOPER TOOL</p>
            <div className="footer-links">
              <a href="#">PRIVACY</a>
              <a href="#">TERMS</a>
              <a href="#">SUPPORT</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
