// Bypasses built-in device blocklists to force-enable hardware video decoding on your graphics chip rather than processing via the CPU
pref("media.hardware-video-decoding.force-enabled", true);

// Instructs WebRender to render all layout elements on the page via the GPU for hardware acceleration
pref("gfx.webrender.all", true);

// Activates the WebRender backend globally within the Gecko rendering engine
pref("gfx.webrender.enabled", true);

// Enables VA-API hardware decoding integration for FFMPEG multimedia processing on compatible architectures
pref("media.ffmpeg.vaapi.enabled", true);

// Raises the memory cache ceiling to roughly 1 GB (1,048,156 KB) per individual media stream to allow massive video buffering ahead of playback
pref("media.memory_cache_max_size", 1048156);

// Caps total concurrent system memory usage at 3 GB (3,145,728 KB) for media cache buffers aggregated across all open tabs
pref("media.memory_caches_combined_limit_kb", 3145728);

// Adjusts the automatic buffer eviction threshold for video sources to approximately 150 MB (157,286,400 bytes) to maintain larger pre-loaded stream timelines
pref("media.mediasource.eviction_threshold.video", 157286400);

// Expands the maximum allowable image and canvas cache size up to an explicit 10 GB limit (10,485,760 KB) to store stream previews and page assets natively
pref("image.cache.size", 10485760);

// Directs the image layout engine to wait a minimum of 120 seconds (120,000 ms) before dumping unmapped or background graphics assets out of rapid-access RAM
pref("image.mem.shared.unmap.min_expiration_ms", 120000);