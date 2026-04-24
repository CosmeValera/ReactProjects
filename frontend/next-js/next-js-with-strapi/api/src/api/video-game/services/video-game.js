'use strict';

/**
 * video-game service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::video-game.video-game');
