
import { readAllLeads } from "@/components/lead-card/read-leads";
import ToDayFollowupsLeads from "@/components/today-followups";

export default async function Home() {
  const leads = await readAllLeads('/content/leads');

  return (
    <div className="flex flex-col flex-1  bg-zinc-50 font-sans dark:bg-black">
      <ToDayFollowupsLeads leads={leads} />
    </div>
  );
}
