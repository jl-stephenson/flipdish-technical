import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import menuData from "@/__mocks__/menuData.json";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Menu } from "../Menu/Menu";

const server = setupServer(
  http.get("https://menus.flipdish.co/prod/16798/*", () => {
    return HttpResponse.json(menuData);
  }),
);

describe("extras dialog", () => {
  let queryClient: QueryClient;

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });

  afterAll(() => server.close());

  describe("button renders", () => {
    beforeEach(() => {
      queryClient = new QueryClient();
      render(
        <QueryClientProvider client={queryClient}>
          <Menu />
        </QueryClientProvider>,
      );
    });

    it("renders add buttons", async () => {
     
        const addButtons = await screen.findAllByText("+");
        expect(addButtons.length).toBeGreaterThan(0);
     
    });

    it("opens dialog when clicked", async () => {
      const addButtons = await screen.findAllByText("+");
      fireEvent.click(addButtons[0]);
      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });
    });
  });
});
