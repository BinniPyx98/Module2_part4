import { postHandler } from "../src/auth/postAuthHandler.js";
import express from 'express';
const router = express.Router();
router.post('/', (request, response) => {
    let result = JSON.parse(postHandler(request));
    response.send(result);
});
export default router;
//# sourceMappingURL=auth.js.map