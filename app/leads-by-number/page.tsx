import { readAllLeads } from "@/components/lead-card/read-leads";
import LeadListByNumber from "@/components/leads-by-number";

export default async function Home() {
    const leads = await readAllLeads('/content/leads');

    return (
        <div className="flex flex-col flex-1  bg-zinc-50 font-sans dark:bg-black">
            <LeadListByNumber leads={leads} />
        </div>
    );
}
