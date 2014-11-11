'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
    tasks = require('../../app/controllers/tasks');

module.exports = function(app) {
    // Article Routes
    app.route('/tasks')
        .get(tasks.list)
        .post(users.requiresLogin, tasks.create);
    app.route('/tasks/today').get(tasks.today);
    app.route('/tasks/:taskId')
        .get(tasks.read)
        .put(users.requiresLogin, tasks.hasAuthorization, tasks.update)
        .delete(users.requiresLogin, tasks.hasAuthorization, tasks.delete);

    // Finish by binding the article middleware
    app.param('taskId', tasks.taskByID);
};