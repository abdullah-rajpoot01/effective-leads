import { LeadPriority, LeadStatus,Lead } from "@/types/lead";


export interface LeadFilters {
  status?: LeadStatus;
  priority?: LeadPriority;
  city?: string;
}

interface PaginationResult<T> {
  data: T[];
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function getLeadsByFilters(
  leads: Lead[],
  filters: LeadFilters,
  page: number = 1,
  limit: number = 10
): PaginationResult<Lead> {
  // 1. Apply filters
  let filtered = leads;

  if (filters.status) {
    filtered = filtered.filter(
      (lead) => lead.status === filters.status
    );
  }

  if (filters.priority) {
    filtered = filtered.filter(
      (lead) => lead.priority === filters.priority
    );
  }

  if (filters.city) {
    filtered = filtered.filter(
      (lead) =>
        lead.city.toLowerCase() === filters.city!.toLowerCase()
    );
  }

  // 2. Pagination logic
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