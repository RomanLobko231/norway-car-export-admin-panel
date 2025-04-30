import api from "./api";

export default class UserApiService {
  static async registerSeller(sellerData) {
    try {
      const response = await api.post(
        "/api/v1/users/register_seller",
        sellerData,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async registerOneTimeSeller(sellerData) {
    try {
      const response = await api.post(
        "/api/v1/users/register_one_time_seller",
        sellerData,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const response = await api.get(`/api/v1/users/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const response = await api.get(`/api/v1/users/by_email/${email}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAllBuyers() {
    try {
      const response = await api.get("/api/v1/users/buyers");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateUser(owner) {
    try {
      const response = await api.put("/api/v1/users", owner);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async setUserLock(id, isLocked) {
    try {
      const response = await api.patch(
        `/api/v1/users/${id}/set_lock?isLocked=${isLocked}`,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteUserById(id) {
    try {
      const response = await api.delete(`/api/v1/users/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async loginUser(loginData) {
    try {
      const response = await api.post("/api/v1/users/login", loginData);
      sessionStorage.setItem("token", response.data.token);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
