export const authCofig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret',
    expiresIn: '1d',
  } as const,
};
