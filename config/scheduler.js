'use strict';
/**
 * Scheduler Module -> Takes care of cron jobs
 */
require('../app/models/user');
require('../app/models/task');
require('../app/models/day');
var mongoose = require('mongoose'),
errorHandler = require('../app/controllers/errors'),
Task = mongoose.model('Task'),
Day = mongoose.model('Day'),
User = mongoose.model('User'),
schedule = require('node-schedule');

module.exports = function(){
    this.jobs = {};
    var everySecond = new schedule.RecurrenceRule();
    everySecond.second = new schedule.Range(0, 59, 10);

    var everyHour = new schedule.RecurrenceRule();
    everyHour.hour = new schedule.Range(0, 23, 1);

    var everyMinute = new schedule.RecurrenceRule();
    everyMinute.minute = new schedule.Range(0, 59, 1);

    var j = schedule.scheduleJob(everySecond, function(){
        var date = new Date();
        var weekDay = date.getDay();
        var monthDay = date.getDate();

        Task.find({ $or:[
            { $and: [{ 'repeat.period' : 'weekly' },{ 'repeat.checkOn' : weekDay } ] },
            { $and: [{ 'repeat.period' : 'monthly' },{ 'repeat.checkOn' : monthDay } ] },
            { $and: [{ 'repeat.period' : 'daily' }]}]}).populate('assignedTo').exec(function(err, tasks) {
                if (err) {
                    console.log(errorHandler.getErrorMessage(err));
                } else {
                    for(var i=0; i<tasks.length; i++)
                    {
                        var offset = (date.getTimezoneOffset() - tasks[i].assignedTo.timeOffset)/60;
                        var currentHour = (date.getHours() + offset) % 24;
                        var time = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),tasks[i].assignedTo.timeOffset/60,0,0);
                        var d = new Date(time);
                        if(currentHour === 0)
                        {
                            Day.findOne({ taskId : tasks[i]._id }).sort(date, -1).exec(function(err,day){
                                if (err)
                                {
                                    console.log(errorHandler.getErrorMessage(err));
                                }
                                else
                                {
                                    if(day && day.date < d)
                                    {

                                    }
                                }
                            });
                        }
                        console.log(currentHour);
                    }

                    console.log(d);

                }
            });

    });

    this.jobs.yo = j;

    return this;
};