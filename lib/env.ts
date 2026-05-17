import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];

  if (value === undefined || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: requireEnv("DATABASE_URL"),
  NEXTAUTH_SECRET: requireEnv("NEXTAUTH_SECRET"),
  // NEXTAUTH_URL: requireEnv("NEXTAUTH_URL"),
  GOOGLE_CLIENT_ID: requireEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: requireEnv("GOOGLE_CLIENT_SECRET"),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: requireEnv(
    "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
  ),
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: requireEnv(
    "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
  ),
  NEXT_PUBLIC_LOCATIONIQ_KEY: requireEnv("NEXT_PUBLIC_LOCATIONIQ_KEY"),
};

export default env;
