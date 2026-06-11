// Forces WebRender to process all page layout elements through the GPU, offloading the CPU
pref("gfx.webrender.all", true);

// Ensures WebRender acceleration is enabled globally
pref("gfx.webrender.enabled", true);

// Prevents Firefox from reverting to slow, CPU-heavy software rendering when glitches occur
pref("gfx.webrender.fallback.software", false);

// Isolates network requests to their own separate process for improved security and stability
pref("network.process.enabled", true); // reset if network issues occur

// Completely disables accessibility services to heavily reduce CPU overhead and save memory on mobile devices
pref("accessibility.force_disabled", 1);

// Drops the initial pause (in ms) before Firefox begins rendering a page, making layout generation feel immediate
pref("nglayout.initialpaint.delay", 2);