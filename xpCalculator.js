// Monster inputs
const monsterCRSelect = document.getElementById('challengeRatingSelect');
const addMonsterButton = document.getElementById('addMonsterButton');
const monsterList = document.getElementById('monsterList');
const monsterCountDisplay = document.getElementById('monsterCount');
const totalCRDisplay = document.getElementById('totalCR');

let monsterCount = 0;
let totalCR = 0;

// Player inputs
const playerLevelInput = document.getElementById('playerLevel');
const addPlayerButton = document.getElementById('addPlayerButton');
const playerList = document.getElementById('playerList');
const playerCountDisplay = document.getElementById('playerCount');

let playerCount = 0;

// Calculated results
const totalXPDisplay = document.getElementById('totalXP');
const adjustedXPDisplay = document.getElementById('adjustedXP');

addMonsterButton.addEventListener('click', () => {
  const crValue = monsterCRSelect.value;
  const selectedChallengeRating = challengeRatings.find((rating) => rating.challengeRating.toString() === crValue);
  const xpValue = selectedChallengeRating.xp;
  // Use xpValue for further processing or display

  // Create a container div for the monster entry
  const monsterContainer = document.createElement('div');

  // Create the text content for the monster entry
  const monsterText = document.createElement('span');

  let crText;
  if (crValue % 1 === 0) {
    crText = `CR ${crValue}`;
  } else if (crValue === '0.125') {
    crText = 'CR 1/8';
  } else if (crValue === '0.25') {
    crText = 'CR 1/4';
  } else if (crValue === '0.5') {
    crText = 'CR 1/2';
  } else {
    crText = `CR ${crValue}`;
  }

  monsterText.textContent = `Monster ${++monsterCount} | ${crText} | XP: ${xpValue}  `;

  // Create the remove button for the monster entry
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    // Remove the monster entry
    monsterContainer.remove();

    // Update total CR and displays
    totalCR -= parseFloat(crValue);
    totalCRDisplay.textContent = totalCR;

    // Decrement the monster count
    monsterCount--;
    // Update the monster count display
    monsterCountDisplay.textContent = monsterCount;

    // Recalculate the total XP
    calculateTotalXP();
  });

  // Append the text content and remove button to the container div
  monsterContainer.appendChild(monsterText);
  monsterContainer.appendChild(removeButton);

  // Add the monster entry to the list
  monsterList.appendChild(monsterContainer);

  // Update total CR
  totalCR += parseFloat(crValue);
  totalCRDisplay.textContent = totalCR;

  // Update displays
  monsterCountDisplay.textContent = monsterCount;
  calculateTotalXP();
});

// Event listener for adding a player
addPlayerButton.addEventListener('click', () => {
  const playerLevel = playerLevelInput.value;

  // Validate the entered player level
  if (playerLevel === '') {
    alert('Please enter a valid player level');
    return;
  }

  if (!Number.isInteger(Number(playerLevel)) || Number(playerLevel) > 20) {
    alert('Please enter a valid player level (integer from 1 to 20)');
    return;
  }

  // Create a container div for the player entry
  const playerContainer = document.createElement('div');

  // Create the text content for the player entry
  const playerText = document.createElement('span');
  playerText.textContent = `Player ${++playerCount} | Level: ${playerLevel}  `;

  // Create the remove button for the player entry
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    // Remove the player entry
    playerContainer.remove();
    // Decrement the monster count
    playerCount--;
    // Update player count display
    playerCountDisplay.textContent = playerCount;

    // Recalculate the total XP
    calculateTotalXP();
  });

  // Append the text content and remove button to the container div
  playerContainer.appendChild(playerText);
  playerContainer.appendChild(removeButton);

  // Add the player entry to the list
  playerList.appendChild(playerContainer);

  // Update display
  playerCountDisplay.textContent = playerCount;
  calculateTotalXP();
});

