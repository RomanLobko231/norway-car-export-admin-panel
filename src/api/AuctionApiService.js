import api from "./api";

export default class AuctionApiService {
  static async saveNewAuction(auctionData) {
    try {
      const response = await api.post("/api/v1/auctions", auctionData);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
