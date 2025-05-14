import { axiosInstance } from "./axios";

export const signUp = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    const data = res.data;
    return data;
  } catch (error) {
    console.error("Error fetching auth user-in getAuthUser:", error);
    return null;
    //this will trigger => const isAuthenticated = Boolean(authUser) and become false in App.jsx
  }
};

export const completeBoarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  const data = res.data;
  return data;
};

export const getUserFriends = async () => {
  const res = await axiosInstance.get("/users/friends");
  const data = res.data.friends;
  return data;
}

export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users");
  const data = res.data.recommendedUsers;
  return data;
}
export const getOutgoingFriendReqs = async () => {
  try {
    const res = await axiosInstance.get("/users/outgoing-friend-requests");
    return res.data;
  } catch (error) {
    console.error("Error fetching outgoing requests:", error);
    return [];
  }
};
export async function sendFriendRequest(userId) {
  try {
    console.log("Sending friend request to:", userId);
    const response = await axiosInstance.post(`/users/friend-request/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Friend request error:", error.response?.data || error.message);
    throw error;
  }
}
export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}
