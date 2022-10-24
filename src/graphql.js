'use strict';

/** Section to add new GraphQL Schemas*/

const extensions = [];

module.exports = (strapi) => {
  const extensionService = strapi
    .plugin('graphql')
    .service('extension');

  for (const extension of extensions) {
    extensionService.use(extension(strapi));
  }
};
