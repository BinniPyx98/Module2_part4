import logger from "../../logger/logger.js";
export function checkToken(request, next, response) {
    if (request.headers.authorization === 'token') {
        next();
    }
    else {
        logger.info('Not authorization');
        response.send({ errorMessage: 'Not authorization' });
    }
}
//# sourceMappingURL=token.js.map