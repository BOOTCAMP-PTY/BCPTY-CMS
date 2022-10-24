'use strict';
const graphql = require('./graphql');
const crypto = require('crypto');

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

  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user'],

      // your lifecycle hooks
      async beforeCreate(event) {
        const { params } = event;
        let username = crypto.randomBytes(20).toString('hex');
        event.params.data.username = username;
      },
    });
  },
};
