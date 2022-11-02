'use strict';
const graphql = require('./graphql');
const crypto = require('crypto');
const {
  afterCreate,
} = require('./api/profile/content-types/profile/lifecycles');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi
      .plugin('graphql')
      .service('extension');
    extensionService.use(({ nexus }) => ({
      types: [
        nexus.extendType({
          type: 'UsersPermissionsMe',
          definition(t) {
            // here define fields you need
            t.field('profile', {
              type: 'String',
              resolve: async (root, args) => {
                const userData = await strapi.db
                  .query('plugin::users-permissions.user')
                  .findOne({
                    select: [],
                    where: { id: root.id },
                    populate: { profile: args.userId },
                  });
                console.log(userData);
                return userData.profile.id;
              },
            });
          },
        }),
      ],
    }));
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
