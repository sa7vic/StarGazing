# 🚗🔭 Mars Rover Pathfinder

An interactive **pathfinding demo** inspired by Mars rovers navigating rocky terrain.
Uses **Breadth-First Search (BFS)** to find the shortest path between a start and goal cell on a grid-based map.

---

## 🎮 Features

* Visual BFS pathfinding algorithm in action.
* Interactive obstacle placement by clicking cells.
* Start and goal cells are fixed (green = start, yellow = goal).
* Spacebar to run the algorithm step by step until a path is found.
* Reset anytime with `R`.

---

## 🕹️ Controls

| Key / Action    | Description                      |
| --------------- | -------------------------------- |
| 🖱️ Mouse Click | Toggle wall (obstacle) in a cell |
| `Space`         | Start BFS pathfinding            |
| `R`             | Reset grid                       |

---

## 🖼️ Visual Cues

* 🟩 **Green** → Start position
* 🟨 **Yellow** → Goal position
* 🟥 **Red** → Walls / obstacles
* 🟦 (faded) → Visited nodes during BFS
* 🟦💡 Cyan path → Final discovered path

---

## 🛠️ Tech Stack

* **p5.js** for rendering
* **HTML + JavaScript** for logic

---

## 🚀 How to Run

1. Clone or download this project:

   ```bash
   git clone https://github.com/sa7vic/StarGazing.git
   cd StarGazing
   cd "Mars Rover Pathfinder"
   ```
2. Open `index.html` in your browser.

No server required — runs locally.

---
