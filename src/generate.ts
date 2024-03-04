interface Binding {
    name: string
    verb: string
    url: string
}

function generate(string: string) {
    let result = [`let axios = require('axios')`,]
    let lines = string.split('\n');
    let group = []
    for (let index = 0; index <= lines.length; index++) {
        if (index == lines.length || lines[index] === '###') {
            let maybe_request = to_maybe_request(group)
            if (maybe_request.length > 0) {
                let [request] = maybe_request
                result.push(to_typescript(request))
            }
            group = []
        } else {
            group.push(lines[index])
        }
    }
    return result.join('\n')
}

function to_maybe_request(lines: string[]) {
    let request: Binding = {
        name: '',
        verb: '',
        url: ''
    }
    for (let line of lines) {
        if (line.startsWith('# name : ')) {
            request.name = line.split(' ')[3]
        } else if (line.startsWith('GET ') || line.startsWith('POST ')) {
            let parts = line.split(' ')
            request.verb = parts[0].toLowerCase()
            request.url = parts[1]
        }
    }
    return request.name ? [request] : []
}

function to_typescript({name, verb, url}: Binding) {
    return `exports.${name} = () => axios.${verb}('${url}')`
}

module.exports = generate
