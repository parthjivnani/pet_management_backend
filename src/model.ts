/* eslint-disable no-useless-catch */
import { validate } from 'class-validator';

export class Model {
  public static async getModel(model, body, query?, params?): Promise<Model> {
    try {
      const modelInstance = new model(body, query, params);
      const errors = await validate(modelInstance);
      if (errors.length) {
        throw errors;
      }
      return modelInstance;
    } catch (error) {
      throw error;
    }
  }
}
