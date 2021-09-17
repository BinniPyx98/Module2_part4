import { checkAuthData } from "../check/authData/authData.js";
export function authorization(request, response) {
    let authData = request.body;
    let authResult = checkAuthData(authData);
    console.log(authResult.data);
    if (authResult.error === false) {
        response.status(200).send(JSON.stringify(authResult.data));
    }
    else {
        response.status(401).send(JSON.stringify(authResult.data));
    }
}
//# sourceMappingURL=authorization.js.map