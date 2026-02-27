// Party League Conference - Control Panel Logic

const csvLoader = new CSVLoader();
const broadcast = new PartyBroadcast("control");
let players = [];
let currentGame = null;
let isMuted = false;

// --- CSV File Upload ---
async function onFileSelected(input) {
  const status = document.getElementById("sheet-status");
  const preview = document.getElementById("player-list-preview");

  if (!input.files || !input.files[0]) return;

  status.textContent = "Loading CSV...";
  status.className = "status info";

  try {
    players = await csvLoader.loadFromFile(input.files[0]);
    status.textContent = `Loaded ${players.length} players.`;
    status.className = "status success";

    // Show preview table
    let html = "<table><tr><th>Rank</th><th>Name</th><th>Points</th><th>1st Places</th></tr>";
    for (const p of players) {
      html += `<tr><td>${p.rank}</td><td>${p.name}</td><td>${p.points}</td><td>${p.firstPlaces}</td></tr>`;
    }
    html += "</table>";
    preview.innerHTML = html;

    // Populate player dropdowns
    populatePlayerDropdowns();
  } catch (err) {
    status.textContent = "Failed to parse CSV file.";
    status.className = "status error";
    preview.innerHTML = "";
  }
}

function populatePlayerDropdowns() {
  const selects = document.querySelectorAll(".player-select");

  // Gather currently selected values
  const selected = {};
  selects.forEach((s) => {
    const slot = s.dataset.slot;
    if (s.value) selected[slot] = s.value;
  });

  // Collect all selected names (for exclusion)
  const takenNames = Object.values(selected);

  selects.forEach((select) => {
    const slot = select.dataset.slot;
    const current = selected[slot] || "";
    select.innerHTML = '<option value="">-- Select Player --</option>';
    for (const p of players) {
      // Show if it's this slot's current pick, or not taken by another slot
      if (p.name === current || !takenNames.includes(p.name)) {
        const opt = document.createElement("option");
        opt.value = p.name;
        opt.textContent = `${p.name} (#${p.rank}, ${p.points} pts)`;
        select.appendChild(opt);
      }
    }
    select.value = current;
  });
}

// --- Game Selection ---
function onGameChange() {
  const gameNum = parseInt(document.getElementById("game-select").value, 10);
  currentGame = gameNum || null;

  updateBoardDropdowns();
  updateCharacterDropdowns();
}

function updateBoardDropdowns() {
  const banSelect = document.getElementById("board-ban");
  const pickSelect = document.getElementById("board-pick");

  banSelect.innerHTML = '<option value="">-- No Ban --</option>';
  pickSelect.innerHTML = '<option value="">-- Select Board --</option>';

  if (!currentGame) return;

  const boards = getBoards(currentGame);
  for (const board of boards) {
    const banOpt = document.createElement("option");
    banOpt.value = board.id;
    banOpt.textContent = board.name;
    banSelect.appendChild(banOpt);

    const pickOpt = document.createElement("option");
    pickOpt.value = board.id;
    pickOpt.textContent = board.name;
    pickSelect.appendChild(pickOpt);
  }
}

function onBoardBanChange() {
  const bannedId = document.getElementById("board-ban").value;
  const pickSelect = document.getElementById("board-pick");
  const currentPick = pickSelect.value;

  pickSelect.innerHTML = '<option value="">-- Select Board --</option>';

  if (!currentGame) return;

  const boards = getBoards(currentGame);
  for (const board of boards) {
    if (board.id === bannedId) continue; // Exclude banned board
    const opt = document.createElement("option");
    opt.value = board.id;
    opt.textContent = board.name;
    pickSelect.appendChild(opt);
  }

  // Restore pick if still valid
  if (currentPick && currentPick !== bannedId) {
    pickSelect.value = currentPick;
  }
}

// --- Character Selection ---
function updateCharacterDropdowns() {
  const selects = document.querySelectorAll(".character-select");

  if (!currentGame) {
    selects.forEach((s) => {
      s.innerHTML = '<option value="">-- Select Character --</option>';
    });
    return;
  }

  // Gather currently selected values
  const selected = {};
  selects.forEach((s) => {
    const slot = s.dataset.slot;
    if (s.value) selected[slot] = s.value;
  });

  const takenIds = Object.values(selected);
  const characters = getCharacters(currentGame);

  selects.forEach((select) => {
    const slot = select.dataset.slot;
    const current = selected[slot] || "";
    select.innerHTML = '<option value="">-- Select Character --</option>';
    for (const char of characters) {
      if (char.id === current || !takenIds.includes(char.id)) {
        const opt = document.createElement("option");
        opt.value = char.id;
        opt.textContent = char.name;
        select.appendChild(opt);
      }
    }
    select.value = current;
  });
}

