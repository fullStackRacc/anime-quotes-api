//Variables
let radioVariable = "";
let inputVariable = "";
let arrPosition = 0;
let jsonData = {};
let url = "https://animechan.xyz/api/"
const anime = document.querySelector(".anime")
const character = document.querySelector(".character")
const quote = document.querySelector(".quote")

//Check which radio button is pushed
function displayRadioValue() {
  let element = document.getElementsByName('quote-type');
  for (let i = 0; i < element.length; i++) {
    if(element[i].checked) {
      radioVariable = element[i].value;
    }
  }

}

//Fetch Quote Function 
function getQuote(url) {
  console.log(url)
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      jsonData = data;
      console.log(data)
      if (Array.isArray(data)) {
        console.log("is an array")
        pushQuoteArray(data);
      } else {
        console.log("is not an array")
        pushRandomQuote(data);
      }
    })
    .catch(err => {
      anime.innerText = "Do not understand the input!";
      character.innerText = "";
      quote.innerText = "";
  });
}

function pushRandomQuote(data) {
  anime.innerText = data.anime;
  character.innerText = data.character;
  quote.innerText = data.quote;
}

function pushQuoteArray(data) {
  if (data.length > 1) {
  anime.innerText = data[arrPosition].anime;
  character.innerText = data[arrPosition].character;
  quote.innerText = data[arrPosition].quote;
  } else {
    anime.innerText = data[0].anime;
    character.innerText = data[0].character;
    quote.innerText = data[0].quote;
  }

}

//Choose which method to run depending on what radio button is checked and the input
function checkInputs() {
  inputVariable = document.querySelector('#text').value.toLowerCase();
  

  if (radioVariable === 'random') {
    getQuote(`${url}random`);
  } else if (radioVariable === 'anime' && inputVariable !== "") {
    console.log(inputVariable)
    getQuote(`${url}quotes/anime?title=${encodeURI(inputVariable)}`);
  } else if (radioVariable === 'character' && inputVariable !== "") {
    getQuote(`${url}quotes/character?name=${encodeURI(inputVariable)}`);
  } else {
    anime.innerText = "Do not understand the input!";
    character.innerText = "";
    quote.innerText = "";
  }
}

function cycleQuotes() {
  if(arrPosition < jsonData.length - 1) {
    arrPosition++;
    checkInputs();
  } else {
    arrPosition = 0;
    checkInputs();
  }
}

function showAllAnime() {
  fetch('https://animechan.vercel.app/api/available/anime')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      console.log(data.length)
      anime.innerText = 'All Available Anime';
      character.innerText = "List Below";
      quote.innerText = "";
      for (let i = 0; i < data.length; i++) {
        quote.innerText += `${data[i]}, `
      }
  })
  .catch(err => {
    anime.innerText = "Do not understand the input!";
    character.innerText = "";
    quote.innerText = "";
  });
}

document.querySelector('#getQuote').addEventListener('click', checkInputs);
document.querySelector('#cycleQuote').addEventListener('click', cycleQuotes);
document.querySelector('#showAll').addEventListener('click', showAllAnime);
