import { useQuery } from "@tanstack/react-query";

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
    });
  }

  const { data: menu, error, isError, isPending } = useMenu();
  return <></>;
}
