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

const isToday = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();

    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    );
};

export function getLeadsWithTodayFollowUps(
    leads: Lead[],
    page: number = 1,
    limit: number = 10
): PaginationResult<Lead> {
    // 1. Filter leads that have at least one followUp for today
    const filtered = leads.filter((lead) =>
        lead.followUps?.some((f) => isToday(f.date))
    );

    // 2. Pagination
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