module.exports = async function fetchInline(url) {
  const got = await import("got");
  const resp = await got.default(url).text();
  return resp;
};
