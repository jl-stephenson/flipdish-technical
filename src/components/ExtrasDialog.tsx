import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import { formatPrice } from "@/utils/utils";
import { DisplayItem, Extra } from "@/utils/types/Menu";

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
  const { register, reset, watch } = useForm();

  function notify(event) {
    event.preventDefault();
    toast.success(`${displayItem.Name} added to basket`);
    setIsOpen(false);
  }

  useMemo(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const formData = watch();

  const selectedExtras = extras.filter((extra) =>
    formData.extras ? formData.extras[extra.Id] === true : false,
  );

  console.log(formData);
  console.log(selectedExtras);

  const isMaximum = selectedExtras.length === maxSelectCount;

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
                    <input
                      {...register(`extras.${extra.Id}`)}
                      id={extra.Name}
                      type="checkbox"
                    />
                  </div>
                ))
              ) : (
                <p>
                  Add {displayItem.Name} to cart for{" "}
                  {formatPrice(displayItem.Price)}
                </p>
              )}
              {isMaximum && (
                <p className="text-red-700">
                  Maximum number of extras selected
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
