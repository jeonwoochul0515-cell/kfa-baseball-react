// KFA 프랜차이즈 야구단 실제 데이터 (카카오톡 단체방 기반)

export interface Player {
  name: string;
  number: string;
  position: string;
  brand: string;
  height: number;
  topSize: number;
  bottomSize: number;
  capSize: number;
  role?: string;
}

export interface Staff {
  name: string;
  role: string;
  brand: string;
  description: string;
}

export interface MatchResult {
  date: string;
  opponent: string;
  score: string;
  result: 'win' | 'loss' | 'draw';
  type: 'league' | 'practice';
  venue: string;
  mvp?: string;
  highlights?: string[];
}

export interface ScheduleItem {
  date: string;
  time: string;
  opponent: string;
  venue: string;
  type: 'league' | 'practice';
}

export interface Sponsor {
  name: string;
  person: string;
  contribution: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: string;
}

// 운영진
export const staff: Staff[] = [
  { name: '김영환', role: '회장', brand: '사해방', description: '한국프랜차이즈산업협회 부산울산경남지회 회장' },
  { name: '신영호', role: '단장', brand: '나눔에프씨 / 기찰반점', description: '야구단 총괄 운영' },
  { name: '송창진', role: '감독', brand: '국밥의모든것 / 도울필', description: '팀 전략 및 경기 지휘' },
  { name: '김길하', role: '수석코치', brand: '기라디자인', description: '기술지도, 장비관리, 영상촬영/편집' },
  { name: '문승우', role: '코치', brand: '더상자', description: '투수훈련, 수비포메이션 지도 (前 선수출신)' },
  { name: '이성현', role: '총무', brand: '라온리원', description: '회계관리, 선수등록, 게임원 관리' },
  { name: '김시운', role: '부총무', brand: '하루솥밥', description: '경기장 준비, 물품관리' },
];

// 선수단 로스터
export const players: Player[] = [
  { name: '유종우', number: '18', position: '내야수', brand: '올바로갈비', height: 175, topSize: 120, bottomSize: 36, capSize: 60, role: '총무' },
  { name: '이서한', number: '777', position: '외야수', brand: '세융푸드', height: 173, topSize: 105, bottomSize: 32, capSize: 58 },
  { name: '최준익', number: '925', position: '내야수', brand: '늘바다품애', height: 186, topSize: 135, bottomSize: 36, capSize: 60, role: '장신 파워히터' },
  { name: '오상윤', number: '536', position: '내야수', brand: '장수그룹', height: 181, topSize: 125, bottomSize: 33, capSize: 62 },
  { name: '임진흥', number: '10', position: '내야수', brand: '명태정가', height: 182, topSize: 125, bottomSize: 37, capSize: 58 },
  { name: '손정호', number: '77', position: '외야수', brand: '돌판화주', height: 179, topSize: 120, bottomSize: 35, capSize: 58 },
  { name: '이주환', number: '300', position: '내야수', brand: '호맥', height: 173.6, topSize: 110, bottomSize: 32, capSize: 58, role: '2루수, 열정맨' },
  { name: '김태용', number: '02', position: '외야수', brand: '바로주방', height: 171, topSize: 115, bottomSize: 34, capSize: 60, role: '유니폼 협찬' },
  { name: '신종현', number: '33', position: '내야수', brand: '이음푸드', height: 180, topSize: 115, bottomSize: 33, capSize: 62 },
  { name: '김기수', number: '246', position: '투수', brand: '공감부동산', height: 165, topSize: 115, bottomSize: 33, capSize: 60 },
  { name: '양지혁', number: '92', position: '외야수', brand: '미식가의우동', height: 188, topSize: 115, bottomSize: 34, capSize: 60, role: '최고 스윙폼' },
  { name: '노승환', number: '13', position: '외야수', brand: '호떡여장군', height: 177, topSize: 120, bottomSize: 34, capSize: 58 },
  { name: '추승우', number: '0', position: '내야수', brand: '소장각', height: 175, topSize: 135, bottomSize: 40, capSize: 60, role: '총무' },
  { name: '김태병', number: '109', position: '포수', brand: '고기재이', height: 178, topSize: 120, bottomSize: 35, capSize: 60, role: '주전 포수' },
  { name: '전우철', number: '99', position: '외야수', brand: '청송종합식품', height: 176, topSize: 115, bottomSize: 34, capSize: 58 },
  { name: '최정환', number: '27', position: '투수', brand: '디에이블', height: 180, topSize: 120, bottomSize: 35, capSize: 60, role: '투수겸 타자' },
  { name: '안동석', number: '26', position: '내야수', brand: '금보물산', height: 168, topSize: 105, bottomSize: 34, capSize: 58, role: '개막전 MVP' },
  { name: '이성욱', number: '25', position: '내야수', brand: '', height: 172, topSize: 110, bottomSize: 36, capSize: 60 },
  { name: '김민성', number: '8', position: '외야수', brand: '푸른뜨레', height: 175, topSize: 115, bottomSize: 32, capSize: 59 },
  { name: '김범준', number: '69', position: '내야수', brand: '푸줏간', height: 177, topSize: 115, bottomSize: 33, capSize: 58, role: '수비 안정감' },
  { name: '마경득', number: '9', position: '외야수', brand: '화반', height: 175, topSize: 115, bottomSize: 34, capSize: 60 },
  { name: '전하진', number: '47', position: '내야수', brand: 'JJ푸드빌', height: 178, topSize: 115, bottomSize: 34, capSize: 58 },
  { name: '박태우', number: '34', position: '외야수', brand: '명성가', height: 178, topSize: 120, bottomSize: 35, capSize: 60 },
  { name: '정영섭', number: '4', position: '내야수', brand: '케이닥', height: 180, topSize: 120, bottomSize: 36, capSize: 60, role: '4번타자 후보' },
  { name: '석용호', number: '0', position: '명예회원', brand: '', height: 175, topSize: 110, bottomSize: 33, capSize: 58, role: '포카리스웨트 1년 찬조' },
  { name: '김형민', number: '93', position: '외야수', brand: '도조도모', height: 170, topSize: 115, bottomSize: 33, capSize: 58, role: '95% 참석 목표' },
  { name: '문승우', number: '00', position: '투수', brand: '더상자', height: 180, topSize: 115, bottomSize: 34, capSize: 60, role: '코치겸 선수 (선출, 나풀)' },
  { name: '김영환', number: '72', position: '외야수', brand: '사해방', height: 178, topSize: 120, bottomSize: 35, capSize: 60, role: '회장' },
  { name: '김길하', number: '7', position: '내야수', brand: '기라디자인', height: 175, topSize: 115, bottomSize: 33, capSize: 60, role: '코치겸 선수' },
  { name: '이성현', number: '1', position: '내야수', brand: '라온리원', height: 178, topSize: 115, bottomSize: 33, capSize: 60, role: '총무겸 마스터' },
  { name: '김시운', number: '3', position: '내야수', brand: '하루솥밥', height: 175, topSize: 110, bottomSize: 32, capSize: 58, role: '부총무' },
  { name: '송창진', number: '888', position: '내야수', brand: '국밥의모든것', height: 175, topSize: 120, bottomSize: 35, capSize: 60, role: '감독' },
];

