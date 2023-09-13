import axios from "axios";

export async function tiktok(req, res, next) {
  let domain = "https://www.tikwm.com/";
  let result = await axios.post(
    domain + "api/",
    {},
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        // 'cookie': 'current_language=en; _ga=GA1.1.115940210.1660795490; _gcl_au=1.1.669324151.1660795490; _ga_5370HT04Z3=GS1.1.1660795489.1.1.1660795513.0.0.0',
        "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
      },
      params: {
        url: req.query.url,
        count: 12,
        cursor: 0,
        web: 1,
        hd: 1,
      },
    }
  );

  res.send(200, {
    nowm: domain + result.data.data.play,
    wm: domain + result.data.data.wmplay,
    music: domain + result.data.data.music,
  });
}
