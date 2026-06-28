import Link from 'next/link'

import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Lead } from '@/types/lead'
import { Edit, Eye } from 'lucide-react'
import { getLastFollowUpInfo } from '@/lib/filter-fn/get-last-followup-date'
type LeadCardProp = {
    lead: Lead
}


const LeadCard = ({ lead }: LeadCardProp) => {
    const { dateString, isToday, isOverdue, isFuture } = getLastFollowUpInfo(lead.followUps);
    // Lead Status - bg and text class as string
    const leadStatusColors = {
        new: "bg-blue-100 text-blue-800",
        contacted: "bg-indigo-100 text-indigo-800",
        qualified: "bg-teal-100 text-teal-800",
        interested: "bg-cyan-100 text-cyan-800",
        "not_interested": "",
        "detail_shared": "",
        "no_answer": "",
        "busy": "",
        "call_back_later": "",
        follow_up: "bg-yellow-100 text-yellow-800",
        converted: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
        lost: "bg-gray-100 text-gray-800"
    };

    // Lead Priority - bg and text class as string
    const leadPriorityColors = {
        low: "bg-gray-100 text-gray-800",
        medium: "bg-yellow-100 text-yellow-800",
        high: "bg-red-100 text-red-800"
    };

    const followUpDateColors = {
        isToday: "text-yellow-600",
        isOverdue: "text-red-600",
        isFuture: "text-green-600"
    };
    return (
        <div className="w-full flex-1 h-full">
            <div className="group relative border rounded-xl bg-card p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ">
                <div>
                    {/* Top Badges Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                        <Badge className={`${leadStatusColors[lead.status] || "bg-primary text-primary-foreground"}`}>
                            {lead.status?.replace("_", " ")}
                        </Badge>
                        <Badge className={`${leadPriorityColors[lead.priority] || "bg-primary text-primary-foreground"}`}>
                            {lead.priority}
                        </Badge>
                        <div className='flex gap-2 items-center justify-center'>
                            <Link href={`/leads/${lead.id}`}>
                                <Eye className='w-6 h-6' /> 
                            </Link>
                            <Link href={`/admin/index.html#/collections/leads/entries/${lead.id}`}>
                                <Edit className='w-4 h-4' />
                            </Link>
                        </div>
                    </div>

                    {/* Account Core Details */}
                    <div className="space-y-1 flex gap-2 overflow-hidden">
                        <Avatar className="size-12">
                            <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>

                            <h3 className="font-bold text-lg tracking-tight text-card-foreground group-hover:text-primary transition-colors truncate ">
                                {lead.name}
                            </h3>
                            {lead.owner && (
                                <p className="text-xs text-muted-foreground font-medium truncate">{lead.owner}</p>
                            )}
                        </div>
                    </div>
                    {
                        dateString &&
                        <div className={`text-sm mt-2 font-medium truncate `}>Last Followup : <span className={`${isFuture && followUpDateColors.isFuture} ${isOverdue && followUpDateColors.isOverdue} ${isToday && followUpDateColors.isToday}`}>{dateString}</span>
                        </div>}

                </div>
            </div>
        </div>
    )
}

export default LeadCard