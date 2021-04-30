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
      {
        title: "Open Source Society University",
        description:
          "Path to a free self-taught education in Computer Science!",
        url: "https://github.com/ossu/computer-science#readme",
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
      {
        title: "Public APIs",
        description:
          "A collective list of free APIs for use in software and web development.",
        url: "https://github.com/public-apis/public-apis#readme",
      },
    ],
  },
  {
    title: "Tutorials",
    description: "Learning by doing",
    items: [
      {
        title: "Build your own X",
        description: "",
        url: "https://github.com/danistefanovic/build-your-own-x",
      },
    ],
  },
];

const python = [
  {
    title: "Books",
    description: "",
    items: [
      {
        title: "Free Python Books",
        description:
          "A list of Python books in English that are free to read online or download.",
        url: "https://github.com/pamoroso/free-python-books#readme",
      },
    ],
  },
];

const web = [
  {
    title: "Web Dev",
    description: "",
    items: [
      {
        title: "165+ Developer Resources I Discovered in 2020-2021",
        description: "",
        url:
          "https://dev.to/gedalyakrycer/165-developer-resources-i-discovered-in-2020-2021-6ma",
      },
    ],
  },
  {
    title: "Design",
    description: "UX/UI",
    items: [
      {
        title: "30 Awesome places to find design inspiration",
        description: "",
        url:
          "https://dev.to/cruip/30-awesome-places-to-find-design-inspiration-1hpn",
      },
    ],
  },
  {
    title: "JavaScript",
    description: "",
    items: [
      {
        title: "JavaScript Algorithms and Data Structures",
        description: "",
        url: "https://github.com/trekhleb/javascript-algorithms#readme",
      },
    ],
  },
];

module.exports = {
  contents: new Map([
    ["General Programming", programmings],
    ["Python", python],
    ["Web", web],
  ]),
};
