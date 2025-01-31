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
}
