import supabase from "../init/supabase";

export default class ImagesDAO {
  static addImage = async (userId: string, imageData: Image.Data) => {
    return supabase.from("images").insert([
      {userId, addedAt: new Date()}
    ]);
  }
}
