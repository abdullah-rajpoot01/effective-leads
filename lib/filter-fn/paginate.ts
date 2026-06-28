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

export function paginateLeads(
  leads: Lead[],
  page: number = 1,
  limit: number = 10
): PaginationResult<Lead> {
  const totalRecords = leads.length;
  const totalPages = Math.ceil(totalRecords / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const data = leads.slice(startIndex, endIndex);

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