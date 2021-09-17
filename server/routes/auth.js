import { authorization } from "../src/auth/authorization.js";
import express from 'express';
const router = express.Router();
router.post('/', (request, response) => {
    authorization(request, response);
});
export default router;
//# sourceMappingURL=auth.js.map