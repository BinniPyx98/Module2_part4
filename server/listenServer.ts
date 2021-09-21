import app from "./server.js";
import logger from "./src/logger/logger.js";
import {saveAllImage} from "./src/saveInDb/saveInDb.js";

function start() {
    app.listen(5400, () => {
        logger.info('Server running');
        (async ()=>{await saveAllImage()})()
    })
}
export default start