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

  static async updateCar(car) {
    try {
      const response = await api.put("/api/v1/cars", car);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async saveCar(car) {
    try {
      const response = await api.post("/api/v1/cars/admin", car);
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
}
