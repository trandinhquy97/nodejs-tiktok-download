"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.facebook = void 0;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const Cheerio = __importStar(require("cheerio"));
function facebook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let domain = "https://fdownload.app/api/ajaxSearch";
        let data = new form_data_1.default();
        data.append('q', req.query.url);
        try {
            const resp = yield axios_1.default.post(domain, data, {
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52',
                    'Content-Type': 'multipart/form-data',
                },
            });
            const $ = Cheerio.load(resp.data.data);
            const thumbs = $('video')
                .map((_, e) => {
                return {
                    url: $(e).attr('poster').replace('&amp;', '&'),
                };
            })
                .toArray();
            const urls = $('.download-link-fb')
                .map((_, e) => {
                return {
                    type: $(e).attr('title').replace('Download ', ''),
                    url: $(e).attr('href').replace('&amp;', '&')
                };
            })
                .toArray();
            res.send({ thumbs, urls });
        }
        catch (error) {
            res.send({ error: error.message });
        }
    });
}
exports.facebook = facebook;
//# sourceMappingURL=facebook.js.map