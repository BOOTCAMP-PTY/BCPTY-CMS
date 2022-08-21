'use strict';

/**
 * course-master service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService(
  'api::course-master.course-master'
);
