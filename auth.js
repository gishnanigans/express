

'use strict';


module.exports = function (opts) {
  
  const
    username   = opts.username,
    password   = opts.password,
    loginPath  = opts.loginPath  || '/login',
    deniedPath = opts.deniedPath || '/login.html?oops',
    cookiePath = opts.cookiePath || '/cookie',
    actionPath = opts.actionPath || '/auth';
  
  return function (req, res, next) {
    
    let tail = req.url.substr(-4);
    if (tail != 'html' && tail != 'auth') {
      next();
      return;
    } else {
      console.log('PATH', req.url)
      console.log('FORM', req.body)
    }
    
    let
      sess = req.session,
      auth = (sess) ? sess.auth : false,
      meth = req.method,
      path = req.url;
    
    if (sess) {
      
      // already logged in
      if (auth) {
        path = sess.dest;
      }
      
      // try to login
      else if (path == '/auth') {
        let form = req.body;
        console.log('FORM', form);
        if (form) {
          // success ...
          if (form.userame == username && form.password == password) {
            sess.auth = true;
            path = sess.dest;
          }
          // failure ...
          else {
            path = '/login.html?oops';
          }
        }
        // must use form to login
        else {
          path = '/login.html';
        }
      }
      
      // respond with form for all non-auth requests
      else {
        path = '/login.html';
      }
    }
    // no session cookie returned by the client
    else {
      sess.auth = false;
      sess.dest = (/\/(login.html|auth)/.test(path)) ? '/' : path;
      
      if (path == '/auth') {
        path == '/cookies.html';
      }
      else {
        path = '/login.html';
      }
    }
    next();
  };
};
