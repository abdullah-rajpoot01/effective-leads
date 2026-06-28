
import { readAllLeads } from "@/components/lead-card/read-leads";
import LeadListForCity from "@/components/leads-by-city";

export default async function Home() {
  const leads = await readAllLeads('/content/leads');

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <LeadListForCity leads={leads} />
    </div>
  );
}
