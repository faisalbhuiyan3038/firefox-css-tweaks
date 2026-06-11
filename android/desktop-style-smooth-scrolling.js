// Disables synthetic frame delays, forcing screen rendering to sync immediately with your physical scroll input
pref("apz.frame_delay.enabled", false);

// Enables the overall smooth scrolling physics engine globally within the browser
pref("general.smoothScroll", true);

// Caps the maximum amount of time (in milliseconds) a smooth scroll animation is permitted to run
pref("general.smoothScroll.mouseWheel.durationMaxMS", 600);

// Sets the minimum duration floor (in milliseconds) for a smooth scroll transition to prevent jagged jumps
pref("general.smoothScroll.mouseWheel.durationMinMS", 400);

// Activates Mass-Spring-Damper (MSD) physics to make deceleration feel fluid rather than linear
pref("general.smoothScroll.msdPhysics.enabled", true);

// Specifies a high spring stiffness constant value to snap scrolling momentum to an elegant stop
pref("general.smoothScroll.msdPhysics.slowdownSpringConstant", 5000);

// Forces a brief speed burst instantly on the very first scroll notch to combat input lag
pref("mousewheel.acceleration.start", 1);

// Forces each individual mouse wheel notch or swipe increment to shift the viewport by at least 20 pixels
pref("mousewheel.min_line_scroll_amount", 20);