import { useEffect } from "react";
import Header from "./components/Header";

const css = `
  .oceanus-page {
    background: var(--color-my-bg);
    color: #1A1A1A;
    font-size: clamp(16px, 1.1vw, 18px);
    line-height: 1.75;
    overflow-x: hidden;
  }
  .oceanus-page * { box-sizing: border-box; }
  .oceanus-page img { display: block; width: 100%; height: auto; }

  .oceanus-page .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .oceanus-page .reveal.visible {
    opacity: 1;
    transform: none;
  }

  /* ── Hero ── */
  .oceanus-hero {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
    background: #1A1A1A;
  }
  .oceanus-hero-img {
    position: absolute;
    inset: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 0.6;
  }
  .oceanus-hero-content {
    position: relative;
    z-index: 2;
    padding: clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px);
    border-top: 1px solid rgba(255,255,255,0.15);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: end;
  }
  .oceanus-hero-title {
    font-size: clamp(52px, 7vw, 96px);
    font-weight: 300;
    line-height: 0.95;
    letter-spacing: -0.02em;
    color: #fff;
    margin: 0;
  }
  .oceanus-hero-meta {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: flex-end;
    text-align: right;
  }
  .oceanus-hero-tagline {
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
  }
  .oceanus-hero-desc {
    font-size: clamp(15px, 1.1vw, 17px);
    color: rgba(255,255,255,0.75);
    line-height: 1.65;
    max-width: 380px;
    margin: 0;
  }
  .oceanus-hero-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .oceanus-tag {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.55);
    padding: 4px 10px;
  }

  /* ── Layout ── */
  .oceanus-container {
   max-width: calc(100% - 96px); /* 48px * 2 */
   margin: 0 auto;
  padding: 0;
  }
  .oceanus-section {
    padding: clamp(64px, 10vw, 120px) 0;
  }
  .oceanus-section + .oceanus-section {
    border-top: 1px solid #d0cec8;
  }
  .oceanus-section-label {
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(26,26,26,0.55);
    margin-bottom: 48px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .oceanus-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #d0cec8;
  }

  /* ── Typography ── */
  .oceanus-page h2 {
    font-size: clamp(32px, 3.5vw, 52px);
    font-weight: 300;
    line-height: 1.1;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .oceanus-page h3 {
    font-size: clamp(18px, 1.5vw, 22px);
    font-weight: 500;
    margin-bottom: 12px;
  }
  .oceanus-page h4 {
    margin: 0;
  }
  .oceanus-page p { color: rgba(26,26,26,0.78); max-width: 640px; margin: 0; }
  .oceanus-page p + p { margin-top: 1em; }
  .oceanus-blockquote {
    border-left: 2px solid var(--color-brand);
    padding-left: 24px;
    font-style: italic;
    color: rgba(26,26,26,0.78);
    font-size: clamp(16px, 1.2vw, 19px);
    line-height: 1.7;
    margin: 40px 0;
    max-width: 680px;
  }

  /* ── Video ── */
  .oceanus-video-section {
    padding: 0;
    background: #1A1A1A;
  }
  .oceanus-video-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    background: #1A1A1A;
    overflow: hidden;
    max-width: 1140px;
    margin: 0 auto;
  }
   .oceanus-video-wrap iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border: none;
    display: block;
  }

  /* ── Two col ── */
  .oceanus-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px, 6vw, 80px);
    align-items: start;
  }

  /* ── Stats ── */
  .oceanus-stat-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    margin: 48px 0;
  }
  .oceanus-stat-block {
    background: #1A1A1A;
    color: #fff;
    padding: clamp(24px, 3vw, 40px);
  }
  .oceanus-stat-block:nth-child(even) { background: #2a2a26; }
  .oceanus-stat-num {
    font-size: clamp(40px, 4vw, 64px);
    font-weight: 300;
    line-height: 1;
    margin-bottom: 8px;
    color: var(--color-brand);
  }
  .oceanus-stat-label {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  /* ── Insight cards ── */
  .oceanus-insights {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: #d0cec8;
    border: 1px solid #d0cec8;
    margin: 48px 0;
  }
  .oceanus-insight-card {
    background: var(--color-my-bg);
    padding: clamp(24px, 3vw, 40px);
  }
  .oceanus-insight-num {
    font-size: 10px;
    letter-spacing: 0.14em;
    color: rgba(26,26,26,0.55);
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  .oceanus-insight-card h4 {
    font-size: clamp(16px, 1.3vw, 20px);
    font-weight: 500;
    margin-bottom: 12px;
    line-height: 1.3;
    color: #1A1A1A;
  }
  .oceanus-insight-card p { font-size: 14px; line-height: 1.65; max-width: none; }

  /* ── Design points ── */
  .oceanus-design-points {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: #d0cec8;
    border: 1px solid #d0cec8;
    margin: 48px 0;
  }
  .oceanus-dp {
    background: var(--color-my-bg);
    padding: clamp(20px, 2.5vw, 36px);
    display: flex;
    gap: 20px;
  }
  .oceanus-dp-num {
    font-size: 10px;
    letter-spacing: 0.1em;
    color: rgba(26,26,26,0.55);
    flex-shrink: 0;
    padding-top: 3px;
    text-transform: uppercase;
  }
  .oceanus-dp-body h4 {
    font-weight: 500;
    font-size: clamp(15px, 1.1vw, 17px);
    margin-bottom: 8px;
    color: #1A1A1A;
  }
  .oceanus-dp-body p { font-size: 14px; max-width: none; }

  /* ── AR screens ── */
  .oceanus-screens-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    margin: 48px 0;
  }
  .oceanus-screen-item { position: relative; overflow: hidden; }
  .oceanus-screen-item img { transition: transform 0.4s ease; }
  .oceanus-screen-item:hover img { transform: scale(1.03); }
  .oceanus-screen-caption {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    color: #fff;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 20px 12px 10px;
  }

  /* ── Misc ── */
  .oceanus-scenario-label {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(26,26,26,0.55);
    padding: 8px 0;
    border-bottom: 1px solid #d0cec8;
    margin-bottom: 4px;
  }
  .oceanus-credits {
    display: flex;
    gap: 48px;
    flex-wrap: wrap;
    padding-top: 40px;
  }
  .oceanus-credit-group { display: flex; flex-direction: column; gap: 4px; }
  .oceanus-credit-role {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(26,26,26,0.55);
  }
  .oceanus-credit-name { font-size: 15px; color: #1A1A1A; }
  .oceanus-footer {
    border-top: 1px solid #d0cec8;
    padding: 40px clamp(24px, 5vw, 64px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: rgba(26,26,26,0.55);
    text-transform: uppercase;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .oceanus-hero {
      min-height: unset;
      max-width: 100%;
      padding: 0 8px;
    }

    .oceanus-hero-img {
      position: static;
      width: 100%;
      height: auto;
      object-fit: unset;
      display: block;
      opacity: 1;
    }
    .oceanus-hero-content {
      grid-template-columns: 1fr;
      gap: 24px;
      background: #1A1A1A;
      position: relative;
    }
    .oceanus-hero-meta { align-items: flex-start; text-align: left; }
    .oceanus-hero-tags { justify-content: flex-start; }
    .oceanus-two-col { grid-template-columns: 1fr; }
    .oceanus-stat-row { grid-template-columns: 1fr 1fr; }
    .oceanus-insights { grid-template-columns: 1fr; }
    .oceanus-design-points { grid-template-columns: 1fr; }
    .oceanus-screens-strip { grid-template-columns: 1fr 1fr; }
    .oceanus-footer { flex-direction: column; gap: 8px; text-align: center; }
  }
`;

