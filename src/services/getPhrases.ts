import axios from "axios";

export const getPhrases = async () => {
  try {
    const response = await axios.get("helpers/Pharases.json");
    return response.data;
  } catch (error) {
    throw new Error(`Error trow: ${error}`);
  }
};
