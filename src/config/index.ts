const isText= import.meta.env.VITE_APP_ENV_MODE == 'development'
let url = new URL(process.env.VITE_APP_WS_URL);

export const GAME_CONFIG = {
    gate:url.host,
    domain: isText? process.env.VITE_APP_HOSTNAME : window.location.hostname,
}