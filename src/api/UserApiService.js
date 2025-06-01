import api from "./api";

export default class UserApiService {
  static async registerSeller(sellerData) {
    try {
      const response = await api.post(
        "/api/v1/users/register-seller",
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
        "/api/v1/users/register-one-time-seller",
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

  static async getLicencesByCompanyId(id) {
    try {
      const response = await api.get(`/api/v1/users/buyers/${id}/licences`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getRepresentativeById(id) {
    try {
      const response = await api.get(`/api/v1/users/representatives/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getRepresentativeWithCompanyById(id) {
    try {
      const response = await api.get(
        `/api/v1/users/representatives/${id}/with-company`,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const response = await api.get(`/api/v1/users/by-email/${email}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUserByPhoneNumber(phoneNumber) {
    try {
      const response = await api.get(`/api/v1/users/by-number/${phoneNumber}`);
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

  static async getAllBuyersByLockedStatus(isLocked) {
    try {
      const response = await api.get(
        `/api/v1/users/buyers?isLocked=${isLocked}`,
      );
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

  static async updateUserAsAdmin(owner) {
    try {
      const response = await api.put("/api/v1/users/as-admin", owner);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async setUserLock(id, isLocked) {
    try {
      const response = await api.patch(
        `/api/v1/users/${id}/set-lock?isLocked=${isLocked}`,
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
