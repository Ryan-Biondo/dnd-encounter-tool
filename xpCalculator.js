// Monster inputs
const monsterCRSelect = document.getElementById('challengeRatingSelect'); // Select dropdown for monster challenge rating
const addMonsterButton = document.getElementById('addMonsterButton'); // Button to add a monster
const monsterList = document.getElementById('monsterList'); // List to display monsters
const monsterCountDisplay = document.getElementById('monsterCount'); // Display for monster count
const totalCRDisplay = document.getElementById('totalCR'); // Display for total challenge rating

let monsters = []; // Array to store monsters
let monsterCount = 0; // Counter for monster count
let totalCR = 0; // Variable to calculate total challenge rating

// Player inputs
const playerLevelInput = document.getElementById('playerLevel'); // Input for player level
const addPlayerButton = document.getElementById('addPlayerButton'); // Button to add a player
const playerList = document.getElementById('playerList'); // List to display players
const playerCountDisplay = document.getElementById('playerCount'); // Display for player count

let players = []; // Array to store players
let playerCount = 0; // Counter for player count

// Calculated results
const totalXPDisplay = document.getElementById('totalXP'); // Display for total XP
const adjustedXPDisplay = document.getElementById('adjustedXP'); // Display for adjusted XP

addMonsterButton.addEventListener('click', () => {
  // Function to execute when the add monster button is clicked
  const crValue = monsterCRSelect.value; // Selected challenge rating value from dropdown
  const selectedChallengeRating = challengeRatings.find((rating) => rating.challengeRating.toString() === crValue); // Find the challenge rating object based on the selected value
  const xpValue = selectedChallengeRating.xp; // XP value of the selected challenge rating

  // Create monster object
  const monster = {
    id: ++monsterCount, // Increment and assign a unique ID for the monster
    cr: parseFloat(crValue), // Challenge rating of the monster
    xp: xpValue, // XP value of the monster
  };

  // Add monster to array
  monsters.push(monster);

  // Update total CR
  totalCR += monster.cr;
  totalCRDisplay.textContent = totalCR; // Update the display for total challenge rating

  // Update displays
  monsterCountDisplay.textContent = monsterCount; // Update the display for monster count
  calculateTotalXP(); // Recalculate total XP and adjusted XP
  updateMonsterList(); // Update the displayed monster list
});

// Event listener for adding a player
addPlayerButton.addEventListener('click', () => {
  // Function to execute when the add player button is clicked
  const playerLevel = playerLevelInput.value; // Entered player level

  // Validate the entered player level
  if (playerLevel === '') {
    alert('Please enter a valid player level');
    return;
  }

  if (!Number.isInteger(Number(playerLevel)) || Number(playerLevel) > 20 || Number(playerLevel) < 1) {
    alert('Please enter a valid player level (integer from 1 to 20)');
    return;
  }

  // Create player object
  const player = {
    id: ++playerCount, // Increment and assign a unique ID for the player
    level: parseInt(playerLevel), // Player level
  };

  // Add player to array
  players.push(player);

  // Update display
  playerCountDisplay.textContent = playerCount; // Update the display for player count
  calculateTotalXP(); // Recalculate total XP and adjusted XP
  updatePlayerList(); // Update the displayed player list
});

function removeMonster(id) {
  // Function to remove a monster based on its ID
  const monsterIndex = monsters.findIndex((monster) => monster.id === id); // Find the index of the monster with the specified ID
  if (monsterIndex !== -1) {
    const removedMonster = monsters.splice(monsterIndex, 1)[0]; // Remove the monster from the array

    // Update total CR
    totalCR -= removedMonster.cr;
    totalCRDisplay.textContent = totalCR; // Update the display for total challenge rating

    // Decrement the monster count
    monsterCount--;
    // Update the monster count display
    monsterCountDisplay.textContent = monsterCount;

    // Recalculate the total XP
    calculateTotalXP();
    updateMonsterList(); // Update the displayed monster list
  }
}

function removePlayer(id) {
  // Function to remove a player based on its ID
  const playerIndex = players.findIndex((player) => player.id === id); // Find the index of the player with the specified ID
  if (playerIndex !== -1) {
    players.splice(playerIndex, 1); // Remove the player from the array

    // Decrement the player count
    playerCount--;
    // Update the player count display
    playerCountDisplay.textContent = playerCount;

    // Recalculate the total XP
    calculateTotalXP();
    updatePlayerList(); // Update the displayed player list
  }
}

