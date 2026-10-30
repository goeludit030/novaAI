// Returns a public download URL for a locally-stored file, served via the
// gateway /files route (replaces the S3 presigned URL).
export const getFromS3 = async (filename, _expiresIn) => {
    const base = process.env.PUBLIC_BASE_URL || "http://localhost:8000"
    return `${base}/files/${filename}`
}
