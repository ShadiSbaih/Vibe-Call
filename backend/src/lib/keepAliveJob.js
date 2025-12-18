import cron from "cron";
import http from "http";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
    const baseUrl = process.env.API_URL;

    if (!baseUrl) {
        console.log("[keep-alive] API_URL is not set; skipping ping");
        return;
    }

    const url = baseUrl + "/api/status";

    const client = url.startsWith("https://") ? https : http;

    client
        .get(url, (res) => {
            if (res.statusCode === 200) console.log("GET request sent successfully");
            else console.log("GET request failed", res.statusCode);

            // Consume response data to free up memory.
            res.resume();
        })
        .on("error", (e) => console.error("Error while sending request", e));
});

export default job;
