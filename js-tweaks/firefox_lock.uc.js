// firefox-lock.uc.js — Firefox Lock Mod (RAM Only / No Crash)
// Version: 1.0
// Compatible with: fx-autoconfig, xiaoxiaoflood/firefox-scripts, or any uc.js loader
//
// INSTALL:
//   1. Install a uc.js loader (recommended: https://github.com/MrOtherGuy/fx-autoconfig)
//   2. Drop this file into: <Firefox Profile>/chrome/JS/
//   3. Change the PASSWORD below.
//   4. Restart Firefox — every new window will lock until unlocked.
//
// HOW IT WORKS:
//   - Runs at browser startup via the uc.js loader
//   - Overlays a fullscreen lock UI on top of the browser chrome
//   - BroadcastChannel syncs unlock state across all open windows (RAM only)
//   - Re-locks on every fresh browser start (no persistent state)

"use strict";

const FF_LOCK_PASSWORD   = "yourSecretPassword123"; // ← CHANGE THIS
const FF_CHANNEL_NAME    = "firefox_lock_ram_sync";
const FF_MAX_FAILS       = 5;
const FF_LOCKOUT_MS      = 30_000;

(function () {
  try {
    console.log("🔒 FF Lock Mod v1: Initializing...");

    // ── BroadcastChannel for cross-window unlock sync ──
    const channel = new BroadcastChannel(FF_CHANNEL_NAME);

    // ── State ──
    let locked      = true;
    let failCount   = 0;
    let lockoutUntil = 0;

    // ── Helpers ──
    // Firefox's top-level document is browser.xhtml (XUL), not a regular HTML page.
    // We inject into `document` which IS the chrome document here.
    const doc = document;
    const head = doc.head || doc.documentElement;

    // ── Styles ──
    const style = doc.createElement("style");
    style.textContent = `
      @keyframes ff-lock-fadeIn {
        from { opacity: 0; transform: scale(0.96); }
        to   { opacity: 1; transform: scale(1);    }
      }
      @keyframes ff-lock-shake {
        0%,100% { transform: translateX(0);   }
        20%     { transform: translateX(-7px); }
        40%     { transform: translateX(7px);  }
        60%     { transform: translateX(-3px); }
        80%     { transform: translateX(3px);  }
      }
      #ff-lock-overlay {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #04060a 0%, #0a0d14 100%);
        contain: strict;
      }
      #ff-lock-card {
        position: relative;
        background: rgba(18, 22, 32, 0.98);
        border: 1px solid rgba(255,255,255,0.08);
        padding: 48px;
        border-radius: 14px;
        box-shadow: 0 24px 72px rgba(0,0,0,0.85);
        text-align: center;
        min-width: 320px;
        animation: ff-lock-fadeIn 0.3s ease-out forwards;
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
      #ff-lock-icon { margin-bottom: 20px; opacity: 0.9; }
      #ff-lock-title {
        font-size: 18px; color: #ffffff; font-weight: 600;
        margin-bottom: 8px;
      }
      #ff-lock-subtitle {
        font-size: 13px; color: rgba(255,255,255,0.4);
        margin-bottom: 26px;
      }
      #ff-lock-input {
        display: block; width: 100%; box-sizing: border-box;
        padding: 10px 12px; border-radius: 6px;
        border: 1px solid rgba(255,255,255,0.15);
        background: rgba(0,0,0,0.3); color: white;
        margin-bottom: 14px; font-size: 14px;
        font-family: monospace; text-align: center;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      #ff-lock-input:focus {
        outline: none;
        border-color: #4f9cf9;
        box-shadow: 0 0 0 2px rgba(79,156,249,0.22);
      }
      #ff-lock-btn {
        display: block; width: 100%; padding: 10px;
        border-radius: 6px; border: none;
        background: #2563eb; color: white;
        font-size: 14px; font-weight: 600;
        cursor: pointer;
        transition: background 0.15s;
      }
      #ff-lock-btn:hover  { background: #1d4ed8; }
      #ff-lock-btn:active { background: #1e40af; }
      #ff-lock-msg {
        color: #ff6b6b; margin-top: 12px;
        font-size: 12px; min-height: 16px;
      }
    `;
    head.appendChild(style);

    // ── Build Overlay DOM ──
    const overlay = doc.createElement("div");
    overlay.id = "ff-lock-overlay";

    const card = doc.createElement("div");
    card.id = "ff-lock-card";
    card.innerHTML = `
      <div id="ff-lock-icon">
        <svg width="48" height="48" viewBox="0 0 24 24"
             fill="none" stroke="#4f9cf9"
             stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
      <div id="ff-lock-title">Secure Browser</div>
      <div id="ff-lock-subtitle">Session Locked</div>
    `;

    const input = doc.createElement("input");
    input.id          = "ff-lock-input";
    input.type        = "password";
    input.placeholder = "Enter Password";
    input.setAttribute("spellcheck", "false");
    input.setAttribute("autocomplete", "off");

    const btn = doc.createElement("button");
    btn.id          = "ff-lock-btn";
    btn.textContent = "Unlock Session";

    const msg = doc.createElement("div");
    msg.id = "ff-lock-msg";

    card.appendChild(input);
    card.appendChild(btn);
    card.appendChild(msg);
    overlay.appendChild(card);

    // ── Core Logic ──
    function performUnlock(broadcast) {
      if (!locked) return;
      locked = false;

      if (broadcast) channel.postMessage({ type: "UNLOCK_ALL" });

      overlay.style.opacity    = "0";
      overlay.style.transition = "opacity 0.25s ease";
      setTimeout(() => {
        overlay.remove();
        style.remove();
      }, 260);

      removeBlockers();
    }

    function checkPassword() {
      if (Date.now() < lockoutUntil) {
        msg.textContent = "Locked out — please wait.";
        return;
      }

      if (input.value === FF_LOCK_PASSWORD) {
        performUnlock(true);
      } else {
        failCount++;
        input.value = "";
        // Re-trigger shake
        card.style.animation = "none";
        void card.offsetHeight; // force reflow
        card.style.animation = "ff-lock-shake 0.4s ease";

        if (failCount >= FF_MAX_FAILS) {
          lockoutUntil    = Date.now() + FF_LOCKOUT_MS;
          msg.textContent = `Too many attempts — wait ${FF_LOCKOUT_MS / 1000}s.`;
        } else {
          msg.textContent = `Incorrect password (${failCount}/${FF_MAX_FAILS})`;
        }
        input.focus();
      }
    }

    // ── Event Wiring ──
    btn.onclick    = checkPassword;
    input.onkeydown = (e) => { if (e.key === "Enter") checkPassword(); };

    // Cross-window unlock sync
    channel.onmessage = (e) => {
      if (e.data.type === "UNLOCK_ALL")    performUnlock(false);
      if (e.data.type === "CHECK_STATUS" && !locked) channel.postMessage({ type: "I_AM_UNLOCKED" });
      if (e.data.type === "I_AM_UNLOCKED") performUnlock(false);
    };

    // ── Input Blocking ──
    // Blocks all mouse + keyboard interaction outside the overlay while locked
    function pointerBlock(e) {
      if (!locked) return;
      if (overlay.contains(e.target)) return;
      e.stopPropagation();
      e.preventDefault();
    }

    function keyBlock(e) {
      if (!locked) return;
      if (overlay.contains(e.target)) return;
      // Always allow DevTools hotkeys so you can debug if needed
      if (e.key === "F12") return;
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) return;
      e.stopImmediatePropagation();
      e.preventDefault();
    }

    const BLOCKED_EVENTS = ["mousedown", "mouseup", "click", "contextmenu", "wheel", "dragstart"];

    function attachBlockers() {
      BLOCKED_EVENTS.forEach(ev => window.addEventListener(ev, pointerBlock, true));
      window.addEventListener("keydown", keyBlock, true);
    }

    function removeBlockers() {
      BLOCKED_EVENTS.forEach(ev => window.removeEventListener(ev, pointerBlock, true));
      window.removeEventListener("keydown", keyBlock, true);
    }

    // ── Mounting Strategy ──
    // Firefox's chrome document can be in various readyStates at uc.js load time.
    // We poll for the main browser UI container (#browser or #appcontent).
    const MOUNT_TARGETS = ["#browser", "#appcontent", "#main-window", "body"];

    function tryMount() {
      for (const selector of MOUNT_TARGETS) {
        const root = doc.querySelector(selector);
        if (root) {
          console.log(`🔒 FF Lock Mod v1: Mounted on "${selector}"`);
          root.appendChild(overlay);

          // Check if another window is already unlocked
          channel.postMessage({ type: "CHECK_STATUS" });
          // Give 200ms for a reply before committing to locked state
          setTimeout(() => {
            if (locked) attachBlockers();
          }, 200);

          // Aggressive focus (Firefox chrome can steal focus)
          input.focus();
          setTimeout(() => input.focus(), 150);
          setTimeout(() => input.focus(), 500);
          return true;
        }
      }
      return false;
    }

    // If DOM isn't ready yet, poll until it is
    if (!tryMount()) {
      const mountInterval = setInterval(() => {
        if (tryMount()) clearInterval(mountInterval);
      }, 50);

      // Give up after 10s (shouldn't happen, but avoids ghost intervals)
      setTimeout(() => clearInterval(mountInterval), 10_000);
    }

  } catch (err) {
    console.error("🔒 FF Lock Mod FATAL ERROR:", err);
  }
})();