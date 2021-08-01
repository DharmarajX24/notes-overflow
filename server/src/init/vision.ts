import {ImageAnnotatorClient} from "@google-cloud/vision"
import {join} from "path"

const visionClient = new ImageAnnotatorClient({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: join(__dirname, "..", "serviceAccount.json")
})

export default visionClient
