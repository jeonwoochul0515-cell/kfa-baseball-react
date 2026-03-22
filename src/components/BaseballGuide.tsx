import { useState } from 'react';

const rules = [
  {
    num: '01',
    tag: '중요',
    tagColor: 'red',
    title: '인필드 플라이 룰',
    situation: '무사/1사, 주자 1·2루 또는 만루',
    desc: '내야수가 통상의 노력으로 잡을 수 있는 플라이 → 타자 자동 아웃! 내야수가 일부러 떨어뜨려 더블플레이를 방지하는 규칙.',
  },
  {
    num: '02',
    tag: '득점 기회',
    tagColor: 'green',
    title: '파울 플라이 태그업',
    situation: '파울 플라이를 야수가 잡은 상황',
    desc: '파울 플라이를 잡아도 태그업 후 진루 가능! 4부에서 이걸 아는 주자는 거의 없음. 연습하면 숨은 득점 기회!',
  },
  {
    num: '03',
    tag: '필수 암기',
    tagColor: 'red',
    title: '3스트라이크 낫아웃',
    situation: '1루 비어있거나 2아웃일 때',
    desc: '포수가 세 번째 스트라이크를 놓치면 타자주자는 1루로 뛸 수 있음. 포수는 반드시 확인 태그 또는 1루 송구 필요!',
  },
  {
    num: '04',
    tag: '주의',
    tagColor: 'blue',
    title: '주자가 타구에 맞으면?',
    situation: '주자와 타구가 접촉',
    desc: '내야수 앞에서 맞으면 → 주자 아웃, 타자 1루. 내야수를 통과한 뒤 맞으면 → 볼 인 플레이 (아웃 아님).',
  },
  {
    num: '05',
    tag: '보크',
    tagColor: 'red',
    title: '보크(Balk) 3대 유형',
    situation: '투수의 부정 동작',
    desc: '① 세트에서 완전 정지 없이 투구 ② 1루 향해 발을 떼지 않고 송구 ③ 투수판 위에서 공 떨어뜨림 → 모든 주자 1개 진루!',
  },
  {
    num: '06',
    tag: '절대 금지',
    tagColor: 'green',
    title: '글러브/모자를 던져 타구에 맞히면?',
    situation: '장비를 타구에 투척',
    desc: '규칙상 3베이스가 주어집니다! 모자도 마찬가지. 절대 장비를 던지지 마세요.',
  },
  {
    num: '07',
    tag: '어필 플레이',
    tagColor: 'blue',
    title: '타격 순서 실수',
    situation: '타순이 바뀐 경우',
    desc: '상대가 어필하면 → 해당 타자 아웃. 어필 전 다음 타자가 초구 받으면 → 그냥 통과. 4부에서 생각보다 자주 발생!',
  },
];

