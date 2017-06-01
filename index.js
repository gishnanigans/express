
'use strict';

// do the index page thing with metalsmith ... for simplified-UNIFIED URL handling
// adjust link css highlight to include root '' empty as home

const
  express = require('express'),
  serve   = require('serve-static'),
  index   = require('serve-index'),
  sess    = require('cookie-session'),
  body    = require('body-parser'),
  auth    = require('./auth'); // 'form-auth'

const
  disposition = require('content-disposition');

function setHeaders(res, path) {
  res.setHeader('Content-Disposition', disposition(path));
}

const form = body.urlencoded({extended: false});


express()
  
  .use(sess({
    secret: 'saltNpeppa',
    // keys: [],
    name:   'GISHSESS'
    // name: 'session'
  }))
  
  .get('/logout', function(req, res, next) {
    req.session = null;
    res.redirect('/login.html?out');
    // next();
  })
  
  .post('/auth', form) // chain these two
  
  .post('/auth', function(req, res, next) {
    const
      username = 'foo',
      password = 'bar';
    
    // already logged in
    if (req.session.auth) {
      // req.url = req.session.dest;
      console.log('ALLOW DEST', req.session.dest)
      res.redirect(req.session.dest); // maybe remove this and allow people to nav to login page ???
    }
    // try to login
    else {
      console.log('LOGIN DEST', req.session.dest)
      let form = req.body;
      console.log('LOGIN FORM', form);
      if (form) {
        // success ...
        if (form.username == username &&
            form.password == password) {
          req.session.auth = true;
          // req.url = req.session.dest;
          res.redirect(req.session.dest);
        }
        // failure ...
        else {
          // req.url = '/login.html?oops';
          res.redirect('/login.html?oops');
        }
      }
      // must use form to login
      else {
        // req.url = '/login.html';
        res.redirect('/login.html');
      }
    }
  })
  
  // MUST come after .post('/auth') above
  .use(function(req, res, next) {
    
    // we are submitting a login but without cookies
    if (!req.session && req.url == '/auth') {
      // req.url = '/cookies.html';
      res.send('You must enable cookies!!!')
      // res.redirect('/cookies.html');
    }
    
    // session cookie initialized but not logged in
    if (Object.keys(req.session).length > 0) {
      if (!req.session.auth) {
        console.log('GOT HERE')
        // req.url = '/login.html';
        res.redirect('/login.html');
      }
    }
    // session cookie but not initialized
    else {
      // create new session
      req.session.auth = false;
      // req.session.dest = (req.url == '/login.html' || req.url == '/login.html?out') ? '/' : req.url;
      req.session.dest = (/\/login/.test(req.url)) ? '/' : req.url; // /\/login.*/.test()
      console.log('DEST INIT', req.session.dest)
      // req.url = '/login.html';
      res.redirect('/login.html');
    }
    next();
  })
  
  .use('/', serve('public'))
  
  .use('/ftp', index('uploads', {
    'icons': true
  }))
  
  .use('/ftp', serve('uploads', {
    'index': false,
    'setHeaders': setHeaders
  }))
  
  .listen(3000);
  
  