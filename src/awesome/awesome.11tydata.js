const programmings = [
  {
    title: "Programming concepts",
    description: "General programming",
    items: [
      {
        title: "Coding Interview University",
        description:
          "A complete computer science study plan to become a software engineer.",
        url: "https://github.com/jwasham/coding-interview-university#readme",
      },
      {
        title: "Freecodecamp",
        description: "Learn to code. Build projects. Earn certifications.",
        url: "https://www.freecodecamp.org/",
      },
    ],
  },
  {
    title: "Books",
    description: "Computer science",
    items: [
      {
        title: "Electronic References",
        description:
          "CS textbooks in a variety of areas that are freely available online.",
        url: "https://csgordon.github.io/books.html",
      },
    ],
  },

  {
    title: "Tools",
    description: "",
    items: [
      {
        title: "Free for developers",
        description:
          "This is a list of software (SaaS, PaaS, IaaS, etc.) and other offerings that have free tiers for developers.",
        url: "https://free-for.dev/",
      },
    ],
  },
];

module.exports = {
  contents: new Map([["General Programming", programmings]]),
};
