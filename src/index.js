"use strict";
const graphql = require("./graphql");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    graphql(strapi); // externalize all graphql related code to ./src/graphql.js
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],

      // your lifecycle hooks
      async beforeCreate(event) {
        const { result, params, data } = event;
        const usernameCreator = params.data.email.split("@");
        event.params.data.username = usernameCreator[0];
      },
    });
  },
};