const positions = [
  {
    key: 'pitcher',
    icon: 'P',
    color: '#C8102E',
    title: '투수 (Pitcher)',
    subtitle: '투구 후 9번째 야수가 되는 순간',
    tips: [
      { title: 'PFP (Pitcher\'s Fielding Practice)', desc: '투구 후 반드시 수비 자세로 복귀. 4부에서 가장 큰 차이를 만드는 기본기' },
      { title: '1루 커버: 호(弧)를 그려라', desc: '1루수가 잡으러 가면 투수가 1루 베이스 커버. 직선이 아닌 호를 그리며 접근해야 베이스라인과 평행하게 달릴 수 있음' },
      { title: '번트 수비 판단', desc: '3루 쪽 번트 → 투수가 잡으면 1루 송구가 기본. 무리하게 2루 던지다 다 세이프!' },
    ],
  },
  {
    key: 'catcher',
    icon: 'C',
    color: '#1B2A4A',
    title: '포수 (Catcher)',
    subtitle: '그라운드의 지휘관',
    tips: [
      { title: '프레이밍 (Framing)', desc: '글러브를 스트라이크존 쪽으로 미세하게 당겨서 받기. 심판 판정에 실제로 영향!' },
      { title: '블로킹: 몸으로 막아라', desc: '무릎을 떨어뜨리고 글러브를 다리 사이에. 절대 글러브로 잡으려 하지 말 것 — 몸으로 차단!' },
      { title: '팝업: 스핀을 기억하라', desc: '포수 뒤 팝업은 스핀 때문에 필드 쪽으로 돌아옴. 등을 필드 쪽으로 향하고 잡기!' },
    ],
  },
  {
    key: 'infield',
    icon: 'IF',
    color: '#D4A843',
    title: '내야수 공통',
    subtitle: '땅볼 처리의 기본기',
    tips: [
      { title: '땅볼 펀더멘탈 5단계', desc: '정면 이동 → 무릎 낮추기 → 글러브 바닥에 → 양손 캐치 → 스텝 & 송구' },
      { title: '포스 vs 태그 판단', desc: '포스 상황 = 베이스만 밟으면 OK. 포스가 아니면 반드시 태그! 이 판단 실수가 4부에서 가장 많음' },
      { title: '릴레이 위치의 철칙', desc: '외야 → 목표 베이스 직선 위에 서야 함. 중계수는 몸을 목표 방향으로 열고 서기' },
    ],
  },
  {
    key: 'outfield',
    icon: 'OF',
    color: '#16A34A',
    title: '외야수 (Outfielders)',
    subtitle: '첫 발이 모든 것을 결정한다',
    tips: [
      { title: '첫 발은 뒤로!', desc: '타구 소리를 듣는 순간 뒤로 빠지는 것이 기본. 앞으로 오는 건 달려와 잡을 수 있지만, 머리 위를 넘어가면 끝!' },
      { title: '크로스 오버 스텝', desc: '옆으로 갈 때 사이드 스텝은 느림! 크로스 오버 스텝으로 출발해야 속도 손실 없음' },
      { title: '백업 습관', desc: '타구가 자기 쪽이 아니어도 반드시 백업 포지션으로 이동! 좌익수→3루, 중견수→좌·우, 우익수→1루' },
      { title: '크로우 홉 (Crow Hop)', desc: '잡은 뒤 한 번 작게 점프하며 송구 자세를 만드는 기술. 어깨 부담↓ 정확도↑' },
    ],
  },
];

type SituationType = 'normal' | 'bunt' | 'runner2' | 'double' | 'steal';

const situations: Record<SituationType, { title: string; desc: string; tips: string[] }> = {
  normal: {
    title: '기본 포지셔닝',
    desc: '각 포지션은 기본 위치에서 타자 성향에 따라 미세 조정합니다.',
    tips: [
      '우타자: 전체적으로 약간 왼쪽(3루 쪽)으로 시프트',
      '좌타자: 전체적으로 약간 오른쪽(1루 쪽)으로 시프트',
      '레디 포지션: 무릎을 구부리고 체중을 앞에',
      '투수의 투구와 동시에 한 발 앞으로 스텝 (크리핑)',
    ],
  },
  bunt: {
    title: '번트 예상 상황',
    desc: '1루수와 3루수가 동시에 돌진합니다. 나머지는 베이스 커버!',
    tips: [
      '1루수: 홈 방향으로 돌진 (번트 커버)',
      '3루수: 홈 방향으로 돌진 (라인 쪽 번트)',
      '2루수 → 1루 베이스 커버',
      '유격수 → 2루 베이스 커버',
      '투수: 마운드 앞 중앙 번트 담당',
      '★ 핵심: "누가 잡든 어디로 던질지" 사전 약속!',
    ],
  },
  runner2: {
    title: '주자 2루 (무사/1사) — 전진 수비',
    desc: '내야수를 앞으로 당겨 세워 홈 송구를 우선 노립니다.',
    tips: [
      '내야수 전체를 베이스라인 앞으로 전진 배치',
      '땅볼 → 홈 송구 가능 여부 즉시 판단',
      '홈 늦으면 → 1루로 확실히 하나 잡기',
      '절대 중간에 멈추지 말 것! 던지든가 말든가!',
      '외야 플라이 시 태그업 대비 필수',
    ],
  },
  double: {
    title: '더블플레이 상황',
    desc: '주자 1루, 0-1사. 6-4-3 또는 4-6-3 병살을 노립니다.',
    tips: [
      '2루수/유격수: 2루 베이스 근처로 미리 이동',
      '땅볼 → 가장 가까운 야수가 2루로 송구',
      '2루 피벗: 베이스 밟으며 바로 1루 전송',
      '주자 슬라이딩 피하기 위한 스텝 연습 필수',
      '1루수: 3-6-3 병살 대비',
    ],
  },
  steal: {
    title: '도루 대비',
    desc: '포수의 빠른 송구와 내야수의 베이스 커버가 핵심입니다.',
    tips: [
      '포수: 빠르게 일어나며 2루 송구 (팝 타임 단축)',
      '유격수 or 2루수가 베이스 커버 (사전 약속)',
      '커버 신호: 글러브로 입 가리고 사인 교환',
      '투수: 슬라이드 스텝으로 투구 동작 단축',
      '피치아웃: 의심되면 바깥으로 빠지는 공 요청',
    ],
  },
};

