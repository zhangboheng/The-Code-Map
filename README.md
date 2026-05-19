# The Code Map 🔗

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://zhangboheng.github.io/The-Code-Map/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-2.0.0-orange.svg)](https://github.com/zhangboheng/The-Code-Map)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/zhangboheng/The-Code-Map/pulls)

> A curated collection of useful websites and resources for developers, organized in a modern one-screen layout.

🔗 **Live Demo**: [https://zhangboheng.github.io/The-Code-Map/](https://zhangboheng.github.io/The-Code-Map/)

---

## 📖 Overview

**The Code Map** is a comprehensive resource hub designed for developers, programmers, and tech enthusiasts. It provides a carefully curated collection of high-quality websites, tools, and learning resources across various programming languages and technologies.

The project features a modern, clean one-screen layout with a collapsible sidebar navigation system, making it easy to browse through hundreds of resources without overwhelming the user.

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
  - 🇨🇳 Chinese (Simplified)
  - 🇺🇸 English
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

### 🔍 Search & Filter
- **Real-Time Search**: Instant filtering as you type
- **Category Filtering**: Browse by specific categories
- **Subcategory Navigation**: Drill down into specific topics

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
- **Offline Capable**: Basic offline functionality
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

**No External Dependencies** - Built entirely with vanilla JavaScript, no frameworks or libraries required.

---

## 📂 Project Structure

```
The-Code-Map/
├── index.html              # Main entry point
├── css/
│   └── home.css            # All styles (themes, layout, components)
├── js/
│   ├── app.js              # Application logic (UI, i18n, events)
│   └── data.js             # Links data & category definitions
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
2. Results filter instantly across all categories
3. Clear search to restore full list

### Favorites
1. Hover over any link card to reveal the star icon
2. Click the star to add/remove from favorites
3. Favorites are stored locally and persist across sessions

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

---

## ⚙️ Customization

### Adding New Links
Edit `js/data.js` to add new links:

```javascript
{
  name: "Link Name",
  url: "https://example.com",
  icon: "🔗",  // Emoji or image path
  description: "Brief description"
}
```

### Adding New Categories
Add new category structure in `js/data.js`:

```javascript
categories: {
  newCategory: {
    name: "Category Name",
    icon: "📁",
    subcategories: {
      sub1: { name: "Subcategory 1", icon: "📄" }
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
1. Add language code to `languages` object in `js/app.js`
2. Create translations object with all UI strings
3. Add flag emoji and language name

---

## 🌍 Internationalization

Supported languages with their coverage:

| Language | Code | Status |
|----------|------|--------|
| Chinese | `zh` | ✅ Complete |
| English | `en` | ✅ Complete |
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

---

## 📋 Categories

The resource collection covers:

| Category | Description |
|----------|-------------|
| 🤖 **AI** | Artificial Intelligence tools (Chat, Image, Video, Audio, Coding) |
| 🐍 **Python** | Python resources, frameworks, and tools |
| ☕ **Java** | Java and JVM ecosystem resources |
| 🌐 **Web** | Frontend frameworks, HTML/CSS, JavaScript |
| 🐘 **PHP** | PHP frameworks and CMS platforms |
| ⚙️ **C/C++/C#** | Systems programming languages |
| 🚀 **Go/Ruby/Swift/Rust** | Modern programming languages |
| 📚 **Learn** | Free and paid learning resources |
| 💪 **Practice** | Coding practice and challenge platforms |
| 📦 **More** | DevOps, Deployment, Tools, Community |

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
2. Add new links to `js/data.js`
3. Ensure proper categorization
4. Submit a pull request

### Reporting Issues
- Use GitHub Issues for bug reports
- Include browser version and screenshots
- Describe expected vs actual behavior

### Improving Translations
1. Find missing translations in `js/app.js`
2. Add complete translations for your language
3. Submit a pull request

### Code Contributions
1. Follow existing code style
2. Test across multiple browsers
3. Keep changes minimal and focused

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 zhangboheng

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
- **Categories**: 10 major categories with subcategories
- **Languages**: 6 supported languages
- **No Dependencies**: Pure vanilla implementation
- **File Size**: Lightweight, fast loading

---

**Made with ❤️ for developers worldwide**

*If you find this project useful, please consider giving it a ⭐ on GitHub!*
