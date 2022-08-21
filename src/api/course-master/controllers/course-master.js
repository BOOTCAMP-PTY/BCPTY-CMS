'use strict';

/**
 *  course-master controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::course-master.course-master'
);
