import { memberCompanies } from '../data/teamData';

export default function Members() {
  return (
    <section className="section" id="members">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">MEMBERS</span>
          <h2 className="section-title">회원사 브랜드</h2>
          <p className="section-desc">
            {memberCompanies.length}개 프랜차이즈 브랜드 대표님들이 함께합니다
          </p>
        </div>

        <div className="members-grid">
          {memberCompanies.map((company, idx) => (
            <span key={idx} className="member-chip">{company}</span>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ color: 'var(--kfa-gray-500)', fontSize: '0.9rem', marginBottom: 16 }}>
            한국프랜차이즈산업협회 부산울산경남지회 소속<br />
            프랜차이즈 대표님들의 사회인 야구단입니다
          </p>
        </div>
      </div>
    </section>
  );
}