const drillsTeam = [
  { title: '캐치볼 (정확한 폼)', time: '15분', desc: '4심 그립 확인, 스텝-회전-릴리즈 일관성. 대충 던지면 대충 익혀짐!' },
  { title: '땅볼 펀더멘탈', time: '15분', desc: '정면 → 글러브 다운 → 양손 캐치 → 스텝 → 송구. 반복의 왕도!' },
  { title: '플라이볼 추적', time: '10분', desc: '뒤로 빠지며 잡기 + 크로스 스텝 출발 연습. 외야수 필수 드릴!' },
  { title: 'PFP (투수 수비)', time: '10분', desc: '번트 처리, 1루 커버(호를 그리며), 컴백 라이너 반응 연습' },
  { title: '중계 플레이', time: '15분', desc: '외야→중계→홈/3루. 실전처럼 콜("컷!", "릴레이!") 포함!' },
  { title: '상황 시뮬레이션', time: '10분', desc: '"주자 2루, 1사!" 콜 → 각자 포지셔닝 → 타구에 따라 움직임' },
];

const drillsPersonal = [
  { title: '벽 던지기', desc: '벽에 공 던지고 받기 반복. 핸들링 + 반응속도 동시 향상' },
  { title: '소프트 핸드 드릴', desc: '테니스공을 맨손으로 바닥에 튀겨 잡기. 부드러운 글러브 핸들링!' },
  { title: '풋워크 래더', desc: '사다리 훈련으로 민첩성 향상. 수비 범위 확대에 직접적 효과!' },
  { title: '4심 그립 자동화', desc: '공을 꺼내는 순간 자동으로 4심 그립이 잡히도록 수백 번 반복' },
  { title: '스쿼트 & 런지', desc: '하체 근력 = 수비 범위. 일주일 3회, 각 3세트 추천' },
];

const trivias = [
  { q: '"Can of Corn"이 뭘 뜻할까?', a: '쉬운 플라이볼! 옛날 가게에서 높은 선반의 캔을 떨어뜨려 받던 것에서 유래된 표현입니다.' },
  { q: '왜 1루로 반시계 방향으로 뛸까?', a: '오른손잡이가 다수인 인류 특성상 왼쪽으로 도는 것이 더 자연스럽고, 오른손 타자의 스윙 후 자연스러운 회전 방향이기도 합니다.' },
  { q: '"Lip"이 뭔지 아시나요?', a: '내야 흙과 외야 잔디의 경계선. 여기서 타구가 튀면 예측 불가능한 바운드 발생! 이 구간에서 절대 중간 바운드로 잡지 마세요.' },
  { q: '"5.5홀" 수비란?', a: '3루수(5번)와 유격수(6번) 사이를 5.5홀이라 부릅니다. 당겨치는 우타자에게 가장 많은 안타가 나오는 구간!' },
  { q: 'MLB에서 통계상 가장 어려운 수비 플레이는?', a: '"배릴 존 타구를 3루수가 역싱글 방지하며 잡아 1루 송구" — 성공률 약 25%!' },
  { q: '역대 가장 많은 에러를 기록한 포지션은?', a: '유격수(SS)! 처리 범위가 넓고 송구 거리가 길기 때문입니다.' },
  { q: '중견수가 "콜 우선권"을 갖는 이유는?', a: '전체 외야를 조망할 수 있고, 앞으로 달려오며 잡는 것이 뒤로 빠지며 잡는 것보다 안정적이기 때문입니다.' },
];

