const { Events } = require('pg');
const { ValidationError } = require('@strapi/utils').errors;
const { spawn } = require('child_process');

const PythonShell = require('python-shell').PythonShell;

module.exports = {
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    let pyshell = new PythonShell('./test.py');
    // sends a message to the Python script via stdin
    // pyshell.send('hello');

    pyshell.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      console.log(message);
    });

    // end the input stream and allow the process to exit
    pyshell.end(function (err, code, signal) {
      if (err) throw err;
      console.log('The exit code was: ' + code);
      console.log('The exit signal was: ' + signal);
      console.log('finished');
    });

    //console.log(pythonProcess)
    //We look if the course module enrolled exists
    // const responseMainModuleQuery = await strapi.db
    //   .query('api::module-course.module-course')
    //   .findOne({ id: event.params.data.big_module_id });

    // if (responseMainModuleQuery) {
    //   //Check if the module exists, if its true, avoid creating module
    //   const responseSubModuleExists = await strapi.db
    //     .query('api::sub-module-progress.sub-module-progress')
    //     .findOne({
    //       where: {
    //         course_id: event.params.data.course_id,
    //         profile_id: event.params.data.profile_id,
    //         big_module_id: event.params.data.big_module_id,
    //       },
    //     });

    //   if (responseSubModuleExists) {
    //     throw new ValidationError(
    //       'Course Progress exists for this user'
    //     );
    //   }

    //   //Check if the module doesn´t exceed the defined quantity defined by main course module
    //   const responseModuleQty = await strapi.db
    //     .query('api::sub-module-progress.sub-module-progress')
    //     .findMany({
    //       profile_id: event.params.data.profile_id,
    //       big_module_id: event.params.data.big_module_id,
    //     });

    //   if (
    //     responseModuleQty.length > responseMainModuleQuery.qty_courses
    //   ) {
    //     throw new ValidationError(
    //       'Error on calculating progress modules'
    //     );
    //   }

    //   event.params.data.course_name = responseMainModuleQuery.title;
    // } else {
    //   throw new ValidationError('Course Module Doesn´t exists');
    // }
  },

  async afterUpdate(event) {
    const { result, params } = event;
    //We obtain data of the qty of the courses
    const responseMainModuleQuery = await strapi.db
      .query('api::module-course.module-course')
      .findOne({ id: event.params.data.big_module_id });

    //Check if course is ready, if it is ready, update the main ProgressModule
    if (result.ready == true) {
      const responseModuleQty = await strapi.db
        .query('api::sub-module-progress.sub-module-progress')
        .findMany({
          profile_id: event.params.data.profile_id,
          big_module_id: event.params.data.big_module_id,
        });

      let countMatches = 0;
      for (const IndividualSubModule of responseModuleQty) {
        countMatches =
          IndividualSubModule.ready == true
            ? countMatches + 1
            : countMatches;
      }

      if (countMatches == responseMainModuleQuery.qty_courses) {
        await strapi.db
          .query('api::course-module-progress.course-module-progress')
          .update({
            module_id: event.params.data.big_module_id,
            status: true,
          });
      }
    }
  },
};
