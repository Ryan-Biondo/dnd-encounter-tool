
function addPlayer() {
  var form = document.getElementById("partyLevel");
  var div = document.createElement("div");

  div.className = "player";
  div.innerHTML = `
      <label for="playerLevel` + (1 + form.length) +

    `">Level of Player 
      ` + (1 + form.length) +

    `</label>
      <br>
      <input type="number" value="1" id="playerLevel
      ` + (1 + form.length) +
    `
      " name="playerLevel` + (1 + form.length) +

    `">
      <br>
    `;

  form.appendChild(div);
  var removeButton = document.getElementById("removePlayerButton");
  var removeButtonDiv = document.createElement("removeButton");

  if ((form.length > 0) && (removeButton == null)) {
    removeButtonDiv.innerHTML = `
      <button id="removePlayerButton" class=visibleButton onclick="removePlayer()">Remove Last Player</button>
      `;
    document.getElementById("party").appendChild(removeButtonDiv);

  }

  var playerTotal = document.getElementById("numPlayers");
  playerTotal.value = form.length;
};

function removePlayer() {
  var form = document.getElementById("partyLevel");
  form.removeChild(form.lastChild);
  console.log(form.length);
  if (form.length < 2) {
    document.getElementById("removePlayerButton").remove();
  }
}