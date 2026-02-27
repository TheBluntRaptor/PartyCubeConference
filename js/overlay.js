// Party League Conference - OBS Overlay Logic

const broadcast = new PartyBroadcast("overlay");
let matchData = null;
let audioVolume = 0.5;
let currentGameTheme = null;
let fadeInterval = null;

// --- Audio ---
const audioMusic = document.getElementById("audio-music");
const audioVoice = document.getElementById("audio-voice");

function setVolume(vol) {
  audioVolume = vol;
  audioMusic.volume = vol;
}

function playMusic() {
  if (audioMusic.src && audioMusic.paused) {
    audioMusic.volume = audioVolume;
    audioMusic.play().catch(() => {});
  }
}

function stopMusic() {
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }
  audioMusic.pause();
  audioMusic.currentTime = 0;
  audioMusic.volume = audioVolume;
}

function fadeOutMusic(duration) {
  if (audioMusic.paused) return;
  const steps = 30;
  const stepTime = duration / steps;
  const volumeStep = audioMusic.volume / steps;
  let currentVol = audioMusic.volume;

  if (fadeInterval) clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    currentVol -= volumeStep;
    if (currentVol <= 0) {
      clearInterval(fadeInterval);
      fadeInterval = null;
      audioMusic.pause();
      audioMusic.currentTime = 0;
      audioMusic.volume = audioVolume;
    } else {
      audioMusic.volume = currentVol;
    }
  }, stepTime);
}

// --- Game Theme (background + music) ---
function setGameTheme(gameNumber) {
  if (!gameNumber || currentGameTheme === gameNumber) return;
  currentGameTheme = gameNumber;

  // Set background
  const bgEl = document.getElementById("game-bg");
  bgEl.style.backgroundImage = `url('${getGameBackgroundPath(gameNumber)}')`;

  // Set music source
  const musicPath = getGameMusicPath(gameNumber);
  if (musicPath && audioMusic.src !== new URL(musicPath, window.location.href).href) {
    const wasPlaying = !audioMusic.paused;
    audioMusic.src = musicPath;
    audioMusic.load();
    if (wasPlaying) {
      playMusic();
    }
  }
}

// --- Scene Management ---
function hideAllScenes() {
  document.querySelectorAll(".scene").forEach((s) => s.classList.add("hidden"));
  document.getElementById("board-ban-reveal").classList.add("hidden");
  document.getElementById("board-pick-reveal").classList.add("hidden");
  document.getElementById("char-selection").classList.add("hidden");
  document.getElementById("match-starting").classList.add("hidden");
}

function showScene(id) {
  hideAllScenes();
  const scene = document.getElementById(id);
  if (scene) scene.classList.remove("hidden");
}

// --- Rank color helper ---
function getRankClass(rank) {
  if (rank === 1) return "rank-gold";
  if (rank === 2) return "rank-silver";
  if (rank === 3) return "rank-bronze";
  if (rank >= 11) return "rank-danger";
  return "";
}

// --- All Players Stats Scene ---
function buildAllStatsScene(allPlayers) {
  const board = document.getElementById("leaderboard");
  board.innerHTML = "";

  allPlayers.forEach((player) => {
    const row = document.createElement("div");
    row.className = `lb-row ${getRankClass(player.rank)}`;
    row.innerHTML = `
      <div class="lb-rank">#${player.rank}</div>
      <img class="lb-icon" src="${getPlayerIconPath(player.name)}" alt="${player.name}" onerror="this.style.visibility='hidden'">
      <div class="lb-name">${player.name}</div>
      <div class="lb-stats">
        <div class="lb-points"><span>${player.points}</span> pts</div>
        <div class="lb-firsts"><span>${player.firstPlaces || 0}</span> 1sts</div>
      </div>
    `;
    board.appendChild(row);
  });
}

function showAllStats(allPlayers, gameNumber) {
  if (gameNumber) setGameTheme(gameNumber);
  buildAllStatsScene(allPlayers);
  showScene("scene-stats-all");
  playMusic();
}

// --- Match Stats Scene ---
function buildStatsScene() {
  if (!matchData) return;

  const grid = document.getElementById("stats-grid");
  grid.innerHTML = "";

  matchData.players.forEach((player) => {
    const card = document.createElement("div");
    card.className = `stat-card ${getRankClass(player.rank)}`;
    card.innerHTML = `
      <img class="stat-icon" src="${getPlayerIconPath(player.name)}" alt="${player.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect fill=%22%230f3460%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2260%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2240%22>${player.name.charAt(0)}</text></svg>'">
      <div class="stat-name">${player.name}</div>
      <div class="stat-rank">Rank #${player.rank}</div>
      <div class="stat-points">${player.points} Points</div>
    `;
    grid.appendChild(card);
  });
}

function showStats() {
  buildStatsScene();
  showScene("scene-stats");
  playMusic();
}

// --- Picks & Bans ---
function showBoardBan() {
  if (!matchData || !matchData.bannedBoard) return;

  hideAllScenes();
  document.getElementById("scene-picks").classList.remove("hidden");

  const banReveal = document.getElementById("board-ban-reveal");
  const banLogo = document.getElementById("ban-board-logo");

  banLogo.src = getBoardLogoPath(matchData.game, matchData.bannedBoard.id);
  banLogo.alt = matchData.bannedBoard.name;

  banReveal.classList.add("hidden");
  void banReveal.offsetWidth;
  banReveal.classList.remove("hidden");

  playMusic();
}

