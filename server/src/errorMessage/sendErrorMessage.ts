import {Response} from "express";

interface ErrorMessage {
    errorMessage: string
}

export function sendErrorMessage(response: Response, error: ErrorMessage) {

    response.send({error})
}