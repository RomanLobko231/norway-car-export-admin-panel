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

  static async saveCar(car, images) {
    try {
      const data = new FormData();
      const carDataBlob = new Blob([JSON.stringify(car)], {
        type: "application/json",
      });
      data.append("carData", carDataBlob);

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await api.post("/api/v1/cars/admin", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      const response = await api.delete(`/api/v1/cars/${id}`);
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
}
