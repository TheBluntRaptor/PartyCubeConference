// Mario Party 4-8 Game Data

const BASE_CHARACTERS = [
  { id: "mario", name: "Mario", file: "Mario" },
  { id: "luigi", name: "Luigi", file: "Luigi" },
  { id: "peach", name: "Peach", file: "Peach" },
  { id: "yoshi", name: "Yoshi", file: "Yoshi" },
  { id: "wario", name: "Wario", file: "Wario" },
  { id: "daisy", name: "Daisy", file: "Daisy" },
  { id: "waluigi", name: "Waluigi", file: "Waluigi" }
];

const GAME_DATA = {
  4: {
    name: "Mario Party 4",
    boards: [
      { id: "toads-midway-madness", name: "Toad's Midway Madness" },
      { id: "shy-guys-jungle-jam", name: "Shy Guy's Jungle Jam" },
      { id: "goombas-greedy-gala", name: "Goomba's Greedy Gala" },
      { id: "boos-haunted-bash", name: "Boo's Haunted Bash" },
      { id: "koopas-seaside-soiree", name: "Koopa's Seaside Soiree" },
      { id: "bowsers-gnarly-party", name: "Bowser's Gnarly Party" }
    ],
    characters: [
      ...BASE_CHARACTERS,
      { id: "donkey-kong", name: "Donkey Kong", file: "DK" }
    ]
  },
  5: {
    name: "Mario Party 5",
    boards: [
      { id: "toy-dream", name: "Toy Dream" },
      { id: "rainbow-dream", name: "Rainbow Dream" },
      { id: "pirate-dream", name: "Pirate Dream" },
      { id: "undersea-dream", name: "Undersea Dream" },
      { id: "future-dream", name: "Future Dream" },
      { id: "sweet-dream", name: "Sweet Dream" },
      { id: "bowser-nightmare", name: "Bowser Nightmare" }
    ],
    characters: [
      ...BASE_CHARACTERS,
      { id: "toad", name: "Toad", file: "Toad" },
      { id: "boo", name: "Boo", file: "Boo" },
      { id: "koopa-kid", name: "Koopa Kid", file: "KoopaKid" }
    ]
  },
  6: {
    name: "Mario Party 6",
    boards: [
      { id: "towering-treetop", name: "Towering Treetop" },
      { id: "e-gadds-garage", name: "E. Gadd's Garage" },
      { id: "faire-square", name: "Faire Square" },
      { id: "snowflake-lake", name: "Snowflake Lake" },
      { id: "castaway-bay", name: "Castaway Bay" },
      { id: "clockwork-castle", name: "Clockwork Castle" }
    ],
    characters: [
      ...BASE_CHARACTERS,
      { id: "toad", name: "Toad", file: "Toad" },
      { id: "boo", name: "Boo", file: "Boo" },
      { id: "koopa-kid", name: "Koopa Kid", file: "KoopaKid" },
      { id: "toadette", name: "Toadette", file: "Toadette" }
    ]
  },
  7: {
    name: "Mario Party 7",
    boards: [
      { id: "grand-canal", name: "Grand Canal" },
      { id: "pagoda-peak", name: "Pagoda Peak" },
      { id: "pyramid-park", name: "Pyramid Park" },
      { id: "neon-heights", name: "Neon Heights" },
      { id: "windmillville", name: "Windmillville" },
      { id: "bowsers-enchanted-inferno", name: "Bowser's Enchanted Inferno" }
    ],
    characters: [
      ...BASE_CHARACTERS,
      { id: "toad", name: "Toad", file: "Toad" },
      { id: "boo", name: "Boo", file: "Boo" },
      { id: "toadette", name: "Toadette", file: "Toadette" },
      { id: "birdo", name: "Birdo", file: "Birdo" },
      { id: "dry-bones", name: "Dry Bones", file: "DryBones" }
    ]
  },
  8: {
    name: "Mario Party 8",
    boards: [
      { id: "dks-treetop-temple", name: "DK's Treetop Temple" },
      { id: "goombas-booty-boardwalk", name: "Goomba's Booty Boardwalk" },
      { id: "king-boos-haunted-hideaway", name: "King Boo's Haunted Hideaway" },
      { id: "shy-guys-perplex-express", name: "Shy Guy's Perplex Express" },
      { id: "koopas-tycoon-town", name: "Koopa's Tycoon Town" },
      { id: "bowsers-warped-orbit", name: "Bowser's Warped Orbit" }
    ],
    characters: [
      ...BASE_CHARACTERS,
      { id: "toad", name: "Toad", file: "Toad" },
      { id: "boo", name: "Boo", file: "Boo" },
      { id: "toadette", name: "Toadette", file: "Toadette" },
      { id: "birdo", name: "Birdo", file: "Birdo" },
      { id: "dry-bones", name: "Dry Bones", file: "DryBones" },
      { id: "blooper", name: "Blooper", file: "Blooper" },
      { id: "hammer-bro", name: "Hammer Bro", file: "HammerBro" }
    ]
  }
};

