import express from 'express';
const router = express.Router();
import { postImageHandler } from "../src/uploadImage/postImageHandler.js";
import { getHandler } from "../src/gallery/getGallery.js";
router.post('/', (request, response) => {
    if (Number(request.query.page) > 3) {
        response.status(404).send({ errorMessage: "server haven't this page" });
    }
    else {
        let result = postImageHandler(request);
        if (result) {
            response.sendStatus(200);
        }
        else {
            response.sendStatus(500);
        }
    }
});
router.get('/', (request, response) => {
    getHandler(request, response);
});
export default router;
//# sourceMappingURL=gallery.js.map