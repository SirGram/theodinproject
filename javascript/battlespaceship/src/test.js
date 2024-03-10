const Spaceship = require('./modules/Spaceship');

// Spacehip
test('add 1 hit to spaceship', () => {
  const spaceship1 = new Spaceship(4);
  spaceship1.hit();
  expect(spaceship1.hits).toBe(1);
});
test('sinks spaceship', () => {
  const spaceship2 = new Spaceship(3);
  spaceship2.hit();
  spaceship2.hit();
  spaceship2.hit();
  spaceship2.hit();
  spaceship2.hit();
  expect(spaceship2.hits).toBe(3);
  expect(spaceship2.isSunk()).toBe(true);
});
