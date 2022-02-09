const ranking = document.getElementById("ranking");
const row01 = document.getElementById("row01");
const row02 = document.getElementById("row02");
const row03 = document.getElementById("row03");
const newRecordBox = document.getElementById("newRecordBox");
const newRecordInput = document.getElementById("newRecordInput");
const resultBox = document.getElementById("resultBox");
const restartBtn = document.getElementById("restartBtn");
const rankInfo = document.getElementById("rankInfo");
const rankInfo2 = document.getElementById("rankInfo2");
let winCount = 0;
let loseCount = 0;
let oldRec = 1;
let record = 1;
let newRec = false;
let recName = '';

// 一開始先抓取本機資料，有資料的話就抓取並渲染
(function getLs(){
  if (JSON.parse(localStorage.getItem('ranker')) !== null) {
    const lsData = JSON.parse(localStorage.getItem('ranker'));
    oldRec = lsData.winningStreak;
    recName = lsData.name;

    ranking.innerText = `目前紀錄: ${winCount} / 最高紀錄人 ${recName}: ${oldRec}`;
  }
})();


// 接著執行初始化，將卡牌隨機渲染
function init() {
  // 10個值隨機取出，0這個值代表失敗，所以勝率可以自己調整
  var i = 0;
  let chanceArr = ["1", "1", "1", "1", "1", "1", "1", "1", "0", "0"];
  // 將值傳送到getArrayItems函式，會得到隨機排列的新陣列
  let result = getArrayItems(chanceArr, 10);

  for (i; i < 3; i++) {
    if (result[i] == "1") {
      const item = document.createElement("label");
      item.classList.add("card");

      item.innerHTML = `
            <input type="checkbox">
            <div class="cover"></div>
            <div class="back">WIN</div>
          `;

      row01.appendChild(item);
    } else {
      const item = document.createElement("label");
      item.classList.add("card");

      item.innerHTML = `
            <input type="checkbox">
            <div class="cover"></div>
            <div class="back lose">LOSE</div>
          `;

      row01.appendChild(item);
    }
  }

  for (i; i < 7; i++) {
    // console.log(result[i]);
    if (result[i] == "1") {
      const item = document.createElement("label");
      item.classList.add("card");

      item.innerHTML = `
            <input type="checkbox">
            <div class="cover"></div>
            <div class="back">WIN</div>
          `;

      row02.appendChild(item);
    } else {
      const item = document.createElement("label");
      item.classList.add("card");

      item.innerHTML = `
            <input type="checkbox">
            <div class="cover"></div>
            <div class="back lose">LOSE</div>
          `;

      row02.appendChild(item);
    }
  }

  for (i; i < 10; i++) {
    // console.log(result[i]);
    if (result[i] == "1") {
      const item = document.createElement("label");
      item.classList.add("card");

      item.innerHTML = `
            <input type="checkbox">
            <div class="cover"></div>
            <div class="back">WIN</div>
          `;

      row03.appendChild(item);
    } else {
      const item = document.createElement("label");
      item.classList.add("card");

      item.innerHTML = `
            <input type="checkbox">
            <div class="cover"></div>
            <div class="back lose">LOSE</div>
          `;

      row03.appendChild(item);
    }
  }

  // 為每個卡牌綁上監聽事件
  const covers = document.querySelectorAll(".card");
  covers.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      // 判斷輸與贏的接續行為
      const resultText = e.currentTarget.querySelector(".back").innerText;
      if (resultText == "WIN") {
        winCount++;
        resultBox.classList.add("win");
        resultBox.classList.remove("hide");
        resultBox.querySelector(".title").innerText = `${(winCount == 1) ? "成功" : winCount+"連勝" }`;
        // 每次贏都執行一次getRecord函式判斷最高紀錄(oldRec)有無被突破
        // 突破的話會將newRec改成true
        getRecord();
      } else {
        loseCount++;
        resultBox.classList.add("lose");
        resultBox.classList.remove("hide");
        resultBox.querySelector(".title").innerText = `${(loseCount == 1 && winCount == 0) ? "失敗 " : "失敗 "+"中斷"+winCount+"連勝" }`;

        // 輸的話判斷是否為新紀錄，是的話跳出簽名框，並將原本的最高紀錄置換成目前的新紀錄
        if (newRec == true) {
          newRecordBox.classList.remove('hide');
          oldRec = record;
        }

        winCount = 0;
      }

      openCard();
    });
  });

  function openCard() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((item) => {
      item.classList.add("checked");
    });
  }

}

