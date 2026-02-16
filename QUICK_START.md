# 🚀 Quick Start Guide - Firefox DevTools Enhanced Theme

## 📦 What You Get

This theme package contains:

1. **`devtools-enhanced.css`** - The main stylesheet (drop-in ready)
2. **`preferences.json`** - Customization reference guide
3. **`README.md`** - Complete documentation
4. **`QUICK_START.md`** - This file (you are here!)

---

## ⚡ 60-Second Setup

### Step 1: Find Your Profile
```
1. Open Firefox
2. Type: about:support
3. Click "Open Folder" (Profile Folder)
```

### Step 2: Install Theme
```bash
# Create chrome folder if it doesn't exist
mkdir chrome
cd chrome

# Copy the CSS file and rename it
# Windows: copy devtools-enhanced.css userChrome.css
# Mac/Linux: cp devtools-enhanced.css userChrome.css
```

### Step 3: Enable Custom Styles
```
1. Type: about:config
2. Search: toolkit.legacyUserProfileCustomizations.stylesheets
3. Set to: true
```

### Step 4: Restart & Enjoy
```
1. Restart Firefox completely
2. Press F12 to open DevTools
3. Marvel at your beautiful new interface 🎉
```

---

## 🎨 First Customizations

### Change the Accent Color (30 seconds)

Open `userChrome.css` and find these lines (around line 130-150):

```css
:root.theme-dark {
   --theme-highlight-blue: #8ab4f8;  /* ← Change this */
}

:root.theme-light {
   --theme-highlight-blue: #1a73e8;  /* ← And this */
}
```

**Popular choices:**
- Purple: `#c792ea` (dark) / `#7c3aed` (light)
- Pink: `#ff7ac6` (dark) / `#db2777` (light)
- Green: `#73daca` (dark) / `#059669` (light)
- Orange: `#ff9e64` (dark) / `#ea580c` (light)

### Disable Animations (10 seconds)

Add this to the **very end** of `userChrome.css`:

```css
* {
   animation: none !important;
   transition: none !important;
}
```

### Use Your Favorite Font (20 seconds)

Find this line (around line 20):

```css
--theme-font-family: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', 'SF Mono', Menlo, monospace;
```

Replace with your preferred font:
```css
--theme-font-family: 'Your Font Name', monospace;
```

---

## 🎯 Key Visual Changes

### Before → After

**Tabs:**
- Before: Flat, minimal feedback
- After: Smooth hover lift, gradient accent bar on active tab, ripple effects

**Console:**
- Before: Static messages
- After: Animated slide-in, glowing error/warning badges, hover effects

**Buttons:**
- Before: Simple hover color change
- After: Ripple animation, lift effect, shadow depth

**Scrollbars:**
- Before: System default (chunky)
- After: Slim, themed, auto-hiding

**Colors:**
- Before: Basic grays
- After: Refined color system with semantic meaning

**Spacing:**
- Before: Inconsistent
- After: Systematic scale (4px base unit)

---

## 🔧 Common Tweaks

### Make it More Compact

Find these lines (around line 40-50) and reduce the values:

```css
:root {
   --theme-space-xs: 2px;   /* was 4px */
   --theme-space-sm: 6px;   /* was 8px */
   --theme-space-md: 10px;  /* was 12px */
   --theme-space-lg: 14px;  /* was 16px */
}
```

### Make Corners More Rounded

Find these lines (around line 55-60):

```css
:root {
   --theme-radius-sm: 8px;   /* was 6px */
   --theme-radius-md: 12px;  /* was 8px */
   --theme-radius-lg: 16px;  /* was 12px */
}
```

### Make Corners Sharp (No Rounding)

```css
:root {
   --theme-radius-xs: 0;
   --theme-radius-sm: 0;
   --theme-radius-md: 0;
   --theme-radius-lg: 0;
   --theme-radius-xl: 0;
}
```

### Increase Font Size

Find this line (around line 20):

```css
--theme-font-size-base: 14px;  /* was 13px */
```

---

## 🎬 Animation Controls

### Speed Up Animations

Find these lines (around line 25-30):

```css
--theme-duration-fast: 0.1s;    /* was 0.2s */
--theme-duration-normal: 0.2s;  /* was 0.3s */
--theme-duration-slow: 0.3s;    /* was 0.5s */
```

### Slow Down Animations (Dramatic Effect)

```css
--theme-duration-fast: 0.3s;    /* was 0.2s */
--theme-duration-normal: 0.5s;  /* was 0.3s */
--theme-duration-slow: 0.8s;    /* was 0.5s */
```

---

## 🐛 Troubleshooting Checklist

**Theme isn't loading?**
- [ ] Check `about:config` → `toolkit.legacyUserProfileCustomizations.stylesheets` is **true**
- [ ] File is named **exactly** `userChrome.css` (not .txt, not userchrome.css)
- [ ] File is in the `chrome` folder inside your profile folder
- [ ] You've **fully restarted** Firefox (not just DevTools)

**Some elements look weird?**
- [ ] Firefox version is 115 or newer
- [ ] No other custom themes/extensions are conflicting
- [ ] Try opening DevTools in a **new window** (not docked)

**Animations are choppy?**
- [ ] Check `about:config` → `layers.acceleration.force-enabled` is **true**
- [ ] Check `about:config` → `gfx.webrender.all` is **true**
- [ ] Reduce animation speed or disable them

**Colors are wrong?**
- [ ] Make sure you're editing the right section (dark vs light)
- [ ] Check Firefox is using the correct theme (about:addons → Themes)
- [ ] Clear cache: Ctrl+Shift+Delete → Everything

---

## 📚 Next Steps

1. ✅ Read the full `README.md` for detailed customization options
2. ✅ Explore `preferences.json` to see all available settings
3. ✅ Experiment with different accent colors and fonts
4. ✅ Share your setup with the community!

---

## 💡 Pro Tips

**Tip #1**: Keep a backup copy of your `userChrome.css` in Dropbox/Google Drive. You'll thank yourself when setting up a new computer.

**Tip #2**: Use `Ctrl+Shift+K` (Console) or `Ctrl+Shift+E` (Network) for direct panel access instead of clicking tabs.

**Tip #3**: The close button (X) has a fun animation - hover over it to see the wave emoji 👋

**Tip #4**: Take a screenshot of your setup using Firefox's built-in tool: `Shift+F2` then type `screenshot`.

**Tip #5**: If you're on macOS, the theme respects your system's dark/light mode automatically.

---

## 🎨 Theme Presets

Want a quick color scheme change? Here are some popular combinations:

### 🌙 Midnight Blue
```css
:root.theme-dark {
   --theme-body-background: #0a0e27;
   --theme-highlight-blue: #6c9bd2;
}
```

### 🍇 Purple Haze
```css
:root.theme-dark {
   --theme-body-background: #1a0e2e;
   --theme-highlight-blue: #c792ea;
}
```

### 🌊 Ocean Breeze
```css
:root.theme-dark {
   --theme-body-background: #0d1b2a;
   --theme-highlight-blue: #5dd9ff;
}
```

### 🌲 Forest Night
```css
:root.theme-dark {
   --theme-body-background: #0d1f0f;
   --theme-highlight-blue: #73daca;
}
```

### 🔥 Warm Sunset
```css
:root.theme-dark {
   --theme-body-background: #1a1410;
   --theme-highlight-blue: #ff9e64;
}
```

---

**You're all set! Happy coding!** 🚀

P.S. If you love the theme, consider sharing it with fellow developers. Good tools deserve to be shared.
