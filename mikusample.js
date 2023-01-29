const names = [
  //架空の受講生リスト
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "い",
  "ろ",
  "は",
  "に",
  "ほ",
];
console.log("check number: ", names.length); //全31名
const fixNum = 30; //パターン数

// ペア作成用の関数
function makePair(people) {
  let result = [];
  let index = 0;
  while (index < fixNum) {
    // index は人数の半数未満で設定すること
    let list = [];
    let innerCounter = 0;
    for (let i = 0; i < people.length; i++) {
      let pair = [];
      //ペア一人目
      pair.push(people[i]);
      //ペア二人目
      if (people[index + i + 1] !== undefined) {
        pair.push(people[index + i + 1]);
      } else {
        pair.push(people[innerCounter]);
        innerCounter++;
      }

      list.push(pair);
    }
    result.push(rmDeplication(list)); // ヘルパー関数で重複を削除する
    index++;
  }
  return result;
}

//組み合わせから重複を削除する関数
function rmDeplication(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < 1; k++) {
      if (
        result.flat().indexOf(arr[i][0]) === -1 &&
        result.flat().indexOf(arr[i][1]) === -1
      ) {
        result.push(arr[i]);
      }
    }
  }
  return result;
}

// 補正用の関数
function fixPair(arr, people) {
  for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < people.length; k++) {
      if (arr[i].flat().indexOf(people[k]) === -1) {
        let setRandomNum = (arr, elem) => {
          //グループが最大でも3名以下になるよう再起的に調整
          let randomNum = Math.floor(Math.random() * arr.length);
          if (arr[randomNum].length < 3) {
            arr[randomNum].push(elem);
            return;
          } else {
            setRandomNum(arr, elem);
          }
        };
        setRandomNum(arr[i], people[k]);
      }
    }
  }
  return arr;
}

console.log(fixPair(makePair(names), names));


//重複メンバーの有無をテストする関数
function checkDepMember(arr) {
  let container = {};
  for (const elem of arr) {
    if (container[elem] === undefined) {
      container[elem] = 0;
    }
    container[elem]++;
  }
  for (const key in container) {
    if (container[key] > 1) {
      return false;
    }
  }
  return true;
}

//重複ペアの有無をテストする関数
function checkDepPair(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < arr.length; k++) {
      if (i !== k) {
        if (JSON.stringify(arr[i]) === JSON.stringify(arr[k])) {
          return false;
        }
      }
    }
  }
  return true;
}

//テストを実行する関数
function test(target) {
  for (const elem of target) {
    console.log("checkDepMember: ", checkDepMember(elem));
    console.log("checkDepPair: ", checkDepPair(elem));
  }
}
test(fixPair(makePair(names), names));