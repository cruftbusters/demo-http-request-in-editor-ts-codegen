let generate = require('./generate')
let trim_indent = require('./trim_indent')

test('default', () => {
    expect(generate(``)).toBe(`module.exports = {}`)
})

test('request without name', () => {
    expect(generate(`GET https://google.com`)).toBe(`module.exports = {}`)
})

test('trailing name', () => {
    let actual = generate(trim_indent(`
    GET https://google.com
    # name : getGoogle
    `));

    let expected = trim_indent(`
    module.exports = {}
    module.exports.getGoogle = () => axios.get('https://google.com')
    `);

    expect(actual).toBe(expected)
})

test('get url', () => {
    let actual = generate(trim_indent(`
    # name : getGoogle
    GET https://google.com
    `));

    let expected = trim_indent(`
    module.exports = {}
    module.exports.getGoogle = () => axios.get('https://google.com')
    `);

    expect(actual).toBe(expected)
})


test('post url', () => {
    let actual = generate(trim_indent(`
    # name : postGoogle
    POST https://google.com
    `));

    let expected = trim_indent(`
    module.exports = {}
    module.exports.postGoogle = () => axios.post('https://google.com')
    `);

    expect(actual).toBe(expected)

    let actual_1 = generate(trim_indent(`
    GET http://google.com
    # name : getGoogle
    `));

    let expected_1 = trim_indent(`
    module.exports = {}
    module.exports.getGoogle = () => axios.get('http://google.com')
    `);

    expect(actual_1).toBe(expected_1)
})