function getBoards(gameNumber) {
  return GAME_DATA[gameNumber]?.boards || [];
}

function getCharacters(gameNumber) {
  return GAME_DATA[gameNumber]?.characters || [];
}

function getGameName(gameNumber) {
  return GAME_DATA[gameNumber]?.name || "";
}

// Board logo filenames (apostrophes replaced with underscores in actual files)
const BOARD_LOGO_FILES = {
  4: {
    "toads-midway-madness": "Toad_s Midway Madness",
    "shy-guys-jungle-jam": "Shy Guys Jungle Jam",
    "goombas-greedy-gala": "Goomba_s Greedy Gala",
    "boos-haunted-bash": "Boo_s Haunted Bash",
    "koopas-seaside-soiree": "Koopa_s Seaside Soiree",
    "bowsers-gnarly-party": "Bowser_s Gnarly Party"
  },
  5: {
    "toy-dream": "Toy Dream",
    "rainbow-dream": "Rainbow Dream",
    "pirate-dream": "Pirate Dream",
    "undersea-dream": "Undersea Dream",
    "future-dream": "Future Dream",
    "sweet-dream": "Sweet Dream",
    "bowser-nightmare": "Bowser Nightmare"
  },
  6: {
    "towering-treetop": "Towering Treetop",
    "e-gadds-garage": "E. Gadd_s Garage",
    "faire-square": "Faire Square",
    "snowflake-lake": "Snowflake Lake",
    "castaway-bay": "Castaway Bay",
    "clockwork-castle": "Clockwork Castle"
  },
  7: {
    "grand-canal": "Grand Canal",
    "pagoda-peak": "Pagoda Peak",
    "pyramid-park": "Pyramid Park",
    "neon-heights": "Neon Heights",
    "windmillville": "Windmillville",
    "bowsers-enchanted-inferno": "Bowser_s Enchanted Inferno"
  },
  8: {
    "dks-treetop-temple": "DK_s Treetop Temple",
    "goombas-booty-boardwalk": "Goomba_s Booty Boardwal",
    "king-boos-haunted-hideaway": "King Boo_s Haunted Hideaway",
    "shy-guys-perplex-express": "Shy Guy_s Perplex Express",
    "koopas-tycoon-town": "Koopa_s Tycoon Town",
    "bowsers-warped-orbit": "Hell"
  }
};

function getBoardLogoPath(gameNumber, boardId) {
  const logo = BOARD_LOGO_FILES[gameNumber]?.[boardId];
  if (logo) return `assets/boards/mp${gameNumber}/${logo}.png`;
  return "";
}

function getBoardImagePath(gameNumber, boardId) {
  return getBoardLogoPath(gameNumber, boardId);
}

function getCharacterImagePath(gameNumber, characterId) {
  const game = GAME_DATA[gameNumber];
  if (game) {
    const char = game.characters.find(c => c.id === characterId);
    if (char) return `assets/characters/mp${gameNumber}/${char.file}-MP${gameNumber}.png`;
  }
  return `assets/characters/${characterId}.png`;
}

function getPlayerIconPath(playerName) {
  return `assets/players/${playerName}.png`;
}

