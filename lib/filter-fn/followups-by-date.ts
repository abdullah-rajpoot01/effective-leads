import { Lead } from "@/types/lead";

interface PaginationResult<T> {
    data: T[];
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

const matchDate = (dateStr: string, targetDate: string) => {
    const d1 = new Date(dateStr).toISOString().split("T")[0];
    return d1 === targetDate;
};

export function getLeadsByFollowUpDate(
    leads: Lead[],
    date?: string, // format: "2026-06-26"
    page: number = 1,
    limit: number = 10
): PaginationResult<Lead> {
    if (!date) {
        return {
            data: [],
            page,
            limit,
            totalPages: 0,
            totalRecords: 0,
            hasNextPage: false,
            hasPreviousPage: false
        }
    }
    // 1. filter leads by followups matching date
    const filtered = leads.filter((lead) =>
        lead.followUps?.some((f) => matchDate(f.date, date))
    );

    // 2. pagination
    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const data = filtered.slice(startIndex, endIndex);

    return {
        data,
        page,
        limit,
        totalRecords,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };
}