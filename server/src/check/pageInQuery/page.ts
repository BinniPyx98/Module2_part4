import {Request, Response} from "express";
import {sendErrorMessage} from "../../errorMessage/sendErrorMessage.js";

export function checkPage(request: Request, response: Response) {
    let pageNumber: Number = Number(request.query.page)
    let pageStatus: boolean

    if (pageNumber <= 3) {
        pageStatus = true
    } else {
        sendErrorMessage(response, {errorMessage: "server haven't this page"})
    }

    return pageStatus
}