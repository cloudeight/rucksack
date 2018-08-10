'use strict';

/* =============================================================================================
   JUICE -> FEATURE DETECTION
   ============================================================================================= */

// Javascript
document.documentElement.className.replace('no-js', 'js');


/* =============================================================================================
   JUICE -> CLICK EVENT HELPER HANDLERS
   ============================================================================================= */

// Set prevent defeaul, immediate propagation and stop immediate propagation elements
const preventDefaultElements = document.querySelectorAll('.prevent-default');
const stopPropagationElements = document.querySelectorAll('.stop-propagation');
const stopImmediatePropagationElements = document.querySelectorAll('.stop-immediate-propagation');

// Loop through all the prevent default elements
Array.from(preventDefaultElements).forEach(element => {
    // Add a click event handler to the element
    element.addEventListener('click', (event) => {
        // Prevent default behaviour
        event.preventDefault();
    });
});

// Loop through all the stop propagation elements
Array.from(stopPropagationElements).forEach(element => {
    // Add a click event handler to the element
    element.addEventListener('click', (event) => {
        // Stop propagation
        event.stopPropagation();
    });
});

// Loop through all the stop immediate propagation elements
Array.from(stopImmediatePropagationElements).forEach(element => {
    // Add a click event handler to the element
    element.addEventListener('click', (event) => {
        // Stop immediate propagation
        event.stopImmediatePropagation();
    });
});

// Add a click event handler to scroll to top elements
$('.scroll-to-top').on('click', (event) => {
    // Prevent default behaviour
    event.preventDefault();

    // Scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});
