// Variabelen voor de status van de eend
let hunger = 100;
let thirst = 100;
let happiness = 100;
let duckName = null;
let gameLoop;

// DOM Elementen selecteren , progress bar
const hungerBar = document.getElementById("hungerBar");
const thirstBar = document.getElementById("thirstBar");
const happinessBar = document.getElementById("happinessBar");
const duckImg = document.getElementById("duck");
const statusMsg = document.getElementById("statusMessage");

// Start het spel en verbergt het startscherm
function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  startLoop();
  updateStats();
}

// De game loop zorgt dat de eend elke 2 seconden behoeftes krijgt 
function startLoop() {
  gameLoop = setInterval(() => {
    // Math.max zorgt dat de waarde nooit lager dan 0 wordt
    hunger = Math.max(hunger - 6, 0);
    thirst = Math.max(thirst - 7, 0);
    happiness = Math.max(happiness - 4, 0);
    updateStats();
  }, 2000);
}

// Update de balken, tekst en afbeeldingen in de browser
function updateStats() {
  if (hungerBar) hungerBar.value = hunger;
  if (thirstBar) thirstBar.value = thirst;
  if (happinessBar) happinessBar.value = happiness;

  // Check of de eend nog leeft
  if (hunger <= 0 || thirst <= 0 || happiness <= 0 ) {
    duckImg.src = "images/dead.jpg";
    statusMsg.textContent = `${duckName || "Je eend"} is overleden 💀`;
    clearInterval(gameLoop); // Stop de game loop
    return;
  }

  // Check de gemoedstoestand voor de afbeelding
  if (hunger < 30 || thirst < 30 || happiness < 30 ) {
    duckImg.src = "images/sad.jpg";
    statusMsg.textContent = `${duckName || "Je eend"} heeft aandacht nodig 😢`;
  } else {
    duckImg.src = "images/happy.jpg";
    statusMsg.textContent = `${duckName || "Je eend"} voelt zich goed 😊`;
  }
}

// Interactie functies
// geef de eend eten
function feedDuck() {
  hunger = Math.min(hunger + 20, 100); // Math.min voorkomt dat het boven 100 gaat
  updateStats();
}

// geef de eend water
function giveWater() {
  thirst = Math.min(thirst + 20, 100);
  updateStats();
}

// geef de eend aandacht
function petDuck() {
  happiness = Math.min(happiness + 10, 100);
  updateStats();
}

// Naam instellen en opslaan in LocalStorage, input sla op als variable
function setDuckName() {
  const input = document.getElementById("nameInput").value.trim();
  if (input) {
    duckName = input;
    document.getElementById("duckNameTitle").textContent = duckName;
    document.getElementById("nameInputArea").style.display = "none";
  }
}

// Functie om de naam te resetten 
function resetDuckName() {
  duckName = null;
  document.getElementById("duckNameTitle").textContent = "je eend";
  document.getElementById("nameInputArea").style.display = "block";
}

// Reset de game naar de beginstand
function resetGame() {
  clearInterval(gameLoop);
  hunger = 100;
  thirst = 100;
  happiness = 100;
  duckImg.src = "images/happy.jpg"; // Reset ook de afbeelding
  startLoop();
  updateStats();
}



/* BRONVERMELDING
  1. Voor de game loop heb ik setInterval gebruikt om functies te herhalen.
     Bron: https://developer.mozilla.org/en-US/docs/Web/API/setInterval

  2. Voor het begrenzen van de status-balken (Math.max/Math.min).
     Bron: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max

  3. LocalStorage voor het opslaan van de naam.
     Bron: https://www.w3schools.com/html/html5_webstorage.asp

  4. De afbeeldingen zijn door mijzelf getekend via Procreate op mijn iPad.

  5.Functies snappen vragen aan chat waar ik kan oefenen. Feedback formulier in chat en vragen om uittelegen en beordelen. Elke dag eem functie uitpluizen en begrijpen.
*/