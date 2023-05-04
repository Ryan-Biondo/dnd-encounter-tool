
function addEnemy() {
  var enemyForm = document.getElementById("challengeRatingList");
  var enemyDiv = document.createElement("div");

  enemyDiv.className = "enemy";
  enemyDiv.innerHTML = `
    <label for="challengeRating
    ` + (1 + enemyForm.length) + `">CR of Enemy 
    ` + (1 + enemyForm.length) + `</label>
    <br>
    <input type="number" value="0" id="challengeRating
    ` + (1 + enemyForm.length) + `" name="challengeRating">
    <br>
  `;

  enemyForm.appendChild(enemyDiv);
  var removeButton = document.getElementById("removeEnemyButton");
  var removeButtonDiv = document.createElement("removeButton");

  if ((enemyForm.length > 0) && (removeButton == null)) {
    removeButtonDiv.innerHTML = `
    <button id="removeEnemyButton" class=visibleButton onclick="removeEnemy()">Remove Last Enemy</button>
    `;
    document.getElementById("enemyCRList").appendChild(removeButtonDiv);
  }

  var numEnemies = document.getElementById("numEnemies");
  numEnemies.value = enemyForm.length;

};

function removeEnemy() {
  var form = document.getElementById("challengeRatingList");
  form.removeChild(form.lastChild);
  console.log(form.length);

  if (form.length == 1) {
    document.getElementById("removeEnemyButton").remove();
  }
}

const input = document.querySelector("input");
const log = document.getElementById("challengeRatingSum");

input.addEventListener("input", updateValue);

function updateValue(e) {
  log.textContent = e.target.value;
}