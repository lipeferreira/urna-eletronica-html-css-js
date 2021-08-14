let headerText = document.querySelector('.d-1-1 span')
let officeStep = document.querySelector('.d-1-2 span')
let numberArea = document.querySelector('.d-1-3')
let descripton = document.querySelector('.d-1-4')
let footer = document.querySelector('.d-2')
let side = document.querySelector('.d-1-right')

let currentStep = 0
let number = ''
let blank = false
let votes = []

function startStep() {
    let step = steps[currentStep]
    let numberAreaHtml = ''
    number = ''
    blank = false

    for(let i = 0; i < step.numbers; i++) {
        if (i === 0) {
            numberAreaHtml += '<div class="num-box blink"></div>'
        } else {
            numberAreaHtml += '<div class="num-box"></div>'
        }
    }

    headerText.style.display = 'none'
    officeStep.innerHTML = step.title
    numberArea.innerHTML = numberAreaHtml
    descripton.innerHTML = ''
    footer.style.display = 'none'
    side.innerHTML = ''
}

function updateView() {
    let step = steps[currentStep]
    let candidate = step.candidates.filter((item) => {
       if (item.number === number){
           return true
       } else {
           return false
       }
    })

    if (candidate.length > 0) {
        candidate = candidate[0]
        headerText.style.display = 'block'
        footer.style.display = 'block'
        if (candidate.vice !== undefined) {
            descripton.innerHTML = `Nome: ${candidate.name}<br/>Partido: ${candidate.entourage}<br/>Vice: ${candidate.vice}`
        } else {
            descripton.innerHTML = `Nome: ${candidate.name}<br/>Partido: ${candidate.entourage}`
        }
        pics = ''
        for(let i in candidate.pics) {
            if (!candidate.pics[i].small){
                pics += `<div class="d-1-image"><img src="images/${candidate.pics[i].url}" alt="">${candidate.pics[i].subt}</div>`
            }else {
                pics += `<div class="d-1-image small"><img src="images/${candidate.pics[i].url}" alt="">${candidate.pics[i].subt}</div>`
            }
           
        }
        side.innerHTML = pics
    } else {
        headerText.style.display = 'block'
        footer.style.display = 'block'
        descripton.innerHTML = '<div class="warning blink">VOTO NULO</div>'
        number = 'nulo'
    }
}

function clickHandler(value) {
    let currentNumber = document.querySelector('.num-box.blink')
    if(currentNumber !== null){
        currentNumber.innerHTML = value
        number = `${number}${value}`

        currentNumber.classList.remove('blink')
        if (currentNumber.nextElementSibling !== null) {
            currentNumber.nextElementSibling.classList.add('blink')
        } else {
            updateView()
        }
    }
}

function blankVote() {
    if (number === '') {
        blank = true
        number = 'branco'
        headerText.style.display = 'block'
        numberArea.innerHTML = ''
        footer.style.display = 'block'
        descripton.innerHTML = '<div class="warning blink">VOTO EM BRANCO</div>'
    }
}

function resetVote() {
    startStep()
}

function confirmVote() {
    let step = steps[currentStep]
    let confirmedVote = false
    if (blank || step.numbers === number.length || number === 'nulo') {
        confirmedVote = true
    }
    if (confirmedVote) {
        votes.push({
            step: step.title,
            vote: number
        })
        currentStep++
        if (steps[currentStep] !== undefined) {
            startStep()
        } else {
            document.querySelector('.screen').innerHTML = '<div class="warning--full blink">FIM</div>'
            console.log(votes)
        }
    }
}

startStep()