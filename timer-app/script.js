(function (w, d) {
    let start = d.getElementsByClassName("start")[0];
    let stop = d.getElementsByClassName("stop")[0];
    let end = d.getElementsByClassName("end")[0];
  
    start.onclick = function () {
      // 選取input的節點
      let hrValue = d.getElementsByClassName("hr")[0];
      let minValue = d.getElementsByClassName("min")[0];
      let secValue = d.getElementsByClassName("sec")[0];
      // 選取div的節點
      let hr = d.getElementsByClassName("hr")[1];
      let min = d.getElementsByClassName("min")[1];
      let sec = d.getElementsByClassName("sec")[1];
      // 總共的倒數時間
      let countdown =
        (Number(hrValue.value * 60) + Number(minValue.value)) * 60 * 1000 +
        Number(secValue.value) * 1000;
      // 如果為0，就不要把start按鈕disabled
      if (countdown !== 0) start.setAttribute("disabled", "true");
  
      let countIndex = 1; // 倒數計時任務執行次數
      let timeout = 1000; // 要間格的毫秒數
      let startTime = new Date().getTime(); // 開始執行函數時先擷取當下時間毫秒
      startCountdown(timeout); // 執行函數並把timeout傳進去
  
      function startCountdown(interval) {
        var counting = setTimeout(() => {
          // 擷取開始執行函數時的時間毫秒
          const endTime = new Date().getTime();
  
          // 偏差值，開始執行函數的時間 - (執行前的時間 + 第幾次執行*指定毫秒數)
          // 例如: 19000 - ( 15990 + 3*1000) = 10，偏差值為10ms
          const deviation = endTime - (startTime + countIndex * timeout);
          d.getElementById("clock-box-input").classList.remove("show");
          d.getElementById("clock-box-info").classList.add("show");
  
          countdown -= 1000; // 每執行一次，就減少1000毫秒
  
          // 將每次更新的剩餘毫秒數更新至div內
          hr.innerHTML = ("0" + Math.floor(countdown / (1000 * 60 * 60))).slice(
            -2
          );
          min.innerHTML = ("0" + Math.floor((countdown / 1000 / 60) % 60)).slice(
            -2
          );
          sec.innerHTML = ("0" + Math.floor((countdown / 1000) % 60)).slice(-2);
  
          countIndex++; // 執行次數紀錄
  
          console.log(`${countIndex}: 偏差${deviation}ms`); //單純紀錄每次偏差值
  
          // 每按start都是擷取Input的值來計算countdown值，所以要每次執行完都更新input的值
          // 否則按stop暫停後，再按start會從最初的值開始倒數
          hrValue.value = ("0" + Math.floor(countdown / (1000 * 60 * 60))).slice(
            -2
          );
          minValue.value = ("0" + Math.floor((countdown / 1000 / 60) % 60)).slice(
            -2
          );
          secValue.value = ("0" + Math.floor((countdown / 1000) % 60)).slice(-2);
  
          // 下一次倒數計時，傳入指定毫秒數減掉偏差值
          // 例如: 這次偏差值為10ms，那就傳入1000 - 10 = 990
          // 下次執行就會提早10ms執行
          startCountdown(timeout - deviation);
        }, interval);
        // 如果countdown已經是0，就停止計時
        if (countdown <= 0) {
          clearTimeout(counting);
        }
        // 按stop後，停止計時，並把start解除disabled
        stop.onclick = function () {
          clearTimeout(counting);
          start.removeAttribute("disabled");
        };
        // 按end後，停止計時，並把Input內的值清空
        // 另外把div隱藏，把input顯示
        end.onclick = function () {
          clearTimeout(counting);
          hrValue.value = "";
          minValue.value = "";
          secValue.value = "";
          d.getElementById("clock-box-input").classList.add("show");
          d.getElementById("clock-box-info").classList.remove("show");
        };
      }
    };
  })(window, document);
  