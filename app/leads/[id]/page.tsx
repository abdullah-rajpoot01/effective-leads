
import LeadList from "@/components/lead-card/leads";
import { readAllLeads } from "@/components/lead-card/read-leads";
import LeadDetailsPage from "@/components/lead-overview";
interface PageProps {
    params: Promise<{ id: string }>
}

export default async function Home({ params }: PageProps) {
    const leads = await readAllLeads('/content/leads');
    const { id } = await params;

    return (
        <div className="flex flex-col flex-1  bg-zinc-50 font-sans dark:bg-black">
            <LeadDetailsPage id={id} leads={leads} />
        </div>
    );
}