function calculateTotalXP() {
  // Sum up the XP values of all generated monsters
  let totalXP = 0;
  const monsterEntries = monsterList.querySelectorAll('div');
  monsterEntries.forEach((entry) => {
    const xpValueText = entry.querySelector('span').textContent.split(' | ')[2];
    const xpValue = parseInt(xpValueText.split(': ')[1]);
    totalXP += xpValue;
  });
  // Calculate the XP per player
  let xpPerPlayer;
  if (playerCount !== 0) {
    xpPerPlayer = (totalXP / playerCount).toFixed(0);
  } else {
    xpPerPlayer = '0'; // Display "N/A" when playerCount is 0
  }
  // Update the total XP display
  totalXPDisplay.textContent = `${totalXP} XP (${xpPerPlayer} XP per player)`;
  calculateAdjustedXP(totalXP);
}

function calculateAdjustedXP(totalXP) {
  let multiplier = 1;

  if (monsterCount === 1) {
    multiplier = 1;
  } else if (monsterCount === 2) {
    multiplier = 1.5;
  } else if (monsterCount >= 3 && monsterCount <= 6) {
    multiplier = 2;
  } else if (monsterCount >= 7 && monsterCount <= 10) {
    multiplier = 2.5;
  } else if (monsterCount >= 11 && monsterCount <= 14) {
    multiplier = 3;
  } else if (monsterCount >= 15) {
    multiplier = 4;
  }

  let adjustedXP = totalXP * multiplier;
  if (playerCount !== 0) {
    adjustedXpPerPlayer = (adjustedXP / playerCount).toFixed(0);
  } else {
    adjustedXpPerPlayer = '0'; // Display "N/A" when playerCount is 0
  }

  // Update the total XP display
  adjustedXPDisplay.textContent = `${adjustedXP} XP (${adjustedXpPerPlayer} XP per player)`;
  //   calculateAdjustedXP();
}

const challengeRatings = [
  { challengeRating: 0, xp: 10 },
  { challengeRating: 1 / 8, xp: 25 },
  { challengeRating: 1 / 4, xp: 50 },
  { challengeRating: 1 / 2, xp: 100 },
  { challengeRating: 1, xp: 200 },
  { challengeRating: 2, xp: 450 },
  { challengeRating: 3, xp: 700 },
  { challengeRating: 4, xp: 1100 },
  { challengeRating: 5, xp: 1800 },
  { challengeRating: 6, xp: 2300 },
  { challengeRating: 7, xp: 2900 },
  { challengeRating: 8, xp: 3900 },
  { challengeRating: 9, xp: 5000 },
  { challengeRating: 10, xp: 5900 },
  { challengeRating: 11, xp: 7200 },
  { challengeRating: 12, xp: 8400 },
  { challengeRating: 13, xp: 10000 },
  { challengeRating: 14, xp: 11500 },
  { challengeRating: 15, xp: 13000 },
  { challengeRating: 16, xp: 15000 },
  { challengeRating: 17, xp: 18000 },
  { challengeRating: 18, xp: 20000 },
  { challengeRating: 19, xp: 22000 },
  { challengeRating: 20, xp: 25000 },
  { challengeRating: 21, xp: 33000 },
  { challengeRating: 22, xp: 41000 },
  { challengeRating: 23, xp: 50000 },
  { challengeRating: 24, xp: 62000 },
  { challengeRating: 30, xp: 155000 },
];

function createChallengeRatingOptions() {
  const selectElement = document.getElementById('challengeRatingSelect');

  challengeRatings.forEach((entry) => {
    const option = document.createElement('option');
    option.value = entry.challengeRating;

    if (entry.challengeRating % 1 === 0) {
      option.textContent = `CR ${entry.challengeRating} (XP: ${entry.xp})`;
    } else if (entry.challengeRating === 1 / 8) {
      option.textContent = `CR 1/8 (XP: ${entry.xp})`;
    } else if (entry.challengeRating === 1 / 4) {
      option.textContent = `CR 1/4 (XP: ${entry.xp})`;
    } else if (entry.challengeRating === 1 / 2) {
      option.textContent = `CR 1/2 (XP: ${entry.xp})`;
    }

    selectElement.appendChild(option);
  });
}

// Call the function to create the options
createChallengeRatingOptions();
