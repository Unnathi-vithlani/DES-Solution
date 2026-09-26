/* DES Global — layout.js v8 | Updated navigation: Solutions (Maxx Suite) */
(function () {

  const HEADER = `
<header>
  <div class="container">
    <div class="nav-inner">
      <a href="index.html" class="logo">
        <img src="images/logo.png" alt="DES Global Logo" width="408" height="139">
        <div>
          <div class="logo-name">Dynamic Energy Systems</div>
          <span class="logo-tag">"Cruise Control for Industry"</span>
        </div>
      </a>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="leadership.html">Leadership</a></li>
          <li class="has-dropdown">
            <a href="services.html">Solutions <span class="nav-caret">&#9662;</span></a>
            <div class="nav-dropdown">
              <div class="nav-dropdown-inner">
                <div class="nav-dropdown-col">
                  <div class="nav-dropdown-label">The Maxx Suite</div>
                  <a href="multimaxx.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">DESMaxx (MultiMaxx)</span>
                    <span class="nav-dropdown-sub">Flagship multi-fuel APC &amp; boiler control</span>
                  </a>
                  <a href="emrs.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">RecoveryMaxx</span>
                    <span class="nav-dropdown-sub">Recovery boiler optimization</span>
                  </a>
                  <a href="combustion.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">CombustionMaxx</span>
                    <span class="nav-dropdown-sub">Precision combustion optimization</span>
                  </a>
                  <a href="optimaxx.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">Energy Advocate (Ultra Maxx)</span>
                    <span class="nav-dropdown-sub">AI-powered energy intelligence &amp; reporting</span>
                  </a>
                </div>
                <div class="nav-dropdown-col">
                  <div class="nav-dropdown-label">More Services</div>
                  <a href="variability.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">Variability Management</span>
                    <span class="nav-dropdown-sub">Eliminate the hidden cost</span>
                  </a>
                  <a href="services.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">All Solutions</span>
                    <span class="nav-dropdown-sub">View the complete offering</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li><a href="markets.html">Industries</a></li>
          <li><a href="success-stories.html">Case Studies</a></li>
          <li class="has-dropdown">
            <a href="news.html">Resources <span class="nav-caret">&#9662;</span></a>
            <div class="nav-dropdown nav-dropdown-narrow">
              <div class="nav-dropdown-inner">
                <div class="nav-dropdown-col">
                  <div class="nav-dropdown-label">Resources</div>
                  <a href="leveraging-ai.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">Leveraging AI Across the Utility Lifecycle</span>
                    <span class="nav-dropdown-sub">Featured talk &middot; Experience POWER</span>
                  </a>
                  <a href="news.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">News &amp; Industry Insight</span>
                    <span class="nav-dropdown-sub">Articles, research &amp; company news</span>
                  </a>
                  <a href="presentations.html" class="nav-dropdown-item">
                    <span class="nav-dropdown-title">Presentations</span>
                    <span class="nav-dropdown-sub">Conference talks &amp; SME 2012 slides</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
      <div class="nav-right">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
          <span class="icon-moon">&#127769;</span>
          <span class="icon-sun">&#9728;&#65039;</span>
        </button>
        <a href="audit.html" class="btn btn-primary btn-sm">Free Assessment</a>
        <button class="hamburger" id="hamburgerBtn" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
</header>

<div class="mobile-nav" id="mobileNav">
  <button class="mobile-close" id="mobileClose">&#10005;</button>
  <a href="index.html">Home</a>
  <a href="about.html">About Us</a>
  <a href="leadership.html">Leadership</a>
  <div class="mobile-nav-group-label">Solutions — The Maxx Suite</div>
  <a href="services.html" class="mobile-nav-sub">All Solutions</a>
  <a href="multimaxx.html" class="mobile-nav-sub">DESMaxx (MultiMaxx)</a>
  <a href="emrs.html" class="mobile-nav-sub">RecoveryMaxx</a>
  <a href="combustion.html" class="mobile-nav-sub">CombustionMaxx</a>
  <a href="optimaxx.html" class="mobile-nav-sub">Energy Advocate (Ultra Maxx)</a>
  <a href="variability.html" class="mobile-nav-sub">Variability Management</a>
  <a href="audit.html" class="mobile-nav-sub">Free Level 0 Assessment</a>
  <a href="markets.html">Industries</a>
  <a href="success-stories.html">Case Studies</a>
  <div class="mobile-nav-group-label">Resources</div>
  <a href="leveraging-ai.html" class="mobile-nav-sub">Leveraging AI Across the Utility Lifecycle</a>
  <a href="news.html" class="mobile-nav-sub">News &amp; Industry Insight</a>
  <a href="presentations.html" class="mobile-nav-sub">Presentations</a>
  <a href="careers.html">Careers</a>
  <a href="contact.html">Contact</a>
  <a href="audit.html" style="margin-top:0.5rem;background:var(--accent);color:#fff !important;border-radius:8px;font-weight:700;text-align:center;padding:0.75rem 1.5rem;">Free Level 0 Assessment →</a>
  <button id="mobileThemeToggle" style="background:none;border:1px solid var(--border);border-radius:8px;cursor:pointer;font-size:0.88rem;padding:0.55rem 1.5rem;text-align:left;color:var(--text2);margin-top:0.5rem;width:calc(100% - 3rem);display:flex;align-items:center;gap:0.5rem;"><span class="icon-moon">&#127769;</span><span class="icon-sun">&#9728;&#65039;</span><span>&nbsp;Toggle Dark / Light Mode</span></button>
</div>`;

  const FOOTER = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo">
          <img src="images/logo.png" alt="DES Global Logo" width="408" height="139">
          <div>
            <div class="logo-name">Dynamic Energy Systems</div>
            <span class="footer-tag">"Cruise Control for Industry"</span>
          </div>
        </a>
        <p>Dynamic Energy Systems (DES Global) delivers the Maxx Suite — advanced process control and energy optimization for heavy industry. Stabilizing powerhouses, reducing costs, and lowering emissions for over 20 years.</p>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="leadership.html">Leadership</a></li>
          <li><a href="careers.html">Careers</a></li>
          <li><a href="news.html">News &amp; Industry Insight</a></li>
          <li><a href="presentations.html">Presentations</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Solutions</h5>
        <ul>
          <li><a href="multimaxx.html">DESMaxx (MultiMaxx)</a></li>
          <li><a href="emrs.html">RecoveryMaxx</a></li>
          <li><a href="combustion.html">CombustionMaxx</a></li>
          <li><a href="optimaxx.html">Energy Advocate</a></li>
          <li><a href="variability.html">Variability Management</a></li>
          <li><a href="audit.html">Free Level 0 Assessment</a></li>
          <li><a href="success-stories.html">Case Studies</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <ul>
          <li><a href="mailto:info@desglobal.com">info@desglobal.com</a></li>
          <li><a href="tel:+17806450420">(780) 645-0420</a></li>
          <li style="color:var(--text2);font-size:0.88rem;line-height:1.5">1708 Augusta St<br>Greenville, SC 29605</li>
          <li><a href="markets.html">Industries Served</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&#169; 2026 Dynamic Energy Systems. All rights reserved. &nbsp;|&nbsp; <a href="privacy.html" style="color:var(--text3);font-size:0.82rem;text-decoration:none;">Privacy Policy</a> &nbsp;|&nbsp; <a href="terms.html" style="color:var(--text3);font-size:0.82rem;text-decoration:none;">Terms of Service</a></p>
      <p style="font-size:0.78rem;color:var(--text3);margin-top:0.4rem;">Designed by <a href="https://advdimage.com/" target="_blank" rel="noopener" style="color:var(--text3);text-decoration:underline;">Advanced Image Inc</a></p>
      <div class="footer-socials">
        <a href="https://www.linkedin.com/company/des-global-llc/about/" target="_blank" rel="noopener" class="fsoc" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="mailto:info@desglobal.com" class="fsoc" aria-label="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
      </div>
    </div>
  </div>
</footer>`;

  const hTarget = document.getElementById('site-header');
  if (hTarget) hTarget.outerHTML = HEADER;
  const fTarget = document.getElementById('site-footer');
  if (fTarget) fTarget.outerHTML = FOOTER;

  // Theme toggle, hamburger and header scroll behaviour live in main.js.

})();
