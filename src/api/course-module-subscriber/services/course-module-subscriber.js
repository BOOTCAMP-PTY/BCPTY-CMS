'use strict';

/**
 * course-module-subscriber service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService(
  'api::course-module-subscriber.course-module-subscriber'
);
