import apiClient from "../axios.config";

// ==================== CREATE PLAYLIST ====================
export const createPlaylist = async (playlistData) => {
  try {
    const response = await apiClient.post(
      "/playlists/create-playlist",
      playlistData
    );
    return response;
  } catch (err) {
    throw err;
  }
};

// ==================== GET USER PLAYLISTS ====================
export const getUserPlaylists = async () => {
  try {
    const response = await apiClient.get("/playlists/get-user-playlist");
    return response;
  } catch (err) {
    throw err;
  }
};

// ==================== GET SINGLE PLAYLIST ====================
export const getSinglePlaylist = async (playlistId) => {
  try {
    const response = await apiClient.get(
      `/playlists/get-playlist/${playlistId}`
    );
    return response;
  } catch (err) {
    throw err;
  }
};

// ==================== ADD VIDEO TO PLAYLIST ====================
export const addVideoToPlaylist = async (playlistId, videoId) => {
  try {
    const response = await apiClient.patch(
      `/playlists/add-video/${playlistId}/${videoId}`
    );
    return response;
  } catch (err) {
    throw err;
  }
};

// ==================== REMOVE VIDEO FROM PLAYLIST ====================
export const removeVideoFromPlaylist = async (playlistId, videoId) => {
  try {
    const response = await apiClient.patch(
      `/playlists/remove-video/${playlistId}/${videoId}`
    );
    return response;
  } catch (err) {
    throw err;
  }
};

// ==================== UPDATE PLAYLIST ====================
export const updatePlaylist = async (playlistId, playlistData) => {
  try {
    const response = await apiClient.patch(
      `/playlists/update-playlist/${playlistId}`,
      playlistData
    );
    return response;
  } catch (err) {
    throw err;
  }
};

// ==================== DELETE PLAYLIST ====================
export const deletePlaylist = async (playlistId) => {
  try {
    const response = await apiClient.delete(
      `/playlists/remove-playlist/${playlistId}`
    );
    return response;
  } catch (err) {
    throw err;
  }
};
