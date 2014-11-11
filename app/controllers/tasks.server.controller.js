'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Task = mongoose.model('Task'),
    _ = require('lodash');

/**
 * Create a task
 */
exports.create = function(req, res) {
    var task = new Task(req.body);
    task.createdBy = req.user;
    task.assignedTo = req.user;

    task.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(task);
        }
    });
};

/**
 * Show the current task
 */
exports.read = function(req, res) {
    res.jsonp(req.task);
};

/**
 * Update a task
 */
exports.update = function(req, res) {
    var task = req.task;

    task = _.extend(task, req.body);

    task.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(task);
        }
    });
};

/**
 * Delete an task
 */
exports.delete = function(req, res) {
    var task = req.task;

    task.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(task);
        }
    });
};

/**
 * List of task
 */
exports.list = function(req, res) {
    Task.find().sort('-created').populate('createdBy', 'displayName').populate('assignedTo', 'displayName').exec(function(err, tasks) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(tasks);
        }
    });
};

/**
 * task middleware
 */
exports.taskByID = function(req, res, next, id) {
    Task.findById(id).populate('createdBy', 'displayName').populate('assignedTo', 'displayName').exec(function(err, task) {
        if (err) return next(err);
        if (!task) return next(new Error('Failed to load article ' + id));
        req.task = task;
        next();
    });
};

/**
 * task middleware for today
 */
exports.today = function(req, res, next) {
    var date = new Date();
    var weekDay = date.getDay();
    var monthDay = date.getDate();
    Task.find({ $and : [{'assignedTo' : req.user.id },{ $or:[
        { $and: [{ 'repeat.period' : 'weekly' },{ 'repeat.checkOn' : weekDay } ] },
        { $and: [{ 'repeat.period' : 'monthly' },{ 'repeat.checkOn' : monthDay } ] },
        { $and: [{ 'repeat.period' : 'daily' }]}]}] }).populate('createdBy', 'displayName').exec(function(err, tasks) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(tasks);
        }
    });
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (!(req.task.createdBy.id === req.user.id || req.task.assignedTo.id === req.user.id)) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};