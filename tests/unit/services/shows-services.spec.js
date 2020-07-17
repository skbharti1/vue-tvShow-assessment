import {
  get250Shows,
  getShowsByKeyword,
  getShowById,
  getPreviousEpisode
} from "@/services/shows-services/shows-services.js";
import httpClient from "@/services/common/http-client/http-client.js";

// Mock module with Jest mock functions
jest.mock("@/services/common/http-client/http-client.js");

describe("In shows service, ", () => {
  it("getShowsByKeyword api should call", async () => {
    const mockedData = [{ show: 1 }, { show: 2 }, { show: 3 }];
    httpClient.get.mockResolvedValue(mockedData);
    await getShowsByKeyword("keyword")
      .then(result => {
        expect(result).toEqual(mockedData);
      })
      .catch(err => {
        err;
      });
  });

  it("getShowsByKeyword api should throw error when any error encountered", async () => {
    const error = new Error("Async error");
    httpClient.get.mockRejectedValue(error);
    await getShowsByKeyword("keyword").catch(err => {
      expect(err).toEqual(error);
    });
  });

  it("get250Shows api should call", async () => {
    const mockedData = [{ show: 1 }, { show: 2 }, { show: 3 }];
    httpClient.get.mockResolvedValue(mockedData);
    await get250Shows()
      .then(result => {
        expect(result).toEqual(mockedData);
      })
      .catch(err => {
        err;
      });
  });

  it("get250Shows api should throw error when any error encountered", async () => {
    const error = new Error("Async error");
    httpClient.get.mockRejectedValue(error);
    await get250Shows().catch(err => {
      expect(err).toEqual(error);
    });
  });

  it("getShowById api should call", async () => {
    const mockedData = { id: "1", name: "Iron Man" };
    httpClient.get.mockResolvedValue(mockedData);
    await getShowById(1)
      .then(result => {
        expect(result).toEqual(mockedData);
      })
      .catch(err => {
        err;
      });
  });

  it("getShowById api should throw error when any error encountered", async () => {
    const error = new Error("Async error");
    httpClient.get.mockRejectedValue(error);
    await getShowById(1).catch(err => {
      expect(err).toEqual(error);
    });
  });

  it("getPreviousEpisode api should call", async () => {
    const mockedData = { id: "1", name: "Man of Steel" };
    httpClient.get.mockResolvedValue(mockedData);
    await getPreviousEpisode("url")
      .then(result => {
        expect(result).toEqual(mockedData);
      })
      .catch(err => {
        err;
      });
  });

  it("getPreviousEpisode api should throw error when any error encountered", async () => {
    const error = new Error("Async error");
    httpClient.get.mockRejectedValue(error);
    await getPreviousEpisode("url").catch(err => {
      expect(err).toEqual(error);
    });
  });
});
