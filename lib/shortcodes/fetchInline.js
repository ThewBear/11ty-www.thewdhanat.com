const userAgentString =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36";

module.exports = async function fetchInline(url) {
  const got = await import("got");
  const resp = await got
    .default(url, {
      headers: {
        "user-agent": userAgentString,
      },
    })
    .text();
  return resp;
};
