import { finances, teamInfo } from '../data/teamData';

export default function Finance() {
  return (
    <section className="section section-navy" id="finance">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">FINANCE</span>
          <h2 className="section-title">팀 회계 및 운영</h2>
          <p className="section-desc">투명한 운영을 위한 회비 및 지출 현황입니다.</p>
        </div>

        <div className="finance-grid">
          <div className="finance-card">
            <h3>입회비 및 회비</h3>
            <div className="finance-value">{teamInfo.dues}</div>
            <div className="finance-account">
              <span className="label">입금계좌:</span>
              <span className="value">{teamInfo.account}</span>
            </div>
          </div>

          <div className="finance-card highlight">
            <h3>재무 요약</h3>
            <div className="summary-row">
              <span>총 수입 (협찬 포함)</span>
              <span className="val">{finances.totalIncome.toLocaleString()}원</span>
            </div>
            <div className="summary-row">
              <span>총 지출 (장비건 등)</span>
              <span className="val">-{finances.totalExpense.toLocaleString()}원</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>현재 잔액</span>
              <span className="val">{finances.balance.toLocaleString()}원</span>
            </div>
            <div className="update-ts">최종 업데이트: {finances.lastUpdated}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
