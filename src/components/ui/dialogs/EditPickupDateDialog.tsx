import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface EditPickupDateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDate: Date;
  schedulingNotes: string;
  onSave: (date: Date, notes: string) => void;
}

export function EditPickupDateDialog({
  open,
  onOpenChange,
  currentDate,
  schedulingNotes,
  onSave,
}: EditPickupDateDialogProps) {
  const [date, setDate] = useState<Date>(currentDate);
  const [notes, setNotes] = useState(schedulingNotes);

  const handleSave = () => {
    onSave(date, notes);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          <div className="flex items-center gap-4">
             <DialogTitle className="text-xl font-bold">Earliest Pickup Date</DialogTitle>
            <div className=" w-6 h-6 rounded-full bg-muted flex items-center gap-4">
              <CalendarIcon className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Edit your earliest pickup date</p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-muted/50 rounded-xl p-4 flex flex-col items-start justify-start">
            <h4 className="font-medium text-foreground mb-2">When would you like your vehicle picked up?</h4>
            <a href="#" className="text-sm text-primary underline">Weather & Holiday Disclaimer</a>
            
            <div className="mt-4 w-3/4  border border-primary rounded-lg overflow-hidden">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                disabled={(date) => date < new Date()}
                className={cn("p-3 pointer-events-auto")}
              />
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-4">
            <Label htmlFor="scheduling-notes" className="font-medium text-foreground">
              Any scheduling preferences or concerns?
            </Label>
            <Textarea
              id="scheduling-notes"
              placeholder="Optional..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 min-h-[80px]"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
