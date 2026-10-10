import Link from "next/link";

import { EarlyAccessForm } from "@/components/early-access-form";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="trader-page">
      <header className="terminal-header">
        <nav className="terminal-nav" aria-label="Main navigation">
          <Link href="/" className="terminal-brand" aria-label="Screener.si home">
            <span className="brand-mark" aria-hidden="true">S</span>
            <span>SCREENER<span className="brand-dot">.</span>SI</span>
          </Link>
          <div className="nav-center"><span className="live-indicator" /> MARKET INTELLIGENCE FOR ACTIVE TRADERS</div>
          <div className="nav-actions">
            <span className="access-tag">EARLY ACCESS</span>
            <Link href="/privacy-policy" className="privacy-link">PRIVACY</Link>
          </div>
        </nav>
      </header>

      <main className="trader-main">
        <div className="launch-ribbon" role="status" aria-label="Screener.si is coming soon">
          <span className="launch-ribbon-label">
            <span className="launch-ribbon-dot" aria-hidden="true" />
            COMING SOON
          </span>
          <span className="launch-ribbon-copy">THE MARKET SCREEN IS TAKING SHAPE</span>
          <span className="launch-ribbon-index">SCN / 001</span>
        </div>

        <section className="trader-hero">
          <div className="pitch-column">
            <p className="hero-kicker"><span>01</span> YOUR EDGE STARTS WITH A CLEARER VIEW</p>
            <h1 className="trader-title">
              Read the<br />
              next <span>move.</span>
            </h1>
            <p className="trader-description">
              Find momentum. Spot the setup. Cut through the noise.
              <span> Screener.si is building a sharper way to read the market.</span>
            </p>

            <section className="build-tracker" aria-label="Screener.si development tracker">
              <div className="build-tracker-heading">
                <span>BUILD TRACKER <b>/ 01</b></span>
                <span className="build-active"><i aria-hidden="true" /> IN DEVELOPMENT</span>
              </div>
              <div className="build-activity-rail" aria-label="Development activity in progress">
                <span />
              </div>
              <div className="build-workstreams">
                <div className="workstream workstream-done">
                  <span>01 / INPUT</span>
                  <b>Market data</b>
                </div>
                <div className="workstream workstream-active">
                  <span>02 / PROCESS</span>
                  <b>Signal engine</b>
                </div>
                <div className="workstream workstream-next">
                  <span>03 / OUTPUT</span>
                  <b>Early access</b>
                </div>
              </div>
              <p className="build-tracker-note">Building the screen before opening the doors.</p>
            </section>

            <div className="access-block">
              <div className="access-heading">
                <span>GET ON THE LIST</span>
                <span className="access-count">PRIVATE BETA · 01</span>
              </div>
              <EarlyAccessForm />
            </div>

            <div className="launch-note">
              <span className="launch-note-mark" aria-hidden="true">↗</span>
              <span>Get first access when the screen goes live.</span>
            </div>
          </div>

          <aside className="terminal-card" aria-label="Illustrative market activity">
            <div className="terminal-card-header">
              <div className="terminal-label"><span className="terminal-symbol">S</span> SCREENER.SI <span className="terminal-slash">/</span> MARKET PULSE</div>
              <div className="scan-state"><span className="live-indicator" /> SCANNING</div>
            </div>

            <div className="terminal-card-title">
              <div>
                <p>MARKET STRUCTURE</p>
                <h2>Momentum map</h2>
              </div>
              <span className="chart-period">SIGNAL VIEW <b>↗</b></span>
            </div>

            <div className="chart-legend">
              <span><i className="legend-up" /> UPSIDE PRESSURE</span>
              <span><i className="legend-down" /> PULLBACK</span>
            </div>

            <div className="chart-stage">
              <div className="chart-axis" aria-hidden="true"><span>HIGH</span><span>RANGE</span><span>LOW</span></div>
              <svg viewBox="0 0 620 300" role="img" aria-label="Illustrative candlestick chart with a moving market signal">
                <g className="chart-grid" aria-hidden="true">
                  <line x1="32" y1="56" x2="600" y2="56" />
                  <line x1="32" y1="112" x2="600" y2="112" />
                  <line x1="32" y1="168" x2="600" y2="168" />
                  <line x1="32" y1="224" x2="600" y2="224" />
                  <line x1="32" y1="270" x2="600" y2="270" />
                  <line x1="32" y1="40" x2="32" y2="270" />
                  <line x1="174" y1="40" x2="174" y2="270" />
                  <line x1="316" y1="40" x2="316" y2="270" />
                  <line x1="458" y1="40" x2="458" y2="270" />
                  <line x1="600" y1="40" x2="600" y2="270" />
                </g>

                <g className="chart-volume" aria-hidden="true">
                  <rect x="75" y="248" width="16" height="22" />
                  <rect x="148" y="256" width="16" height="14" />
                  <rect x="221" y="240" width="16" height="30" />
                  <rect x="294" y="250" width="16" height="20" />
                  <rect x="367" y="232" width="16" height="38" />
                  <rect x="440" y="246" width="16" height="24" />
                  <rect x="513" y="226" width="16" height="44" />
                  <rect x="576" y="236" width="16" height="34" />
                </g>

                <g className="candles" aria-hidden="true">
                  <g className="candle candle-up"><line x1="89" y1="164" x2="89" y2="223" /><rect x="81" y="181" width="16" height="24" /></g>
                  <g className="candle candle-down"><line x1="162" y1="141" x2="162" y2="211" /><rect x="154" y="157" width="16" height="27" /></g>
                  <g className="candle candle-up"><line x1="235" y1="116" x2="235" y2="184" /><rect x="227" y="132" width="16" height="30" /></g>
                  <g className="candle candle-up"><line x1="308" y1="94" x2="308" y2="166" /><rect x="300" y="111" width="16" height="28" /></g>
                  <g className="candle candle-down"><line x1="381" y1="106" x2="381" y2="191" /><rect x="373" y="129" width="16" height="33" /></g>
                  <g className="candle candle-up"><line x1="454" y1="72" x2="454" y2="157" /><rect x="446" y="92" width="16" height="37" /></g>
                  <g className="candle candle-up"><line x1="527" y1="50" x2="527" y2="127" /><rect x="519" y="68" width="16" height="35" /></g>
                </g>

                <path className="market-line" pathLength={100} d="M40 204 C78 190 103 184 132 187 S190 161 221 168 S276 129 310 138 S365 117 397 140 S447 124 471 106 S526 91 590 60" />
                <path className="market-runner" pathLength={100} d="M40 204 C78 190 103 184 132 187 S190 161 221 168 S276 129 310 138 S365 117 397 140 S447 124 471 106 S526 91 590 60" />
                <circle className="market-endpoint" cx="590" cy="60" r="6" />
              </svg>
            </div>

            <div className="terminal-card-footer">
              <span><i className="legend-up" /> SIGNAL FORMING</span>
              <span>ILLUSTRATIVE MARKET ACTIVITY</span>
              <span className="footer-index">SCN / 001</span>
            </div>
          </aside>
        </section>

        <div className="bottom-tape" aria-hidden="true">
          <span>LESS NOISE</span><b>×</b><span>BETTER CONTEXT</span><b>×</b><span>SHARPER SETUPS</span><b>×</b><span>SCREENER.SI</span>
        </div>
      </main>
    </div>
  );
}
