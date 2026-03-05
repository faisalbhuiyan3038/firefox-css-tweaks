# 🎨 Firefox DevTools Enhanced Theme

A **modern, accessible, and highly customizable** CSS theme for Firefox Developer Tools that transforms the default interface into a polished, professional development environment.

![Theme Preview](https://img.shields.io/badge/Firefox-DevTools-orange?style=for-the-badge&logo=firefox)
![Version](https://img.shields.io/badge/version-2.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

---

## ✨ Features

### 🎨 **Visual Enhancements**
- Gradient accent bars on active tabs
- Ripple effects on button clicks
- Console messages slide in with animations
- Glow effects on errors/warnings
- Improved hover states throughout
- Animated wave goodbye on close button
- Glassmorphism effects on selected elements

### 🎛 **Modular Theming System**
- Multiple color themes available.
- Each theme is self-contained and needs to be paired with `devtools-refined.css` to work.
- Super easy to create your own theme by following the existing theme structure.

### 🌊 **Fluid Animations**
- Smooth transitions and micro-interactions throughout the interface
- Tab switching with sliding accent bars
- Ripple effects on buttons
- Message slide-in animations in console
- Configurable animation speeds (or disable completely)

### ⚡ **Performance Optimized**
- GPU-accelerated animations
- Layout containment for reduced reflows
- Efficient CSS architecture
- Minimal performance impact

### ♿ **Accessibility First**
- High contrast focus indicators
- Support for `prefers-reduced-motion`
- Support for `prefers-contrast: high`
- Semantic color usage
- Readable font sizes and spacing

---

## 📥 Installation

### Method 1: UserChrome.css (Recommended)

1. **Find your Firefox profile folder**:
   - Enter `about:support` in Firefox address bar
   - Click "Open Folder" next to "Profile Folder"

2. **Create or navigate to the `chrome` folder**:
   ```bash
   cd /path/to/your/profile/folder
   mkdir -p chrome
   cd chrome
   ```

3. **Copy the css files**:
   - Copy the contents of the `chrome` folder to your Firefox profile folder's `chrome` folder.
   - Update the `userContent.css` to include 1 color theme import along with `devtools-refined.css` import.

4. **Enable UserChrome.css in Firefox**:
   - Enter `about:config` in Firefox
   - Search for `toolkit.legacyUserProfileCustomizations.stylesheets`
   - Set it to `true`

5. **Restart Firefox** and open DevTools (F12)

---

## ⚙️ Customization

### 🎨 **Change Accent Color**

Edit the CSS variables in the `:root.theme-dark` or `:root.theme-light` sections:

```css
/* For dark theme */
:root.theme-dark {
   --theme-highlight-blue: #8ab4f8;  /* Change to your preferred color */
   --theme-focus-outline-color: #8ab4f8;
}

/* For light theme */
:root.theme-light {
   --theme-highlight-blue: #1a73e8;  /* Change to your preferred color */
   --theme-focus-outline-color: #1a73e8;
}
```

### 🔤 **Change Font**

Modify the font family variable:

```css
:root {
   --theme-font-family: 'JetBrains Mono', 'Your Font', monospace;
}
```

**Recommended Fonts**:
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) - Modern, readable
- [Cascadia Code](https://github.com/microsoft/cascadia-code) - Microsoft's coding font
- [Fira Code](https://github.com/tonsky/FiraCode) - With programming ligatures
- [Victor Mono](https://rubjo.github.io/victor-mono/) - Cursive italics
- [Hack](https://sourcefoundry.org/hack/) - Classic and reliable

### 📏 **Adjust Spacing (Compact Mode)**

For a more compact interface, reduce spacing variables:

```css
:root {
   --theme-space-xs: 2px;   /* default: 4px */
   --theme-space-sm: 6px;   /* default: 8px */
   --theme-space-md: 10px;  /* default: 12px */
   --theme-space-lg: 14px;  /* default: 16px */
}
```

### 🎭 **Animation Speed**

Control animation duration:

```css
:root {
   --theme-duration-fast: 0.1s;    /* default: 0.2s */
   --theme-duration-normal: 0.2s;  /* default: 0.3s */
   --theme-duration-slow: 0.3s;    /* default: 0.5s */
}
```

To **disable all animations**:
```css
*, *::before, *::after {
   animation-duration: 0.01ms !important;
   transition-duration: 0.01ms !important;
}
```

### 🔲 **Border Radius**

Adjust roundness of UI elements:

```css
:root {
   --theme-radius-xs: 2px;   /* default: 3px */
   --theme-radius-sm: 4px;   /* default: 6px */
   --theme-radius-md: 6px;   /* default: 8px */
   --theme-radius-lg: 10px;  /* default: 12px */
}
```

For a **sharp, geometric look** (no rounded corners):
```css
:root {
   --theme-radius-xs: 0;
   --theme-radius-sm: 0;
   --theme-radius-md: 0;
   --theme-radius-lg: 0;
}
```

---

## 🎯 Key Improvements Over Original

| Feature | Original | Enhanced |
|---------|----------|----------|
| **Color System** | Basic dark/light | Full design system with semantic colors |
| **Animations** | Basic fades | Fluid, spring-based animations with timing functions |
| **Accessibility** | Minimal | Full a11y support (reduced motion, high contrast) |
| **Performance** | Standard | GPU-accelerated with layout containment |
| **Customization** | Limited | Extensive CSS variables for easy theming |
| **Typography** | Generic | Professional monospace font stack |
| **Spacing** | Inconsistent | Systematic spacing scale |
| **Console** | Basic styling | Animated messages with glow effects |
| **Hover States** | Simple | Multi-layered with ripple effects |
| **Focus Indicators** | Weak | Strong, accessible outlines |

---

## 🎨 Design Philosophy

This theme follows these principles:

1. **Clarity Over Decoration**: Every visual effect serves a purpose
2. **Consistency**: Unified spacing, colors, and interaction patterns
5. **Extensibility**: Easy to customize via CSS variables

---

--- 

## Short Note
- Variable names in Firefox devtools sound misleading. They map to token roles not colors. Here's a cheatsheet for understanding their impact.

```js
--theme-highlight-blue      → tag names, selectors       → Dracula PINK
--theme-highlight-purple    → CSS property names         → Dracula YELLOW
--theme-highlight-pink      → numbers, booleans          → Dracula PURPLE
--theme-highlight-red       → strings, attribute values  → Dracula GREEN
--theme-highlight-orange    → at-rules, operators        → Dracula ORANGE
--theme-highlight-lightorange → units, keywords          → Dracula BRIGHT YELLOW
--theme-highlight-green     → comments                   → Dracula COMMENT
--theme-highlight-bluegrey  → attribute names, ids       → Dracula CYAN
--theme-highlight-yellow    → errors, special tokens     → Dracula RED
```

## 🐛 Troubleshooting

### Theme not loading?
- ✅ Verify `toolkit.legacyUserProfileCustomizations.stylesheets` is `true`
- ✅ Check file is named exactly `userChrome.css`
- ✅ Restart Firefox completely (not just DevTools)

### Animations feel choppy?
- Try reducing animation complexity in `about:config`:
  - `layers.acceleration.force-enabled` → `true`
  - `gfx.webrender.all` → `true`

### Some elements look wrong?
- This theme is optimized for **Firefox 115+**
- Older versions may have different CSS class names

### Colors don't match documentation?
- Make sure you're editing the correct theme section (`:root.theme-dark` vs `:root.theme-light`)
- Clear Firefox cache and restart

---

## 📝 Preferences.json

The included `preferences.json` file documents all customizable properties. While it's primarily for documentation, you can use it as a reference when modifying the CSS variables.

---

## 🤝 Contributing

Found a bug or have an improvement? Feel free to:
- Report issues
- Suggest features
- Submit pull requests
- Share your customizations

---

## 📜 License

MIT License - Feel free to use, modify, and distribute.

---

## 🙏 Credits

**Inspired by**:
- Material Design 3
- Fluent Design System
- GitHub Dark Theme
- VS Code themes

**Built with**:
- CSS Variables
- Modern CSS features (containment, backdrop-filter)
- Performance best practices
- Accessibility guidelines (WCAG 2.1)

---

## 💡 Tips & Tricks

### Pro Tip #1: Theme Switching
Firefox respects your system theme. Set `ui.systemUsesDarkTheme` in `about:config`:
- `1` = Force dark
- `0` = Force light
- `2` = Auto (follow system)

### Pro Tip #2: Font Ligatures
If using Fira Code or similar fonts with ligatures, they'll automatically work in DevTools!

### Pro Tip #3: Screenshot Your Setup
Use Firefox's screenshot tool (`Shift+F2`, then `screenshot --fullpage`) to capture your customized DevTools.

**Enjoy your enhanced Firefox DevTools!** 🚀
