//
// ===============================
// CRYPTO TERMINAL 🚀
// FULL script.js
// ===============================
//



// -------------------------------
// ТЕКУЩАЯ МОНЕТА
// -------------------------------

let currentCoin = "bitcoin";




// -------------------------------
// HTML ЭЛЕМЕНТЫ
// -------------------------------

// цена
const priceDiv =
  document.getElementById("price");


// название монеты
const coinName =
  document.getElementById("coin-name");


// AI SIGNAL
const signalDiv =
  document.getElementById("signal");


// confidence
const confidenceDiv =
  document.getElementById("confidence");


// sentiment
const sentimentDiv =
  document.getElementById("sentiment");




// -------------------------------
// ГРАФИК
// -------------------------------

// canvas
const ctx =
  document.getElementById("chart");


// массив времени
const labels = [];


// массив цен
const prices = [];




// -------------------------------
// СОЗДАЕМ CHART.JS
// -------------------------------

const chart = new Chart(ctx, {

  type: "line",

  data: {

    labels: labels,

    datasets: [

      {

        label: "Price USD",

        data: prices,

        borderWidth: 3,

        tension: 0.3
      }
    ]
  },

  options: {

    responsive: true
  }
});




// ===============================
// ЗАГРУЗКА ЦЕНЫ
// ===============================

async function loadPrice() {

  // API URL
  const url =
    `https://api.coingecko.com/api/v3/simple/price?ids=${currentCoin}&vs_currencies=usd`;



  // fetch запрос
  const response =
    await fetch(url);



  // JSON
  const data =
    await response.json();




  // цена монеты
  const price =
    data[currentCoin].usd;




  // отображаем цену
  priceDiv.innerHTML =
    "$" + price;




  // название монеты
  coinName.innerHTML =
    currentCoin.toUpperCase();




  // текущее время
  const time =
    new Date().toLocaleTimeString();




  // добавляем данные в график
  labels.push(time);

  prices.push(price);




  // ограничиваем график
  if (prices.length > 15) {

    labels.shift();

    prices.shift();
  }




  // обновляем график
  chart.update();
}




// ===============================
// AI SIGNAL
// ===============================

async function loadSignal() {

  // Python server URL
  const url =
    `http://127.0.0.1:8000/signal/${currentCoin}`;




  // запрос к Python
  const response =
    await fetch(url);




  // JSON
  const data =
    await response.json();




  // отображаем сигнал
  signalDiv.innerHTML =
    `${data.signal} ${data.coin}`;




  // confidence
  confidenceDiv.innerHTML =
    `Confidence: ${data.confidence}%`;




  // sentiment
  sentimentDiv.innerHTML =
    `Sentiment: ${data.sentiment}`;





  // цвет BUY
  if (data.signal === "BUY") {

    signalDiv.style.color =
      "#00ff99";
  }



  // цвет SELL
  else if (data.signal === "SELL") {

    signalDiv.style.color =
      "red";
  }



  // HOLD
  else {

    signalDiv.style.color =
      "orange";
  }
}




// ===============================
// СМЕНА МОНЕТЫ
// ===============================

function changeCoin(coin) {

  // новая монета
  currentCoin = coin;




  // очищаем график
  labels.length = 0;

  prices.length = 0;




  // загружаем новую цену
  loadPrice();




  // загружаем AI сигнал
  loadSignal();
}




// ===============================
// ПЕРВЫЙ ЗАПУСК
// ===============================

// первая загрузка
loadPrice();


// AI
loadSignal();




// ===============================
// АВТООБНОВЛЕНИЕ
// ===============================

// обновляем цену каждые 5 сек
setInterval(loadPrice, 5000);


// обновляем AI каждые 10 сек
setInterval(loadSignal, 10000);


