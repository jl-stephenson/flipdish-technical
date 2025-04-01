import { MenuType } from "../types/Menu";

export function transformMenu(data: MenuType) {
  return {
    MenuId: data.MenuId,
    MenuSections: data.MenuSections.map((section) => {
        return {
            MenuSectionId: section.MenuSectionId,
            
        }
    })
  };
}
