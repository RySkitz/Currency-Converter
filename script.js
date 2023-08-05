// Get key here: https://app.exchangerate-api.com/dashboard

const Key = "fbb760925dde831860f3abdf"
const APIKey = `https://v6.exchangerate-api.com/v6/${Key}/latest/USD`;
const fromCountry = document.getElementById("from-currency-select");
const toCountry = document.getElementById("to-currency-select");
const result = document.getElementById("Result");
const switchCurrency = document.getElementById("Switch")
const convertCurrency = document.getElementById("Convert")

currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromCountry.add(option);
}) 
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toCountry.add(option);
}) 

// Default value of the Country Selector
fromCountry.value = "PHP";
toCountry.value = "USD";

let convert = () => {
    const amount = document.getElementById("Amount").value;
    const fromCurrency = fromCountry.value;
    const toCurrency = toCountry.value;

    if(amount.length != 0){
        document.getElementById("Result").classList.add("visible");   

        fetch(APIKey)
            .then((resp) => resp.json())
            .then((data) => {
                let fromExchangeRate = data.conversion_rates
                [fromCurrency];
                let toExchangeRate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
                
                result.innerHTML = `
                    <span class="Bold"> ${amount} </span> ${fromCurrency} ${toCurrency} =   <span class="Bold"> ${convertedAmount.toFixed(2)} </span> ${toCurrency}
                `
            });
    }
    else {
        alert("Please enter amount")
    }
};

// Button where it switches the value of country 
function switchValues() {
    const tempValue = fromCountry.value;
    fromCountry.value = toCountry.value;
    toCountry.value = tempValue;
}


convertCurrency.addEventListener("click", convert);
switchCurrency.addEventListener("click", switchValues);




