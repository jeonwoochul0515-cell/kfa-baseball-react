import { teamInfo } from '../data/teamData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ marginBottom: 16 }}>
              <span className="logo-icon">⚾</span>
              <span className="logo-text">
                <span className="logo-main"><span className="red">KFA</span> BASEBALL</span>
                <span className="logo-sub">FRANCHISE BASEBALL CLUB</span>
              </span>
            </div>
            <p style={{ lineHeight: 1.8 }}>
              {teamInfo.fullName}<br />
              {teamInfo.league}
            </p>
          </div>

          <div>
            <h4>바로가기</h4>
            <a href="#results" style={{ display: 'block' }}>경기 결과</a>
            <a href="#schedule" style={{ display: 'block' }}>경기 일정</a>
            <a href="#roster" style={{ display: 'block' }}>선수단</a>
            <a href="#staff" style={{ display: 'block' }}>운영진</a>
            <a href="#history" style={{ display: 'block' }}>연혁</a>
          </div>

          <div>
            <h4>정보</h4>
            <p>창단: {teamInfo.founded}</p>
            <p>홈구장: {teamInfo.homeGround}</p>
            <p>리그: 4부리그</p>
            <p>기록: 게임원(GameOne)</p>
          </div>

          <div>
            <h4>연락처</h4>
            <p>한국프랜차이즈산업협회<br/>부산울산경남지회</p>
            <p style={{ marginTop: 8 }}>회장: 김영환 (사해방)</p>
            <p>감독: 송창진 (국밥의모든것)</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025-2026 KFA 프랜차이즈 야구단. All Rights Reserved.</p>
          <p>한국프랜차이즈산업협회 부산울산경남지회</p>
        </div>
      </div>
    </footer>
  );
}
