// Flattens the start of the kinetic flick animation curve for linear, predictable acceleration
pref("apz.fling_curve_function_x1", 0);

// Configures the middle control handle for the flick animation curve to balance inertial friction
pref("apz.fling_curve_function_x2", 0.21);

// Matches the vertical starting velocity curve seamlessly with your finger's physical swipe speed
pref("apz.fling_curve_function_y1", 0);

// Finalizes the deceleration weight of the physics curve to create a smooth, natural stop when scrolling finishes
pref("apz.fling_curve_function_y2", 0.81);

// Disables synthetic frame delays, forcing screen rendering to sync immediately with your physical scroll input
pref("apz.frame_delay.enabled", false);

// Enables the overall smooth scrolling physics engine globally within the browser
pref("general.smoothScroll", true);

// Activates Mass-Spring-Damper (MSD) physics to make deceleration feel fluid rather than linear
pref("general.smoothScroll.msdPhysics.enabled", true);

// Specifies a high spring stiffness constant value to snap scrolling momentum to an elegant stop
pref("general.smoothScroll.msdPhysics.slowdownSpringConstant", 5000);