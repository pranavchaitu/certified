'use strict';

const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


async function getTeams(year, k) {
    const map = {}
    const totalPages = await totalPagesCount(year)
    for(let i=1;i<totalPages;i++) {
        const res = await fetch(`https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${i}`)
        const { data } = await res.json()
        data.forEach(i => {
            map[i.team1] = ++map[i.team1] || 1
            map[i.team2] = ++map[i.team2] || 1
        });
    }
    let teams = [];
    for(let i in map) {
        if(map[i] >= k) {
            teams.push(i)
        }
    }
    return teams.sort()
}

async function totalPagesCount(year) {
    const res = await fetch(`https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}`)
    const { total_pages } = await res.json()
    return total_pages;
}

getTeams(2011,5).then((res) => {
    console.log(res);
})

// totalPagesCount(2015).then(res => {
//     console.log(res);
// })
// console.log(res);
// await totalPagesCount(2011)


async function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const year = parseInt(readLine().trim());
  const k = parseInt(readLine().trim());

  const teams = await getTeams(year, k);

  for (const team of teams) {
    ws.write(`${team}\n`);
  }
}