// 경기 결과 (게임원 동기화 + 수동 보완)
export const matchResults: MatchResult[] = [
  {
    date: '2026-03-21',
    opponent: '골드문',
    score: '16 : 6',
    result: 'win',
    type: 'league',
    venue: '삼락생태공원 야구장',
    mvp: '안동석',
    highlights: [
      '창단 첫 공식 리그전 콜드승!',
      'MVP 안동석 - 안타와 병살 플레이 혼신',
      '16점 다득점 콜드 승리',
      '포카리스웨트 찬조 (석용호 대표)',
      '바로주방 김태용 대표 회식비 찬조',
    ]
  },
  {
    date: '2026-03-08',
    opponent: '연습경기 상대팀',
    score: '14 : 6',
    result: 'win',
    type: 'practice',
    venue: '화명생태공원 야구장 B',
    highlights: [
      '시즌 전 첫 연습경기 대승',
      '실전 감각 확인',
    ]
  },
];

// 향후 일정
export const schedule: ScheduleItem[] = [
  { date: '2026-12-19', time: '12:00', opponent: '철도공사(치포치포)', venue: '삼락A구장', type: 'league' },
  { date: '2026-11-14', time: '13:30', opponent: '대한제강', venue: '삼락A구장', type: 'league' },
  { date: '2026-10-10', time: '07:00', opponent: '스틸파워', venue: '삼락A구장', type: 'league' },
  { date: '2026-09-19', time: '13:00', opponent: '코레일 어드밴스', venue: '삼락A구장', type: 'league' },
  { date: '2026-09-12', time: '12:00', opponent: '부산항보안공사', venue: 'BPA야구장', type: 'league' },
  { date: '2026-08-15', time: '13:00', opponent: 'TEAM.PSO', venue: '삼락A구장', type: 'league' },
  { date: '2026-08-01', time: '11:00', opponent: '임팩트', venue: '삼락A구장', type: 'league' },
  { date: '2026-07-25', time: '13:00', opponent: '부산구치소 가이더스', venue: '삼락A구장', type: 'league' },
  { date: '2026-06-27', time: '14:00', opponent: '김해레전드 (토)', venue: 'BPA야구장', type: 'league' },
  { date: '2026-05-30', time: '11:30', opponent: '뷰글러스 야구단', venue: '삼락A구장', type: 'league' },
  { date: '2026-05-02', time: '13:30', opponent: 'W.B', venue: '삼락A구장', type: 'league' },
  { date: '2026-04-18', time: '13:30', opponent: '더스틴', venue: '삼락A구장', type: 'league' },
  { date: '2026-04-04', time: '11:30', opponent: '벙커스', venue: '삼락A구장', type: 'league' },
];

