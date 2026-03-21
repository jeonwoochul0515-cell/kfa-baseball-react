import { timeline } from '../data/teamData';

export default function Timeline() {
  return (
    <section className="section" style={{ background: 'var(--kfa-gray-50)' }} id="history">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">HISTORY</span>
          <h2 className="section-title">야구단 연혁</h2>
          <p className="section-desc">2025년 창단부터 현재까지의 발자취</p>
        </div>

        <div className="timeline">
          {timeline.map((event, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-icon">{event.icon}</div>
              <div className="timeline-date">{event.date}</div>
              <div className="timeline-title">{event.title}</div>
              <div className="timeline-desc">{event.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
