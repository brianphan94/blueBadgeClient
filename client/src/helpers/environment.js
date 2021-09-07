let APIURL = ''

switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL='http://localhost:4545'
        break
    case 'arm-my-btnmash.herokuapp.com':
        APIURL='https://arm-btnmash.herokuapp.com'
}

export default APIURL