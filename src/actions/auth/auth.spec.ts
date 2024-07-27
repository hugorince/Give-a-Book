import { authOptions } from "./auth";
import { db } from "@/db";
import { compare } from "bcrypt";
import { CredentialsConfig } from "next-auth/providers/credentials";

jest.mock("../../db", () => ({
  db: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

describe("NextAuth options", () => {
  const credentialsProvider = authOptions.providers.find(
    (provider): provider is CredentialsConfig => provider.id === "credentials",
  );

  if (!credentialsProvider) {
    throw new Error(
      "CredentialsProvider is not defined in authOptions.providers",
    );
  }

  describe("CredentialsProvider authorize", () => {
    it("returns null if no credentials are provided", async () => {
      const result = await credentialsProvider.authorize({}, {});
      expect(result).toBeNull();
    });

    it("returns null if user is not found", async () => {
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      const result = await credentialsProvider.authorize(
        {
          email: "test@mail.com",
          password: "password",
        },
        {},
      );
      expect(result).toBeNull();
    });

    it("returns null if password does not match", async () => {
      const user = {
        id: 1,
        email: "test@mail.com",
        password: "hashedpassword",
        username: "testuser",
      };
      (db.user.findUnique as jest.Mock).mockResolvedValueOnce(user);
      (compare as jest.Mock).mockResolvedValueOnce(false);
      const result = await credentialsProvider.authorize(
        {
          email: "test@mail.com",
          password: "password",
        },
        {},
      );
      expect(result).toBeNull();
    });
  });

  describe("callbacks", () => {
    it("jwt callback updates token on trigger update", async () => {
      if (!authOptions.callbacks || !authOptions.callbacks.jwt) {
        throw new Error("authOptions.callbacks is not defined");
      }

      const token = { some: "token" };
      const session = { user: { name: "user" } };
      const result = await authOptions.callbacks.jwt({
        token,
        trigger: "update",
        session,
        account: null,
        user: {
          id: "id",
          email: "email",
          emailVerified: new Date(),
          username: "username",
        },
      });
      expect(result).toEqual({ ...token, ...session.user });
    });

    it("jwt callback adds username to token if user is provided", async () => {
      if (!authOptions.callbacks || !authOptions.callbacks.jwt) {
        throw new Error("authOptions.callbacks is not defined");
      }

      const token = { some: "token" };
      const user = { username: "testuser" };
      const result = await authOptions.callbacks.jwt({ token, user });
      expect(result).toEqual({ ...token, username: user.username });
    });

    it("jwt callback returns token if no user is provided", async () => {
      if (!authOptions.callbacks || !authOptions.callbacks.jwt) {
        throw new Error("authOptions.callbacks is not defined");
      }

      const token = { some: "token" };
      const result = await authOptions.callbacks.jwt({ token });
      expect(result).toEqual(token);
    });

    it("session callback adds username and id to session user", async () => {
      if (!authOptions.callbacks || !authOptions.callbacks.session) {
        throw new Error("authOptions.callbacks is not defined");
      }

      const session = { user: {} };
      const token = { username: "testuser", sub: "1" };
      const result = await authOptions.callbacks.session({
        token,
        trigger: "update",
        session,
        account: null,
        user: {
          id: "id",
          email: "email",
          emailVerified: new Date(),
          username: "username",
        },
      });
      expect(result).toEqual({
        ...session,
        user: { ...session.user, username: token.username, id: token.sub },
      });
    });
  });
});
