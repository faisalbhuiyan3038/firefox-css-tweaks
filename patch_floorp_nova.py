#!/usr/bin/env python3
"""
Unlock Floorp's locked Nova prefs by patching omni.ja.

Usage:
    python patch_floorp_nova.py                      (uses FLOORP_EXE below)
    python patch_floorp_nova.py "M:\\...\\floorp.exe"  (override path)
    python patch_floorp_nova.py --restore            (put the backup back)

Run it after every Floorp update (updates replace omni.ja, undoing the patch).
"""

import os
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile

# ---- EDIT THIS ------------------------------------------------------------
FLOORP_EXE = r"M:\floorp-windows-x86_64.portable\app\floorp.exe"
# ---------------------------------------------------------------------------

TARGET_SUFFIX = "NoranekoStartup.sys.mjs"
FOR_RE = re.compile(r"^\s*for\s*\(.*browser\.nova\.enabled")
PATCHED_RE = re.compile(r"^\s*//\s*for\s*\(.*browser\.nova\.enabled")


def die(msg):
    print(f"[ERROR] {msg}")
    sys.exit(1)


def floorp_running():
    if os.name != "nt":
        return False
    try:
        out = subprocess.run(
            ["tasklist", "/FI", "IMAGENAME eq floorp.exe"],
            capture_output=True, text=True,
        ).stdout.lower()
        return "floorp.exe" in out
    except OSError:
        return False


def find_omni(exe_path):
    exe_dir = os.path.dirname(os.path.abspath(exe_path))
    for cand in (os.path.join(exe_dir, "omni.ja"),
                 os.path.join(exe_dir, "browser", "omni.ja")):
        if os.path.isfile(cand):
            return cand
    die(f"omni.ja not found next to {exe_path} (or in its 'browser' folder).")


def patch_source(text):
    """Comment out the nova lock loop. Returns (new_text, status)."""
    lines = text.splitlines(keepends=True)

    if any(PATCHED_RE.match(l) for l in lines):
        return text, "already"

    start = next((i for i, l in enumerate(lines) if FOR_RE.match(l)), None)
    if start is None:
        return text, "notfound"

    depth, seen_open, end = 0, False, None
    for i in range(start, len(lines)):
        for ch in lines[i]:
            if ch == "{":
                depth += 1
                seen_open = True
            elif ch == "}":
                depth -= 1
        if seen_open and depth <= 0:
            end = i
            break
    if end is None:
        return text, "notfound"

    for i in range(start, end + 1):
        lines[i] = re.sub(r"^([ \t]*)", r"\1// ", lines[i], count=1)
    print(f"  commented out lines {start + 1}-{end + 1}")
    return "".join(lines), "patched"


def patch_omni(omni):
    with zipfile.ZipFile(omni) as zin:
        targets = [i for i in zin.infolist() if i.filename.endswith(TARGET_SUFFIX)]
        if not targets:
            die(f"{TARGET_SUFFIX} not found inside omni.ja (Floorp layout changed?).")
        target = targets[0]
        print(f"  found {target.filename}")

        new_text, status = patch_source(zin.read(target).decode("utf-8"))
        if status == "already":
            print("Already patched, nothing to do.")
            return
        if status == "notfound":
            die("Could not find the nova pref lock loop. The code may have "
                "changed or the lock was removed upstream; check the file manually.")

        fd, tmp = tempfile.mkstemp(suffix=".ja", dir=os.path.dirname(omni))
        os.close(fd)
        try:
            with zipfile.ZipFile(tmp, "w") as zout:
                for item in zin.infolist():
                    data = zin.read(item)
                    if item.filename == target.filename:
                        data = new_text.encode("utf-8")
                    zout.writestr(item, data, compress_type=item.compress_type)
        except Exception:
            os.remove(tmp)
            raise

    backup = omni + ".bak"
    shutil.copy2(omni, backup)
    os.replace(tmp, omni)
    print(f"Patched. Backup saved as {backup}")


def restore(omni):
    backup = omni + ".bak"
    if not os.path.isfile(backup):
        die("No backup found.")
    shutil.copy2(backup, omni)
    print("Restored original omni.ja from backup.")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    exe = args[0] if args else FLOORP_EXE
    if not os.path.isfile(exe):
        die(f"floorp.exe not found at: {exe}")

    if floorp_running():
        die("Floorp is running. Close it first.")

    omni = find_omni(exe)
    print(f"Using {omni}")

    if "--restore" in sys.argv:
        restore(omni)
    else:
        patch_omni(omni)


if __name__ == "__main__":
    main()
