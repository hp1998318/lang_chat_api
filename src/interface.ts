/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  aiMessage: string;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions;
}

export interface OptionsType {
  input: string;
}
