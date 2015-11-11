'use strict';

var service = require('./service'),
    nodemailer = require('nodemailer'),
    configSMTP = require('./../config/config.json');

function validEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

function validForm(data){
  if(data.name === '' || data.name === undefined) return 'The name is invalid!';
  if(data.email === '' || data.email === undefined) return 'The email is invalid!';
  if(validEmail(data.email) === false) return 'The email is invalid!';
  return true;
};

function getItem(id, items){
  return items.filter(function(item) {
    return item.id === id;
  })[0].value;
};

exports.send = function(req, res, next) {
  var valid = validForm(req.body);
  if(valid === true){
    service.processItens(req.body.itens, req.body.email);
    res.send({ error: false, message: 'Form successfully sent!'})
  }else{
    res.send({ error: true, message: valid })
  }
};

exports.processItens = function(itens, email) {

  // 1 - HTML
  // 2 - CSS
  // 3 - Javascript
  // 4 - Python
  // 5 - Django
  // 6 - iOS
  // 7 - Android

  var process = {
    html: parseInt(getItem(1, itens) || 0),
    css: parseInt(getItem(2, itens) || 0),
    javascript: parseInt(getItem(3, itens) || 0),
    python: parseInt(getItem(4, itens) || 0),
    django: parseInt(getItem(5, itens) || 0),
    ios: parseInt(getItem(6, itens) || 0),
    android: parseInt(getItem(7, itens) || 0),
  },
  cases = true;

  // Case 1
  if((process.html >= 7 && process.html <= 10) && (process.css >= 7 && process.css <= 10) && (process.javascript >= 7 && process.javascript <= 10)){
    cases = false;
    service.sendEmail(email, 'Front-End');
  }

  // Case 2
  if((process.python >= 7 && process.python <= 10) && (process.django >= 7 && process.django <= 10)){
    cases = false;
    service.sendEmail(email, 'Back-End');
  }

  // Case 3
  if((process.ios >= 7 && process.ios <= 10) && (process.android >= 7 && process.android <= 10)){
    cases = false;
    service.sendEmail(email, 'Mobile');
  }

  if(cases){
    service.sendEmail(email, undefined);
  }

};

exports.sendEmail = function(email, text) {

  console.log(email);

  var transporter = nodemailer.createTransport('SMTP', configSMTP);
  transporter.sendMail({
    to: configSMTP.auth.user,
    from: email,
    subject: 'Obrigado por se candidatar',
    html: 'Obrigado por se candidatar, assim que tivermos uma vaga disponível para programador ' + (text === undefined ? '' : (text + ' ')) + 'entraremos em contato.'
  }, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Email sent!');
  });
};