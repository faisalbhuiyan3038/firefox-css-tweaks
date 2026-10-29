The reset happens because you are running **Portapps** (`floorp-portable.exe`). 

On every launch, the Portapps executable regenerates and overwrites `app/portapps.cfg` and `app/defaults/pref/autoconfig.js` from its internal Go template.

Here are the **two persistent solutions** that Portapps will never overwrite:

---

### Solution 1: Add a separate pref file in `defaults/pref/` (Quickest & No unpack needed)

Portapps only overwrites `autoconfig.js` and `portapps.cfg`—it does **not** touch other `.js` files in `app/defaults/pref/`. 

Gecko loads all `.js` files in `app/defaults/pref/` alphabetically at startup. By locking the preference to `true` in a custom file loaded after the defaults, Floorp's internal module cannot overwrite it:

1. Close Floorp.
2. In `app/defaults/pref/`, create a new file named **`zzz-nova.js`** (the `zzz` ensures it loads last).
3. Add the following lines to `zzz-nova.js`:
   ```javascript
   // Force Nova UI enabled
   lockPref("browser.nova.enabled", true);
   lockPref("browser.newtabpage.activity-stream.nova.enabled", true);
   ```
4. Start Floorp via `floorp-portable.exe`. Check `about:config`—both preferences will now be active (`true`).

---

### Solution 2: Patch `app/omni.ja` directly (Permanent & Allows normal toggling)

Portapps never touches `app/omni.ja`. If you want to completely remove Floorp's lock so you can toggle `browser.nova.enabled` freely via `about:config` or `user.js`:

1. Close Floorp.
2. Open `m:\floorp-windows-x86_64.portable\app\omni.ja` using 7-Zip or WinRAR (treat it as a `.zip` archive).
3. Navigate inside to:
   `chrome/noraneko/nora-resource/modules/NoranekoStartup.sys.mjs`
4. Open the file and comment out lines 31–34:
   ```javascript
   // for (const pref of ["browser.nova.enabled", "browser.newtabpage.activity-stream.nova.enabled"]) {
   // 	Services.prefs.getDefaultBranch("").setBoolPref(pref, false);
   // 	Services.prefs.lockPref(pref);
   // }
   ```
5. Save the file back into `omni.ja`.
6. Start Floorp. The lock is removed permanently, and you can change the pref in `about:config` or your `user.js`.