import { Lead } from "@/types/lead";

export function getLeadById(
  leads: Lead[],
  id: string
): Lead | null {
  const lead = leads.find((l) => l.id === id);

  return lead || null;
}