function calculateTotalXP() {
  // Function to calculate the total XP and adjusted XP
  let totalXP = 0;

  // Calculate total XP for monsters
  for (const monster of monsters) {
    totalXP += monster.xp;
  }

  // Calculate adjusted XP based on total XP and Monster Count
  const adjustedXP = totalXP * monsterCountMultiplier[monsterCount];
  xpPerPlayer = playerCount === 0 ? 0 : totalXP / playerCount;
  const adjustedXpPerPlayer = adjustedXP / playerCount;

  // Update the display
  totalXPDisplay.textContent = `${totalXP} (Per Player: ${Math.round(xpPerPlayer)})`; // Update the display for total XP
  adjustedXPDisplay.textContent = `${adjustedXP} (Per Player: ${Math.round(adjustedXpPerPlayer)})`; // Update the display for adjusted XP
}

function updateMonsterList() {
  // Function to update the displayed monster list
  while (monsterList.firstChild) {
    monsterList.firstChild.remove(); // Clear the existing list items (otherwise adds everything in the list again)
  }

  for (const monster of monsters) {
    // Iterate over array of monsters
    const listItem = document.createElement('li'); // Create a new list item
    listItem.classList.add('list-item'); // Add a class to the list item
    listItem.textContent = `Monster CR: ${monster.cr}, XP: ${monster.xp}`; // Set the text content of the list item

    const removeButton = document.createElement('button'); // Create a remove button
    removeButton.classList.add('remove-button'); // Add a class to the remove button
    removeButton.textContent = 'Remove'; // Set the text content of the remove button
    removeButton.addEventListener('click', () => {
      removeMonster(monster.id); // Add event listener to remove the monster when the remove button is clicked
    });

    listItem.appendChild(removeButton); // Append the remove button to the list item
    monsterList.appendChild(listItem); // Append the list item to the monster list
  }
}

function updatePlayerList() {
  // Function to update the displayed player list
  while (playerList.firstChild) {
    playerList.firstChild.remove(); // Clear the existing list items (otherwise adds everything in the list again)
  }

  for (const player of players) {
    // Iterate over array of players
    const listItem = document.createElement('li'); // Create a new list item
    listItem.classList.add('list-item'); // Add a class to the list item
    listItem.textContent = `Player Level: ${player.level}`; // Set the text content of the list item

    const removeButton = document.createElement('button'); // Create a remove button
    removeButton.classList.add('remove-button'); // Add a class to the remove button
    removeButton.textContent = 'Remove'; // Set the text content of the remove button
    removeButton.addEventListener('click', () => {
      removePlayer(player.id); // Add event listener to remove the player when the remove button is clicked
    });

    listItem.appendChild(removeButton); // Append the remove button to the list item
    playerList.appendChild(listItem); // Append the list item to the player list
  }
}

// An array of challenge ratings with their corresponding XP values
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

// Monster count multiplier based on the number of monsters
const monsterCountMultiplier = {
  1: 1,
  2: 1.5,
  3: 2,
  4: 2,
  5: 2,
  6: 2,
  7: 2.5,
  8: 2.5,
  9: 2.5,
  10: 2.5,
  11: 3,
  12: 3,
  13: 3,
  14: 3,
  '15+': 4, // Monster count of 15 or higher should have a multiplier of 4.
};

// Create options for each challenge rating and append them to the dropdown list
for (const rating of challengeRatings) {
  const option = document.createElement('option');
  option.value = rating.challengeRating.toString(); // Set the value of the option

  let crText;
  // Convert fraction numbers to display as strings]
  if (rating.challengeRating % 1 === 0) {
    crText = `CR ${rating.challengeRating}`;
  } else if (rating.challengeRating === 1 / 8) {
    crText = 'CR 1/8';
  } else if (rating.challengeRating === 1 / 4) {
    crText = 'CR 1/4';
  } else if (rating.challengeRating === 1 / 2) {
    crText = 'CR 1/2';
  } else {
    crText = `CR ${rating.challengeRating}`;
  }

  option.textContent = `${crText} | XP: ${rating.xp}`; // Set the text content of the option
  monsterCRSelect.appendChild(option); // Append the option to the dropdown list
}
