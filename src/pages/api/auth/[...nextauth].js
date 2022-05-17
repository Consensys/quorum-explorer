import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    process.env.SLACK_CLIENT_ID && process.env.SLACK_CLIENT_SECRET
      ? SlackProvider({
          clientId: process.env.SLACK_CLIENT_ID,
          clientSecret: process.env.SLACK_CLIENT_SECRET,
        })
      : [],
    process.env.OKTA_CLIENT_ID &&
    process.env.OKTA_CLIENT_SECRET &&
    process.env.OKTA_ISSUER
      ? OktaProvider({
          clientId: process.env.OKTA_CLIENT_ID,
          clientSecret: process.env.OKTA_CLIENT_SECRET,
          issuer: process.env.OKTA_ISSUER,
        })
      : [],
    process.env.COGNITO_CLIENT_ID &&
    process.env.COGNITO_CLIENT_SECRET &&
    process.env.COGNITO_ISSUER
      ? CognitoProvider({
          clientId: process.env.COGNITO_CLIENT_ID,
          clientSecret: process.env.COGNITO_CLIENT_SECRET,
          issuer: process.env.COGNITO_ISSUER,
        })
      : [],
    process.env.ATLASSIAN_CLIENT_ID && process.env.ATLASSIAN_CLIENT_SECRET
      ? AtlassianProvider({
          clientId: process.env.ATLASSIAN_CLIENT_ID,
          clientSecret: process.env.ATLASSIAN_CLIENT_SECRET,
          scope:
            "write:jira-work read:jira-work read:jira-user offline_access read:me",
        })
      : [],
    process.env.AZURE_AD_CLIENT_ID &&
    process.env.AZURE_AD_CLIENT_SECRET &&
    process.env.AZURE_AD_TENANT_ID
      ? AzureADProvider({
          clientId: process.env.AZURE_AD_CLIENT_ID,
          clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
          tenantId: process.env.AZURE_AD_TENANT_ID,
        })
      : [],
    process.env.GITLAB_CLIENT_ID && process.env.GITLAB_CLIENT_SECRET
      ? GitlabProvider({
          clientId: process.env.GITLAB_CLIENT_ID,
          clientSecret: process.env.GITLAB_CLIENT_SECRET,
        })
      : [],
    process.env.GITHUB_ID && process.env.GITHUB_SECRET
      ? GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        })
      : [],
    process.env.FACEBOOK_ID && process.env.FACEBOOK_SECRET
      ? FacebookProvider({
          clientId: process.env.FACEBOOK_ID,
          clientSecret: process.env.FACEBOOK_SECRET,
        })
      : [],
    process.env.GOOGLE_ID && process.env.GOOGLE_SECRET
      ? GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        })
      : [],
    process.env.TWITTER_ID && process.env.TWITTER_SECRET
      ? TwitterProvider({
          clientId: process.env.TWITTER_ID,
          clientSecret: process.env.TWITTER_SECRET,
        })
      : [],
    process.env.AUTH0_ID && process.env.AUTH0_SECRET && process.env.AUTH0_ISSUER
      ? Auth0Provider({
          clientId: process.env.AUTH0_ID,
          clientSecret: process.env.AUTH0_SECRET,
          issuer: process.env.AUTH0_ISSUER,
        })
      : [],
    process.env.local_username && process.env.local_password
      ? CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: "Credentials",
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "admin" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials, req) {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)

            // If no error and we have user data, return it
            if (
              credentials.username === process.env.local_username &&
              credentials.password === process.env.local_password
            ) {
              return { name: process.env.local_username };
            }
            // Return null if user data could not be retrieved
            return null;
          },
        })
      : [],
  ],
  theme: {
    colorScheme: "light",
    logo: "https://cdn.consensys.net/uploads/Quorum_Logo_Blue_New.svg",
  },
  // callbacks: {
  //   async jwt({ token }) {
  //     token.userRole = "admin";
  //     return token;
  //   },
  // },
});
