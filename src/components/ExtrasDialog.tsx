import { DisplayItem, Extra } from "@/utils/types/Menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { formatPrice } from "@/utils/utils";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  function notify(event) {
    event.preventDefault();
    toast.success(`${displayItem.Name} added to basket`);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="col-start-2 col-end-3 h-full w-full rounded-md hover:cursor-pointer hover:bg-slate-600">
          +<span className="sr-only">Add to basket</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={notify}>
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
            <Button
              type="submit"
              className="w-full hover:cursor-pointer hover:bg-slate-600"
            >
              Add for {formatPrice(displayItem.Price)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
