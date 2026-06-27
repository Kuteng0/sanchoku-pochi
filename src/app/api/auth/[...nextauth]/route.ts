// NextAuth API ルート
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    {
      id: 'line',
      name: 'LINE',
      type: 'oauth',
      clientId: process.env.LINE_CLIENT_ID || '',
      clientSecret: process.env.LINE_CLIENT_SECRET || '',
      authorization: {
        url: 'https://access.line.me/oauth2/v2.1/authorize',
        params: { scope: 'profile openid', bot_prompt: 'normal' },
      },
      token: 'https://api.line.me/oauth2/v2.1/token',
      userinfo: 'https://api.line.me/v2/profile',
      profile(profile: any) {
        return {
          id: profile.userId,
          name: profile.displayName,
          email: profile.userId + '@line.user',
          image: profile.pictureUrl,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) token.id = user.id;
      if (account) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).provider = token.provider;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
