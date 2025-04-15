import { useQuery } from "@tanstack/react-query";
import { transformMenu } from "../../utils/transformMenu/transformMenu";
import { formatPrice } from "../../utils/utils";
import { ExtrasDialog } from "../ExtrasDialog/ExtrasDialog";

export function Menu() {
  function useMenu() {
    return useQuery({
      queryKey: ["menu"],
      queryFn: async () => {
        const response = await fetch(
          "https://menus.flipdish.co/prod/16798/e6220da2-c34a-4ea2-bb51-a3e190fc5f08.json",
        );
        if (!response.ok) {
          throw new Error("Network Connection Failed");
        }
        return response.json();
      },
      select: transformMenu,
    });
  }

  const { data: menu, error, isError, isPending } = useMenu();

  return (
    <main className="mx-auto mt-6 max-w-7xl space-y-8 p-2">
      <h1 className="mx-auto text-center text-4xl">Menu</h1>
      {isPending && (
        <p className="mx-auto" data-testid="loading">
          Loading...
        </p>
      )}
      {isError && <p className="mx-auto">{error.message}</p>}
      {menu?.MenuSections.map((section) => (
        <section key={section.MenuSectionId} className="space-y-8">
          <header className="flex items-center gap-4">
            <h2 className="text-3xl">{section.Name}</h2>
            <div className="h-[1px] w-full bg-slate-400"></div>
            {section.ImageUrl && (
              <img
                src={section.ImageUrl}
                alt={section.Name}
                className="aspect-square w-full max-w-16 rounded-3xl object-cover object-center"
              />
            )}
          </header>
          <ul className="my-4 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
            {section.MenuItems.map((item) =>
              item.DisplayItems.map((displayItem) => (
                <li
                  key={displayItem.Id}
                  className="grid h-[175px] grid-cols-[1fr_100px_40px] gap-2 rounded-md border-[1.5px] border-slate-300 bg-white px-3 py-4 shadow-slate-400 hover:shadow-2xl"
                >
                  <div className="col-start-1 col-end-2 space-y-2 self-center">
                    <h4>{displayItem.Name}</h4>
                    <p className="text-slate-500">
                      {formatPrice(displayItem.Price)}
                    </p>
                    <p className="mt-3">{displayItem.Description}</p>
                  </div>

                  <div className="col-start-2 col-end-3 self-center">
                    {displayItem.ImageUrl && (
                      <img
                        src={displayItem.ImageUrl}
                        alt={displayItem.Name}
                        className="aspect-square h-24 w-24 rounded-lg object-cover object-center"
                      />
                    )}
                  </div>
                  <ExtrasDialog
                    extras={item.Extras}
                    displayItem={displayItem}
                    maxSelectCount={item.MaxSelectCount}
                  />
                </li>
              )),
            )}
          </ul>
        </section>
      ))}
    </main>
  );
}
