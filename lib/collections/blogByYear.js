module.exports = function blogByYear(collectionApi) {
  const blogByYear = {};
  posts = collectionApi.getFilteredByGlob("src/blog/**/*.md");
  posts.forEach((post) => {
    const year = post.date.getFullYear();
    if (!blogByYear[year]) {
      blogByYear[year] = [];
    }
    blogByYear[year].push(post);
  });
  return blogByYear;
};
