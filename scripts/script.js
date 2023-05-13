var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z'];

let categories = {
  fruits: [
    "Apple",
    "Blueberry",
    "Mandarin",
    "Pineapple",
    "Pomegranate",
    "Watermelon",
  ],
  animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
  countries: [
    "India",
    "Hungary",
    "Kyrgyzstan",
    "Switzerland",
    "Zimbabwe",
    "Dominica",
  ],
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


// neccessarry variables 
let chosenCategory;
let count = 0;
let rightToTry = 7;
let wordObject;


// display categories
function displayCategories() {
  categoriesContainer.innerHTML = `<h3 class='text-2xl text-orange-600 text-center'>Categories:</h3>`
  const buttonContainer = document.createElement('div');

  for (let cat in categories) {
    buttonContainer.innerHTML += `<button class='categories px-6 py-3 focus:ring-orange-600 focus:ring-4 text-orange-600 border border-orange-600 rounded-lg bg-transparent hover:bg-orange-600 ease-in duration-300 hover:text-[#C1D72E] mr-3'>${cat[0].toUpperCase() + cat.slice(1, cat.length)}</button>`
    categoriesContainer.appendChild(buttonContainer)
  }
  let categoriesBtns = document.querySelectorAll('.categories');
  categoriesBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      bottomButtons.classList.remove('hidden');
      if (e.target.innerText === 'Fruits') {
        chosenCategory = e.target.innerText.toLowerCase();
        selectedCategory.innerHTML = `<h3 class='text-2xl text-orange-600 text-center'>The Chosen Category is ${e.target.innerText}</h3>`;
        // generateWord(chosenCategory);
        genareteLetters(generateWord(chosenCategory));
        remainingRight(rightToTry);
        canvasContainer.classList.remove('hidden');
        categoriesContainer.style.display = 'none';
        displayGeneratedWord(generateWord(chosenCategory))
      } else if (e.target.innerText === 'Animals') {
        chosenCategory = e.target.innerText.toLowerCase();
        selectedCategory.innerHTML = `<h3 class='text-2xl text-orange-600 text-center'>The Chosen Category is ${e.target.innerText}</h3>`
        genareteLetters(generateWord(chosenCategory));
        remainingRight(rightToTry);
        categoriesContainer.style.display = 'none';
        canvasContainer.classList.remove('hidden');
        displayGeneratedWord(generateWord(chosenCategory))
      } else {
        chosenCategory = e.target.innerText.toLowerCase();
        selectedCategory.innerHTML = `<h3 class='text-2xl text-orange-600 text-center'>The Chosen Category is ${e.target.innerText}</h3>`
        genareteLetters(generateWord(chosenCategory));
        remainingRight(rightToTry);
        categoriesContainer.style.display = 'none';
        canvasContainer.classList.remove('hidden');
        displayGeneratedWord(generateWord(chosenCategory))
      }
    })
  })
}


// generator of letter buttons
function genareteLetters(chosenWord) {
  console.log(chosenWord);
  for (let alp of alphabet) {
    const letterBtn = document.createElement('button');
    letterBtn.id = alphabet.indexOf(alp);
    letterBtn.innerText = alp;
    letterBtn.classList.add('text-[#C1D72E]', 'px-6', 'py-3', 'bg-orange-600', 'border', 'border-orange-600', 'hover:bg-transparent', 'hover:text-orange-600', 'rounded-lg');
    letterContainer.appendChild(letterBtn);
    letterClickHandler(letterBtn, chosenWord)
  }
}


// letter buttons onclick event 
function letterClickHandler(letterButton, chosenWordArr) {
  letterButton.addEventListener('click', e => {
    e.target.disabled = true;

    if (chosenWordArr.some(item => item.letter === e.target.textContent)) {
      const clicked = chosenWordArr.find(item => item.letter === e.target.textContent)
      clicked.include = true
      displayGeneratedWord(chosenWordArr)

    } else if (chosenWordArr.some(item => item.letter !== e.target.textContent)) {
      count++;
      rightToTry--;

      if (rightToTry === 1) {
        remainContainer.innerHTML = `The remaining right '${rightToTry}' <br>
        It is your last chance be careful!`
        drawMan(count)
      } else {
        remainingRight(rightToTry)
        drawMan(count)
      }
      if (count > 6) {
        const word = chosenWordArr.map(item => item.letter.toUpperCase());
        remainContainer.innerHTML = `
      <h1 class='text-2xl text-orange-500 text-center px-5 font-bold'> <strong>You Lost. The word was ${word.join('')} </strong> <br> If you would like to play again please click on Play Again button!
      `;
        const x = letterContainer.childNodes;
        x.forEach(item => item.disabled = true)
        canvass.style.display = 'none'
      }
    }
  })
}


// remaining right displayer
function remainingRight(remainRight) {
  remainContainer.innerHTML = `The remaining right: ${remainRight}`
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
const letter = document.createElement('span');
const underscopes = document.createElement('span');

// displayer of generated word's
function displayGeneratedWord(wordObject) {
  wordObject.forEach((item, i) => {
    underscopes.id = i;
    underscopes.textContent += ` ___ `;
    underscopes.classList.add('text-orange-500', 'font-bold', 'drop-shadow-md')
    chosenWordContainer.appendChild(underscopes)
    if (item.include === true) {
      underscopes.textContent = item.letter
    } 

  })
}



//
//
// Hangman canvas generator (took from w3school)
function canvasGenerator() {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.fillStyle = 'green';
  context.strokeStyle = "#EA580C";
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
})


//functions runs
displayCategories();
canvasGenerator().initialDrawing();


