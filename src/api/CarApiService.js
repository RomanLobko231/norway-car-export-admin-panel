import api from "./api";

export default class CarApiService {
  static async getAllCars() {
    try {
      const response = await api.get("/api/v1/cars");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAllCarsByStatusPaged(status, page, size) {
    try {
      const response = await api.get(
        `/api/v1/cars?status=${status}&page=${page}&size=${size}`,
      );
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

  static async existsByRegNumber(regNumber) {
    try {
      const response = await api.get(
        `/api/v1/cars/exists?regNumber=${regNumber}`,
      );
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

      const response = await api.post("/api/v1/cars/add-complete", data);
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

      const response = await api.post("/api/v1/cars/add-complete-user", data);
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
}