const img = (name: string) => `/weilinportfolio.github.io/${name}`;

export default function VrVolunteerSystem() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{css}</style>

      <Header />

      <div className="oceanus-page">
        {/* ── Hero ── */}
        <section className="oceanus-hero">
          <img
            className="oceanus-hero-img"
            src={img("volunteerhero.png")}
            alt="OCEANUS — AR System for Future Volunteers"
          />
          <div className="oceanus-hero-content">
            <h1 className="oceanus-hero-title">OCEANUS</h1>
            <div className="oceanus-hero-meta">
              <span className="oceanus-hero-tagline">AR System for Future Volunteers</span>
              <p className="oceanus-hero-desc">
                A speculative design project imagining how AR glasses could coordinate volunteer response during catastrophic London Thames flooding in 2070.
              </p>
              <div className="oceanus-hero-tags">
                <span className="oceanus-tag">Speculative Design</span>
                <span className="oceanus-tag">AR / UX</span>
                <span className="oceanus-tag">Futures Research</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">Overview</div>
            <div className="oceanus-two-col">
              <div className="reveal">
                <h2>What if the Thames floods London in 2070?</h2>
                <blockquote className="oceanus-blockquote">
                  "In 2070, when sea level rise is out of our control, we will be helpless in the face of catastrophic floods. So what can be done to prevent disaster?"
                </blockquote>
                <p>
                  OCEANUS is a future-facing AR coordination system designed for civilian volunteers responding to a major London flood event between 2070–2080. Built on speculative design methodology, the project starts from real climate data and models a plausible future in which volunteer organisations become the backbone of urban resilience.
                </p>
              </div>
              <div className="reveal" style={{ transitionDelay: "0.15s" }}>
                <div className="oceanus-scenario-label">Project Details</div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, color: "rgba(26,26,26,0.78)" }}>
                  <tbody>
                    {[
                      ["Role", "UX Research, Speculative Design, AR Interface"],             
                      ["Tools", "Figma, Rhino, PS, PR"],
                      ["Context", "Speculative design studio — futures cone methodology"],
                    ].map(([label, value], i, arr) => (
                      <tr key={label} style={{ borderBottom: i < arr.length - 1 ? "1px solid #d0cec8" : "none" }}>
                        <td
                          style={{
                            padding: "10px 24px 10px 0",
                            fontSize: 10,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "rgba(26,26,26,0.55)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {label}
                        </td>
                        <td style={{ padding: "10px 0" }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── Video ── */}
        <section className="oceanus-video-section">
  <div className="oceanus-video-wrap reveal">
    <iframe
      src="https://www.youtube.com/embed/wKhigvu9ygY"
      title="OCEANUS volunteer experience"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
  <div className="oceanus-video-caption">
    Full scenario walkthrough — AR vision prototype demonstrating the OCEANUS volunteer experience during a flood response
  </div>
</section>

        {/* ── Research ── */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">01 — Sea Level Rising Research</div>
            <div className="oceanus-two-col reveal">
              <div>
                <h2>Understanding the scale of the crisis</h2>
                <p>
                  We began with a comprehensive analysis of sea level rise: its causes, historical trajectory, and projected futures. Using NASA and IPCC datasets, we mapped 28 key historical events on a global timeline — 12 of which were directly flood-related.
                </p>
                <p style={{ marginTop: "1em" }}>
                  River avulsions — catastrophic floods triggered when a river charts a new path to the sea — are projected to increase significantly along the Thames as sea levels accelerate. The rate of extreme water-level events is already accelerating.
                </p>
                <blockquote className="oceanus-blockquote">
                  "Continuous monitoring of this change is vital to safeguard London and the Thames Estuary's continued existence as one of the world's most important coastal regions."
                </blockquote>
              </div>
              <div>
                <img src={img("oceanus-research-analysis-1.png")} alt="Sea level rising analysis"  />
                <img src={img("oceanus-research-analysis-2.png")} alt="Sea level rising analysis" style={{ marginBottom: 2 }} />
               
              </div>
            </div>
            <div className="oceanus-stat-row reveal">
              {[
                { num: "2070", label: "Scenario year — Thames surge event" },
                { num: "28", label: "Historical sea-level events mapped" },
                { num: "12/28", label: "Events directly associated with floods" },
              ].map(({ num, label }) => (
                <div className="oceanus-stat-block" key={num}>
                  <div className="oceanus-stat-num">{num}</div>
                  <div className="oceanus-stat-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="reveal" style={{ marginTop: 16 }}>
              <img src={img("oceanus-research-thames.png")} alt="London Thames flood history and data" />
            </div>
          </div>
        </section>

        {/* ── Scenario ── */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">02 — Scenario & Futures Cone</div>
            <div className="oceanus-two-col reveal">
              <div>
                <h2>Mapping probable and preferable futures</h2>
                <p>
                  Using the futures cone methodology, we mapped economic, political, technological, social, and ecological dimensions across probable, possible, and preferable futures for London 2070–2080.
                </p>
                <p>
                  Our scenario: during a River Thames surge, London's public organisations — supported by AR-equipped volunteers — coordinate to save coastal areas from disaster.
                </p>
              </div>
              <div style={{ fontSize: 14, color: "rgba(26,26,26,0.78)" }}>
                <p>
                  <strong style={{ color: "#1A1A1A" }}>Probable future issues identified:</strong>
                </p>
                <ul style={{ marginTop: 12, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "Low surface permeability along the river",
                    "Huge social human input, waste of resources",
                    "Rapid AI replacing positions in city management",
                    "Multiple organisations unable to communicate in emergencies",
                    "Rising reliance on smart city tech creates single-point failures",
                  ].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
            <div className="reveal" style={{ marginTop: 48 }}>
              <img src={img("oceanus-scenario-matrix.png")} alt="Futures cone scenario matrix" />
            </div>
          </div>
        </section>

        {/* ── Issue Analysis ── */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">03 — Issue Analysis</div>
            <div className="reveal">
              <h2>The 2021 London floods revealed the cracks</h2>
              <p style={{ maxWidth: 700, marginTop: 16 }}>
                The 2021 floods exposed complex, fragmented management of flood risk and a critical lack of coordinated response across multiple organisations. Thames Water, the Met Office, NHS, Fire Brigade, and the London Resilience Group all operated in silos — leading to confusion and ineffective flood mitigation.
              </p>
            </div>
            <div className="oceanus-insights reveal" style={{ marginTop: 48 }}>
              {[
                { num: "Problem 01", title: "Failure to assess severity", body: "Thames Water were unable to accurately estimate the severity of the storm, so did not trigger normal incident processes or proactively contact elected representatives." },
                { num: "Problem 02", title: "Lack of on-ground staff", body: '"This overwhelmed the number of people on duty in our Customer Contact Centre, leading to unacceptable waiting times." Teams were widely and thinly spread across the area.' },
                { num: "Problem 03", title: "Communication breakdown", body: "No further help beyond what Thames Water were already providing was requested. The London Resilience Group offered support — but it was never taken up." },
              ].map(({ num, title, body }) => (
                <div className="oceanus-insight-card" key={num}>
                  <div className="oceanus-insight-num">{num}</div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
            <div className="reveal">
              <img src={img("oceanus-issue-stakeholders.png")} alt="Stakeholder analysis diagram" />
            </div>
          </div>
        </section>

        {/* ── System Design ── */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">04 — OCEANUS System Design</div>
            <div className="oceanus-two-col reveal">
              <div>
                <h2>From fragmented response to coordinated action</h2>
                <p>
                  OCEANUS reimagines the volunteer pipeline. Rather than the current six-step process — assessment, mobilisation, training, dispatch, evaluation, rehabilitation — the system condenses this into a streamlined AR-enabled flow.
                </p>
                <p>
                  Volunteers receive AR glasses, are taught basic operation in minutes, and are immediately assigned to specialist roles: Traffic Services, Community Services, Animal Services, or Medical Services.
                </p>
              </div>
              <div>
                <img src={img("oceanus-system-comparison.png")} alt="Current vs future volunteer system" />
              </div>
            </div>
            <div className="reveal" style={{ marginTop: 64 }}>
              <div className="oceanus-section-label" style={{ marginBottom: 32 }}>
                Design Rationale — From Insights to Design Points
              </div>
              <div className="oceanus-design-points">
                {[
                  { num: "DP 01", title: "Real-time task assignment", body: "Fragmented communication was the core failure in 2021. OCEANUS uses a central AI dispatch system to push missions directly to volunteers' AR field of view — no phone calls, no waiting." },
                  { num: "DP 02", title: "Step-by-step contextual guidance", body: "Untrained volunteers cannot perform medical or technical tasks reliably. The AR overlay provides illustrated, voice-guided instructions overlaid directly onto the real environment." },
                  { num: "DP 03", title: "Identity and role signalling", body: "Citizens could not tell who was a volunteer or what role they held. The external display on the glasses broadcasts the volunteer's current mission to people around them." },
                  { num: "DP 04", title: "Minimal onboarding friction", body: "Training was the biggest bottleneck in the current system. OCEANUS glasses are designed for three-step setup: get glasses → fixed to head → identification scan. Active in under two minutes." },
                ].map(({ num, title, body }) => (
                  <div className="oceanus-dp" key={num}>
                    <span className="oceanus-dp-num">{num}</span>
                    <div className="oceanus-dp-body">
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── AR Glasses ── */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">05 — AR Glasses Hardware</div>
            <div className="oceanus-two-col reveal" style={{ alignItems: "center" }}>
              <div>
                <h2>Designed for the chaos of disaster response</h2>
                <p>
                  The OCEANUS AR glasses feature two distinct display systems working in parallel. The internal display provides the volunteer with visual guidance, directional audio, and a fixator for extended wear. The external display signals role and status to people around them.
                </p>
                <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { role: "INTERNAL", desc: "Visual aid · Fixator · Auditory aid — provides information and guidance on volunteer tasks" },
                    { role: "EXTERNAL", desc: "External visual aid · Sensor · Audio reception — shows people who you are and provides guidance when necessary" },
                  ].map(({ role, desc }) => (
                    <div key={role} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(26,26,26,0.55)", flexShrink: 0, paddingTop: 2, textTransform: "uppercase" }}>
                        {role}
                      </span>
                      <p style={{ fontSize: 14, maxWidth: "none" }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img src={img("oceanus-glasses-render-2.png")} alt="AR glasses hardware render-2" />
                
              </div>
            </div>
            <div className="reveal" style={{ marginTop: 48 }}>
              <img src={img("oceanus-glasses-diagram.png")} alt="AR glasses internal and external display system" />
            </div>
          </div>
        </section>

        {/* ── AR Vision ── */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">06 — AR Vision — Medical Treatment User Flow</div>
            <div className="reveal">
              <h2>What the volunteer sees</h2>
              <p style={{ marginTop: 16, maxWidth: 640 }}>
                The full AR user flow demonstrates a Medical Treatment mission. A volunteer is dispatched to assist a girl with a suspected fracture near a subway station. OCEANUS navigates them to the scene, identifies the situation, and provides step-by-step first aid guidance — all within the AR field of view.
              </p>
            </div>
            <div className="reveal" style={{ marginTop: 48 }}>
              <img src={img("oceanus-arflow-overview.png")} alt="AR user flow overview" style={{ marginBottom: 2 }} />
            </div>
            <div className="oceanus-screens-strip reveal">
              {[
                { src: "oceanus-arflow-setup.png", caption: "01 — Scanning & Setup" },
                { src: "oceanus-arflow-dispatch.png", caption: "02 — Mission Dispatched" },
                { src: "oceanus-arflow-navigation.png", caption: "03 — AR Navigation" },
                { src: "oceanus-arflow-arrive.png", caption: "04 — Arrive at Scene" },
              ].map(({ src, caption }) => (
                <div className="oceanus-screen-item" key={src}>
                  <img src={img(src)} alt={caption} />
                  <div className="oceanus-screen-caption">{caption}</div>
                </div>
              ))}
            </div>
            <div className="oceanus-screens-strip reveal">
              {[
                { src: "oceanus-arflow-guidance.png", caption: "05 — Guidance Overlay" },
                { src: "oceanus-arflow-immobilize.png", caption: "06 — Immobilize Instruction" },
                { src: "oceanus-arflow-complete.png", caption: "07 — Mission Complete" },
              ].map(({ src, caption }) => (
                <div className="oceanus-screen-item" key={src}>
                  <img src={img(src)} alt={caption} />
                  <div className="oceanus-screen-caption">{caption}</div>
                </div>
              ))}
              <div className="oceanus-screen-item" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(99,194,189,0.12)", padding: 32 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(26,26,26,0.55)", textAlign: "center", maxWidth: "none" }}>
                  Well done!<br />Continue mission?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Reflection ── */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">07 — Reflection</div>
            <div className="oceanus-two-col reveal">
              <div>
                <h2>What this project taught us about complex systems</h2>
                <p>
                  The most challenging part of OCEANUS was not designing the AR interface — it was understanding how a disaster response system actually fails. The 2021 London floods showed that technology alone is insufficient. The real problem was organisational: siloed stakeholders, unclear chains of authority, and no mechanism for rapidly deploying untrained but willing people.
                </p>
                <p>
                  Speculative design forced us to hold two things simultaneously: the rigour of real climate data and the imagination of a world 50 years away. The futures cone methodology was essential for keeping our scenario grounded in plausibility rather than fantasy.
                </p>
              </div>
              <div>
                <p style={{ fontSize: 15, marginBottom: 24 }}>
                  The insight that shaped the entire system was deceptively simple:{" "}
                  <strong style={{ color: "#1A1A1A" }}>
                    volunteers don't fail because they lack courage — they fail because they lack coordination and instruction.
                  </strong>{" "}
                  OCEANUS addresses exactly that gap.
                </p>
                <p style={{ fontSize: 14 }}>
                  If repeated, we would conduct primary research with actual British Red Cross volunteers to pressure-test the system against real operational constraints, and run usability studies with the AR prototype to validate the cognitive load assumptions baked into the interface design.
                </p>
                <div className="oceanus-credits">
                  <div className="oceanus-credit-group">
                    <span className="oceanus-credit-role">Team</span>
                    {["Tongyu Du", "Weilin Sun", "Siyuan Liu", "Zhihao Wang"].map((n) => (
                      <span className="oceanus-credit-name" key={n}>{n}</span>
                    ))}
                  </div>
                  <div className="oceanus-credit-group">
                    <span className="oceanus-credit-role">Context</span>
                    <span className="oceanus-credit-name">Speculative Design Studio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="oceanus-footer">
          <span>Weilin Sun — Portfolio</span>
          <span>OCEANUS — AR System for Future Volunteers</span>
        </footer>
      </div>
    </>
  );
}