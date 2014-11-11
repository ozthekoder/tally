'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var TaskSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    repeat : {
        period : {
            type: String,
            enum: ['daily', 'weekly', 'monthly']
        },
        checkOn : {
            type: Number,
            default: 0
        }
    },
    priority : {
        type: Number,
        default : 0
    },
    expectedTime : {
        type: Number,
        min: 0,
        max: 24
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

mongoose.model('Task', TaskSchema);