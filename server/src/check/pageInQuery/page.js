import { sendErrorMessage } from "../../errorMessage/sendErrorMessage.js";
export function checkPage(request, response) {
    let pageNumber = Number(request.query.page);
    let pageStatus;
    if (pageNumber <= 3) {
        pageStatus = true;
    }
    else {
        sendErrorMessage(response, { errorMessage: "server haven't this page" });
    }
    return pageStatus;
}
//# sourceMappingURL=page.js.map