'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var DaySchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    weekDay : {
        type: Number,
        default : 0,
        min : 0,
        max: 6
    },
    monthDay : {
        type: Number,
        default: 1,
        min: 1,
        max: 31
    },
    reports : [{
        task: {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        },
        date : {
            type: Date,
            default: Date.now
        },
        status : {
            type: Boolean,
            default : false
        }
    }]
});

mongoose.model('Day', DaySchema);