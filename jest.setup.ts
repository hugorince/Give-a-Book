import "@testing-library/jest-dom";

// **Global Mocks**
// Any mocks included here, in `@/__tests__/test-utils`, apply to all tests.
// Due to Jest transformer issues, we mock next-auth's useSession hook directly:

export const mockSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { username: "admin", id: 4 },
};

export const mockSignOut = jest.fn();
export const mockSignIn = jest.fn();

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => ({
      data: mockSession,
      status: "authenticated",
    })),
    signOut: mockSignOut,
    signIn: mockSignIn,
  };
});

jest.mock("next-auth", () => ({
  __esModule: true,
  default: jest.fn(),
  getServerSession: jest.fn(
    () =>
      new Promise((resolve) => {
        resolve({
          expiresIn: undefined,
          loggedInAt: undefined,
          someProp: "someString",
          user: mockSession.user,
        });
      }),
  ),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  redirect: jest.fn(),
}));
