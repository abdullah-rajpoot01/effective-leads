
import { readAllLeads } from "@/components/lead-card/read-leads";
import OverdueFollowupsLeads from "@/components/overdue-followups";

export default async function Home() {
  const leads = await readAllLeads('/content/leads');

  return (
    <div className="flex flex-col flex-1  bg-zinc-50 font-sans dark:bg-black">
      <OverdueFollowupsLeads leads={leads} />
    </div>
  );
}
