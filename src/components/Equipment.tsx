import { equipmentList } from '../data/teamData';

export default function Equipment() {
  return (
    <section className="section" id="equipment">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">EQUIPMENT</span>
          <h2 className="section-title">공용 장비 관리</h2>
          <p className="section-desc">팀에서 공동으로 구매하고 관리하는 장비 내역입니다.</p>
        </div>

        <div className="equipment-list">
          <table className="data-table">
            <thead>
              <tr>
                <th>장비명</th>
                <th>금액</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              {equipmentList.map((item) => (
                <tr key={item.id}>
                  <td className="font-medium">{item.name}</td>
                  <td className="text-red">{item.price.toLocaleString()}원</td>
                  <td className="text-muted">{item.description}</td>
                </tr>
              ))}
              <tr className="table-footer">
                <td colSpan={1} className="font-bold">합계</td>
                <td className="font-bold text-red">
                  {equipmentList.reduce((sum, item) => sum + item.price, 0).toLocaleString()}원
                </td>
                <td>김길하 코치 선지출</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
