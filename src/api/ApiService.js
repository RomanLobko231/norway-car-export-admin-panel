import api from "./api";

export default class ApiService {
  static async getAllCars() {
    try {
      const response = await api.get("/api/v1/cars");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAllCarsByStatus(status) {
    try {
      const response = await api.get(`/api/v1/cars?status=${status}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getCarById(id) {
    try {
      const response = await api.get(`/api/v1/cars/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateCar(car, images) {
    try {
      const data = new FormData();
      const carDataBlob = new Blob([JSON.stringify(car)], {
        type: "application/json",
      });
      data.append("carData", carDataBlob);

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await api.put("/api/v1/cars", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async setCarStatus(status, carId) {
    try {
      const response = await api.put(`/api/v1/cars/${carId}?status=${status}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateOwner(owner) {
    try {
      const response = await api.put("/api/v1/users", owner);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async saveCarNewUser(car, images) {
    try {
      const data = new FormData();
      const carDataBlob = new Blob([JSON.stringify(car)], {
        type: "application/json",
      });
      data.append("carData", carDataBlob);

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await api.post("/api/v1/cars/add_complete", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async saveCarExistingUser(car, images) {
    try {
      const data = new FormData();
      const carDataBlob = new Blob([JSON.stringify(car)], {
        type: "application/json",
      });
      data.append("carData", carDataBlob);

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await api.post("/api/v1/cars/add_complete_user", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteCarById(id) {
    try {
      const response = await api.delete(`/api/v1/cars/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

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
