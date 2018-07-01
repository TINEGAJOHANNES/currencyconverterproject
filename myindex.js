// Variables declaration
const currencycode_A = document.getElementById('currencycode-A');
const currencycode_B = document.getElementById('currencycode-B');
const convertFrom = document.getElementById('Amount-A');
const convertTo = document.getElementById('Amount-B');
const convert_button = document.getElementById('convert');
const enterAmount = document.getElementById('Enter-Amount');
let from, to ;
let countryCode = {};


//URL being fetched and results converted to json then value rounded off to 3 decimal places
const url_currencies = 'https://free.currencyconverterapi.com/api/v5/currencies';

fetch(url_currencies)
    .then(response => response.json())
        .then(({results}) => {
                        
        let currency = '';         
        
        for(o in results) {
            currency += `<option>${results[o].currencyName}</option>`;
            countryCode[results[o].currencyName] = o;            
        }
        currencycode_A.innerHTML = currency;
        currencycode_B.innerHTML = currency;                        
    });
enterAmount.addEventListener('click', () =>{
    enterAmount.value = "";
    convertFrom.value = 0;
    convertTo.value = 0;    
});

convert_button.addEventListener('click', () => {
    convertFrom.value = "loading...";
    convertTo.value = "please wait...";

    from = countryCode[currencycode_A.options[currencycode_A.selectedIndex].text];
    to = countryCode[currencycode_B.options[currencycode_B.selectedIndex].text];
    const fromTo = from+"_"+to;

    let url_convert = "https://free.currencyconverterapi.com/api/v5/convert?q="+fromTo;
    fetch(url_convert)
        .then(res => res.json())
            .then(({results}) => {
                const ratio = results[fromTo].val;
                convertFrom.value = enterAmount.value;
                convertTo.value = Math.round(convertFrom.value * ratio * 1000)/1000;//rounding off
        });

});





