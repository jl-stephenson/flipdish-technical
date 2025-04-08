import { DisplayItem, Extra } from "@/utils/types/Menu";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { formatPrice } from "@/utils/utils";
import { Button } from "./ui/button";

type ExtrasDialogProps = {
  extras: Extra[];
  displayItem: DisplayItem;
  maxSelectCount: number;
};

export function ExtrasDialog({
  extras,
  displayItem,
  maxSelectCount,
}: ExtrasDialogProps) {
  return (
    <DialogContent>
      <form>
        <DialogHeader>
          <DialogTitle>Add {displayItem.Name}</DialogTitle>
        </DialogHeader>
        <div className="mb-4 grid gap-4">
          <h4 className="font-medium">Extras:</h4>
          <div className="grid gap-2">
            {extras.length > 0 ? (
              extras.map((extra) => (
                <div
                  className="flex items-center justify-between"
                  key={extra.Id}
                >
                  <label htmlFor={extra.Name}>
                    {`${extra.Name} (+${formatPrice(extra.Price)})`}
                  </label>
                  <input id={extra.Name} type="checkbox" />
                </div>
              ))
            ) : (
              <p>
                Add {displayItem.Name} to cart for{" "}
                {formatPrice(displayItem.Price)}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" type="submit">
            Add for {formatPrice(displayItem.Price)}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
