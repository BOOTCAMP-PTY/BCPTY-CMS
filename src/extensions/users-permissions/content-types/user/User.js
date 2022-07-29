"use strict";

/**
 * Lifecycle callbacks for the `User` model.
 */
 module.exports = {
  lifecycles:{
      async afterCreate(event) {
          const { result, params, data } = event;
          console.log('New user created');

          
      const usernameCreator = data.email.split(/<?([^<]+?)@/);
      console.log(usernameCreator)
      console.log("hello there")
      event.params.data.username = usernameCreator;
      //do your magic here.
      },
    }
  }; 


