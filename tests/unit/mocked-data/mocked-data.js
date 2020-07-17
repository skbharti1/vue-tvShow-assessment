const mockedShowData = {
  id: 1,
  url: "http://www.tvmaze.com/shows/1/under-the-dome",
  name: "Under the Dome",
  type: "Scripted",
  language: "English",
  genres: ["Drama", "Science-Fiction", "Thriller"],
  status: "Ended",
  runtime: 60,
  premiered: "2013-06-24",
  officialSite: "http://www.cbs.com/shows/under-the-dome/",
  schedule: {
    time: "22:00",
    days: ["Thursday"]
  },
  rating: {
    average: 6.5
  },
  weight: 97,
  network: {
    id: 2,
    name: "CBS",
    country: {
      name: "United States",
      code: "US",
      timezone: "America/New_York"
    }
  },
  webChannel: null,
  externals: {
    tvrage: 25988,
    thetvdb: 264492,
    imdb: "tt1553656"
  },
  image: {
    medium:
      "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
    original:
      "http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
  },
  summary:
    "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
  updated: 1573667713,
  _links: {
    self: {
      href: "http://api.tvmaze.com/shows/1"
    },
    previousepisode: {
      href: "http://api.tvmaze.com/episodes/185054"
    }
  }
};

const mockedEpisodeData = {
  id: 185054,
  url:
    "http://www.tvmaze.com/episodes/185054/under-the-dome-3x13-the-enemy-within",
  name: "The Enemy Within",
  season: 3,
  number: 13,
  airdate: "2015-09-10",
  airtime: "22:00",
  airstamp: "2015-09-11T02:00:00+00:00",
  runtime: 60,
  image: {
    medium:
      "http://static.tvmaze.com/uploads/images/medium_landscape/17/43622.jpg",
    original:
      "http://static.tvmaze.com/uploads/images/original_untouched/17/43622.jpg"
  },
  summary:
    "<p>As the Dome in Chester's Mill comes down, the Resistance makes a final attempt to protect the outside world from the infected townspeople in the Kinship and their new queen.</p>",
  _links: {
    self: {
      href: "http://api.tvmaze.com/episodes/185054"
    }
  }
};

export { mockedShowData, mockedEpisodeData };
