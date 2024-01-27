import { PublicAxios } from "@src/utils/PublicAxios";
import { TRegisterValue } from "../RegisterPage";

export function useRegister() {
  async function registerUser(values: TRegisterValue) {
    const response = await PublicAxios.post("auth/register", values);
    console.log(response.data);
  }

  return { registerUser };
}
