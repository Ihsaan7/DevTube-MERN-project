import apiClient from "../axios.config";

// ==================== GET CHANNEL STATS ====================
export const getChannelStats = async () => {
  try {
    const response = await apiClient.get("/dashboards/channel-stats");
    return response;
  } catch (err) {
    throw err;
  }
};

// ==================== GET CHANNEL VIDEOS ====================
export const getChannelVideos = async () => {
  try {
    const response = await apiClient.get("/dashboards/channel-videos");
    return response;
  } catch (err) {
    throw err;
  }
};
