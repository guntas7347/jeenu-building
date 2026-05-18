function assertEnv(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Missing env: ${key}`);
  }

  return value;
}

export const clientEnv = {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: assertEnv(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
  ),

  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: assertEnv(
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
  ),

  NEXT_PUBLIC_LOCATIONIQ_KEY: assertEnv(
    process.env.NEXT_PUBLIC_LOCATIONIQ_KEY,
    "NEXT_PUBLIC_LOCATIONIQ_KEY",
  ),
};