// 스폰서
export const sponsors: Sponsor[] = [
  { name: '바로주방시스템', person: '김태용 대표', contribution: '유니폼 협찬 100만원, 회식비 찬조' },
  { name: '동아오츠카', person: '석용호 대표 연결', contribution: '포카리스웨트 1년 찬조' },
  { name: '금보물산', person: '안동석 대표', contribution: '회식비 찬조' },
  { name: '기라디자인', person: '김길하 대표', contribution: '야구단 로고/디자인 전담, 장비 개인 투자 84만원' },
  { name: '올바로갈비', person: '유종우 대표', contribution: '창단식 및 회식 장소 제공' },
];

// 연혁
export const timeline: TimelineEvent[] = [
  { date: '2025.11.27', title: '야구단 창단', description: '한국프랜차이즈산업협회 부울경지회 KFA 프랜차이즈 야구단 창단. 송창진 감독 초대 30명 모집 완료.', icon: '🎉' },
  { date: '2025.12.06', title: '창단 첫 연습', description: '김해시 상동면 대감리에서 창단기념 첫 야외 연습. 포지션 테스트 및 시합 진행.', icon: '⚾' },
  { date: '2025.12.19', title: '양산 실내연습', description: '양산 와니엘배팅센터에서 첫 실내 연습. 문승우 코치의 투수/타격 레슨.', icon: '🏟️' },
  { date: '2025.12.29', title: '유니폼 도착', description: 'KFA 프랜차이즈 야구단 공식 유니폼 도착! 빨간색 상의, 스냅백 모자.', icon: '👕' },
  { date: '2026.01.04', title: '신년 첫 연습', description: '삼락 B구장에서 26년 첫 연습. 캐치볼 및 기초훈련.', icon: '🌅' },
  { date: '2026.01.10', title: '첫 청백전', description: '김해시 상동면에서 자체 청백전 실시. 포지션 확립 및 실전 경험.', icon: '🆚' },
  { date: '2026.02.03', title: '기습 특별훈련', description: '사상 양사장베이스볼에서 비공식 소규모 기습훈련 실시.', icon: '🕶️' },
  { date: '2026.02.10', title: '감독자 회의 참석', description: '영도구청에서 리그 감독자 회의. 4부 2개조 운영, 나풀(81년생~) 규정 확인.', icon: '📋' },
  { date: '2026.03.08', title: '연습경기 대승', description: '화명생태공원 야구장B에서 연습경기 14:6 대승!', icon: '🏆' },
  { date: '2026.03.21', title: '리그 개막전 콜드승!', description: 'vs 골드문 16:6 콜드 대승! MVP 안동석. 창단 첫 공식전 승리!', icon: '🔥' },
];

// 팀 기본 정보
export const teamInfo = {
  name: 'KFA 프랜차이즈 야구단',
  fullName: '한국프랜차이즈산업협회 부산울산경남지회 KFA 프랜차이즈 야구단',
  league: '낙동강변토요리그 4부 B조',
  founded: '2025년 11월 27일',
  homeGround: '삼락생태공원 야구장',
  address: '부산 사상구 삼락동',
  totalMembers: 32,
  registeredPlayers: 25,
  dues: '30만원 (입회비)',
  account: '카카오뱅크 3333230368614 (예금주: 송창진)',
  mascotConcept: '라부부 캐릭터 (KFA 띠 착용)',
  youtubeChannel: '기라튜브 (김길하 코치)',
  uniformColor: '빨간색 상의 / 흰색 하의',
  uniformMaker: 'ecomound@naver.com',
  gameRecordPlatform: '게임원 (GameOne)',
  gameOneUrl: 'https://gameone.kr/club/?club_idx=44636',
};

export interface EquipmentItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'gear' | 'uniform' | 'other';
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  lastUpdated: string;
}

// 공용 장비 내역
export const equipmentList: EquipmentItem[] = [
  { id: '1', name: '원에이티 포수미트 (중고)', price: 230000, description: '김길하 코치 선지출', category: 'gear' },
  { id: '2', name: '포수장비 (모리모토)', price: 350000, description: '헬멧 제외 전체 세트', category: 'gear' },
  { id: '3', name: '1루미트 (길드리기 포함)', price: 143000, description: '공용 1루수용', category: 'gear' },
  { id: '4', name: '대형장비 휠 가방', price: 59000, description: '팀 백', category: 'gear' },
  { id: '5', name: '도쿠마 흰색 포수헬멧', price: 60000, description: '포수 보호구', category: 'gear' },
];

// 재무 요약
export const finances: FinanceSummary = {
  totalIncome: 1000000, // 바로주방 협찬금 등
  totalExpense: 842000, // 장비 구매 합계
  balance: 158000,
  lastUpdated: '2026-03-22',
};

// 회원사 리스트 (브랜드)
export const memberCompanies = [
  '국밥의모든것', '라온리원', '돌판화주', '장수그룹', '기라디자인',
  '올바로갈비', '소장각', '화반', '늘바다품애', '미식가의우동',
  '명태정가', '기찰반점/나눔에프씨', '바로주방', '가득피자', '푸줏간',
  '하루솥밥', '공감부동산', '더상자', 'JJ푸드빌', '명성가',
  '호맥', '고기재이', '푸른뜨레', '호떡여장군', '이음푸드',
  '케이닥', '사해방', '세융푸드', '청송종합식품', '디에이블',
  '금보물산', '도조도모',
];
