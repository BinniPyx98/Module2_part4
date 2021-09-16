import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export function getHandler(request) {
    try {
        console.log(request.query);
        let pageNumber = Number(request.query.page);
        if (request.headers.authorization === 'token') {
            let arr;
            // Read img path
            try {
                arr = fs.readdirSync(__dirname + `/img/page${pageNumber}`)
                    .map((elem) => path.join(`/img/page${pageNumber}/`, elem).toString());
            }
            catch (e) {
                console.log(e);
            }
            let galleryObj = {
                total: 3,
                page: Number(pageNumber),
                objects: arr
            };
            console.log(galleryObj);
            return JSON.stringify(galleryObj);
        }
        else {
            return "Not authorization";
        }
    }
    catch (e) {
        return 'server havent this page';
    }
}
//# sourceMappingURL=getGallery.js.map