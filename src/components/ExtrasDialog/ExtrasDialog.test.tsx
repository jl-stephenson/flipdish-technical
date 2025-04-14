import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import menuData from "@/__mocks__/menuData.json";
import { Menu } from "../Menu/Menu";
import { transformMenu } from "@/utils/transformMenu/transformMenu";

const server = setupServer(
  http.get("https://menus.flipdish.co/prod/16798/*", () => {
    return HttpResponse.json(menuData);
  }),
);

const mockMenu = transformMenu(menuData);
const mockDisplayItems = mockMenu.MenuSections.map(
  (section) => section.MenuItems,
)
  .map((item) => item.map((item) => item.DisplayItems))
  .flat(2);

const mockExtras = mockMenu.MenuSections.map((section) => section.MenuItems)
  .map((item) => item.map((item) => item.Extras))
  .flat(2);

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
      expect(addButtons).toHaveLength(mockDisplayItems.length);
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
