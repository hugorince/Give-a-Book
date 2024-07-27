import { filterBooks } from "./filter-books";
import { redirect } from "next/navigation";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("filterBooks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to /books?filter=exchange when only exchange is provided", async () => {
    const formData = new FormData();
    formData.set("exchange", "true");

    await filterBooks(formData);

    expect(redirect).toHaveBeenCalledWith("/books?filter=exchange");
  });

  it("redirects to /books?filter=give when only give is provided", async () => {
    const formData = new FormData();
    formData.set("give", "true");

    await filterBooks(formData);

    expect(redirect).toHaveBeenCalledWith("/books?filter=give");
  });

  it("redirects to /books?filter=liked when only liked is provided", async () => {
    const formData = new FormData();
    formData.set("liked", "true");

    await filterBooks(formData);

    expect(redirect).toHaveBeenCalledWith("/books?filter=liked");
  });

  it("redirects to /books?filter=exchange%2Cgive when exchange and give are provided", async () => {
    const formData = new FormData();
    formData.set("exchange", "true");
    formData.set("give", "true");

    await filterBooks(formData);

    expect(redirect).toHaveBeenCalledWith("/books?filter=exchange%2Cgive");
  });

  it("redirects to /books?filter=exchange%2Cliked when exchange and liked are provided", async () => {
    const formData = new FormData();
    formData.set("exchange", "true");
    formData.set("liked", "true");

    await filterBooks(formData);

    expect(redirect).toHaveBeenCalledWith("/books?filter=exchange%2Cliked");
  });

  it("redirects to /books?filter=liked%2Cgive when liked and give are provided", async () => {
    const formData = new FormData();
    formData.set("liked", "true");
    formData.set("give", "true");

    await filterBooks(formData);

    expect(redirect).toHaveBeenCalledWith("/books?filter=liked%2Cgive");
  });

  it("redirects to /books?filter=liked%2Cgive%2Cexchange when all filters are provided", async () => {
    const formData = new FormData();
    formData.set("exchange", "true");
    formData.set("give", "true");
    formData.set("liked", "true");

    await filterBooks(formData);

    expect(redirect).toHaveBeenCalledWith(
      "/books?filter=liked%2Cgive%2Cexchange",
    );
  });

  it("redirects to /books when no filters are provided", async () => {
    const formData = new FormData();

    await filterBooks(formData);

    expect(redirect).toHaveBeenCalledWith("/books");
  });
});
