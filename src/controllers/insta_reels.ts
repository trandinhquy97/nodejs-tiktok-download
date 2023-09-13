import axios from "axios";
import 'dotenv/config';

export async function instaReels(req, res, next) {
    const domain = "https://www.instagram.com/reel/";
    const postId = req.query.url
        .replace(" ", "")
        .split("/")
        .filter((x: String) => x.length > 0)[3];

    try {
        const resp = await axios(domain);

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
        axios(config)
            .then(function (response) {
                const urls = response.data.items[0].video_versions;
                const thumbs = response.data.items[0].image_versions2.candidates;
                const title = response.data.items[0].caption.text;
                res.send({ thumbs, urls, title });
            })
            .catch(function (error) {
                res.send({ error: error.message });
            });
    } catch (error) {
        res.send({ error: error.message });
    }
}