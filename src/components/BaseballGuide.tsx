export default function BaseballGuide() {
  const openGuide = () => {
    window.open('/baseball-guide.html', '_blank');
  };

  return (
    <section className="section" id="guide">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">GUIDE</span>
          <h2 className="section-title">야구 상식 & 수비 가이드</h2>
          <p className="section-desc">4부리그 선수들을 위한 규칙 상식과 수비 노하우</p>
        </div>

        <div className="guide-banner">
          <div className="guide-banner-inner">
            <div className="guide-banner-text">
              <h3>수비 실력을 한 단계 올리는<br/>비주얼 가이드</h3>
              <p>
                의외의 규칙 상식, 포지션별 수비 노하우, 상황별 플레이 애니메이션,
                연습 메뉴까지 — 인터랙티브하게 쉽고 재미있게 배워보세요.
              </p>
              <div className="guide-banner-tags">
                <span style={{ background: 'rgba(200,16,46,0.2)', color: '#ff6b81' }}>규칙 7가지</span>
                <span style={{ background: 'rgba(74,140,42,0.2)', color: '#6bce3a' }}>포지션별 노하우</span>
                <span style={{ background: 'rgba(212,168,67,0.2)', color: '#f0cc6b' }}>애니메이션 다이어그램</span>
                <span style={{ background: 'rgba(91,192,235,0.2)', color: '#5bc0eb' }}>연습 메뉴</span>
              </div>
              <button className="guide-banner-btn" onClick={openGuide}>
                가이드 보기
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </button>
            </div>

            <div className="guide-banner-field">
              <svg viewBox="0 0 300 280">
                {/* 외야 */}
                <path d="M 150 240 L 25 100 Q 150 -10 275 100 Z" fill="#3a7a1a" />
                {/* 내야 흙 */}
                <path d="M 150 240 L 90 180 Q 150 120 210 180 Z" fill="#c4956a" />
                {/* 내야 잔디 */}
                <path d="M 150 215 L 110 175 Q 150 140 190 175 Z" fill="#4a9c2a" />
                {/* 베이스라인 */}
                <line x1="150" y1="240" x2="90" y2="180" stroke="white" strokeWidth="1" opacity="0.4" />
                <line x1="150" y1="240" x2="210" y2="180" stroke="white" strokeWidth="1" opacity="0.4" />
                {/* 마운드 */}
                <circle cx="150" cy="195" r="6" fill="#d4a574" />
                {/* 베이스 */}
                <rect x="147" y="237" width="6" height="6" fill="white" transform="rotate(45,150,240)" />
                <rect x="207" y="177" width="6" height="6" fill="white" transform="rotate(45,210,180)" />
                <rect x="147" y="117" width="6" height="6" fill="white" transform="rotate(45,150,120)" />
                <rect x="87" y="177" width="6" height="6" fill="white" transform="rotate(45,90,180)" />
                {/* 선수들 */}
                <circle cx="150" cy="195" r="8" fill="#C8102E" opacity="0.9">
                  <animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="258" r="7" fill="#1B2A4A" opacity="0.9" />
                <circle cx="200" cy="185" r="7" fill="#D4A843" opacity="0.9" />
                <circle cx="180" cy="155" r="7" fill="#D4A843" opacity="0.9" />
                <circle cx="120" cy="155" r="7" fill="#D4A843" opacity="0.9" />
                <circle cx="100" cy="185" r="7" fill="#D4A843" opacity="0.9" />
                <circle cx="65" cy="95" r="7" fill="#16A34A" opacity="0.9" />
                <circle cx="150" cy="65" r="7" fill="#16A34A" opacity="0.9" />
                <circle cx="235" cy="95" r="7" fill="#16A34A" opacity="0.9" />
                {/* 공 애니메이션 */}
                <circle r="4" fill="#ff6b81">
                  <animate attributeName="cx" values="150;100;100;150;200;200;150" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="240;185;185;120;185;185;240" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0.3;1;1;0.3;1" dur="4s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </div>

          <div className="guide-banner-features">
            <div className="guide-feature">
              <div className="guide-feature-num">7</div>
              <div className="guide-feature-label">규칙 상식</div>
            </div>
            <div className="guide-feature">
              <div className="guide-feature-num">9</div>
              <div className="guide-feature-label">포지션 노하우</div>
            </div>
            <div className="guide-feature">
              <div className="guide-feature-num">5</div>
              <div className="guide-feature-label">상황별 수비</div>
            </div>
            <div className="guide-feature">
              <div className="guide-feature-num">11</div>
              <div className="guide-feature-label">연습 메뉴</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