function showBoardPick() {
  if (!matchData || !matchData.pickedBoard) return;

  document.getElementById("board-ban-reveal").classList.add("hidden");
  document.getElementById("scene-picks").classList.remove("hidden");

  const pickReveal = document.getElementById("board-pick-reveal");
  const pickLogo = document.getElementById("pick-board-logo");

  pickLogo.src = getBoardLogoPath(matchData.game, matchData.pickedBoard.id);
  pickLogo.alt = matchData.pickedBoard.name;

  pickReveal.classList.add("hidden");
  void pickReveal.offsetWidth;
  pickReveal.classList.remove("hidden");

  playMusic();
}

// --- Character Selection ---
function showCharSelecting(playerSlot) {
  if (!matchData) return;

  document.getElementById("scene-picks").classList.remove("hidden");
  document.getElementById("board-ban-reveal").classList.add("hidden");
  document.getElementById("board-pick-reveal").classList.add("hidden");

  const charSection = document.getElementById("char-selection");
  charSection.classList.remove("hidden");

  matchData.players.forEach((player, i) => {
    const slot = i + 1;
    const nameEl = document.getElementById(`char-name-${slot}`);
    nameEl.textContent = player.name;

    const slotEl = document.getElementById(`char-slot-${slot}`);
    slotEl.classList.add("visible");
    slotEl.classList.remove("active");
  });

  const activeSlot = document.getElementById(`char-slot-${playerSlot}`);
  activeSlot.classList.add("active");

  const statusEl = document.getElementById(`char-status-${playerSlot}`);
  statusEl.textContent = "Selecting Character...";
  statusEl.className = "char-status selecting";

  playMusic();
}

function revealCharacter(playerSlot) {
  if (!matchData) return;

  const player = matchData.players.find((p) => p.slot === playerSlot);
  if (!player || !player.character) return;

  const statusEl = document.getElementById(`char-status-${playerSlot}`);
  statusEl.textContent = player.character.name;
  statusEl.className = "char-status";

  const imgEl = document.getElementById(`char-img-${playerSlot}`);
  imgEl.src = getCharacterImagePath(matchData.game, player.character.id);
  imgEl.alt = player.character.name;

  void imgEl.offsetWidth;
  imgEl.classList.add("revealed");

  const slotEl = document.getElementById(`char-slot-${playerSlot}`);
  slotEl.classList.remove("active");

  // Play character voice line
  const voicePath = getCharacterVoicePath(matchData.game, player.character.id);
  if (voicePath) {
    audioVoice.src = voicePath;
    audioVoice.volume = audioVolume;
    audioVoice.currentTime = 0;
    audioVoice.play().catch(() => {});
  }
}

// --- Match Starting ---
function showMatchStarting() {
  const marquee = document.getElementById("match-starting");
  marquee.classList.remove("hidden");
}

// --- Fade to Black ---
function fadeToBlack() {
  fadeOutMusic(1500);
  const fadeEl = document.getElementById("fade-overlay");
  fadeEl.classList.remove("hidden");
  void fadeEl.offsetWidth;
  fadeEl.classList.add("active");
}

// --- Reset ---
function resetOverlay() {
  stopMusic();
  hideAllScenes();

  // Reset fade
  const fadeEl = document.getElementById("fade-overlay");
  fadeEl.classList.remove("active");
  fadeEl.classList.add("hidden");

  // Reset background
  document.getElementById("game-bg").style.backgroundImage = "";
  currentGameTheme = null;

  // Reset character images
  for (let i = 1; i <= 4; i++) {
    const img = document.getElementById(`char-img-${i}`);
    img.classList.remove("revealed");
    img.src = "";
    img.alt = "";

    const status = document.getElementById(`char-status-${i}`);
    status.textContent = "";
    status.className = "char-status";

    const slot = document.getElementById(`char-slot-${i}`);
    slot.classList.remove("visible", "active");

    const name = document.getElementById(`char-name-${i}`);
    name.textContent = "";
  }

  matchData = null;
}

// --- BroadcastChannel Listeners ---
broadcast.on("SHOW_ALL_STATS", (data) => {
  showAllStats(data.players, data.game);
});

broadcast.on("SET_MATCH_DATA", (data) => {
  matchData = data;
  setGameTheme(matchData.game);
  console.log("Match data received:", matchData);
});

broadcast.on("SCENE_CHANGE", (data) => {
  switch (data.scene) {
    case "stats":
      showStats();
      break;
    case "picks":
      hideAllScenes();
      document.getElementById("scene-picks").classList.remove("hidden");
      playMusic();
      break;
  }
});

broadcast.on("REVEAL_STEP", (data) => {
  switch (data.step) {
    case "board-ban":
      showBoardBan();
      break;
    case "board-pick":
      showBoardPick();
      break;
    case "char-selecting":
      showCharSelecting(data.playerSlot);
      break;
    case "char-reveal":
      revealCharacter(data.playerSlot);
      break;
    case "match-starting":
      showMatchStarting();
      break;
  }
});

broadcast.on("FADE_OUT", () => {
  fadeToBlack();
});

broadcast.on("RESET", () => {
  resetOverlay();
});

broadcast.on("AUDIO_VOLUME", (data) => {
  audioVolume = data.volume;
  if (!fadeInterval) {
    audioMusic.volume = audioVolume;
  }
});

broadcast.on("AUDIO_MUTE", (data) => {
  audioMusic.muted = data.muted;
  audioVoice.muted = data.muted;
});

// --- Notify control panel that overlay is ready ---
broadcast.send("OVERLAY_READY");

// Re-send ready signal periodically
setInterval(() => {
  broadcast.send("OVERLAY_READY");
}, 5000);
