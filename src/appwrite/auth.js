import { account, database } from "../config";
import { ID, Permission, Role } from "appwrite";

export const authService = {
  loginUser: async (email, password) => {
    try {
      // Login user
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      return user;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  },

  logoutUser: async () => {
    try {
      await account.deleteSession("current");
      return true;
    } catch (error) {
      console.error("Error logging out user:", error);
      throw error;
    }
  },
};

export async function sendscore(score, teamname, points) {
  try {
    const result = await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      ID.unique(),
      {
        Teamname: teamname,
        Score: score,
        Points: points
      },
      [
        Permission.read(Role.any()),
        Permission.write(Role.any()),
        Permission.update(Role.any())
      ]
    );

    console.log("Score saved:", result);
    return result;
  } catch (error) {
    console.error("Error saving score:", error);
    throw error;
  }
}


export async function getscore() {
  try {
    const result = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      []
    );
    return result;
  } catch (error) {
    console.error("Error getting scores:", error);
    throw error;
  }
}