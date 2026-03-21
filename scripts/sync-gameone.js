/**
 * KFA Baseball - GameOne 자동 동기화 스크립트
 *
 * 게임원에서 경기 일정/결과를 가져와 teamData.ts를 자동 업데이트합니다.
 *
 * Usage: node scripts/sync-gameone.js
 *
 * 필요 패키지: cheerio (npm install cheerio)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLUB_IDX = '44636';
const CLUB_URL = `https://gameone.kr/club/?club_idx=${CLUB_IDX}`;
const SCHEDULE_URL = `https://gameone.kr/club/info/schedule/table?club_idx=${CLUB_IDX}`;
const DATA_PATH = path.resolve(__dirname, '../src/data/teamData.ts');

function fetchHTML(url) {
  // curl -k 로 SSL 인증서 문제 우회
  const html = execSync(`curl -k -s "${url}"`, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
  return html;
}

function parseClubPage(html) {
  const $ = cheerio.load(html);
  const matches = [];

  $('li._center').each((_, li) => {
    const $li = $(li);
    const teams = [];
    const scores = [];

    $li.find('.match .team_info dt').each((_, dt) => {
      teams.push($(dt).text().trim());
    });

    $li.find('.match .score').each((_, span) => {
      const s = $(span).text().trim();
      if (s) scores.push(s);
    });

    const gameInfo = $li.find('.game_info');
    const league = gameInfo.find('dt').text().trim();
    const venue = gameInfo.find('.ground_name').text().trim();
    const dateStr = gameInfo.find('dd strong').text().trim();

    const gameLink = $li.find('a[href*="boxscore"]').attr('href') || '';
    const gameIdx = gameLink.match(/game_idx=(\d+)/)?.[1] || '';

    if (teams.length >= 2) {
      matches.push({
        teams,
        scores,
        league,
        venue,
        date: dateStr,
        gameIdx,
        hasScore: scores.length === 2 && scores.every(s => s !== ''),
      });
    }
  });

  return matches;
}

function parseSchedulePage(html) {
  const $ = cheerio.load(html);
  const games = [];

  $('table tr').each((_, tr) => {
    const $tr = $(tr);
    const tds = $tr.find('td');
    if (tds.length < 5) return;

    const dateText = $(tds[0]).text().trim();
    const league = $(tds[1]).text().trim();
    const venue = $(tds[2]).text().trim();

    const teams = [];
    const scores = [];
    $tr.find('.team_name').each((_, el) => teams.push($(el).text().trim()));
    $tr.find('.score').each((_, el) => {
      const s = $(el).text().trim();
      scores.push(s);
    });

    const statusBtn = $tr.find('.simbtn').text().trim();
    const gameLink = $tr.find('a[href*="boxscore"]').attr('href') || '';
    const gameIdx = gameLink.match(/game_idx=(\d+)/)?.[1] || '';

    if (teams.length >= 2) {
      games.push({
        date: dateText,
        league,
        venue,
        teams,
        scores,
        status: statusBtn,
        gameIdx,
        hasScore: scores.every(s => s !== ''),
      });
    }
  });

  return games;
}

function formatDate(dateStr) {
  // "03.21(토) 13:30" or "4월04일(토) 11:30" 형태
  const currentYear = new Date().getFullYear();

  // MM.DD 형태
  let match = dateStr.match(/(\d{1,2})\.(\d{1,2})/);
  if (match) {
    return `${currentYear}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
  }

  // M월DD일 형태
  match = dateStr.match(/(\d{1,2})월(\d{1,2})일/);
  if (match) {
    return `${currentYear}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
  }

  return dateStr;
}

function extractTime(dateStr) {
  const match = dateStr.match(/(\d{1,2}:\d{2})/);
  return match ? match[1] : '';
}

function getOpponent(teams) {
  return teams.find(t => !t.includes('KFA')) || teams[1] || '상대팀';
}

function determineResult(teams, scores) {
  if (scores.length !== 2) return null;
  const kfaIdx = teams.findIndex(t => t.includes('KFA'));
  if (kfaIdx === -1) return null;
  const opIdx = kfaIdx === 0 ? 1 : 0;
  const kfaScore = parseInt(scores[kfaIdx]);
  const opScore = parseInt(scores[opIdx]);
  if (isNaN(kfaScore) || isNaN(opScore)) return null;
  return {
    score: `${kfaScore} : ${opScore}`,
    result: kfaScore > opScore ? 'win' : kfaScore < opScore ? 'loss' : 'draw',
  };
}

function sync() {
  console.log('🔄 GameOne 데이터 동기화 시작...\n');

  try {
    // 1. 클럽 메인 페이지에서 최근 경기 가져오기
    console.log('📡 클럽 페이지 로딩...');
    const clubHtml = fetchHTML(CLUB_URL);
    const clubMatches = parseClubPage(clubHtml);
    console.log(`  → ${clubMatches.length}개 경기 블록 발견`);

    // 2. 일정/결과 페이지에서 전체 시즌 일정 가져오기
    console.log('📡 일정/결과 페이지 로딩...');
    const scheduleHtml = fetchHTML(SCHEDULE_URL);
    const allGames = parseSchedulePage(scheduleHtml);
    console.log(`  → ${allGames.length}개 시즌 경기 발견`);

    // 3. 완료된 경기 (스코어 있는 것)
    const completedFromClub = clubMatches.filter(m => m.hasScore);
    const completedFromSchedule = allGames.filter(g => g.hasScore);
    const completed = completedFromClub.length > 0 ? completedFromClub : completedFromSchedule;

    // 4. 예정된 경기 (스코어 없는 것)
    const upcoming = allGames.filter(g => !g.hasScore);

    console.log(`\n📊 동기화 결과:`);
    console.log(`  완료된 경기: ${completed.length}개`);
    console.log(`  예정된 경기: ${upcoming.length}개`);

    // 5. 결과 출력
    if (completed.length > 0) {
      console.log('\n✅ 경기 결과:');
      completed.forEach(m => {
        const opponent = getOpponent(m.teams);
        const r = determineResult(m.teams, m.scores);
        console.log(`  ${m.date} | vs ${opponent} | ${r ? r.score : 'N/A'} | ${r ? r.result.toUpperCase() : ''} | ${m.venue}`);
      });
    }

    if (upcoming.length > 0) {
      console.log('\n📅 예정 일정:');
      upcoming.forEach(g => {
        const opponent = getOpponent(g.teams);
        console.log(`  ${g.date} | vs ${opponent} | ${g.venue}`);
      });
    }

    // 6. teamData.ts 업데이트
    console.log('\n📝 teamData.ts 업데이트 중...');
    let data = fs.readFileSync(DATA_PATH, 'utf-8');

    // 경기 결과 업데이트
    if (completed.length > 0) {
      const matchResultsCode = completed.map(m => {
        const opponent = getOpponent(m.teams);
        const r = determineResult(m.teams, m.scores);
        if (!r) return null;
        const date = formatDate(m.date);
        return `  {
    date: '${date}',
    opponent: '${opponent}',
    score: '${r.score}',
    result: '${r.result}',
    type: 'league',
    venue: '${m.venue || '삼락생태공원 야구장'}',
  }`;
      }).filter(Boolean).join(',\n');

      if (matchResultsCode) {
        // 기존 matchResults 배열 교체
        data = data.replace(
          /export const matchResults: MatchResult\[\] = \[[\s\S]*?\n\];/,
          `export const matchResults: MatchResult[] = [\n${matchResultsCode},\n];`
        );
        console.log('  ✅ 경기 결과 업데이트 완료');
      }
    }

    // 향후 일정 업데이트
    if (upcoming.length > 0) {
      const scheduleCode = upcoming.map(g => {
        const opponent = getOpponent(g.teams);
        const date = formatDate(g.date);
        const time = extractTime(g.date);
        return `  { date: '${date}', time: '${time}', opponent: '${opponent}', venue: '${g.venue || '삼락생태공원 야구장'}', type: 'league' }`;
      }).join(',\n');

      data = data.replace(
        /export const schedule: ScheduleItem\[\] = \[[\s\S]*?\n\];/,
        `export const schedule: ScheduleItem[] = [\n${scheduleCode},\n];`
      );
      console.log('  ✅ 경기 일정 업데이트 완료');
    }

    fs.writeFileSync(DATA_PATH, data, 'utf-8');
    console.log('\n🎉 동기화 완료! teamData.ts가 업데이트되었습니다.');
    console.log('   git commit & push 하면 Vercel에서 자동 배포됩니다.');

  } catch (error) {
    console.error('❌ 동기화 실패:', error.message);
    process.exit(1);
  }
}

sync();
