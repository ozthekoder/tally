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
        date : {
            type: Date,
            default: Date.now
        },
        status : {
            type: Boolean,
            default : false
        },
        actualTime : {
            type : Number,
            min: 0,
            max: 24
        }
    }]
});

mongoose.model('Day', DaySchema);