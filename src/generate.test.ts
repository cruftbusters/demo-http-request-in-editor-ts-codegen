let generate = require('./generate')

test('default', () => {
    expect(generate(``)).toBe(`module.exports = {}`)
})

test('request without name', () => {
    expect(generate(`GET http://google.com`)).toBe(`module.exports = {}`)
})