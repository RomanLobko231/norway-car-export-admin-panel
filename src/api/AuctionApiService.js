import api from "./api";

export default class AuctionApiService {
  static async startNewAuction(auctionData) {
    console.log(auctionData);
    try {
      const response = await api.post("/api/v1/auctions/start", auctionData);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAllAuctionsByStatus(status) {
    try {
      const response = await api.get(`/api/v1/auctions?status=${status}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async setAuctionStatusById(status, auctionId) {
    try {
      const response = await api.put(
        `/api/v1/auctions/${auctionId}?status=${status}`,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateAuction(auctionData) {
    try {
      const response = await api.put("/api/v1/auctions", auctionData);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteAuctionById(id) {
    try {
      const response = await api.delete(`/api/v1/auctions/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
