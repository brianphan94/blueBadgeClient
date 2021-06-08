let APIURL = ''

switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL='http://localhost:4040'
        break
    case 'am-my-btnmash.herokuapp.com':
        APIURL='https://am-btnmash.herokuapp.com'
}

export default APIURL