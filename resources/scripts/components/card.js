/*  ========================================================================
    JUICE -> COMPONENTS -> CARD
    ========================================================================  */

;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Card';

    // Check if instantiation should be via amd, commonjs or the browser
    if (typeof define === 'function' && define.amd) {
        define([], factory(plugin_name));
    } else if (typeof exports === 'object') {
        module.exports = factory(plugin_name);
    } else {
        root[plugin_name] = factory(plugin_name);
    }
}((window || module || {}), function(plugin_name) {
    // Use strict mode
    'use strict';

    // Create an empty plugin object
    const plugin = {};

    // Set the plugin defaults
    const defaults = {
        animation: true,
        animationClass: 'has-animation',
        animationRemove: 'fade-out',

        callbackInitializeBefore: () => {
            console.log('Card: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Card: callbackInitializeAfter');
        },
        callbackRemoveBefore: () => {
            console.log('Card: callbackRemoveBefore');
        },
        callbackRemoveAfter: () => {
            console.log('Card: callbackRemoveAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Card: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Card: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Card: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Card: callbackDestroyAfter');
        }
    };

    /**
     * Constructor.
     * @param  {element}  element  The initialized element.
     * @param  {object}   options  The plugin options.
     * @return {void}
     */
    function Plugin(element, options) {
        // Set the plugin object
        plugin.this = this;
        plugin.name = plugin_name;
        plugin.element = element;
        plugin.defaults = defaults;
        plugin.options = options;
        plugin.settings = Object.assign({}, defaults, options);

        // Initialize the plugin
        plugin.this.initialize();
    }

    /**
     * Event handler to remove a card when the card remove is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickRemoveEventHandler = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Set the remove and card
        const $remove = event.currentTarget;
        const $card = $remove.closest('.card');

        // Remove the card
        plugin.this.remove($card);
    };

    /**
     * Public variables and methods.
     * @type {object}
     */
    Plugin.prototype = {
        /**
         * Initialize the plugin.
         * @param  {bool}  silent  Suppress callbacks.
         * @return {void}
         */
        initialize: (silent = false) => {
            // Destroy the existing initialization silently
            plugin.this.destroySilently();

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize before callback
                plugin.settings.callbackInitializeBefore.call();
            }

            // Set the cards
            const $cards = document.querySelectorAll(plugin.element);

            // Check if any cards exist
            if ($cards) {
                // Cycle through all of the cards
                $cards.forEach(($card) => {
                    // Set the remove
                    const $remove = $card.querySelector('.js-card-remove');

                    // Check if the remove exists
                    if ($remove) {
                        // Add a click event handler to the remove to remove the card
                        $remove.addEventListener('click', clickRemoveEventHandler);
                    }
                });
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Remove a card.
         * @param  {element}  $card   The card.
         * @param  {bool}     silent  Suppress callbacks.
         * @return {void}
         */
        remove: ($card, silent = false) => {
            // Check if the card exists and isn't animating out
            if ($card && !$card.classList.contains('is-animating-out')) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the remove before callback
                    plugin.settings.callbackRemoveBefore.call();
                }

                // Check if the card is animated
                if (plugin.settings.animation) {
                    // Set the remove animation
                    const remove_animation = $card.dataset.cardAnimationRemove || plugin.settings.animationRemove;

                    // Set the card animation classes
                    $card.classList.add('is-animating-out', plugin.settings.animationClass, remove_animation);

                    // Add an animation end event listener to the card
                    $card.addEventListener('animationend', () => {
                        // Remove the card
                        $card.remove();

                        // Check if the callbacks should not be suppressed
                        if (!silent) {
                            // Call the remove after callback
                            plugin.settings.callbackRemoveAfter.call();
                        }
                    }, {
                        once: true
                    });
                } else {
                    // Remove the card
                    $card.remove();

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the remove after callback
                        plugin.settings.callbackRemoveAfter.call();
                    }
                }
            }
        },

        /**
         * Refresh the plugins initialization.
         * @param  {bool}  silent  Suppress callbacks.
         * @return {void}
         */
        refresh: (silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the refresh before callback
                plugin.settings.callbackRefreshBefore.call();
            }

            // Destroy the existing initialization
            plugin.this.destroy(silent);

            // Initialize the plugin
            plugin.this.initialize(silent);

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the refresh after callback
                plugin.settings.callbackRefreshAfter.call();
            }
        },

        /**
         * Destroy an existing initialization.
         * @param  {bool}  silent  Suppress callbacks.
         * @return {void}
         */
        destroy: (silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy before callback
                plugin.settings.callbackDestroyBefore.call();
            }

            // Set the cards
            const $cards = document.querySelectorAll(plugin.element);

            // Check if any cards exist
            if ($cards) {
                // Cycle through all of the cards
                $cards.forEach(($card) => {
                    // Set the remove
                    const $remove = $card.querySelector('.js-card-remove');

                    // Check if the remove exists
                    if ($remove) {
                        // Remove the click event handler from the card remove
                        $remove.removeEventListener('click', clickRemoveEventHandler);
                    }
                });
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
        },

        /**
         * Call the remove method silently.
         * @param  {element}  $card   The card.
         * @return {void}
         */
        removeSilently: ($card) => {
            // Call the remove method silently
            plugin.this.remove($card, true);
        },

        /**
         * Call the refresh method silently.
         * @return {void}
         */
        refreshSilently: () => {
            // Call the refresh method silently
            plugin.this.refresh(true);
        },

        /**
         * Call the destroy method silently.
         * @return {void}
         */
        destroySilently: () => {
            // Call the destroy method silently
            plugin.this.destroy(true);
        }
    };

    // Return the plugin
    return Plugin;
}));
