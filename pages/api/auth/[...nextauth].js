import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { acquireUserProfile } from 'lib/helpers/core';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        // NextAuth.js **CALLBACK** function to execute once user is to be authorized
        // You need to provide your own logic here that takes the **CREDENTIALS**
        // submitted and returns either an **OBJECT** representing a user or a value
        // that is false/null if the credentials are invalid.
        //   e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        //   e.g. the request IP address...
        // Throw a new Error("...") or return null if user data could not be retrieved.
        // The **CREDENTIALS** to sign-in with are provided by the signIn() NextAuth.js 
        // Client API function called from the Frontend.
        // The returned **OBJECT** will be encoded into the final JWT Token.
        const { email, password: plainPassword } = credentials;

        const userProfile = await acquireUserProfile(email, plainPassword);

        const simpleUserProfile = {
          email: userProfile.email,
          name: userProfile.name,
        };
        return simpleUserProfile;
      }
    })
  ],
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  }
});