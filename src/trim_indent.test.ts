let trim_indent = require('./trim_indent')

test('nothing to do', () => {
    let actual = trim_indent(``)
    let expected = ``

    expect(actual).toBe(expected)
})

test('space', () => {
    let actual = trim_indent(` `)
    let expected = ``

    expect(actual).toBe(expected)
})

test('tab', () => {
    let actual = trim_indent(`\t`)
    let expected = ``

    expect(actual).toBe(expected)
})

test('preserve inner whitespae', () => {
    let actual_0 = trim_indent(` x\nx`)
    let expected_0 = ` x\nx`

    expect(actual_0).toBe(expected_0)

    let actual_1 = trim_indent(`x\n x`)
    let expected_1 = `x\n x`

    expect(actual_1).toBe(expected_1)
})

test('empty lines dont count', () => {
    let actual = trim_indent(` x\n  \n x\n  \n x`)
    let expected = `x\n\nx\n\nx`

    expect(actual).toBe(expected)
})

test('remove leading empty lines', () => {
    let actual = trim_indent(`\nx`)
    let expected = `x`

    expect(actual).toBe(expected)
})

test('remove tailing empty lines', () => {
    let actual = trim_indent(`x\n`)
    let expected = `x`

    expect(actual).toBe(expected)
})

