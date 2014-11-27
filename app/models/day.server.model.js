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
});

mongoose.model('Day', DaySchema);