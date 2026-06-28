"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


import { Lead,  } from "@/types/lead";
import LeadCard from "@/components/lead-card/lead-card";
import PaginationWithPrimaryButton from "@/components/pagination-02";
import { searchLeadsByPhone } from "@/lib/filter-fn/search-number";

const ITEMS_PER_PAGE = 3;

export default function LeadListByNumber({
    leads: initialLeads,
}: {
    leads: Lead[];
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page") || "1");

    const phoneNumber = searchParams.get("number") as string | undefined;

    const result = useMemo(() => {
        return searchLeadsByPhone(
            initialLeads,
            phoneNumber,
            page,
            ITEMS_PER_PAGE
        );
    }, [initialLeads, status, page]);

    const { data: leads, totalPages } = result;

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());

        // only update page
        params.set("page", String(newPage));

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    return (
        <div className="min-h-screen px-8 py-12 flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {leads.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                ))}
            </div>

            {leads.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No leads found
                </div>
            )}

            {totalPages > 1 && (
                <PaginationWithPrimaryButton
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}