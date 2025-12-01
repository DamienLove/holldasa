# Holldasa Marketing Planner

A simple, browser-based task management webapp for tracking marketing activities across multiple Holldasa LLC projects.

## Projects Covered

### PulseLink / PulseLink Pro
Personal safety alert mobile application that enables silent SOS notifications to trusted contacts.
- [Google Play Store](https://play.google.com/store/apps/details?id=com.holldasa.pulselink)
- [GitHub Repository](https://github.com/DamienLove/pulselink)

### Universe Connected for Everyone (UC4E)
Science nonfiction/sci-fi hybrid book exploring quantum biology, consciousness, evolution, AI, and holography.

### Other Projects
- D'Immortalio/DND Artistry portfolio
- Holldasa LLC corporate website
- DamienNichols.com personal hub
- 3D printing services

## Features

- **Persistent Storage**: Task completion status is saved in browser localStorage
- **No Backend Required**: Fully client-side, static HTML/CSS/JavaScript
- **Organized by Project**: Tasks grouped into logical sections (PulseLink, UC4E, Other)
- **Simple UI**: Clean checkbox interface with visual feedback for completed tasks

## Usage

Open `index.html` in any modern web browser. Your progress is automatically saved and will persist across browser sessions.

### Adding New Tasks

Edit the `tasks` object in `app.js`. Each task requires:
- `id`: Unique identifier (e.g., "pl8", "uc7", "ot7")
- `text`: Description of the task
- `completed`: Initial state (default: false)

```javascript
pulselink: [
  {
    id: "pl8",
    text: "Your new task description here",
    completed: false,
  },
  // ... existing tasks
]
```

## Development

No build process or dependencies required. Files:
- `index.html` - Page structure
- `style.css` - Styling and layout
- `app.js` - Task definitions and localStorage logic

## GitHub Pages Deployment

To host this webapp publicly:

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
3. Click **Save**
4. Your webapp will be available at: `https://damienlove.github.io/holldasa/`

## License

© 2025 Holldasa LLC. All rights reserved.