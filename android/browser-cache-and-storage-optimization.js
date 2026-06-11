// Sets the maximum browser disk cache size to exactly 1,500,000 KB (1.5 GB)
pref("browser.cache.disk.capacity", 1500000);

// Disables automatic cache sizing, forcing Firefox to respect your manual 1 GB cap limit
pref("browser.cache.disk.smart_size.enabled", false);

// Caches underlying tab data in memory so moving back and forth between active tabs is instantaneous
pref("browser.tabs.useCache", true);

// Disables standard bytecode generation strategies (-1) to force your custom compression levels instead
// pref("dom.script_loader.bytecode_cache.strategy", -1);

// Compresses JavaScript bytecode to level 4 to minimize cache memory usage without sacrificing performance
// pref("browser.cache.jsbc_compression_level", 4);