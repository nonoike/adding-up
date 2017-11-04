'use strict';
// モジュール呼び出し
const fs = require('fs');
const readline = require('readline');

// ファイル読み込み
const rs = fs.ReadStream('./popu-pref.csv');
const rl = readline.createInterface({ 'input': rs, 'output': {} });

// lineイベントが発生したら処理をする
rl.on('line', (lineString) => {
    console.log(lineString);
})

// ストリームに情報を流す
rl.resume();
