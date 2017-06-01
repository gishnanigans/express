
'use strict';

const
  foo = 'bar'


module.exports = auth;


// how do we create a master account, or initialize a single account ???

// just use email as username
// alias for display purposes
// pass
// salt


// each opt can be a string or function, static or dynamic (custom) results


function auth (opts) {
    
  // filestore function, 'session|users|accounts' outside of 'public'
  // session settings, digest, encoding, secret|salt, expires, maxAttempts (callback), maxTimer
  
  
  // always create session cookie
  // always update accessed value // to renew expire time
  // allow|access field in session ??? true|false|set|missing
  
  // how do we test if cookies enabled on first access and fowward to appropriate page/handler if not
  // say the user loads '/login' as their first request to the site ???
  
  opts = opts || {};
  opts.success = '';
  opts.failure = '';
  opts.auth = ''
  opts.sess = ''
  opts.login = 'login' // what to set form action to
  opts.logout

  return {
    'login' : login,
    'limit' : limit, // tries, count, timer, quota // or we could implement via func
    'logout': logout,
    'create': create,
    'remove': remove,
    'rescue': rescue
    // 'admin' : admin
    
    // verify // verify email as valid before creating account ???
    // // how do we approve new user accounts ???
  };
}

function login  (opts) {
  // path = 'login'
  // successPage || or url
  // failurePage
  // attemptsPage
  return function (req, res, next) {
    
    let action = req.url; // if opts.login
    let method = req.method; // do we care if GET or POST (login)
    
    req.session.foo = 'bar';
    console.log('SESS', req.session);
    req.url = '/team.html';
    next();
    
    // authenticate or serve login ... "validate session"
    
    // if valid active session, allow pass through, otherwise
    // if req path is '/auth' and method is 'post' and 'username' 'password' pass through
    // else, change req path to '/login' and serve as static page
  };
}


function limit  (opts) {
  // path = 'logout'
  // successpage || url ???
  return function (req, res, next) {
    
  };
}


function logout  (opts) {
  // path = 'logout'
  // successpage || url ???
  return function (req, res, next) {
    
  };
}

function create  (opts) {
  // path = 'create'
  // alias
  // username
  // password
  // email (rescue email)
  return function (req, res, next) {
    
  };
}

function remove  (opts) {
  // field (alias|email)
  return function (req, res, next) {
    
  };
}

function rescue  (opts) {
  // field (email)
  return function (req, res, next) {
    
  };
}

function expose  (opts) {
  // field (pass)
  return function (req, res, next) {
    // logs out the encrypted password hash
    // this will change if we change 'encoding' 'digest' 'salt|secret' and invalidate all registered users
  };
}

// upEmail, upAlias, upPass
function update  (opts) { // field(s), must be logged in as same user or admin
  // setEmail
  // setAlias
  // setPass
  // setUser
  return function (req, res, next) {
    
  };
}
