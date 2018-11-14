const Download = require('../models/download.model');
const fs = require('fs');
const rimraf = require('rimraf');
const schedule = require('node-schedule');
 
exports.task = () => {
    schedule.scheduleJob('* * * */1 * *', async () => {
        const inMongo = await Download.find();
        var d = new Date();
        d.setDate(d.getDate()-30);
        inMongo.forEach(m => {
            if (m.date_last_seen <= d) {
                fs.stat(m.folder_path, (err) => {
                    if (err === null)
                    rimraf(m.folder_path, function () { 
                        Download.deleteOne({ imdbid: m.imdbid }, function (err) {
                            if (err) return handleError(err);
                        });
                    });
                })
            }
        })
    });
}