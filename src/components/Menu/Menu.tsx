import { useQuery } from "@tanstack/react-query";
import { TransformedMenu } from "../../utils/types/Menu";

export function Menu() {
  function useMenu() {
    return useQuery<TransformedMenu>({
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
    });
  }

  const { data: menu, error, isError, isPending } = useMenu();
  return (
    <main className="mx-auto max-w-7xl p-2">
      <h1 className="mx-auto text-3xl">Menu</h1>
      {isPending && <p data-testid="loading">Loading...</p>}
      {isError && <p>{error.message}</p>}
      {menu?.MenuSections.map((section) => (
        <section key={section.MenuSectionId}>
          <h2>{section.Name}</h2>
        </section>
      ))}
    </main>
  );
}
