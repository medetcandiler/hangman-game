var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z'];
let categories = {
  fruits: [
    "Apple",
    "Blueberry",
    "Mandarin",
    "Pineapple",
    "orange",
    "Watermelon",
  ],
  animals: ["Cat", "Turtles", "Squirrel", "Panther", "Snake", "Zebra"],
  countries: [
    "India",
    "Hungary",
    "Kyrgyzstan",
    "Turkey",
    "England",
    "Dominica",
  ],
};

let hints = {
  fruits: {
    Apple: [
      "Commonly used in pies and cider.",
      "Has a variety of colors, including red and green.",
      "Often paired with peanut butter.",
      "A popular fruit with a crisp texture."
    ],
    Blueberry: [
      "Small, round, and often used in muffins.",
      "Known for its antioxidant properties.",
      "A berry that is blue in color.",
      "Often included in breakfast foods like pancakes."
    ],
    Mandarin: [
      "A citrus fruit that is easy to peel.",
      "Commonly enjoyed in segments.",
      "Popular in Asian cuisine.",
      "Has a sweet and tangy flavor."
    ],
    Pineapple: [
      "Tropical fruit with a spiky outer layer.",
      "Used in both sweet and savory dishes.",
      "Commonly enjoyed in fruit salads.",
      "Contains enzymes that can tenderize meat."
    ],
    Orange: [
      "A citrus fruit known for its juicy flavor.",
      "Commonly consumed as a source of vitamin C.",
      "The color of the fruit is named after it.",
      "Can be eaten fresh or juiced."
    ],
    Watermelon: [
      "A large, green fruit with sweet red flesh.",
      "Consists mostly of water and is hydrating.",
      "A popular summertime fruit.",
      "Often enjoyed at picnics and barbecues."
    ],
  },
  animals: {
    Cat: [
      "A common household pet known for its independence.",
      "Closely associated with internet memes.",
      "Comes in various breeds, sizes, and colors.",
      "Known for grooming itself frequently."
    ],
    Turtles: [
      "Reptiles with a protective shell.",
      "Known for their slow movement on land.",
      "Can be aquatic or terrestrial.",
      "Some species are endangered."
    ],
    Squirrel: [
      "A small, bushy-tailed rodent.",
      "Known for their agility and acrobatic movements.",
      "Frequently seen climbing trees.",
      "Often gathers and stores nuts for winter."
    ],
    Panther: [
      "A large wild cat with a black coat.",
      "Found in various habitats, including rainforests.",
      "Has powerful jaws and is a skilled hunter.",
      "A symbol of strength and stealth."
    ],
    Snake: [
      "A legless reptile often feared by many.",
      "Some species are venomous, while others are not.",
      "Uses its tongue to 'smell' the environment.",
      "Sheds its skin periodically."
    ],
    Zebra: [
      "An African mammal with black and white stripes.",
      "Known for its distinctive striped coat.",
      "Found in grasslands and savannas.",
      "Each zebra has a unique stripe pattern."
    ],
  },
  countries: {
    India: [
      "A diverse country known for its rich culture.",
      "Home to the Taj Mahal and Bollywood.",
      "Has a variety of languages, religions, and traditions.",
      "The second-most populous country in the world."
    ],
    Hungary: [
      "A landlocked country in Central Europe.",
      "Famous for its thermal baths and goulash.",
      "The capital city is Budapest.",
      "Member of the European Union."
    ],
    Kyrgyzstan: [
      "A Central Asian country with mountainous terrain.",
      "Known for its nomadic traditions.",
      "Has beautiful landscapes and mountain lakes.",
      "The capital city is Bishkek."
    ],
    Turkey: [
      "A transcontinental country located mainly on the Anatolian Peninsula.",
      "Famous for its unique blend of Eastern and Western cultures.",
      "The city of Istanbul straddles two continents.",
      "Rich history with influences from the Byzantine and Ottoman Empires."
    ],
    England: [
      "A country in the United Kingdom known for its history.",
      "Home to iconic landmarks such as Big Ben and the Tower of London.",
      "Famous for its literature, including works of William Shakespeare.",
      "The capital city is London."
    ],
    Dominica: [
      "An island nation in the Caribbean with lush rainforests.",
      "Nicknamed the 'Nature Isle of the Caribbean.'",
      "Known for its biodiversity and hiking trails.",
      "The capital city is Roseau."
    ],
  },
};



