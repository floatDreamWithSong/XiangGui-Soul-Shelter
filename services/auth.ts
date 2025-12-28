import axios from "axios";

const api = axios.create({
  baseURL: "http://你的后端地址", 
  timeout: 10000,
});

export async function loginApi(params: {
  mobile: string;
  password: string;
  remember_me: boolean;
}) {
  const res = await api.post("/api/v1/auth/login/password", params);
  return res.data;
}
