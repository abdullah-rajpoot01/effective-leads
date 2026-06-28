import { notFound } from "next/navigation"
import Link from "next/link"
import {
    ArrowLeft, Phone, Mail, MessageSquare, Briefcase,
    Globe, Calendar, Clock, FileText,
    ChevronDown, CheckCircle2, XCircle,
    User,
    LucidePhoneCall
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

import { WhatsApp } from "@/components/social-icons"
import { getLeadById } from "@/lib/filter-fn/get-lead"
import { formatDate, getLastFollowUpInfo } from "@/lib/filter-fn/get-last-followup-date"
import { Lead } from "@/types/lead"

interface PageProps {
    id: string,
    leads: Lead[]
}


export default async function LeadDetailsPage({ id, leads }: PageProps) {
    const lead = getLeadById(leads, id)

    if (!lead) {
        notFound()
    }
    const { dateString, isToday, isOverdue, isFuture } = getLastFollowUpInfo(lead.followUps);


    const followUpDateColors = {
        isToday: "text-yellow-600",
        isOverdue: "text-red-600",
        isFuture: "text-green-600"
    };
    // Follow-up status configurations
    const followUpStatusMap: Record<string, { class: string; icon: React.ReactNode }> = {
        pending: { class: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: <Clock className="h-3 w-3" /> },
        completed: { class: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: <CheckCircle2 className="h-3 w-3" /> },
        missed: { class: "bg-destructive/10 text-destructive border-destructive/20", icon: <XCircle className="h-3 w-3" /> },
    }

    return (
        <div className="p-6 w-full mx-auto space-y-6">

            {/* Top Navigation Row */}
            <div className="flex flex-col md:flex-row items-center justify-between">
                <Link href="/">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Directory
                    </Button>
                </Link>
            </div>

            {/* Header Profile Summary Panel */}
            <div className="border rounded-xl p-6 bg-card shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-2xl font-bold tracking-tight">{lead.name}</h1>
                        <Badge variant="outline" className={`capitalize bg-gray-100 text-gray-800`}>
                            {lead.priority} Priority
                        </Badge>
                        <Badge className={`capitalize bg-gray-100 text-gray-800`}>
                            {lead.status?.replace("_", " ")}
                        </Badge>
                        <Badge>
                            <Link href={`http://localhost:3000//?id=${lead.id}`} target="_blank">
                                Demo Link
                            </Link>
                        </Badge>
                    </div>
                    {lead.owner && (
                        <p className="text-muted-foreground font-medium flex items-center gap-1.5 text-sm">
                            <User className="h-4 w-4 text-muted-foreground/60" /> {lead.owner}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Core Contact Matrix Info */}
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Contact Points</CardTitle>
                            <CardDescription>Direct reach credentials.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground block">Mobiles </span>
                                <div className="flex items-center gap-2 font-medium">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    {lead.mobiles.map((mobile, index) => <a href={`tel:${mobile}`} key={index}>{mobile}</a>)}
                                </div>
                            </div>

                            {lead.whatsapp && (
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground block">WhatsApp</span>
                                    <div className="flex items-center gap-2 font-medium">
                                        <WhatsApp className="h-4 w-4 text-emerald-500" />
                                        <a
                                            href={`https://wa.me/${lead.whatsapp}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {lead.whatsapp}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {lead.email && (
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground block">Email</span>
                                    <div className="flex items-center gap-2 font-medium">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="break-all">{lead.email}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Acquisition Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground block">Lead Source</span>
                                <div className="flex items-center gap-2 capitalize font-medium">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <span>{lead.source || "Unknown origin"}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground block">Primary Conversation Channel</span>
                                <div className="flex items-center gap-2 capitalize font-medium">
                                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    <span>{lead.conversationChannel || "Not specified"}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Interaction Records (Notes & Followups with Collapsibles) */}
                <div className="md:col-span-2 space-y-6">

                    {/* FOLLOW UPS SECTION */}
                    <Collapsible defaultOpen className="w-full border rounded-xl bg-card shadow-sm overflow-hidden group/collapsible">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full flex items-center justify-between p-5 h-auto hover:bg-muted/40 rounded-none border-b">
                                <div className="flex items-start flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <h2 className="font-bold text-base tracking-tight">Scheduled Follow-Ups</h2>

                                        <Badge variant="secondary" className="ml-1 text-xs">{lead.followUps?.length || 0}</Badge>
                                    </div>
                                    {dateString && <p className={`text-xs pl-6 ${isFuture && followUpDateColors.isFuture} ${isOverdue && followUpDateColors.isOverdue} ${isToday && followUpDateColors.isToday} font-medium truncate `}>Last Followup : {dateString}</p>}
                                </div>
                                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />

                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="divide-y divide-border bg-card">
                            {(!lead.followUps || lead.followUps.length === 0) ? (
                                <p className="p-6 text-sm text-muted-foreground text-center">No follow-ups recorded for this lead account.</p>
                            ) : (
                                lead.followUps.map((follow: any) => (
                                    <div key={follow._id} className="p-4 hover:bg-muted/10 transition-colors space-y-3">
                                        <div className="flex items-center justify-between gap-2 flex-wrap">
                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                <span className="px-2 py-0.5 rounded bg-muted text-xs capitalize font-semibold border">
                                                    {follow.type}
                                                </span>
                                                <span className="text-muted-foreground text-xs">via</span>
                                                <span className="capitalize text-xs text-foreground font-semibold">
                                                    {follow.channel}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className={`gap-1.5 text-xs py-0.5 capitalize ${followUpStatusMap[follow.status]?.class || "bg-muted"}`}>
                                                    {followUpStatusMap[follow.status]?.icon}
                                                    {follow.status}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>Target: {formatDate(new Date(follow.date).toLocaleDateString())}</span>
                                            </div>
                                            {follow.completedAt && (
                                                <div>Done: {formatDate(new Date(follow.completedAt).toLocaleDateString())}</div>
                                            )}
                                        </div>
                                        {follow.note && (
                                            <p className="text-sm bg-muted/40 border p-3 rounded-lg text-muted-foreground">
                                                {follow.note}
                                            </p>
                                        )}


                                    </div>
                                ))
                            )}
                        </CollapsibleContent>
                    </Collapsible>

                    {/* NOTES SECTION */}
                    <Collapsible defaultOpen className="w-full border rounded-xl bg-card shadow-sm overflow-hidden group/collapsible">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full flex items-center justify-between p-5 h-auto hover:bg-muted/40 rounded-none border-b">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                    <h2 className="font-bold text-base tracking-tight">Timeline History Notes</h2>
                                    <Badge variant="secondary" className="ml-1 text-xs">{lead.notes?.length || 0}</Badge>
                                </div>
                                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="divide-y divide-border bg-card">
                            {(!lead.notes || lead.notes.length === 0) ? (
                                <p className="p-6 text-sm text-muted-foreground text-center">No historic timeline entries attached.</p>
                            ) : (
                                lead.notes.map((note: any) => (
                                    <div key={note._id} className="p-4 hover:bg-muted/10 transition-colors space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground/80 justify-end">
                                                <span>Created At : {formatDate(new Date(note.createdAt).toLocaleDateString())}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-card-foreground leading-relaxed whitespace-pre-wrap">
                                            {note.text}
                                        </p>
                                    </div>
                                ))
                            )}
                        </CollapsibleContent>
                    </Collapsible>

                </div>
            </div>
        </div>
    )
}