import connectDB from '@/config/database';
import User from '@/models/User';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await connectDB();
        const userExists = await User.findOne({ email: profile?.email });
        if (userExists === null) {
          await User.create({
            email: profile?.email,
            username: profile?.name.replace(/\s+/g, '').toLowerCase(),
            image: user.image,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
      const user = await User.findOne({ email: session.user.email });
      session.userId = user._id.toString();
      return session;
    },
  },
  secret: process.env.NEXTAUTH_URL_SECRET,
};

export default NextAuth(authOptions);