// neccessary HTML elements
const letterContainer = document.querySelector('#btn-container');
const categoriesContainer = document.querySelector('#categories');
const selectedCategory = document.querySelector('#selected-category')
const resetButton = document.querySelector('#reset');
const bottomButtons = document.querySelector('#bottom-buttons');
const chosenWordContainer = document.querySelector('#chosen-word-container');
const canvasContainer = document.querySelector('#canvas-container');
const remainContainer = document.querySelector('#remain-container');
const canvass = document.querySelector('#canvas');
const header = document.querySelector('#header');
const welcome = document.querySelector('#welcome');
const hintButton = document.querySelector('#hint');
const hintPlace = document.querySelector('#hintPlace');

// neccessarry variables 
let chosenCategory;
let count = 0;
let rightToTry = 7;
let chosenWord;
let hintClickCounter = 0;

// display categories
function displayCategories() {
  categoriesContainer.innerHTML = `<h3 class='text-2xl text-orange-700 text-center'>Categories:</h3>`
  const buttonContainer = document.createElement('div');
  for (let cat in categories) {
    buttonContainer.innerHTML += `<button class='categories px-4 py-2 focus:ring-orange-600 focus:ring-4 text-orange-700 border border-orange-700 rounded-lg bg-transparent hover:bg-orange-700 ease-in duration-300 hover:text-[#C1D72E] mr-3 md:px-6 md:py-3'>${cat[0].toUpperCase() + cat.slice(1, cat.length)}</button>`
    categoriesContainer.appendChild(buttonContainer)
  }
  let categoriesBtns = document.querySelectorAll('.categories');
  categoriesBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      bottomButtons.classList.remove('hidden');
      if (e.target.innerText === 'Fruits') {
        chosenCategory = e.target.innerText.toLowerCase();
        selectedCategory.innerHTML = `<h3 class='text-2xl text-orange-700 text-center'>The Chosen Category is ${e.target.innerText}</h3>`;
        chosenWord = generateWord(chosenCategory)
        genareteLetters(chosenWord);
        displayGeneratedWord(chosenWord);
        remainingRight(rightToTry);
        canvasContainer.classList.remove('hidden');
        categoriesContainer.style.display = 'none';
        header.classList.replace('mt-24', 'mt-4');
        welcome.style.display = 'none';
      } else if (e.target.innerText === 'Animals') {
        chosenCategory = e.target.innerText.toLowerCase();
        selectedCategory.innerHTML = `<h3 class='text-2xl text-orange-700 text-center'>The Chosen Category is ${e.target.innerText}</h3>`
        chosenWord = generateWord(chosenCategory)
        genareteLetters(chosenWord);
        displayGeneratedWord(chosenWord);
        remainingRight(rightToTry);
        categoriesContainer.style.display = 'none';
        canvasContainer.classList.remove('hidden');
        welcome.style.display = 'none';
        header.classList.replace('mt-24', 'mt-4');
      } else {
        chosenCategory = e.target.innerText.toLowerCase();
        selectedCategory.innerHTML = `<h3 class='text-2xl text-orange-700 text-center'>The Chosen Category is ${e.target.innerText}</h3>`
        chosenWord = generateWord(chosenCategory)
        genareteLetters(chosenWord);
        displayGeneratedWord(chosenWord);
        remainingRight(rightToTry);
        categoriesContainer.style.display = 'none';
        canvasContainer.classList.remove('hidden');
        welcome.style.display = 'none';
        header.classList.replace('mt-24', 'mt-4');
      }
    })
  })
}

// generator of letter buttons
function genareteLetters(chosenWord) {
  for (let alp of alphabet) {
    const letterBtn = document.createElement('button');
    letterBtn.id = alphabet.indexOf(alp);
    letterBtn.innerText = alp;
    letterBtn.classList.add('text-[#C1D72E]', 'px-4', 'py-2', 'bg-orange-700', 'border', 'border-orange-700', 'hover:bg-transparent', 'hover:text-orange-700', 'rounded-lg', 'md:px-5', 'md:py-3');
    letterContainer.appendChild(letterBtn);
    letterClickHandler(letterBtn, chosenWord)
  }
}

