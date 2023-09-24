import axios from "axios";
import FormData from 'form-data';
import * as Cheerio from 'cheerio';

export async function instagram(req, res, next) {
    const domain = "https://fastdl.app/c/";
    const data = new FormData();

    data.append('url', req.query.url);
    data.append('lang_code', 'vi');

    try {
        const resp = await axios.post(domain, data, {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.99 Safari/537.36',
                ...data.getHeaders()
            },
        });

        const $ = Cheerio.load(resp.data);
        const thumbs = []
        const urls = $('a#download-btn')
        .map((_, e) => {
            return {
                type: '',
                url: $(e).attr('href').replace('&amp;', '&')
            };
        })
        .toArray();
        
        res.send({thumbs, urls});
    } catch (error) {
        res.send({ error: error.message });
    }
}