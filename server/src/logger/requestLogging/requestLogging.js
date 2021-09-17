import logger from "../logger.js";
export function requestLogging(request) {
    logger.info('Method-' + JSON.stringify(request.method) + ' ' +
        'Url-' + JSON.stringify(request.url) + ' ' +
        'Body-' + JSON.stringify(request.body) + ' ' +
        'Headers-' + JSON.stringify(request.headers));
}
//# sourceMappingURL=requestLogging.js.map