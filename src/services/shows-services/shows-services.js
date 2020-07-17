import httpClient from "../common/http-client/http-client.js";

const get250Shows = () => {
  return httpClient.get("/shows").then(res => res.data);
};

const getShowsByKeyword = keyword => {
  return httpClient.get("/search/shows?q=" + keyword).then(res => res.data);
};

const getShowById = id => {
  return httpClient.get("/shows/" + id).then(res => res.data);
};

const getPreviousEpisode = url => {
  return httpClient.get(url).then(res => res.data);
};

export { get250Shows, getShowsByKeyword, getShowById, getPreviousEpisode };