function onPlayerChange(slot) {
  populatePlayerDropdowns();
}

function onCharacterChange(slot) {
  updateCharacterDropdowns();
}

// --- Reset Match Setup ---
function resetMatchSetup() {
  document.getElementById("game-select").value = "";
  currentGame = null;

  document.querySelectorAll(".player-select").forEach((s) => { s.value = ""; s.style.borderColor = ""; });
  document.querySelectorAll(".character-select").forEach((s) => { s.innerHTML = '<option value="">-- Select Character --</option>'; });

  document.getElementById("board-ban").innerHTML = '<option value="">-- No Ban --</option>';
  document.getElementById("board-pick").innerHTML = '<option value="">-- Select Board --</option>';

  document.getElementById("match-status").textContent = "";
  document.getElementById("match-status").className = "status";
}

// --- Send Match Data ---
function sendMatchData() {
  const status = document.getElementById("match-status");
  const gameNum = parseInt(document.getElementById("game-select").value, 10);

  if (!gameNum) {
    status.textContent = "Please select a Mario Party game.";
    status.className = "status error";
    return;
  }

  // Gather player data
  const matchPlayers = [];
  for (let i = 1; i <= 4; i++) {
    const playerSelect = document.querySelector(`.player-select[data-slot="${i}"]`);
    const charSelect = document.querySelector(`.character-select[data-slot="${i}"]`);

    if (!playerSelect.value) {
      status.textContent = `Please select a player for slot ${i}.`;
      status.className = "status error";
      return;
    }
    if (!charSelect.value) {
      status.textContent = `Please select a character for Player ${i}.`;
      status.className = "status error";
      return;
    }

    const playerInfo = players.find((p) => p.name === playerSelect.value);
    const charInfo = getCharacters(gameNum).find((c) => c.id === charSelect.value);

    matchPlayers.push({
      slot: i,
      name: playerInfo.name,
      rank: playerInfo.rank,
      points: playerInfo.points,
      character: charInfo
    });
  }

  // Check for duplicate characters
  const charIds = matchPlayers.map((p) => p.character.id);
  if (new Set(charIds).size !== charIds.length) {
    status.textContent = "Each player must have a unique character.";
    status.className = "status error";
    return;
  }

  const bannedBoardId = document.getElementById("board-ban").value;
  const pickedBoardId = document.getElementById("board-pick").value;

  if (!pickedBoardId) {
    status.textContent = "Please select a board.";
    status.className = "status error";
    return;
  }

  const boards = getBoards(gameNum);
  const bannedBoard = bannedBoardId ? boards.find((b) => b.id === bannedBoardId) : null;
  const pickedBoard = boards.find((b) => b.id === pickedBoardId);

  const matchData = {
    game: gameNum,
    gameName: getGameName(gameNum),
    players: matchPlayers,
    bannedBoard,
    pickedBoard
  };

  broadcast.sendMatchData(matchData);
  status.textContent = "Match data sent to overlay!";
  status.className = "status success";
}

// --- Overlay Window ---
function openOverlay() {
  const overlayWin = window.open("overlay.html", "plc-overlay", "width=1920,height=1080");
  if (overlayWin) {
    broadcast.setTarget(overlayWin);
  }
}

// --- Scene Triggers ---
function triggerAllStats() {
  if (!players.length) {
    document.getElementById("overlay-status").textContent = "Upload a CSV first.";
    document.getElementById("overlay-status").className = "status error";
    return;
  }
  broadcast.send("SHOW_ALL_STATS", { players, game: currentGame });
}

function triggerScene(scene) {
  broadcast.sendSceneChange(scene);
}

function triggerReveal(step, playerSlot) {
  broadcast.sendRevealStep(step, { playerSlot });
}

function triggerFadeOut() {
  broadcast.sendFadeOut();
}

function triggerReset() {
  broadcast.sendReset();
  document.getElementById("overlay-status").textContent = "Overlay reset.";
  document.getElementById("overlay-status").className = "status info";
}

// --- Audio ---
function onVolumeChange(val) {
  document.getElementById("volume-display").textContent = val + "%";
  broadcast.send("AUDIO_VOLUME", { volume: parseInt(val, 10) / 100 });
}

function toggleMute() {
  isMuted = !isMuted;
  document.getElementById("mute-btn").textContent = isMuted ? "Unmute" : "Mute";
  broadcast.send("AUDIO_MUTE", { muted: isMuted });
}

// --- Listen for overlay status ---
broadcast.on("OVERLAY_READY", () => {
  document.getElementById("overlay-status").textContent = "Overlay connected!";
  document.getElementById("overlay-status").className = "status success";
});

