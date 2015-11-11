'use strict';

describe('AngularJS Controller Test', function() {
  it('add evaluation and check itens', function() {

    browser.get('http://localhost:3000/home');

    // Write Name and Click
    element(by.model('data.name')).sendKeys('Fabrício');
    element(by.css('[value="buttonSend"]')).click();
    expect(element(by.model('error')).getAttribute('value')).toEqual('true');


    // Write Name/Email and Click
    element(by.model('data.email')).sendKeys('fabricioronchii@gmail.com');
    element(by.css('[value="buttonSend"]')).click();
    expect(element(by.model('error')).getAttribute('value')).toEqual('false');

    // Itens
    var itens = element.all(by.repeater('item in data.itens'));
    expect(itens.count()).toEqual(7);
    expect(itens.get(2).getText()).toEqual('Javascript');

  });
});