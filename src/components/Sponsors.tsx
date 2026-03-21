import { sponsors } from '../data/teamData';

export default function Sponsors() {
  return (
    <section className="section section-navy" id="sponsors">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">SPONSORS</span>
          <h2 className="section-title">후원 & 협찬</h2>
          <p className="section-desc">KFA 프랜차이즈 야구단을 후원해주시는 분들</p>
        </div>

        <div className="sponsor-grid">
          {sponsors.map((s, idx) => (
            <div key={idx} className="sponsor-card">
              <div className="sponsor-name">{s.name}</div>
              <div className="sponsor-person">{s.person}</div>
              <div className="sponsor-contribution">{s.contribution}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
