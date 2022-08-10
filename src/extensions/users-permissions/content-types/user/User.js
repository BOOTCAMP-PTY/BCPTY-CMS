"use strict";

/**
 * Lifecycle callbacks for the `User` model.
 */
module.exports = {
  lifecycles: {
    async afterCreate(event) {
      const { result, params, data } = event;
      const usernameCreator = data.email.split(/<?([^<]+?)@/);
      event.params.data.username = usernameCreator;
    },
  },
};
