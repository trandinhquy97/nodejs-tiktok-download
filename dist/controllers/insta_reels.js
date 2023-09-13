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
exports.instaReels = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
function instaReels(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const domain = "https://www.instagram.com/reel/";
        const postId = req.query.url
            .replace(" ", "")
            .split("/")
            .filter((x) => x.length > 0)[3];
        try {
            const resp = yield (0, axios_1.default)(domain);
            //REQUEST CONFIG
            var config = {
                method: "get",
                url: `${domain}${postId}/?utm_source=ig_web_copy_link?&__a=1&__d=1`,
                headers: {
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "none",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52",
                    'Cookie': process.env.INSTAGRAM_COOKIE
                }
            };
            //REQUEST
            (0, axios_1.default)(config)
                .then(function (response) {
                const urls = response.data.items[0].video_versions;
                const thumbs = response.data.items[0].image_versions2.candidates;
                const title = response.data.items[0].caption.text;
                res.send({ thumbs, urls, title });
            })
                .catch(function (error) {
                res.send({ error: error.message });
            });
        }
        catch (error) {
            res.send({ error: error.message });
        }
    });
}
exports.instaReels = instaReels;
//# sourceMappingURL=insta_reels.js.map