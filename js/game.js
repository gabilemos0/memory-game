const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const characters = [
  'alaric',
  'bonnie',
  'caroline',
  'damon',
  'elena',
  'elijah',
  'enzo',
  'hailey',
  'jeremy',
  'katherine',
  'klaus',
  'rebekah',
  'stefan',
  'tvd',
  'bonus'
]

const createElement = (tag, className) => {
  const element = document.createElement(tag)
  element.className = className
  return element
}

let firstCard = ''
let secondCard = ''

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabledCard')

  if (disabledCards.length === 30) {
    clearInterval(this.loop)
    alert(
      `Parabéns ${spanPlayer.innerHTML}!!! Você venceu em ${timer.innerHTML} segundos!!!`
    )
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('dataCharacter')
  const secondCharacter = secondCard.getAttribute('dataCharacter')

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabledCard')
    secondCard.firstChild.classList.add('disabledCard')

    firstCard = ''
    secondCard = ''

    checkEndGame()
  } else {
    setTimeout(() => {
      firstCard.classList.remove('revealCard')
      secondCard.classList.remove('revealCard')

      firstCard = ''
      secondCard = ''
    }, 500)
  }
}

const revealCard = ({ target }) => {
  if (
    target.parentNode.className.includes('revealCard') ||
    target.parentNode.className.includes('grid')
  ) {
    return
  }

  if (firstCard === '') {
    target.parentNode.classList.add('revealCard')
    firstCard = target.parentNode
  } else if (secondCard === '') {
    target.parentNode.classList.add('revealCard')
    secondCard = target.parentNode

    checkCards()
  }
}

const createCard = character => {
  const card = createElement('div', 'card')
  const front = createElement('div', 'face front')
  const back = createElement('div', 'face back')

  front.style.backgroundImage = `url('../assets/img/${character}.jpg')`

  card.appendChild(front)
  card.appendChild(back)

  card.addEventListener('click', revealCard)
  card.setAttribute('dataCharacter', character)

  return card
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters]

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

  shuffledArray.forEach(character => {
    const card = createCard(character)
    grid.appendChild(card)
  })
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML

    timer.innerHTML = currentTime + 1
  }, 1000)
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player')
  startTimer()

  loadGame()
}
