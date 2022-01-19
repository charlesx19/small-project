const row01 = document.getElementById("row01");
const row02 = document.getElementById("row02");
const row03 = document.getElementById("row03");
const resultBox = document.getElementById("resultBox");
const restartBtn = document.getElementById("restartBtn");
let winCount = 0;
let loseCount = 0;

function init() {
  var i = 0;
  let chanceArr = ["1", "1", "1", "1", "1", "1", "1", "1", "0", "0"];
  // let chanceArr = ["1", "1", "1", "1", "1", "0", "0", "0", "0", "0"];
  let result = getArrayItems(chanceArr, 10);
  // console.log(result)

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

  const covers = document.querySelectorAll(".card");
  covers.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const resultText = e.currentTarget.querySelector(".back").innerText;
      if (resultText == "WIN") {
        winCount++;
        resultBox.classList.add("win");
        resultBox.classList.remove("hide");
        resultBox.querySelector(".title").innerText = `${(winCount == 1) ? "成功" : winCount+"連勝" }`
      } else {
        loseCount++;
        resultBox.classList.add("lose");
        resultBox.classList.remove("hide");
        resultBox.querySelector(".title").innerText = `${(loseCount == 1 && winCount == 0) ? "失敗 " : "失敗 "+"中斷"+winCount+"連勝" }`
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

restartBtn.addEventListener("click", () => {
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
