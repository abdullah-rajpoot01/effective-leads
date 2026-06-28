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

const isOverdue = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();

    // reset time to compare only date
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date < today;
};

export function getOverdueFollowUps(
    leads: Lead[],
    page: number = 1,
    limit: number = 10
): PaginationResult<Lead> {
    // 1. filter leads having overdue followups
    const filtered = leads.filter((lead) =>
        lead.followUps?.some(
            (f) => isOverdue(f.date) && f.status !== "completed"
        )
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