let generate = require('./generate')

test('generate', () => {
    expect(generate(``)).toBe(`module.exports = {}`)
})