export default function BaseballGuide() {
  const [activeSituation, setActiveSituation] = useState<SituationType>('normal');
  const [openTrivia, setOpenTrivia] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'rules' | 'positions' | 'situations' | 'drills' | 'trivia'>('rules');

  const sitData = situations[activeSituation];

  return (
    <section className="section" id="guide">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">GUIDE</span>
          <h2 className="section-title">야구 상식 & 수비 가이드</h2>
          <p className="section-desc">4부리그 선수들을 위한 규칙 상식과 수비 노하우</p>
        </div>

        {/* Tab Navigation */}
        <div className="guide-tabs">
          {[
            { key: 'rules' as const, label: '규칙 상식' },
            { key: 'positions' as const, label: '포지션별 노하우' },
            { key: 'situations' as const, label: '상황별 수비' },
            { key: 'drills' as const, label: '연습 메뉴' },
            { key: 'trivia' as const, label: '트리비아' },
          ].map(tab => (
            <button
              key={tab.key}
              className={`guide-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className="guide-content">
            <div className="guide-grid">
              {rules.map(rule => (
                <div key={rule.num} className="guide-card">
                  <div className="guide-card-num">{rule.num}</div>
                  <span className={`guide-tag guide-tag--${rule.tagColor}`}>{rule.tag}</span>
                  <h3 className="guide-card-title">{rule.title}</h3>
                  <div className="guide-card-situation">{rule.situation}</div>
                  <p className="guide-card-desc">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Positions Tab */}
        {activeTab === 'positions' && (
          <div className="guide-content">
            {/* Interactive Field */}
            <div className="guide-field-wrap">
              <svg viewBox="0 0 600 480" className="guide-field-svg">
                {/* 외야 잔디 */}
                <path d="M 300 400 L 50 150 Q 300 -50 550 150 Z" fill="#3a7a1a" />
                {/* 내야 흙 */}
                <path d="M 300 400 L 180 280 Q 300 170 420 280 Z" fill="#c4956a" />
                {/* 내야 잔디 */}
                <path d="M 300 350 L 220 280 Q 300 210 380 280 Z" fill="#4a9c2a" />
                {/* 베이스라인 */}
                <line x1="300" y1="400" x2="180" y2="280" stroke="white" strokeWidth="1.5" opacity="0.5" />
                <line x1="300" y1="400" x2="420" y2="280" stroke="white" strokeWidth="1.5" opacity="0.5" />
                {/* 마운드 */}
                <circle cx="300" cy="310" r="12" fill="#d4a574" />
                {/* 베이스 */}
                <rect x="295" y="395" width="12" height="12" fill="white" transform="rotate(45,301,401)" />
                <rect x="413" y="275" width="12" height="12" fill="white" transform="rotate(45,419,281)" />
                <rect x="295" y="185" width="12" height="12" fill="white" transform="rotate(45,301,191)" />
                <rect x="175" y="275" width="12" height="12" fill="white" transform="rotate(45,181,281)" />
                {/* 선수 위치 */}
                <circle cx="300" cy="310" r="16" fill="#C8102E" opacity="0.9" />
                <text x="300" y="315" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">P</text>
                <circle cx="300" cy="430" r="16" fill="#1B2A4A" opacity="0.9" />
                <text x="300" y="435" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">C</text>
                <circle cx="400" cy="290" r="16" fill="#D4A843" opacity="0.9" />
                <text x="400" y="295" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">1B</text>
                <circle cx="360" cy="240" r="16" fill="#D4A843" opacity="0.9" />
                <text x="360" y="245" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">2B</text>
                <circle cx="240" cy="240" r="16" fill="#D4A843" opacity="0.9" />
                <text x="240" y="245" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">SS</text>
                <circle cx="200" cy="290" r="16" fill="#D4A843" opacity="0.9" />
                <text x="200" y="295" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">3B</text>
                <circle cx="130" cy="150" r="16" fill="#16A34A" opacity="0.9" />
                <text x="130" y="155" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">LF</text>
                <circle cx="300" cy="100" r="16" fill="#16A34A" opacity="0.9" />
                <text x="300" y="105" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">CF</text>
                <circle cx="470" cy="150" r="16" fill="#16A34A" opacity="0.9" />
                <text x="470" y="155" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">RF</text>
              </svg>
              <div className="guide-field-legend">
                <span><i style={{ background: '#C8102E' }} /> 투수</span>
                <span><i style={{ background: '#1B2A4A' }} /> 포수</span>
                <span><i style={{ background: '#D4A843' }} /> 내야수</span>
                <span><i style={{ background: '#16A34A' }} /> 외야수</span>
              </div>
            </div>

            {/* Position Details */}
            {positions.map(pos => (
              <div key={pos.key} className="guide-position">
                <div className="guide-position-header">
                  <div className="guide-position-icon" style={{ background: pos.color }}>{pos.icon}</div>
                  <div>
                    <h3 className="guide-position-title">{pos.title}</h3>
                    <p className="guide-position-sub">{pos.subtitle}</p>
                  </div>
                </div>
                <div className="guide-tips">
                  {pos.tips.map((tip, i) => (
                    <div key={i} className="guide-tip">
                      <strong>{tip.title}</strong>
                      <span>{tip.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Situations Tab */}
        {activeTab === 'situations' && (
          <div className="guide-content">
            <div className="guide-sit-btns">
              {([
                ['normal', '기본 포지셔닝'],
                ['bunt', '번트 예상'],
                ['runner2', '주자 2루'],
                ['double', '더블플레이'],
                ['steal', '도루 대비'],
              ] as [SituationType, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`guide-sit-btn ${activeSituation === key ? 'active' : ''}`}
                  onClick={() => setActiveSituation(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="guide-sit-info">
              <h4>{sitData.title}</h4>
              <p>{sitData.desc}</p>
              <ul>
                {sitData.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Cutoff Diagram */}
            <div className="guide-diagram">
              <h4>컷오프(중계) 콜 체계</h4>
              <div className="guide-cutoff-flow">
                <div className="guide-flow-step" style={{ borderColor: '#16A34A' }}>
                  <strong>외야수</strong>
                  <span>타구 포구</span>
                </div>
                <div className="guide-flow-arrow">&rarr;</div>
                <div className="guide-flow-step" style={{ borderColor: '#D4A843' }}>
                  <strong>중계수 (SS/2B)</strong>
                  <span>직선상 위치</span>
                </div>
                <div className="guide-flow-arrow">&rarr;</div>
                <div className="guide-flow-step" style={{ borderColor: '#C8102E' }}>
                  <strong>홈 / 베이스</strong>
                  <span>포수가 콜</span>
                </div>
              </div>
              <div className="guide-call-box">
                <div className="guide-call"><span className="guide-call-label">"컷!"</span> 중계수가 잡고 멈춤</div>
                <div className="guide-call"><span className="guide-call-label" style={{ background: 'var(--kfa-navy)' }}>"릴레이!"</span> 그대로 중계 송구</div>
                <div className="guide-call"><span className="guide-call-label" style={{ background: 'var(--kfa-gray-600)' }}>무음</span> 공을 그냥 보냄</div>
              </div>
            </div>
          </div>
        )}

        {/* Drills Tab */}
        {activeTab === 'drills' && (
          <div className="guide-content">
            <h3 className="guide-sub-title">팀 연습</h3>
            <div className="guide-drill-grid">
              {drillsTeam.map((d, i) => (
                <div key={i} className="guide-drill-card">
                  <h4>{d.title}</h4>
                  <span className="guide-drill-time">{d.time}</span>
                  <p>{d.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="guide-sub-title" style={{ marginTop: 40 }}>개인 연습 (집에서도 가능)</h3>
            <div className="guide-drill-grid">
              {drillsPersonal.map((d, i) => (
                <div key={i} className="guide-drill-card guide-drill-card--personal">
                  <h4>{d.title}</h4>
                  <p>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trivia Tab */}
        {activeTab === 'trivia' && (
          <div className="guide-content">
            <div className="guide-trivia-list">
              {trivias.map((t, i) => (
                <div
                  key={i}
                  className={`guide-trivia ${openTrivia === i ? 'open' : ''}`}
                  onClick={() => setOpenTrivia(openTrivia === i ? null : i)}
                >
                  <div className="guide-trivia-q">
                    <span>{t.q}</span>
                    <span className="guide-trivia-toggle">{openTrivia === i ? '−' : '+'}</span>
                  </div>
                  {openTrivia === i && <div className="guide-trivia-a">{t.a}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary Box */}
        <div className="guide-summary">
          <h3>4부리그에서 실력 차이를 만드는 핵심 4가지</h3>
          <p>화려한 플레이가 아니라 기본기의 반복입니다</p>
          <div className="guide-summary-grid">
            <div className="guide-summary-item">
              <div className="guide-summary-num">01</div>
              <strong>정면에서 잡기</strong>
              <span>공의 정면에서 양손으로</span>
            </div>
            <div className="guide-summary-item">
              <div className="guide-summary-num">02</div>
              <strong>정확한 송구</strong>
              <span>4심 그립, 스텝, 목표</span>
            </div>
            <div className="guide-summary-item">
              <div className="guide-summary-num">03</div>
              <strong>상황 판단</strong>
              <span>던지기 전에 생각하기</span>
            </div>
            <div className="guide-summary-item">
              <div className="guide-summary-num">04</div>
              <strong>백업</strong>
              <span>공이 안 와도 움직이기</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
