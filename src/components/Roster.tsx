import { useState } from 'react';
import { players } from '../data/teamData';

const positions = ['전체', '투수', '포수', '내야수', '외야수', '명예회원'];

export default function Roster() {
  const [filter, setFilter] = useState('전체');

  const filtered = filter === '전체'
    ? players
    : players.filter(p => p.position === filter);

  return (
    <section className="section" id="roster">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">ROSTER</span>
          <h2 className="section-title">선수단</h2>
          <p className="section-desc">
            {players.length}명의 프랜차이즈 대표님들이 그라운드에서 빛납니다
          </p>
        </div>

        <div className="position-filter">
          {positions.map(pos => (
            <button
              key={pos}
              className={`filter-btn ${filter === pos ? 'active' : ''}`}
              onClick={() => setFilter(pos)}
            >
              {pos}
              {pos !== '전체' && (
                <span style={{ marginLeft: 4, opacity: 0.6 }}>
                  ({players.filter(p => p.position === pos).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="player-grid">
          {filtered.map((player, idx) => (
            <div key={idx} className="player-card">
              <div className="player-header">
                <span className="player-number">#{player.number}</span>
                <div className="player-avatar">
                  {player.name.charAt(0)}
                </div>
              </div>
              <div className="player-body">
                <div className="player-name">{player.name}</div>
                <div className="player-pos">
                  #{player.number} | {player.position} | {player.height}cm
                </div>
                {player.brand && (
                  <span className="player-brand">{player.brand}</span>
                )}
                {player.role && (
                  <div className="player-role">{player.role}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
