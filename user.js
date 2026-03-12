user_pref("gfx.webrender.all", true);
user_pref("gfx.webrender.enabled", true);
user_pref("gfx.webrender.software.opengl", false);
user_pref("network.process.enabled", true);
user_pref("browser.cache.disk.capacity", 1048576);
user_pref("browser.cache.disk.smart_size.enabled", false);
user_pref("gfx.webrender.fallback.software", false);

//only for mobile
user_pref("accessibility.force_disabled", 1); //> 1

//part 2
user_pref("privacy.partition.network_state.ocsp_cache", true);
user_pref("network.ssl_tokens_cache_use_only_once", false);
user_pref("browser.tabs.useCache", true);
user_pref("dom.script_loader.bytecode_cache.strategy", -1);
user_pref("browser.cache.jsbc_compression_level", 4);

//increased delay for stable rendering, default is 5
user_pref("nglayout.initialpaint.delay", 250);

//devtools themes
user_pref("uc.devtools.theme.ayu.enabled", false);
user_pref("uc.devtools.theme.dracula.enabled", false);
user_pref("uc.devtools.theme.one-monokai.enabled", false);
user_pref("uc.devtools.theme.onedark-pro.enabled", false);
user_pref("uc.devtools.theme.synthwave.enabled", false);
user_pref("uc.devtools.theme.one-monokai-lightweight.enabled", false);
user_pref("uc.devtools.theme.onedark-pro-lightweight.enabled", false);
user_pref("uc.devtools.custom-animations.enabled", false);
