export async function generateAccessAndRefreshToken(user: any) {
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  return { accessToken, refreshToken };
}