'use strict';
// モジュール呼び出し
const fs = require('fs');
const readline = require('readline');

// ファイル読み込み
const rs = fs.ReadStream('./popu-pref.csv');
const rl = readline.createInterface({ 'input': rs, 'output': {} });

// lineイベントが発生したら処理をする
rl.on('line', (lineString) => {
    // 行をカンマで分割し、必要なカラムを保持する
    const columns = lineString.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[2];
    const population = parseInt(columns[7]);
    // 対象データを絞り込む
    if (year === 2010 || year === 2015) {
        console.log(year);
        console.log(prefecture);
        console.log(population);
    }
});

// ストリームに情報を流す
rl.resume();
