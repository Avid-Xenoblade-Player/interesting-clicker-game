function saveGame() {
        const gameData = {
          timesPressed: timesPressed,
          pressesPer: pressesPer,
          pressesSquared: pressesSquared,
          purchaseCostOne: purchaseCostOne,
          purchaseCostTwo: purchaseCostTwo,
          totalTimesPressed: totalTimesPressed,
          movementCost: movementCost,
          distance: distance,
          speedCost: speedCost,
          velocity: velocity,
          accelCost: accelCost,
          acceleration: acceleration,
        };
        localStorage.setItem('clickerGameData', JSON.stringify(gameData));
        document.getElementById("saveLoadStatus").innerHTML = "Saved successfully.";
      }

      function loadGame() {
        const savedData = localStorage.getItem('clickerGameData');
		  const gameData = JSON.parse(savedData);
		  let confirm = prompt("Are you sure you would like to load? Type 'CONFIRM2574' for yes. \n Most recent save data: \n Times pressed: " + gameData.timesPressed + ". \n Presses per press: " + gameData.pressesPer + ". \n Distance travelled: " + ".");
		  if (confirm == "CONFIRM2574" && savedData) { 
          		timesPressed = gameData.timesPressed;
          		pressesPer = gameData.pressesPer;
          		pressesSquared = gameData.pressesSquared;
          		purchaseCostOne = gameData.purchaseCostOne;
          		purchaseCostTwo = gameData.purchaseCostTwo;
          		totalTimesPressed = gameData.totalTimesPressed;
          		movementCost = gameData.movementCost;
          		distance = gameData.distance;
          		speedCost = gameData.speedCost;
          		velocity = gameData.velocity;
          		accelCost = gameData.accelCost;
          		acceleration = gameData.acceleration;
          		document.getElementById("saveLoadStatus").innerHTML = "Game loaded successfully.";
        };
		}

      var timesPressed = 0;
      var totalTimesPressed = 0;
      var pressesPer = 0;
      var purchaseCostOne = 20;
      var pressesSquared = 0;
      var purchaseCostTwo = 20;
      var movementCost = 1000;
      var distance = 0;
      var speedCost = 1000;
      var velocity = 0;
      var accelCost = 1000;
      var acceleration = 0;
		var onePress = 0;

      function presses() {
		  onePress = ((pressesPer + 1) * (pressesSquared + 1)) * (distance + 1);
        timesPressed = timesPressed + onePress;
        totalTimesPressed = totalTimesPressed + onePress;
      let message;
      switch (true) {
        case (totalTimesPressed >= 200):
          message = "Game's still playing.";
          break;
        case (totalTimesPressed >= 100 && timesPressed < 200):
          message = "Best job! You're the keenest button presser!";
          break;
        case (totalTimesPressed >= 50 && timesPressed < 100):
          message = "Great job! You're a keener button presser!";
          break;
        case (totalTimesPressed >= 21 && timesPressed < 50):
          message = "Good job! You're a keen button presser!";
          break;
        default:
          message = "Nothing to see here.";
      }
      document.getElementById("buttonThree").innerHTML = message + " (Total times pressed: " + totalTimesPressed + ")";
      document.getElementById("pressesInfo").innerHTML = "Current presses: " + timesPressed + ". Presses per press: " + onePress + ".";
      }

      function morePresses() {
        if (timesPressed >= purchaseCostOne) {
          pressesPer++;
          timesPressed = timesPressed - purchaseCostOne;
          purchaseCostOne = 20 + (((pressesPer + 1) * 2) * (((pressesPer + 1) * 2) - 1)) / 2;
          document.getElementById("buttonFour").innerHTML = "Presses per press: " + (pressesPer + 1) + ".";
          document.getElementById("purchaseInfo").innerHTML = "Current cost one: " + purchaseCostOne + ". Current cost two: " + purchaseCostTwo + ".";
          document.getElementById("pressesInfo").innerHTML = "Current presses: " + timesPressed;
        } else {
          document.getElementById("buttonFour").innerHTML = "Presses per press: " + (pressesPer + 1) + ".";
          document.getElementById("purchaseInfo").innerHTML = "Failed. Current cost one: " + purchaseCostOne + ". Current cost two: " + purchaseCostTwo + ".";
        }
      }

      function morePressesAgain() {
        if (pressesPer > purchaseCostTwo) {
          pressesSquared++;
          pressesPer = pressesPer - purchaseCostTwo;
          timesPressed = 0
          purchaseCostTwo = 20 + (((pressesSquared + 1) * 2) * (((pressesSquared + 1) * 2) - 1)) / 2;
          purchaseCostOne - 20 + (((pressesPer + 1) * 2) * (((pressesPer + 1) * 2) - 1)) / 2;
          document.getElementById("buttonFive").innerHTML = "Presses per presses per press: " + (pressesSquared + 1) + ".";
          document.getElementById("purchaseInfo").innerHTML = "Current cost one: " + purchaseCostOne + ". Current cost two: " + purchaseCostTwo + ".";
          document.getElementById("buttonFour").innerHTML = "Presses per press: " + (pressesPer + 1) + ".";
        } else {
          document.getElementById("buttonFive").innerHTML = "Presses per presses per press: " + (pressesSquared + 1) + ".";
          document.getElementById("purchaseInfo").innerHTML = "Current cost one: " + purchaseCostOne + ". Failed. Current cost two: " + purchaseCostTwo + ".";
        }
      }

      function resetGame() {
        var confirmation = confirm("Are you sure you would like to delete all stored save data? This is irreversible!");
        if (!confirmation) return; // Exit function if user cancels confirmation.
        var random = Math.floor(Math.random() * 11)
        names = ["ZARIF", "ANIRUDH", "CILLIAN", "CALLIOPE", "JUNIPER", "IVAN", "ALBANY", "SADNESS", "WASI", "DUNNE", "DUVOOR"];
        var confirmationWord = prompt("Are you really sure? Type " + names[random] + " to confirm.");
        if (confirmationWord == names[random]) {
          timesPressed = 0;
          pressesPer = 0;
          pressesSquared = 0;
          purchaseCostOne = 20;
          purchaseCostTwo = 20;
          totalTimesPressed = 0;
          saveGame();
          document.getElementById("resetStatus").innerHTML = "Save data deleted successfully.";
        } else {
          document.getElementById("resetStatus").innerHTML = "Deletion canceled.";
        }
      }

      function movement() {
        if (timesPressed >= movementCost) {
          distance++;
          timesPressed = timesPressed - movementCost;
          movementCost = 1000 + (distance + 1) ** (2 - (pressesSquared / 10));
          document.getElementById("movementInfo").innerHTML = "Current distance: " + distance + ". Current velocity: " + velocity + ". Current acceleration: " + acceleration + ".";
          document.getElementById("distanceCostInfo").innerHTML = "Current movement cost: " + movementCost + ".";
          document.getElementById("pressesInfo").innerHTML = "Current presses: " + timesPressed;
        } else {
          document.getElementById("distanceCostInfo").innerHTML = "Failed. Current movement cost: " + movementCost + ".";
        }
      }

      function velocity() {
        if (distance >= speedCost) {
          velocity++;
          distance = distance - speedCost;
          speedCost = (velocity + 1) ** (2 - (pressesSquared / 11));
          document.getElementById("movementInfo").innerHTML = "Current distance: " + distance + ". Current velocity: " + velocity + ". Current acceleration: " + acceleration + ".";
          movementCost = (distance + 1) ** (2 - (pressesSquared / 10));
          document.getElementById("distanceCostInfo").innerHTML = "Current movement cost: " + movementCost + ".";
          document.getElementById("velocityCostInfo").innerHTML = "Current speed cost: " + speedCost + ".";
        } else {
          document.getElementById("velocityCostInfo").innerHTML = "Failed. Current speed cost: " + speedCost + ".";
        }
      }
