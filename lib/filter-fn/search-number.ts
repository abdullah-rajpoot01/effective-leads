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

export function searchLeadsByPhone(
    leads: Lead[],
    phone?: string,
    page: number = 1,
    limit: number = 10
): PaginationResult<Lead> {
    if (!phone) {
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
    const normalizedPhone = phone.replace(/\s+/g, "").trim();

    // 1. Filter leads by mobiles OR whatsapp
    const filtered = leads.filter((lead) => {
        const inMobiles = lead.mobiles?.some((m) =>
            m.replace(/\s+/g, "").includes(normalizedPhone)
        );

        const inWhatsapp =
            lead.whatsapp &&
            lead.whatsapp.replace(/\s+/g, "").includes(normalizedPhone);

        return inMobiles || inWhatsapp;
    });

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