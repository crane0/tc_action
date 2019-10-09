const math = require('../src/math')

test('add, 1+1', () => {
  expect(math.add(1, 1)).toBe(2)
})

let x: number = 1