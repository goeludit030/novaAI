import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, "..", "public")

// Local file storage (replaces S3). The file is written to the agent's public
// dir and served (unauthenticated) via the gateway /files route. The caller
// uses an unguessable filename, which acts as the access capability.
export const uploadToS3 = async (filename, buffer, _contentType) => {
    await fs.mkdir(publicDir, { recursive: true })
    await fs.writeFile(path.join(publicDir, filename), buffer)
    return filename
}
