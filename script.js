// текущая монета
let currentCoin = "bitcoin";


// HTML элементы
const priceDiv = document.getElementById("price");

const coinName = document.getElementById("coin-name");


// график
const ctx = document.getElementById("chart");


// массивы
const labels = [];

const prices = [];


// создаем график
const chart = new Chart(ctx, {

  type: "line",

  data: {

    labels: labels,

    datasets: [{

      label: "Price USD",

      data: prices
    }]
  }
});




// функция загрузки цены
async function loadPrice() {

  // ссылка API
  const url =
    `https://api.coingecko.com/api/v3/simple/price?ids=${currentCoin}&vs_currencies=usd`;



  // запрос
  const response = await fetch(url);

  // JSON
  const data = await response.json();



  // цена
  const price = data[currentCoin].usd;



  // показываем цену
  priceDiv.innerHTML = "$" + price;



  // название монеты
  coinName.innerHTML =
    currentCoin.toUpperCase();



  // время
  const time =
    new Date().toLocaleTimeString();



  // добавляем данные
  labels.push(time);

  prices.push(price);



  // ограничиваем график
  if (prices.length > 15) {

    labels.shift();

    prices.shift();
  }



  // обновляем chart
  chart.update();
}




// смена монеты
function changeCoin(coin) {

  // новая монета
  currentCoin = coin;



  // очищаем старые данные
  labels.length = 0;

  prices.length = 0;



  // загрузка новой монеты
  loadPrice();
}



// первая загрузка
loadPrice();


// автообновление
setInterval(loadPrice, 5000);


