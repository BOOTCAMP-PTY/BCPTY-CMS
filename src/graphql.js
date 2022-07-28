"use strict";

/**Section to add new GraphQL Schemas*/

const popularity = require("./api/popularity/graphql");
const usuario = require("./api/usuario/controllers/extended/usuarioSchema");
const extensions = [popularity,usuario];

module.exports = (strapi) => {
  const extensionService = strapi.plugin("graphql").service("extension");

  for (const extension of extensions) {
    extensionService.use(extension(strapi));
  }
};
