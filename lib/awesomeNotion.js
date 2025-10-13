const { Client } = require("@notionhq/client");
const fsp = require("fs/promises");

const DEV_MODE_FETCH = false;
const isProduction = process.env.NODE_ENV === "production";
const SHOULD_FETCH =
  process.env.NOTION_TOKEN &&
  process.env.NOTION_DATABASE &&
  (isProduction || DEV_MODE_FETCH);

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: "2025-09-03",
});

async function populateProperties(results) {
  for (const item of results) {
    await Promise.all(
      Object.keys(item.properties).map(async (property) => {
        if (
          ["Name", "Description", "URL", "Category", "Tags"].includes(property)
        ) {
          const propertyDetails = await notion.pages.properties.retrieve({
            page_id: item.id,
            property_id: item.properties[property].id,
          });
          item.properties[property] = {
            ...item.properties[property],
            ...propertyDetails,
          };
        }
      }),
    );
  }
}

async function queryDatasource(data_source_id, cursor) {
  const queryResults = await notion.dataSources.query({
    data_source_id,
    sorts: [
      {
        property: "Priority",
        direction: "ascending",
      },
      {
        timestamp: "last_edited_time",
        direction: "descending",
      },
    ],
    page_size: isProduction ? undefined : 10,
    start_cursor: cursor,
  });

  if (isProduction && queryResults.has_more) {
    const next_results = await queryDatasource(
      data_source_id,
      queryResults.next_cursor,
    );
    return queryResults.results.concat(next_results);
  }

  return queryResults.results;
}

async function fetchAwesome() {
  if (!SHOULD_FETCH)
    return {
      categories: [],
      tags: [],
      results: [],
      groupedCategories: {},
      groupedTags: {},
    };
  const db = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE,
  });
  const data_source_id = db.data_sources[0].id;
  const data_source = await notion.dataSources.retrieve({
    data_source_id,
  });

  const categories = data_source.properties.Category.select.options.map(
    (option) => option.name,
  );
  const tags = data_source.properties.Tags.multi_select.options.map(
    (option) => option.name,
  );

  const rawResults = await queryDatasource(data_source_id);
  await populateProperties(rawResults);
  const results = rawResults.filter((page) => page.properties.Category.select);

  const groupedCategories = {};
  categories.forEach((category) => {
    groupedCategories[category] = [];
    results.forEach((page) => {
      if (page.properties.Category.select.name === category) {
        groupedCategories[category].push(page);
      }
    });
  });

  const groupedTags = {};
  tags.forEach((tag) => {
    groupedTags[tag] = [];
    results.forEach((page) => {
      if (
        page.properties.Tags.multi_select.some(
          (multi_select) => multi_select.name === tag,
        )
      ) {
        groupedTags[tag].push(page);
      }
    });
  });

  return { categories, tags, results, groupedCategories, groupedTags };
}

let runningPromise;

module.exports = async function () {
  // ensure directory
  await fsp.mkdir("_data", { recursive: true });
  // read cache file
  return fsp
    .readFile("_data/awesome.json")
    .then((raw) => {
      const data = JSON.parse(raw);
      // cache expired 1 minute
      if (Date.now() - data.timestamp > 60 * 1e3) {
        return;
      }
      // valid cache
      return data.cachedData;
    })
    .catch((err) => {
      // file not found
      if (err.code === "ENOENT") {
        return;
      }
      // other errors
      throw err;
    })
    .then(async (cachedData) => {
      // has valid cache
      if (cachedData) return cachedData;
      // has another fetch running
      if (runningPromise) {
        return runningPromise;
      }
      // run new fetch
      runningPromise = fetchAwesome();
      runningPromise.then(async (data) => {
        // write cache file
        await fsp.writeFile(
          "_data/awesome.json",
          JSON.stringify({ timestamp: Date.now(), cachedData: data }),
        );
        runningPromise = undefined;
      });
      // return running fetch without waiting for cache file writing
      return runningPromise;
    });
};
