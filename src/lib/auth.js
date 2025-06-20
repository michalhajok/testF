import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

// Mock API call - replace with actual API call to your backend
async function loginUser(credentials) {
  // In a real implementation, this would call your backend API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Call backend to verify credentials
          const user = await loginUser(credentials);

          if (user && user.token) {
            // Return user object with token
            return user;
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user && user.token) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.expiresAt * 1000, // Convert to milliseconds
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            name: `${user.firstName} ${user.lastName}`,
          },
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to refresh it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user;
        session.error = token.error;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
    signOut: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// Helper function to refresh the access token
async function refreshAccessToken(token) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: token.refreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("RefreshAccessTokenError");
    }

    const refreshedTokens = await response.json();

    return {
      ...token,
      accessToken: refreshedTokens.token,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
      accessTokenExpires: refreshedTokens.expiresAt * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

// Helper function to verify if JWT is valid (for client-side use)
export function verifyJWT(token) {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    // Check if token is expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

// Helper functions for role-based access control

// Check if user has a specific role
export function hasRole(user, role) {
  return user?.role === role;
}

// Check if user has one of the specified roles
export function hasAnyRole(user, roles) {
  return roles.includes(user?.role);
}

// Extract user from token
export function getUserFromToken(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}
