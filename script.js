const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");

const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const rate_El = document.getElementById("rate");
const swap = document.getElementById("swap");

//Fetch Exchange Rates and updates DOM
function calculate() {
  console.log("Cal method called");

  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`).then((res) =>
    res.json().then((data) => {
      console.log(data);

      const rate = data.rates[currency_two];
      console.log(rate);
      rate_El.innerText = `1 ${currency_one} = ${rate} ${currency_two} `;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    })
  );

  //Fetch is browser method to make HTTP calls. By default is Get method
  // For POST method
  // fetch("items.json",{
  //     method:postMessage,
  //     headers:{
  //         "content-type:application/header"
  //     }
  // })
  //   fetch("items.json").then((res) => {
  //     res.json().then((data) => console.log(data));
  //   });
}

// Event Listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
