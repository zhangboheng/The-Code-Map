# The Code Map 🔗

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://zhangboheng.github.io/The-Code-Map/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-2.1.0-orange.svg)](https://github.com/zhangboheng/The-Code-Map)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/zhangboheng/The-Code-Map/pulls)

> A curated collection of useful websites and resources for developers, organized in a modern one-screen layout with modular architecture.

🔗 **Live Demo**: [https://zhangboheng.github.io/The-Code-Map/](https://zhangboheng.github.io/The-Code-Map/)

---

## 📖 Overview

**The Code Map** is a comprehensive resource hub designed for developers, programmers, and tech enthusiasts. It provides a carefully curated collection of high-quality websites, tools, and learning resources across various programming languages and technologies.

The project features a modern, clean one-screen layout with a collapsible sidebar navigation system, making it easy to browse through hundreds of resources without overwhelming the user.

### 🆕 Version 3.0 Highlights

- **Modular Architecture**: Code split into focused modules for better maintainability
- **External Data Source**: JSON-based data structure with GitHub sync capability
- **Enhanced Search**: Fuzzy search with priority scoring and history
- **Offline Support**: Local caching with automatic backup

---

## ✨ Features

### 🎨 Modern UI Design
- **One-Screen Layout**: Everything fits in a single viewport for maximum efficiency
- **Collapsible Sidebar**: Drawer-style navigation that can be expanded or collapsed
- **Smooth Animations**: Fluid transitions and hover effects
- **Glassmorphism Effects**: Modern visual styling with subtle gradients

### 📱 Responsive & Accessible
- **Mobile-First Design**: Fully responsive across all device sizes
- **Touch-Friendly**: Optimized for touch interactions on mobile devices
- **Keyboard Navigation**: Full keyboard accessibility support

### 🌍 Internationalization (i18n)
- **6 Languages Supported**:
  - 🇺🇸 English
  - 🇨🇳 Chinese (Simplified)
  - 🇯🇵 Japanese
  - 🇰🇷 Korean
  - 🇪🇸 Spanish
  - 🇫🇷 French
- **Easy Language Switching**: Dropdown selector in the header
- **Complete Translation**: All UI elements are translated

### 🌙 Theme Support
- **Dark Mode**: Default theme with dark backgrounds
- **Light Mode**: Alternative light theme
- **Smooth Transition**: Animated theme switching
- **System Preference**: Auto-detects system theme preference

### 🔍 Enhanced Search
- **Fuzzy Search**: Smart matching with typo tolerance
- **Priority Scoring**: Results ranked by relevance (name > tags > description)
- **Search History**: Recent searches saved locally
- **Keyboard Navigation**: Arrow keys and Enter for quick selection
- **Real-Time Suggestions**: Instant dropdown with matching results

### 🐙 GitHub Data Source
- **Multiple Sync Methods**:
  - Raw URL: Direct link to JSON file
  - GitHub API: Repository-based access
  - GitHub Gist: Gist-based storage
- **Local Caching**: Offline capability with automatic backup
- **Rate Limit Monitoring**: Visual indicator for API usage
- **Configuration Persistence**: Settings saved in localStorage

### ⭐ Favorites System
- **Local Storage**: Favorites saved in browser
- **Quick Access**: Easy access to saved links
- **Visual Indicators**: Clear marking of favorite items

### 🔧 Custom Link Management
- **Add Custom Links**: Create your own bookmarks
- **Edit & Delete**: Full management capabilities
- **Export/Import**: Backup and restore your custom links

### 📦 PWA Support
- **Installable**: Can be installed as a standalone app
- **Offline Capable**: Basic offline functionality with cached data
- **App Icons**: Full icon set for all platforms

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure & Semantics |
| CSS3 | Styling & Animations |
| JavaScript ES6+ | Application Logic |
| LocalStorage | Data Persistence |
| CSS Variables | Theme Management |
| Flexbox/Grid | Layout System |
| Fetch API | GitHub Data Sync |

**No External Dependencies** - Built entirely with vanilla JavaScript, no frameworks or libraries required.

---

## 🏗 Architecture

The project follows a modular architecture pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                        index.html                            │
│                     (Entry Point)                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      js/app.js                               │
│              (Main Application Controller)                   │
│  - Event binding                                             │
│  - Initialization                                            │
│  - Module coordination                                       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  js/modules/  │    │  js/modules/  │    │  js/modules/  │
│   state.js    │    │    i18n.js    │    │   search.js   │
│               │    │               │    │               │
│ - App state   │    │ - Translations│    │ - Fuzzy search│
│ - Settings    │    │ - 6 languages │    │ - History     │
│ - Favorites   │    │ - Lang switch │    │ - Suggestions │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  js/modules/  │    │  js/modules/  │    │  js/modules/  │
│   render.js   │    │  dataLoader.js│    │dataSourceUI.js│
│               │    │               │    │               │
│ - Sidebar     │    │ - JSON load   │    │ - Settings UI │
│ - Content     │    │ - GitHub sync │    │ - Sync status │
│ - Cards       │    │ - Caching     │    │ - Config form │
└───────────────┘    └───────────────┘    └───────────────┘
                              │
                              ▼
                    ┌───────────────┐
                    │ data/links.json│
                    │               │
                    │ - Categories  │
                    │ - Subcategories│
                    │ - Links data  │
                    └───────────────┘
```

### Module Responsibilities

| Module | Responsibility |
|--------|---------------|
| `state.js` | Application state management, favorites, settings persistence |
| `i18n.js` | Internationalization, translations for 6 languages |
| `search.js` | Fuzzy search algorithm, search history, suggestions |
| `render.js` | UI rendering, sidebar navigation, content grid |
| `dataLoader.js` | Data loading, GitHub sync, caching, offline backup |
| `dataSourceUI.js` | Data source settings modal, sync controls, status display |

---

## 📂 Project Structure

```
The-Code-Map/
├── index.html              # Main entry point
├── css/
│   └── home.css            # All styles (themes, layout, components)
├── js/
│   ├── app.js              # Main application controller
│   ├── data.js             # Fallback embedded data (for offline)
│   └── modules/            # Modular JavaScript components
│       ├── state.js        # State management module
│       ├── i18n.js         # Internationalization module
│       ├── search.js       # Search functionality module
│       ├── render.js       # UI rendering module
│       ├── dataLoader.js   # Data loading & GitHub sync module
│       └── dataSourceUI.js # Data source settings UI module
├── data/
│   └── links.json          # External JSON data source
├── docs/
│   └── github-datasource.md # GitHub data source documentation
├── assets/
│   ├── icons/              # Favicons & PWA icons (all sizes)
│   │   ├── favicon.ico
│   │   ├── apple-touch-icon-*.png
│   │   └── favicon-*.png
│   └── images/
│       ├── logo.png        # Project logo
│       └── qr/             # QR codes
├── manifest.json           # PWA manifest configuration
├── robots.txt              # SEO crawler instructions
├── sitemap.xml             # SEO sitemap
├── LICENSE                 # MIT License
└── README.md               # This documentation
```

---

## 🚀 Quick Start

### Option 1: Direct Browser
Simply open `index.html` in your browser:
```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

### Option 2: Local Server
Using Python:
```bash
python -m http.server 8000
# Then open http://localhost:8000
```

Using Node.js:
```bash
npx serve .
# Then open http://localhost:3000
```

Using VS Code:
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

---

## 📖 Usage Guide

### Navigation
1. **Sidebar**: Click category headers to expand/collapse subcategories
2. **Toggle Bar**: Use the left toggle bar to show/hide the sidebar
3. **Collapsed Mode**: When sidebar is hidden, use category icons in the toggle bar

### Search
1. Enter keywords in the search box (top-right)
2. Results filter instantly with fuzzy matching
3. Use arrow keys to navigate suggestions
4. Press Enter to select
5. Clear search to restore full list

### Favorites
1. Hover over any link card to reveal the star icon
2. Click the star to add/remove from favorites
3. Access favorites from the sidebar
4. Favorites are stored locally and persist across sessions

### Custom Links
1. Click "Add Link" button in the custom links section
2. Fill in the name and URL
3. Custom links appear with special styling
4. Use edit/delete buttons to manage your links

### Theme Switch
1. Click the theme toggle button (sun/moon icon)
2. Theme preference is saved automatically

### Language Switch
1. Click the language dropdown (top-right)
2. Select your preferred language
3. All UI text updates instantly

### GitHub Data Source
1. Click the "Data Source" button in the header
2. Select "GitHub Data Source"
3. Choose sync method (Raw URL, API, or Gist)
4. Enter your configuration
5. Click "Sync Data" to fetch latest data

---

## ⚙️ Customization

### Adding New Links
Edit `data/links.json` to add new links:

```json
{
  "categories": {
    "ai": {
      "name": "AI",
      "icon": "🤖",
      "subcategories": {
        "chat": {
          "name": "Chat",
          "icon": "💬",
          "links": [
            {
              "name": "ChatGPT",
              "url": "https://chat.openai.com",
              "icon": "🤖",
              "description": "AI chatbot by OpenAI",
              "tags": ["ai", "chat", "gpt"]
            }
          ]
        }
      }
    }
  }
}
```

### Link Data Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Display name of the link |
| `url` | string | ✅ | Full URL to the resource |
| `icon` | string | ❌ | Emoji or image path (default: 🔗) |
| `description` | string | ❌ | Brief description for search |
| `tags` | array | ❌ | Keywords for search enhancement |

### Adding New Categories
Add new category structure in `data/links.json`:

```json
{
  "categories": {
    "newCategory": {
      "name": "Category Name",
      "icon": "📁",
      "subcategories": {
        "sub1": {
          "name": "Subcategory 1",
          "icon": "📄",
          "links": []
        }
      }
    }
  }
}
```

### Modifying Styles
All styles are in `css/home.css` using CSS variables:
- Change colors by modifying `:root` variables
- Adjust layout dimensions via `--sidebar-width`, `--header-height`
- Add new themes by creating new `[data-theme="..."]` rules

### Adding New Languages
1. Add language object to `translations` in `js/modules/i18n.js`
2. Include all required translation keys
3. Add flag emoji and language name
4. Add option to language dropdown in `index.html`

---

## 🐙 GitHub Data Source Configuration

The application supports syncing data from GitHub, enabling collaborative resource management.

### Sync Methods

| Method | Use Case | Rate Limit |
|--------|----------|------------|
| **Raw URL** | Public repository files | No limit |
| **GitHub API** | Private repos, metadata | 5000/hour (auth) |
| **GitHub Gist** | Quick updates, snippets | 5000/hour (auth) |

### Configuration

1. **Raw URL Method**:
   ```
   https://raw.githubusercontent.com/username/repo/main/data/links.json
   ```

2. **GitHub API Method**:
   - Repository Owner: `username`
   - Repository Name: `repository-name`

3. **Gist Method**:
   - Gist ID: `abc123def456...`

### Authentication (Optional)
Adding a GitHub token increases API rate limits:
- Without token: 60 requests/hour
- With token: 5000 requests/hour

Generate token at: GitHub Settings → Developer settings → Personal access tokens

📖 **Detailed Documentation**: [docs/github-datasource.md](docs/github-datasource.md)

---

## 🌍 Internationalization

Supported languages with their coverage:

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Complete |
| Chinese | `zh` | ✅ Complete |
| Japanese | `ja` | ✅ Complete |
| Korean | `ko` | ✅ Complete |
| Spanish | `es` | ✅ Complete |
| French | `fr` | ✅ Complete |

All UI elements are translated including:
- Navigation labels
- Button text
- Search placeholder
- Modal content
- Category names
- Data source settings

---

## 📋 Categories

The resource collection covers:

| Category | Icon | Description |
|----------|------|-------------|
| **AI** | 🤖 | Artificial Intelligence tools (Chat, Image, Video, Audio, Coding) |
| **Frontend** | 🌐 | Frontend frameworks (React, Vue, Angular, CSS, JavaScript) |
| **Backend** | ⚙️ | Backend languages (Python, Java, Go, Rust, PHP, C/C++/C#, Ruby, Swift) |
| **Database** | 🗄️ | SQL, NoSQL, ORM tools |
| **DevOps** | 🚀 | Docker, K8s, CI/CD, Deployment tools |
| **Learn** | 📚 | Free and paid learning resources, books |
| **Community** | 👥 | GitHub, Forums, Blogs |
| **Design** | 🎨 | Free assets, Inspiration, Colors, Premium resources |
| **Tools** | 🔧 | IDE, API tools, Design tools, Utilities |

---

## 💻 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 80+ | ✅ Full |
| Firefox | 75+ | ✅ Full |
| Safari | 13+ | ✅ Full |
| Edge | 80+ | ✅ Full |
| Opera | 67+ | ✅ Full |
| IE | 11 | ❌ Not Supported |

**Note**: Requires modern browser with CSS Variables and ES6+ support.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Adding Resources
1. Fork the repository
2. Add new links to `data/links.json`
3. Ensure proper categorization and tags
4. Submit a pull request

### Reporting Issues
- Use GitHub Issues for bug reports
- Include browser version and screenshots
- Describe expected vs actual behavior

### Improving Translations
1. Find translations in `js/modules/i18n.js`
2. Add or improve translations for your language
3. Submit a pull request

### Code Contributions
1. Follow existing code style
2. Maintain modular architecture
3. Test across multiple browsers
4. Keep changes minimal and focused

---

## 📝 Changelog

### Version 2.1.0 (2026-05-19)
- 🏗 **Architecture**: Modular code structure with 6 focused modules
- 📦 **Data**: External JSON data source with GitHub sync
- 🔍 **Search**: Enhanced fuzzy search with priority scoring
- 🐙 **GitHub**: Multiple sync methods (Raw URL, API, Gist)
- 💾 **Offline**: Local caching with automatic backup
- 🌍 **i18n**: Full translations for data source UI

### Version 2.0.0
- 🎨 Redesigned UI with glassmorphism effects
- 🌙 Dark/Light theme support
- 🌍 Internationalization (6 languages)
- ⭐ Favorites system
- 🔧 Custom link management
- 📦 PWA support

### Version 1.0.0
- 🎉 Initial release
- 📚 Basic resource collection
- 📱 Responsive design

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024-2026 zhangboheng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👤 Author

**zhangboheng**

- GitHub: [@zhangboheng](https://github.com/zhangboheng)
- Repository: [The-Code-Map](https://github.com/zhangboheng/The-Code-Map)

---

## 🙏 Acknowledgments

- All resource providers and tool creators featured in this collection
- Open source community for inspiration and best practices
- Contributors who help improve this project

---

## 📊 Project Stats

- **Total Resources**: 200+ curated links
- **Categories**: 9 major categories with subcategories
- **Languages**: 6 supported languages
- **Modules**: 6 focused JavaScript modules
- **No Dependencies**: Pure vanilla implementation
- **File Size**: Lightweight, fast loading

---

**Made with ❤️ for developers worldwide**

*If you find this project useful, please consider giving it a ⭐ on GitHub!*