init();

function getRecord(){
  if (winCount == oldRec) {
    rankInfo.classList.remove('hide')
    rankInfo2.classList.remove('hide')
    rankInfo.innerText = '追平紀錄: ' + record;
    rankInfo2.innerText = '追平紀錄: ' + record;
  } else if (winCount < oldRec){
    // console.log('less'+record)
  } else if (winCount > oldRec) {
    record = winCount;
    newRec = true;
    rankInfo.classList.remove('hide')
    rankInfo2.classList.remove('hide')
    rankInfo.innerText = '新紀錄: ' + record;
    rankInfo2.innerText = '新紀錄: ' + record;
  }

  ranking.innerText = `目前紀錄: ${winCount} / 最高紀錄人 ${recName}: ${oldRec}`;
}

function reset(){
  recName = (newRecordInput.value == "") ? "NONAME" : newRecordInput.value;
  const ranker = {'name': recName, 'winningStreak': record}

  newRecordBox.classList.add('hide');
  newRecordInput.value = "";
  newRec = false;
  winCount = 0;
  restartBtn.click();
  updateLs(ranker);
}

newRecordInput.addEventListener('keydown', (e)=>{
  if(e.key == "Enter") {
    reset();
  }
});

resultBox.addEventListener('click', () => {
  restartBtn.click();
})

restartBtn.addEventListener("click", () => {
  ranking.innerText = `目前紀錄: ${winCount} / 最高紀錄人 ${recName}: ${oldRec}`;
  rankInfo.classList.add('hide');
  rankInfo2.classList.add('hide');
  newRecordBox.classList.add('hide');
  if (loseCount == 0) {
    row01.innerHTML = "";
    row02.innerHTML = "";
    row03.innerHTML = "";
    resultBox.classList.add("hide");
    init();
  } else {
    winCount = 0;
    loseCount = 0;
    row01.innerHTML = "";
    row02.innerHTML = "";
    row03.innerHTML = "";
    resultBox.classList.add("hide");
    resultBox.classList.remove("win");
    resultBox.classList.remove("lose");
    init();
  }
});


//從一個給定的陣列arr中,隨機返回num個不重複項
function getArrayItems(arr, num) {
  //新建一個陣列,將傳入的陣列複製過來,用於運算,而不要直接操作傳入的陣列;
  var temp_array = new Array();
  for (var index in arr) {
    temp_array.push(arr[index]);
  }

  //取出的數值項,儲存在此陣列
  var return_array = new Array();
  for (var i = 0; i < num; i++) {
    //判斷如果陣列還有可以取出的元素,以防下標越界
    if (temp_array.length > 0) {
      //在陣列中產生一個隨機索引
      var arrIndex = Math.floor(Math.random() * temp_array.length);
      //將此隨機索引的對應的陣列元素值複製出來
      return_array[i] = temp_array[arrIndex];
      //然後刪掉此索引的陣列元素,這時候temp_array變為新的陣列
      temp_array.splice(arrIndex, 1);
    } else {
      //陣列中資料項取完後,退出迴圈,比如陣列本來只有10項,但要求取出20項.
      break;
    }
  }
  return return_array;
}


function updateLs(newData){
  const rankData = {'name': '', 'winningStreak': 0}
  rankData.name = newData.name;
  rankData.winningStreak = newData.winningStreak;

  // 更新到LocalStorage
  localStorage.setItem('ranker', JSON.stringify(rankData))
}
