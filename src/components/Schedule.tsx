import { schedule } from '../data/teamData';

export default function Schedule() {
  return (
    <section className="section" style={{ background: 'var(--kfa-gray-50)' }} id="schedule">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">SCHEDULE</span>
          <h2 className="section-title">다가오는 경기</h2>
          <p className="section-desc">부산 영도구 사회인야구 4부리그 일정</p>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {schedule.map((s, idx) => {
            const d = new Date(s.date);
            const month = d.getMonth() + 1;
            const day = d.getDate();
            const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
            const weekday = weekdays[d.getDay()];

            return (
              <div key={idx} className="schedule-card">
                <div className="schedule-date-box">
                  <div className="schedule-month">{month}월</div>
                  <div className="schedule-day">{day}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{weekday}요일</div>
                </div>
                <div className="schedule-info">
                  <div className="schedule-vs">
                    KFA 프랜차이즈 vs {s.opponent}
                  </div>
                  <div className="schedule-detail">
                    {s.time} | {s.venue} | {s.type === 'league' ? '정규리그' : '연습경기'}
                  </div>
                </div>
                <span className={`match-type-badge ${s.type}`}>
                  {s.type === 'league' ? '리그' : '연습'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="info-grid" style={{ marginTop: 60 }}>
          <div className="info-card">
            <div className="info-icon">🏟️</div>
            <h3>홈 구장</h3>
            <p>삼락생태공원 야구장<br/>부산 사상구 삼락동</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🅿️</div>
            <h3>주차장</h3>
            <p>P6 주차장 이용<br/>(부산 사상구 삼락동 29-58)</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📱</div>
            <h3>기록 플랫폼</h3>
            <p>게임원(GameOne)<br/>실시간 기록 확인</p>
          </div>
          <div className="info-card">
            <div className="info-icon">👕</div>
            <h3>유니폼</h3>
            <p>빨간색 상의 / 흰색 하의<br/>KFA 로고 스냅백</p>
          </div>
        </div>
      </div>
    </section>
  );
}
