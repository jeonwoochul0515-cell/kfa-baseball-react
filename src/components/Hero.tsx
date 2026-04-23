import { useEffect, useRef, useState } from 'react';
import { matchResults, teamInfo } from '../data/teamData';

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const latestMatch = matchResults[0];
  const [videoLoaded, setVideoLoaded] = useState(false);

  const leagueMatches = matchResults.filter(
    m => m.type === 'league' && m.result !== 'draw'
  );
  const leagueWins = leagueMatches.filter(m => m.result === 'win').length;
  const leagueLosses = leagueMatches.filter(m => m.result === 'loss').length;
  const leaguePlayed = leagueWins + leagueLosses;

  const resultLabel =
    latestMatch.result === 'win'
      ? (latestMatch.type === 'league' ? 'LEAGUE WIN' : 'PRACTICE WIN')
      : latestMatch.result === 'loss'
      ? 'LEAGUE LOSS'
      : 'POSTPONED';

  useEffect(() => {
    const counters = statsRef.current?.querySelectorAll('.hero-stat-value');
    if (!counters) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => {
            const el = counter as HTMLElement;
            const target = parseInt(el.dataset.target || '0');
            const suffix = el.dataset.suffix || '';
            const duration = 2000;
            const start = performance.now();

            function update(now: number) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
              if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Video Background */}
      <div className={`hero-video-wrap ${videoLoaded ? 'loaded' : ''}`}>
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="/kfa-highlight.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-badge fade-up">
          <span className="dot" />
          2026 시즌 4부리그 개막
        </div>
        <h1 className="hero-title fade-up fade-up-delay-1">
          <span className="accent">KFA</span> 프랜차이즈<br />야구단
        </h1>
        <p className="hero-subtitle fade-up fade-up-delay-2">
          {teamInfo.fullName}.<br />
          프랜차이즈 대표님들의 열정이 그라운드에서 빛납니다.<br />
          2025년 창단, {teamInfo.league}.
        </p>
        <div className="hero-actions fade-up fade-up-delay-3">
          <a href="#roster" className="btn btn-red" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#roster')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>
            선수단 보기
          </a>
          <a href="#results" className="btn btn-outline-white" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>
            경기 결과
          </a>
        </div>
        <div className="hero-stats fade-up fade-up-delay-3" ref={statsRef}>
          <div className="hero-stat">
            <div className="hero-stat-value" data-target="32" data-suffix="명">0명</div>
            <div className="hero-stat-label">등록 선수</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value" data-target="30" data-suffix="개">0개</div>
            <div className="hero-stat-label">회원사 브랜드</div>
          </div>
          <div className="hero-stat">
            <div
              className="hero-stat-value"
              data-target={leaguePlayed}
              data-suffix={`전 ${leagueWins}승 ${leagueLosses}패`}
            >
              0전 0승 0패
            </div>
            <div className="hero-stat-label">시즌 전적</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value" data-target="16" data-suffix="">0</div>
            <div className="hero-stat-label">개막전 득점</div>
          </div>
        </div>
      </div>

      {latestMatch && (
        <div className="hero-result-card">
          <div className="result-header">
            <span className="result-badge">
              {latestMatch.type === 'league' ? '정규리그' : '연습경기'}
            </span>
            <span className="result-date">{latestMatch.date}</span>
          </div>
          <div className="result-teams">
            <div className="result-team">
              <div className="result-team-logo home">K</div>
              <div className="result-team-name">KFA</div>
            </div>
            <div className="result-score">{latestMatch.score}</div>
            <div className="result-team">
              <div className="result-team-logo away">{latestMatch.opponent.charAt(0)}</div>
              <div className="result-team-name">{latestMatch.opponent}</div>
            </div>
          </div>
          <div className="result-type">{resultLabel}</div>
          {latestMatch.mvp && (
            <div className="result-mvp">
              <span>MVP</span>
              <strong>{latestMatch.mvp}</strong>
            </div>
          )}
        </div>
      )}

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-line" />
        <span>SCROLL</span>
      </div>
    </section>
  );
}
