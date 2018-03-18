/**************************
*
* THIS IS A TESTING FILE
*
* DO NOT MODIFY THIS FILE
*
***************************/

import test from 'ava';
import sinon from 'sinon';
import {logger, toCelcius, hottestDays, logHottestDays} from './iterators'



test('logger() - should log every element in the array', t => {
  sinon.spy(console, 'log')
  logger([1,2,3,4,5]);
  t.is(console.log.callCount, 5, "You didn't log the elements");
  console.log.restore();
});

test('logger() - should use .forEach', t => {
  let forEach = Array.prototype.forEach;
  let called = false;
  Array.prototype.forEach = () => called = true;
  logger([1,2,3,4,5]);
  t.true(called, "You didn't use .forEach");
  Array.prototype.forEach = forEach;
});



test('toCelcius() - should convert temperatures from C to F', t => {
  let c = [0, 100, -40, 50, 12.5];
  let f = [32, 212, -40, 122, 54.5];
  let results = toCelcius(f);

  t.deepEqual(results, c,
    `Expected toCelcius(${JSON.stringify(f)})
    to be ${JSON.stringify(c)}.
    Got ${JSON.stringify(results)} instead`);
});

test('toCelcius() - should use .map', t => {
  sinon.spy(Array.prototype, 'map');
  toCelcius([1,2,3,4,5]);
  t.true(Array.prototype.map.called, "You didn't use .map");
  Array.prototype.map.restore();
});



test(
  'hottestDays() - should return an array of temperatures exceeding a specific threshhold',
  t => {
    let temperatures = [0, -5, 35, 20, 45, 50, 10];
    let threshhold = 30;
    let expected = [35, 45, 50];
    let result = hottestDays(temperatures, threshhold);
    t.deepEqual(result, expected,
      `Expected hottestDays(${JSON.stringify(temperatures)}, ${threshhold})
      to return ${JSON.stringify(result)}.
      Got ${JSON.stringify(result)} instead`);
});

test('hottestDays() - should use .filter', t => {
  sinon.spy(Array.prototype, 'filter');
  hottestDays([1,2,3,4,5], 0);
  t.true(Array.prototype.filter.called, "You didn't use .filter");
  Array.prototype.filter.restore();
});



test(
  'logHottestDays() - should log temperatures exceeding a specific threshhold',
  t => {
    let temperatures = [32, 212, -40, 122, 54.5];
    let threshhold = 30;
    sinon.spy(console, 'log');
    logHottestDays(temperatures, threshhold);
    let count = console.log.callCount;
    t.is(count, 4,
      `For logHottestDays(${JSON.stringify(temperatures)}, ${threshhold}),
      expected 4 elements to be logged. Logged ${count} times instead`);
    console.log.restore();
});

test(
  'logHottestDays() - should log temperatures in Celcius',
  t => {
    let temperatures = [32];
    let threshhold = 30;
    sinon.spy(console, 'log');
    logHottestDays(temperatures, threshhold);
    let calledWith = console.log.getCall(0).args[0]
    t.is(calledWith, 0,
      `For logHottestDays(${JSON.stringify(temperatures)}, ${threshhold}),
      it to log 0. ${calledWith} was logged instead`);
    console.log.restore();
});
