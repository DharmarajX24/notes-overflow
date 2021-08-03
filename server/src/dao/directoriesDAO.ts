import supabase from "../init/supabase";

export default class DirectoriesDAO {
  static addDirectory = async (user_id: string, name: string, description: string) => {
    const {count} = await supabase.from("directories").select("*", {
      count: "exact",
      head: true
    }).eq("name", name).eq("user_id", user_id)
    console.log(count)
    if (count) throw new Error("Name already taken")
    return supabase.from("directories").insert([
      {name, description, user_id, img_count: 0, created_at: new Date()}
    ])
  }

  static verifyUserDirectory = async (user_id: string, directory_id: string): Promise<void> => {
    const {count} = await supabase.from("directories").select("*", {
      count: "exact",
      head: true
    }).eq("user_id", user_id).eq("directory_id", directory_id)
    if (!count) throw new Error("Invalid Directory")
    return
  }

  static listDirectories = async (userId: string) => {
    return supabase.from("directories").select("id,name").eq("user_id", userId)
  }

  static addImage = async (userId: string, directoryId: string, imageData: Image.Data) => {
    return supabase.from("images").insert([
      {directoryId, text: imageData.text, addedAt: new Date()}
    ]);
  }
}
