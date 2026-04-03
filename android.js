pref("gfx.webrender.all", true);
pref("gfx.webrender.enabled", true);
pref("network.process.enabled", true);

pref("gfx.webrender.fallback.software", false);

// only for mobile
pref("accessibility.force_disabled", 1); // > 1

// part 2


// increased delay for stable rendering, default is 5
pref("nglayout.initialpaint.delay", 125);

pref("browser.cache.disk.capacity", 1048576);
pref("browser.cache.disk.smart_size.enabled", false);

pref("privacy.partition.network_state.ocsp_cache", true);
pref("network.ssl_tokens_cache_use_only_once", false);
pref("browser.tabs.useCache", true);
pref("dom.script_loader.bytecode_cache.strategy", -1);
pref("browser.cache.jsbc_compression_level", 4);
