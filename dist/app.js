"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const tiktok_1 = require("./controllers/tiktok");
const facebook_1 = require("./controllers/facebook");
const instagram_1 = require("./controllers/instagram");
const app = (0, express_1.default)();
const port = 3000;
/// V0
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello World!");
}));
app.get('/get', tiktok_1.tiktok);
/// V1
const v1Router = express_1.default.Router();
v1Router.get('/tiktok', tiktok_1.tiktok);
v1Router.get('/instagram', instagram_1.instagram);
v1Router.get('/facebook', facebook_1.facebook);
v1Router.get('/cookie', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { res.send(process.env.INSTAGRAM_COOKIE); }));
app.use('/v1', v1Router);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map