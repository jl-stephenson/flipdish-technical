import { describe, expect, it } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { Menu } from "./Menu";
import menuData from "../../__mocks__/menuData.json";

const server = setupServer(
  http.get("https://menus.flipdish.co/prod/16798/*", () => {
    return HttpResponse.json(menuData);
  }),
);

describe("menu render", () => {
  let queryClient: QueryClient;

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });
  afterAll(() => server.close());

  describe("successful API response", () => {
    beforeEach(() => {
      queryClient = new QueryClient();
      render(
        <QueryClientProvider client={queryClient}>
          <Menu />
        </QueryClientProvider>,
      );
    });

    it("renders menu header", () => {
      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        "Menu",
      );
    });

    it("renders loading state correctly", async () => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      await waitFor(() =>
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument(),
      );
    });

    it("shows section titles", async () => {
      const sectionTitles = await waitFor(() =>
        screen.getAllByRole("heading", { level: 2 }),
      );
      expect(sectionTitles).toHaveLength(menuData.MenuSections.length);
      expect(sectionTitles[0].textContent).toBe(menuData.MenuSections[0].Name);
    });
  });

  describe("API error", () => {
    beforeEach(() => {
      server.use(
        http.get("https://menus.flipdish.co/prod/16798/*", () => {
          return new HttpResponse(null, { status: 502 });
        }),
      );

      queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });
      render(
        <QueryClientProvider client={queryClient}>
          <Menu />
        </QueryClientProvider>,
      );
    });

    it("shows error message when API fails", async () => {
      await waitFor(() =>
        expect(
          screen.getByText("Network Connection Failed"),
        ).toBeInTheDocument(),
      );
    });

    it("renders loading state correctly", async () => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      await waitFor(() =>
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument(),
      );
    });
  });
});
