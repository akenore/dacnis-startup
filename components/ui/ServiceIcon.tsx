import { Cpu, Globe, Megaphone, Search, ShieldAlert, Smartphone, type LucideProps } from "lucide-react";
import type { ServiceIcon as IconName } from "@/lib/services";

const icons = { Globe, Smartphone, Cpu, ShieldAlert, Search, Megaphone };

export default function ServiceIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden {...props} />;
}
