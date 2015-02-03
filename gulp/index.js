var fs = require('fs'),
  path = require('path'),
  tasks = fs.readdirSync('./gulp/tasks/').filter(function(name) {
    return /(\.(js|coffee)$)/i.test(path.extname(name));
  });

tasks.forEach(function(task) {
  require('./tasks/' + task);
});
