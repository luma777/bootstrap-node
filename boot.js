/**
 * New node file
 */

var fs = require('fs');

function exportPath (parent, dir, options){
   var realDir = __dirname + dir;
   
   // read dir
   fs.readdirSync(realDir).forEach(function(file){
      // stat file (dir or file)
      fs.lstat(realDir + '/' + file, function(err, stats){
         if (!err && stats.isDirectory()) {
            return exportPath(parent, dir + '/' + file, options)
         } else {
            // import file
            var obj = require('.' + dir + '/' + file),
               path = (dir + '/' + file.replace('index', '')).replace('/routes', '').replace('.js', '');

            // import method
            for (var key in obj) {
               var method = key.toLowerCase();
               if (~['get', 'put', 'post', 'delete'].indexOf(method)) {

                  // import method with args
                  if (obj.CaptureArgs) {
                     options.verbose && console.log(key + ': ' + path + '/' + obj.CaptureArgs.join('/'));
                     parent[method](path + '/' + obj.CaptureArgs.join('/'), obj[key]);
                  } else {
                     options.verbose && console.log(key + ': ' + path);
                     parent[method](path, obj[key]);
                  }
               }
            }
         }
      });
   });
   return 1;
}

module.exports = function(parent, dir, options){
   // export path
   exportPath(parent, dir, options);

   // default path view
   parent.use(function(req, res, next) {
      var defaultView = req.url.replace(/^\//, '').replace(/\/$/, '') || 'index',
         render = res.render;

      res.render = function(view, options, fn) {
         var self = this,
            options = options || {},
            req = this.req,
            app = req.app,
            defaultFn;

         if ('function' == typeof options) {
            fn = options, options = {};
         }

         defaultFn = function(err, str){
            if (err) return req.next(err);
            self.send(str);
         };

         if ('function' != typeof fn) {
            fn = defaultFn;
         }

         if ('object' == typeof view) {
            options = view;
            view = defaultView;
         }

         render.call(self, view, options, function(err, str) {
            fn(err, str);
         });
      };
      next();
    });
};
