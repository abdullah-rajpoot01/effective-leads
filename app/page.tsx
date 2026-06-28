
import LeadList from "@/components/lead-card/leads";
import { readAllLeads } from "@/components/lead-card/read-leads";
import { Lead } from "@/types/lead";

export default async function Home() {
  const leads = await readAllLeads('/content/leads');

  return (
    <div className="flex flex-col flex-1  bg-zinc-50 font-sans dark:bg-black">
      <LeadList leads={leads} />
    </div>
  );
}
