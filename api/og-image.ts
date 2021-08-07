import { chromium } from "playwright";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
  const urlPath = req.query.url as string | undefined;
  if (!urlPath || !urlPath.startsWith("/")) {
    return res.status(400).end();
  }
  const browser = await chromium.launch();
  const context = await browser.newContext({
    deviceScaleFactor: 2.5,
    viewport: { width: 1200, height: 628 },
  });
  const page = await context.newPage();
  const response = await page
    .goto(
      `${req.headers["x-forwarded-proto"] || "https"}://${
        process.env.VERCEL_URL
      }${urlPath}`
    )
    .catch(() => {});
  if (!response || response.status() !== 200) {
    return res.status(404).end();
  }
  res.setHeader("Content-Type", `image/png`);
  res.setHeader(
    "Cache-Control",
    `public, no-transform, s-maxage=86400, max-age=0`
  );
  res.setHeader("x-size", JSON.stringify(page.viewportSize()));
  const file = await page.screenshot();
  await browser.close();
  return res.end(file);
}
