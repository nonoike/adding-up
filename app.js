'use strict';
// モジュール呼び出し
const fs = require('fs');
const readline = require('readline');

// ファイル読み込み
const rs = fs.ReadStream('./popu-pref.csv');
const rl = readline.createInterface({ 'input': rs, 'output': {} });

const prefectureAndAggregate = new Map(); // key: 都道府県, value: 集計結果オブジェクト */
// lineイベントが発生したら処理をする
rl.on('line', (lineString) => {
    // 行をカンマで分割し、必要なカラムを保持する
    const columns = lineString.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[2];
    const population = parseInt(columns[7]);
    // 対象データを絞り込む
    if (year !== 2010 && year !== 2015) {
        return;
    }

    // 新規都道府県の判別
    let aggregate = prefectureAndAggregate.get(prefecture);
    if (!aggregate) {
        aggregate = {
            population2010: 0,
            population2015: 0,
            changeRate: null
        };
    }

    // 人口集計
    if (year === 2010) {
        aggregate.population2010 += population;
    }
    if (year === 2015) {
        aggregate.population2015 += population;
    }

    // 集計結果を追加もしくは置換
    prefectureAndAggregate.set(prefecture, aggregate);
});

// ストリームに情報を流す
rl.resume();

// 最終結果の表示
rl.on('close', () => {
    // 変化率の計算
    for (let pair of prefectureAndAggregate) { // 中身をofの前の変数に代入してloop
        const aggregate = pair[1]; // [0]: key, [1]: value
        aggregate.changeRate = aggregate.population2015 / aggregate.population2010;
    }

    // データのソート
    const rankingArray = Array.from(prefectureAndAggregate)
        .sort((pair1, pair2) => { // 大を前にしたいなら正の整数
            if (pair1[1].changeRate < pair2[1].changeRate) return 1;
            if (pair2[1].changeRate < pair1[1].changeRate) return -1;
            return 0;
        });

    // フォーマット
    const rankingStrings = rankingArray.map((pair) => {
        return pair[0] + ': ' + pair[1].population2010 + ' => ' + pair[1].population2015 + ' 変化率: ' + pair[1].changeRate;
    });

    // 出力
    console.log(rankingStrings);
});
