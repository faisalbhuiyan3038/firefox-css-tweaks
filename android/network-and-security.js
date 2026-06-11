// Shares the local OCSP security cache across partitioned network states to eliminate duplicate certificate checks
pref("privacy.partition.network_state.ocsp_cache", true);

// Allows TLS session resumption tokens to be reused, skipping intensive cryptographic handshakes on revisit
pref("network.ssl_tokens_cache_use_only_once", false);

// Shortens the maximum time (seconds) allowed for a secure TLS handshake before timing out
pref("network.http.tls-handshake-timeout", 10);

// Sets the maximum wait window (seconds) to attempt a connection retry before declaring a failure
pref("network.http.connection-retry-timeout", 30);

// Sets the initial HTTP connection timeout ceiling (seconds) before giving up on an unresponsive server
pref("network.http.connection-timeout", 10);