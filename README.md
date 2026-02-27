# Party League Conference

A web-based production tool for the Party League Conference, a Mario Party competitive league. Features a control panel for match setup and an OBS overlay with animated scenes.

## Setup

### 1. Google Sheet

Your Google Sheet must be **published to the web**:
1. Open your sheet in Google Sheets
2. Go to **File > Share > Publish to web**
3. Select the sheet tab and choose **Comma-separated values (.csv)**
4. Click **Publish**

**Sheet format** (columns in order):

| Rank | Name | Points |
|------|------|--------|
| 1 | PlayerName | 1500 |

### 2. Finding Your Sheet ID

The Sheet ID is the long string in the URL between `/d/` and `/edit`:
```
https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_SHEET_ID/edit
```

### 3. Assets

**Player Icons** (`assets/players/`):
- Filename must match the player's Name column exactly (e.g., `Fira.png`, `Mr. Toad.png`)
- PNG format recommended

**Board Images** (`assets/boards/mp4/`, `mp5/`, etc.):
- Filename uses lowercase hyphenated board names (e.g., `toads-midway-madness.png`)
- One subfolder per game

**Character Images** (`assets/characters/`):
- Filename uses lowercase hyphenated names (e.g., `mario.png`, `donkey-kong.png`, `dry-bones.png`)

**Audio** (`assets/audio/`):
- `stats-music.mp3` - Background music for stats scene
- `reveal-sfx.mp3` - Sound effect for reveals

## Usage

### Control Panel
Open `index.html` in your browser. This is the production control interface.

1. Enter your Google Sheet ID and click **Fetch Players**
2. Select the Mario Party game (4-8)
3. Assign 4 players from the dropdown
4. Choose a character for each player (no duplicates allowed)
5. Optionally ban a board, then pick a board
6. Click **Send Match Data to Overlay**

### OBS Overlay
Open `overlay.html` in a second browser tab (same browser). In OBS, add it as a **Browser Source** (1920x1080).

**Scene flow** (controlled from the control panel):
1. **Show Stats** - Displays player cards with animated background
2. **Reveal Banned Board** - Shows banned board with red X (skip if no ban)
3. **Reveal Picked Board** - Shows selected board with green glow
4. **P1-P4 Selecting/Reveal** - Show "Selecting Character..." then reveal each character
5. **Match Starting Soon** - Scrolling marquee at the bottom
6. **Fade to Black** - Screen fades out

## Deploying to GitHub Pages

1. Create a new GitHub repository
2. Push this folder to the repository
3. Go to **Settings > Pages** and set source to the `main` branch
4. Your app will be available at `https://yourusername.github.io/party-league-conference/`

## File Structure

```
party-league-conference/
├── index.html          - Control panel
├── overlay.html        - OBS overlay
├── css/
│   ├── control.css     - Control panel styles
│   └── overlay.css     - Overlay animations
├── js/
│   ├── sheets.js       - Google Sheets fetch
│   ├── gamedata.js     - MP4-8 boards/characters
│   ├── broadcast.js    - Page-to-page communication
│   ├── control.js      - Control panel logic
│   └── overlay.js      - Overlay scene management
└── assets/
    ├── boards/         - Board images by game
    ├── characters/     - Character images
    ├── players/        - Player icon images
    ├── backgrounds/    - Background assets
    └── audio/          - Music and sound effects
```
