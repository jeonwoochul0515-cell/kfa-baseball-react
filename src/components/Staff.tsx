import { staff } from '../data/teamData';

export default function Staff() {
  return (
    <section className="section section-dark" id="staff">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">STAFF</span>
          <h2 className="section-title">운영진</h2>
          <p className="section-desc">KFA 프랜차이즈 야구단을 이끄는 리더들</p>
        </div>

        <div className="staff-grid">
          {staff.map((s, idx) => (
            <div key={idx} className="staff-card">
              <span className="staff-role">{s.role}</span>
              <div className="staff-name">{s.name}</div>
              <div className="staff-brand">{s.brand}</div>
              <div className="staff-desc">{s.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
