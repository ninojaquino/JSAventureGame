const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in an alley near the red light district and you see a unique looking memory chip in your vest pocket.',
    options: [
      {
        text: 'Take the chip',
        setState: { memoryChip: true },
        nextText: 2
      },
      {
        text: 'Leave the chip',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You venture forth in search of answers to why you wake up in that alley, when your fixer decided to meet with you.',
    options: [
      {
        text: 'Trade the memory chip for a gun',
        requiredState: (currentState) => currentState.memoryChip,
        setState: { memoryChip: false, gun: true },
        nextText: 3
      },
      {
        text: 'Trade the memory chip for some credits',
        requiredState: (currentState) => currentState.memoryChip,
        setState: { memoryChip: false, credit: true },
        nextText: 3
      },
      {
        text: 'Say nothing to the fixer',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the fixer you decide to go to the red light district to look for more information and start to feel tired and dizzy when you come across a hotel.',
    options: [
      {
        text: 'Keep exploring the red light district',
        nextText: 4
      },
      {
        text: 'Sleep at the hotel',
        nextText: 5
      },
      {
        text: 'Find an abandoned building to sleep in',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall unconscious while exploring and get killed when a drug bust happened in the area you fell unconscious.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Not having enough credits to pay for a room you decide to break into the room and fall asleep. The surveillance catches you and you got arrested.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up the next day well rested and full of energy ready to explore the red light district.',
    options: [
      {
        text: 'Explore the red light district',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the red light district you come across an enhanced mercenary asking about the unique memory chip.',
    options: [
      {
        text: 'Turn back and say nothing to him',
        nextText: 8
      },
      {
        text: 'Shoot him',
        requiredState: (currentState) => currentState.gun,
        nextText: 9
      },
      {
        text: 'Tell the mercenary you traded it for some credits and tell him he can have the credits',
        requiredState: (currentState) => currentState.credit,
        nextText: 10
      },
      {
        text: 'Give the memory chip to the mercenary',
        requiredState: (currentState) => currentState.memoryChip,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempt to run is futile and as you turn around you got shot in the head.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this mercenary could be slain with a few gunshots and he shoots you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The mercenary laughed at you and shoots you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You gave the memory chip to the mercenary. The mercenary tells you the whole story on how you woke up in the alley, and gives you a bunch of credits in exchange for the chip. Finally knowing what happened you accept the credits and you finally have funds to move up the ranks in this cyberpunk world.',
    options: [
      {
        text: 'Congratulations! Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()