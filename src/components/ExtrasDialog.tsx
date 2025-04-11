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
import { useEffect, useMemo, useState } from "react";
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
  const { handleSubmit, register, reset, watch } = useForm();

  function onSubmit() {
    toast.success(`${displayItem.Name} added to basket`);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const watchedExtras = watch("extras");

  const selectedExtras = extras.filter((extra) =>
    watchedExtras ? watchedExtras[extra.Id] === true : false,
  );

  const hasReachedMaximum = selectedExtras.length === maxSelectCount;
  const extrasTotalPrice = useMemo(() => {
    return selectedExtras.reduce((total, extra) => {
      return total + (extra.Price || 0);
    }, 0);
  }, [selectedExtras]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="col-start-3 col-end-4 h-24 w-full self-center">
        <DialogTrigger asChild>
          <Button className="h-full rounded-md text-xl hover:cursor-pointer hover:bg-slate-600">
            +<span className="sr-only">Add to basket</span>
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent aria-describedby="dialog-description">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="mb-2">Add {displayItem.Name}</DialogTitle>
            <p id="dialog-description" className="sr-only">
              Select up to {maxSelectCount} extras for {displayItem.Name}
            </p>
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
                      disabled={hasReachedMaximum && !watchedExtras?.[extra.Id]}
                    />
                  </div>
                ))
              ) : (
                <p>
                  Add {displayItem.Name} to cart for{" "}
                  {formatPrice(displayItem.Price)}
                </p>
              )}
              {hasReachedMaximum && (
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
              Add for {formatPrice(displayItem.Price + extrasTotalPrice)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
