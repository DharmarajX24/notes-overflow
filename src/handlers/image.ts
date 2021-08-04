import vision from "../init/vision";
import supabase from "../init/supabase";
import fs from "fs"
import {lookup} from "mime-types";

export const parseTextFromImage = async (path: string) => {
  const [result] = await vision.textDetection(path);
  const detections = result.textAnnotations;
  console.log("Text:", JSON.stringify(detections));
  const finale = detections?.find(ent =>ent.locale != '')?.description?.replace('\n','');
  console.log(finale);
  return finale;
}

export const uploadToSupabase = async (filePath: string, slug: string): Promise<void> => {
  const file = fs.createReadStream(filePath)
  const { data, error } = await supabase
    .storage
    .from("images")
    .upload(slug, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: lookup(filePath) || "application/octet-stream"
    })
  if (error) throw new Error(error.message)
  console.log(data)
  return
}
