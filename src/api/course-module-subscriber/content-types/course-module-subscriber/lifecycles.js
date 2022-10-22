const { Events } = require("pg");

module.exports = {
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    //console.log(event);
    const responseModuleQuery = await strapi.db
    .query('api::module-course.module-course')
    .findOne({id:event.params.data.module_enrolled});
    console.log("ResultQuery:",responseModuleQuery)
    // let's do a 20% discount everytime
     event.params.data.coursename = responseModuleQuery.title;
     event.params.data.module_ready =false;
  },

  async afterCreate(event) {
    const { result, params } = event;
    try {
      //console.log('result:', result);
      //console.log(params);
      createCourseSubscriberLink = {
        data: {
          finished: false,
          course_module_subscriber: { id: result.id },
        },
      };

      createCourseProgressLink = {
        data: {
          module_id: result.id,
          status: false,
          percent: 0,
          name: params.coursename,
        },
      };

      const responseModuleFinisher = await strapi.db
        .query('api::module-course-finisher.module-course-finisher')
        .create(createCourseSubscriberLink);
      const createCourseProgressFinisher = await strapi.db
        .query('api::course-module-progress.course-module-progress')
        .create(createCourseProgressLink);
    } catch (error) {
      console.error(error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
  },
};
