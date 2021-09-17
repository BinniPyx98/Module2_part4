import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { checkPage } from "../check/pageInQuery/page.js";
import path from 'path';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export function getHandler(request, response) {
    if (checkPage(request, response)) {
        (async () => {
            await createGalleryObjectAndSendResponse(response, request);
        })();
    }
}
async function createGalleryObjectAndSendResponse(response, request) {
    let pageNumber = Number(request.query.page);
    let arr = [];
    try {
        const files = await readdir(__dirname + `/img/page${pageNumber}`);
        for (const file of files) {
            arr.push(path.join(`/img/page${pageNumber}/`, file).toString());
        }
        let galleryObj = {
            total: 3,
            page: Number(pageNumber),
            objects: arr
        };
        console.log(galleryObj);
        response.send(JSON.stringify(galleryObj));
    }
    catch (e) {
        console.log(e);
    }
}
//# sourceMappingURL=getGallery.js.map