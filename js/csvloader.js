// CSV file loader - parses uploaded CSV for player standings

class CSVLoader {
  constructor() {
    this.players = [];
  }

  loadFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          this.players = this.parseCSV(e.target.result);
          resolve(this.players);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsText(file);
    });
  }

  parseCSV(csvText) {
    const lines = csvText.trim().split("\n");
    const players = [];

    for (let i = 0; i < lines.length; i++) {
      const fields = this.parseCSVLine(lines[i]);

      // CSV has an empty first column; data columns are offset by 1:
      // fields[0] = empty, fields[1] = RANK, fields[2] = PLAYER, fields[3] = POINTS, fields[4] = 1ST PLACES
      const rankStr = (fields[1] || "").trim().replace(/"/g, "");
      const name = (fields[2] || "").trim().replace(/"/g, "");
      const pointsStr = (fields[3] || "").trim().replace(/"/g, "");
      const firstPlacesStr = (fields[4] || "").trim().replace(/"/g, "");

      const rank = parseInt(rankStr, 10);

      // Skip non-data rows (empty rows, title, header, footnotes)
      if (isNaN(rank) || !name) continue;

      const points = parseInt(pointsStr, 10) || 0;
      const firstPlaces = parseInt(firstPlacesStr, 10) || 0;

      players.push({ rank, name, points, firstPlaces });
    }

    players.sort((a, b) => a.rank - b.rank);
    return players;
  }

  parseCSVLine(line) {
    const fields = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        fields.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    fields.push(current);
    return fields;
  }

  getPlayers() {
    return this.players;
  }
}