// Character voice line filenames (some have typos like "Voicelip")
const VOICE_LINE_FILES = {
  4: {
    "mario": "MP4 Mario Voiceclip", "luigi": "MP4 Luigi Voicelip",
    "peach": "MP4 Peach Voiceclip", "yoshi": "MP4 Yoshi Voiceclip",
    "wario": "MP4 Wario Voiceclip", "daisy": "MP4 Daisy Voiceclip",
    "waluigi": "MP4 Waluigi Voiceclip", "donkey-kong": "MP4 DK Voiceclip"
  },
  5: {
    "mario": "MP5 Mario Voiceclip", "luigi": "MP5 Luigi Voicelip",
    "peach": "MP5 Peach Voiceclip", "yoshi": "MP5 Yoshi Voiceclip",
    "wario": "MP5 Wario Voiceclip", "daisy": "MP5 Daisy Voiceclip",
    "waluigi": "MP5 Waluigi Voiceclip", "toad": "MP5 Toad Voiceclip",
    "boo": "MP5 Boo Voiceclip", "koopa-kid": "MP5 Koopa Kid Voiceclip"
  },
  6: {
    "mario": "MP6 Mario Voiceclip", "luigi": "MP6 Luigi Voiceclip",
    "peach": "MP6 Peach Voiceclip", "yoshi": "MP6 Yoshi Voiceclip",
    "wario": "MP6 Wario Voiceclip", "daisy": "MP6 Daisy Voiceclip",
    "waluigi": "MP6 Waluigi Voiceclip", "toad": "MP6 Toad Voiceclip",
    "boo": "MP6 Boo Voiceclip", "koopa-kid": "MP6 Koopa Kid Voiceclip",
    "toadette": "MP6 Toadette Voiceclip"
  },
  7: {
    "mario": "MP7 Mario Voiceclip", "luigi": "MP7 Luigi Voiceclip",
    "peach": "MP7 Peach Voiceclip", "yoshi": "MP7 Yoshi Voiceclip",
    "wario": "MP7 Wario Voiceclip", "daisy": "MP7 Daisy Voiceclip",
    "waluigi": "MP7 Waluigi Voiceclip", "toad": "MP7 Toad Voiceclip",
    "boo": "MP7 Boo Voiceclip", "toadette": "MP7 Toadette Voiceclip",
    "birdo": "MP7 Birdo Voiceclip", "dry-bones": "MP7 Dry Bones Voiceclip"
  },
  8: {
    "mario": "MP8 Mario Voiceclip", "luigi": "MP8 Luigi Voiceclip",
    "peach": "MP8 Peach Voiceclip", "yoshi": "MP8 Yoshi Voiceclip",
    "wario": "MP8 Wario Voiceclip", "daisy": "MP8 Daisy Voiceclip",
    "waluigi": "MP8 Waluigi Voiceclip", "toad": "MP8 Toad Voiceclip",
    "boo": "MP8 Boo Voiceclip", "toadette": "MP8 Toadette Voiceclip",
    "birdo": "MP8 Birdo Voiceclip", "dry-bones": "MP8 Dry Bones Voiceclip",
    "blooper": "MP8 Blooper Voiceclip", "hammer-bro": "MP8 Hammer Bro Voiceclip"
  }
};

function getCharacterVoicePath(gameNumber, characterId) {
  const voice = VOICE_LINE_FILES[gameNumber]?.[characterId];
  if (voice) return `assets/audio/voicelines/mp${gameNumber}/${voice}.mp3`;
  return "";
}

const GAME_MUSIC_FILES = {
  4: "mp4-music.mp3",
  5: "mp5-music.mp3",
  6: "mp6-music.mp3",
  7: "mp7-music.mp3",
  8: "mp8-music.mp3"
};

function getGameMusicPath(gameNumber) {
  return `assets/audio/${GAME_MUSIC_FILES[gameNumber] || ""}`;
}

function getGameBackgroundPath(gameNumber) {
  return `assets/backgrounds/mp${gameNumber}.png`;
}
