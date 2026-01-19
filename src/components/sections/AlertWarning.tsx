import { useMemo } from "react";
import { motion } from "framer-motion";
import { getIcon, DEFAULT_ICON } from "@/lib/icons";
import type { AlertWarning as AlertWarningType } from "@/types/AutoAuctionShipping.types";
import type { LucideIcon } from "lucide-react";

interface AlertWarningProps {
  data?: AlertWarningType;
}

/**
 * Alert Warning Component
 * Displays an alert/warning section with icon, title, and message
 */
const AlertWarning = ({ data }: AlertWarningProps) => {
  const alertData = useMemo(() => {
    return {
      iconName: data?.icon_name || "clock",
      title: data?.title || "",
      message: data?.message || "",
    };
  }, [data]);

  const AlertIcon = useMemo(
    () => (getIcon(alertData.iconName) as LucideIcon),
    [alertData.iconName]
  );

  return (
    <section className="py-12 bg-accent/10" aria-labelledby="alert-warning-heading">
      <div className="container mx-auto px-4">
        <div className="flex items-start gap-4 max-w-4xl mx-auto">
          <AlertIcon className="w-8 h-8 text-accent flex-shrink-0 mt-1" aria-hidden="true" />
          <div>
            {alertData.title ? (
              <h3 id="alert-warning-heading" className="text-lg font-semibold mb-2">
                {alertData.title}
              </h3>
            ) : null}
            {alertData.message ? (
              <p className="text-muted-foreground">
                {alertData.message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertWarning;
