import { matchResults } from '../data/teamData';

export default function MatchResults() {
  return (
    <section className="section" id="results">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">RESULTS</span>
          <h2 className="section-title">경기 결과</h2>
          <p className="section-desc">KFA 프랜차이즈 야구단의 경기 기록</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px', margin: '0 auto' }}>
          {matchResults.map((match, idx) => (
            <div key={idx} className={`match-card ${match.result}`}>
              <div className="match-meta">
                <span className={`match-type-badge ${match.type}`}>
                  {match.type === 'league' ? '정규리그' : '연습경기'}
                </span>
                <span className="match-date">{match.date} | {match.venue}</span>
              </div>

              <div className="match-teams-row">
                <div className="match-team-info">
                  <h4>KFA</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--kfa-gray-500)' }}>프랜차이즈</p>
                </div>
                <div className="match-score-big">{match.score}</div>
                <div className="match-team-info">
                  <h4>{match.opponent}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--kfa-gray-500)' }}>상대팀</p>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <span className="match-result-label">
                  {match.result === 'win' ? 'WIN' : match.result === 'loss' ? 'LOSS' : 'DRAW'}
                  {match.type === 'league' && match.result === 'win' ? ' - 콜드 승리!' : ''}
                </span>
              </div>

              {match.mvp && (
                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--kfa-gold)', fontWeight: 700, marginBottom: 12 }}>
                  MVP: {match.mvp}
                </p>
              )}

              {match.highlights && (
                <ul className="match-highlights">
                  {match.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
