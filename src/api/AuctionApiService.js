import api from "./api";

export default class AuctionApiService {
  static async startNewAuction(auctionData) {
    try {
      const response = await api.post("/api/v1/auctions/start", auctionData);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAllAuctionsByStatusPaged(status, page, size) {
    try {
      const response = await api.get(
        `/api/v1/auctions?status=${status}&page=${page}&size=${size}`,
      );
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

  static async updateRestartAuction(auctionData) {
    try {
      const response = await api.put(
        "/api/v1/auctions/update-restart",
        auctionData,
      );
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