// letters buttons click handler  
function letterClickHandler(letterButton, chosenWordArr) {
  letterButton.addEventListener('click', e => {
    // if (rightToTry <= 0) return;

    e.target.disabled = true;
    if (chosenWordArr.some(item => item.letter === e.target.textContent.toLowerCase())) {
      const clicked = chosenWordArr.find(item => item.letter === e.target.textContent)
      clicked.include = true
      displayGeneratedWord(chosenWordArr)
      updateWordArray(e.target.textContent, chosenWordArr)
      if (chosenWordArr.every(item => item.include === true)) {
        remainContainer.innerHTML = `
      <h1 class='text-xl text-orange-700 text-center px-5  mb-10 font-bold md:text-2xl'> <strong>Congratulations you have guessed the word. If you would like to play again please click on the Play Again button!
      `;
        canvass.style.display = 'none'
      }
    } else if (chosenWordArr.some(item => item.letter !== e.target.textContent.toLowerCase())) {
      count++;
      rightToTry--;
      console.log(rightToTry)
      if (rightToTry === 1) {
        remainContainer.innerHTML = `The remaining right: ${rightToTry} <br>
        It is your last chance be careful!`
        drawMan(count);
        hintButton.disabled = true
      } else if (count > 6 || rightToTry <= 0) {
        const word = chosenWordArr.map(item => item.letter.toUpperCase());
        remainContainer.innerHTML = `
      <h1 class='text-xl text-orange-700 text-center px-5  mb-10 font-bold md:text-2xl'> <strong>You Lost. The word was "${word.join('')}" </strong> <br> If you would like to play again please click on Play Again button!
      `;
        const buttons = letterContainer.childNodes;
        buttons.forEach(item => item.disabled = true)
        canvass.style.display = 'none'
      } else {
        remainingRight(rightToTry)
        drawMan(count)
      };
    }
  })
}

// remaining right displayer
function remainingRight(remainRight) {
  remainRight;
  remainContainer.innerHTML = `The remaining right: ${remainRight} `
}


// generate hangman vocabulary
function generateWord(chosenCategory) {
  const randomVocab = categories[chosenCategory][Math.floor(Math.random() * categories[chosenCategory].length)].toLowerCase();
  const randomVocabArr = randomVocab.split('');
  wordObject = randomVocabArr.map(item => {
    return {
      letter: item,
      include: false,
    }
  })
  return wordObject;
}

function displayGeneratedWord(wordArrayOfObject) {
  chosenWordContainer.innerHTML = '';
  wordArrayOfObject.forEach((item, index) => {
    let letterSpan = document.createElement('span');
    letterSpan.classList.add('text-orange-700', 'font-bold', 'drop-shadow-md','text-lg' ,'md:text-xl');

    if (item.include) {
      letterSpan.innerText = ` ${item.letter} `;
    } else {
      letterSpan.innerText = ` __ `;
    }

    letterSpan.setAttribute('data-index', index);
    chosenWordContainer.appendChild(letterSpan);
  });
}

function updateWordArray(letter, wordArrayOfObject) {
  wordArrayOfObject.forEach((item, index) => {
    if (item.letter === letter) {
      item.include = true;

      // Update all spans with the matching index
      let spans = document.querySelectorAll(`[data-index="${index}"]`);
      spans.forEach(span => {
        span.innerText = `  ${letter}  `;
      });
    }
  });
}

// Hangman canvas generator (took from w3school)
function canvasGenerator() {
  let context = canvass.getContext("2d");
  context.beginPath();
  context.fillStyle = 'green';
  context.strokeStyle = "#C1400B";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
function drawMan(count) {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasGenerator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//reset button 
resetButton.addEventListener('click', e => {
  window.location.reload()
});

// hint button
hintButton.addEventListener('click', e => {
  if (hintClickCounter < 4) {
    rightToTry--;
    hintClickCounter++;
    remainingRight(rightToTry)

    const chosenWordString = chosenWord.map(word => word.letter).join('')
    let selectedWordsHint = hints[chosenCategory][chosenWordString[0].toUpperCase() + chosenWordString.slice(1, chosenWordString.length)][hintClickCounter - 1]

    hintPlace.textContent = selectedWordsHint
    setTimeout(() => {
      hintPlace.textContent = '';
    }, 5000);

    if (hintClickCounter === 4 || rightToTry <= 1) hintButton.disabled = true;
  }

})

//functions runs
displayCategories();
canvasGenerator().initialDrawing();

