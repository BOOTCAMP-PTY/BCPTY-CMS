'use strict';

/**
 * Lifecycle callbacks for the `User` model.
 */
module.exports = {
  lifecycles: {
    async afterCreate(event) {
      const { data } = event;
      const usernameCreator = data.email.split(/<?([^<]+?)@/);
      event.params.data.username = usernameCreator;
    },
  },
};
