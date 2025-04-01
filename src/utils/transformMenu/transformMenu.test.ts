import { describe, expect, it } from "vitest";
import {
  transformMenu,
  transformMenuItem,
  transformMenuSection,
} from "./transformMenu";
import menuData from "../../__mocks__/menuData.json";
import { DisplayItem, TransformedMenuItem } from "../types/Menu";

describe("transform menu", () => {
  const transformedMenu = transformMenu(menuData);
  it("returns a menu object with properties MenuId & MenuSections", () => {
    expect(Object.keys(transformedMenu)).toHaveLength(2);
    expect(transformedMenu).toHaveProperty("MenuId");
    expect(transformedMenu).toHaveProperty("MenuSections");
  });

  it("preserves the MenuId", () => {
    expect(transformedMenu.MenuId).toEqual(menuData.MenuId);
  });
});

describe("transform menu section", () => {
  const transformedSections = menuData.MenuSections.map(transformMenuSection);

  it("returns correct number of sections", () => {
    expect(transformedSections).toHaveLength(menuData.MenuSections.length);
  });

  it("returns section objects with the correct properties", () => {
    const firstSection = transformedSections[0];

    expect(firstSection).toMatchObject({
      MenuSectionId: expect.any(Number),
      Name: expect.any(String),
      Description: expect.toBeStringOrNull(),
      ImageName: expect.toBeStringOrNull(),
      ImageUrl: expect.toBeStringOrNull(),
      MenuItems: expect.arrayContaining<TransformedMenuItem>([
        expect.objectContaining({
          ItemId: expect.any(Number),
          DisplayItems: expect.arrayContaining<DisplayItem>([
            expect.objectContaining({
              Id: expect.any(Number),
              Name: expect.any(String),
              Description: expect.toBeStringOrNull(),
              Price: expect.any(Number),
              ImageUrl: expect.toBeStringOrNull(),
              MaxSelectCount: expect.any(Number),
            }),
          ]),
          Extras: [],
        }),
      ]),
    });
  });
});

describe("transform menu item", () => {
  const transformedItem = transformMenuItem(
    menuData.MenuSections[1].MenuItems[0],
  );

  it("returns one display item and no extras if option set is empty", () => {
    expect(transformedItem.DisplayItems).toHaveLength(1);
    expect(transformedItem.Extras).toHaveLength(0);
    expect(transformedItem.ItemId).toEqual(
      menuData.MenuSections[1].MenuItems[0].MenuItemId,
    );
  });
});
