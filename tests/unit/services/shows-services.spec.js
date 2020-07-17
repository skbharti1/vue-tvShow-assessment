import {
  getShows,
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
    httpClient.get.mockResolvedValue({ data: mockedData });
    const result = await getShowsByKeyword("Arrow").catch(err =>
      console.log(err)
    );
    expect(result).toEqual(mockedData);
  });

  it("getShowsByKeyword api should throw error when any error encountered", async () => {
    const error = new Error("Async error");
    httpClient.get.mockRejectedValue(error);
    await getShowsByKeyword("keyword").catch(err => {
      expect(err).toEqual(error);
    });
  });

  it("getShows api should call", async () => {
    const mockedData = [{ show: 1 }, { show: 2 }, { show: 3 }];
    httpClient.get.mockResolvedValue({ data: mockedData });
    const result = await getShows().catch(err => console.log(err));
    expect(result).toEqual(mockedData);
  });

  it("getShows api should throw error when any error encountered", async () => {
    const error = new Error("Async error");
    httpClient.get.mockRejectedValue(error);
    await getShows().catch(err => {
      expect(err).toEqual(error);
    });
  });

  it("getShowById api should call", async () => {
    const mockedData = { id: "1", name: "Iron Man" };
    httpClient.get.mockResolvedValue({ data: mockedData });
    const result = await getShowById(1).catch(err => console.log(err));
    expect(result).toEqual(mockedData);
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
    httpClient.get.mockResolvedValue({ data: mockedData });
    const result = await getPreviousEpisode("url").catch(err =>
      console.log(err)
    );
    expect(result).toEqual(mockedData);
  });

  it("getPreviousEpisode api should throw error when any error encountered", async () => {
    const error = new Error("Async error");
    httpClient.get.mockRejectedValue(error);
    await getPreviousEpisode("url").catch(err => {
      expect(err).toEqual(error);
    });
  });
});
