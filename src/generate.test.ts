let generate = require('./generate')
let trim_indent = require('./trim_indent')

test('default', () => {
    expect(generate(``)).toBe(trim_indent(`
    let axios = require('axios')
    `))
})

test('request without name', () => {
    expect(generate(`GET https://google.com`)).toBe(trim_indent(`
    let axios = require('axios')
    `))
})

test('trailing name', () => {
    let actual = generate(trim_indent(`
    GET https://google.com
    # name : getGoogle
    `));

    let expected = trim_indent(`
    let axios = require('axios')
    exports.getGoogle = () => axios.get('https://google.com')
    `);

    expect(actual).toBe(expected)
})

test('verb url', () => {
    let actual = generate(trim_indent(`
    # name : getGoogle
    GET https://google.com
    ###
    # name : postGoogle
    POST https://google.com
    `));

    let expected = trim_indent(`
    let axios = require('axios')
    exports.getGoogle = () => axios.get('https://google.com')
    exports.postGoogle = () => axios.post('https://google.com')
    `);

    expect(actual).toBe(expected)
})
