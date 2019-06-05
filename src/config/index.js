const { hostname, port, protocol } = window.location;
const restUrl =
    process.env.NODE_ENV === "production" ?
    `${protocol}//${hostname}:${port}/` :
    `http://localhost:8080`;

export default {
    projectName: "Wiki",
    copyright: "© 2019 All Rights Reserved JuvoS",
    enableAuth: false,

    http: {
        baseURL: restUrl,
        timeout: 10 * 1000,
        noToken: false,
        showSpin: true
    }
};