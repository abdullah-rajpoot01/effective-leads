"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import LeadCard from "./lead-card";

import { Lead } from "@/types/lead";
import { paginateLeads } from "@/lib/filter-fn/paginate";
import PaginationWithPrimaryButton from "../pagination-02";

const ITEMS_PER_PAGE = 3;

export default function LeadList({
  leads: initialLeads,
}: {
  leads: Lead[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");

  const result = useMemo(() => {
    return paginateLeads(initialLeads, page, ITEMS_PER_PAGE);
  }, [initialLeads, page]);

  const { data: leads, totalPages } = result;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen px-8 py-12">
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