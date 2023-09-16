import axios from "axios";
import FormData from 'form-data';
import * as Cheerio from 'cheerio';

export async function facebook(req, res, next) {
    let domain = "https://fdownload.app/api/ajaxSearch";
    let data = new FormData();

    data.append('q', req.query.url);

    try {
        const resp = await axios.post(domain, data, {
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
                }
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
    } catch (error) {
        res.send({ error: error.message });
    }
}
