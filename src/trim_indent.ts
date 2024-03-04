function trim_indent(string: string) {
    let trim_count = -1
    let lines = string.split("\n").map(line => {
        let whitespace_count = 0
        for (let character of line) {
            if (character === ' ' || character === '\t') {
                whitespace_count++
            } else {
                break
            }
        }

        if (whitespace_count === line.length) {
            return ''
        } else if (trim_count < 0) {
            trim_count = whitespace_count
        } else {
            trim_count = Math.min(trim_count, whitespace_count)
        }

        return line
    })

    for (let index = 0; index < lines.length;) {
        if (lines[index].length === 0) {
            lines.shift()
        } else {
            break
        }
    }

    for (let index = lines.length; index > 0; index--) {
        if (lines[index - 1].length === 0) {
            lines.pop()
        } else {
            break
        }
    }

    return lines.map(line => line.slice(trim_count, line.length)).join("\n")
}

module.exports = trim_indent
