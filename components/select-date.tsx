"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a valid date")
})

type DatePickerType = z.input<typeof formSchema>

type DatePickerDialogProps = {
    defaultDate?: string
}

export default function DatePickerDialog({ defaultDate }: DatePickerDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: defaultDate || "",
        },
    })

    async function onSubmit(data: DatePickerType) {
        setIsSubmitting(true)
        setApiError(null)

        try {
            router.push(`/leads-by-followup-date?date=${data.date}`)
            setIsOpen(false)
            form.reset()
        } catch (error) {
            console.error("Navigation error:", error)
            setApiError("Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open)
            if (!open) {
                setApiError(null)
                form.reset()
            }
        }}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Search by Date
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0!">
                <VisuallyHidden>
                    <DialogTitle>Select Date for Follow-ups</DialogTitle>
                </VisuallyHidden>
                <Card className="w-full sm:max-w-md border-0 shadow-none">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle>View Follow-ups by Date</CardTitle>
                            <CardDescription>
                                Select a date to view all follow-ups scheduled for that day.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup>
                                <Controller
                                    name="date"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="date-input">
                                                Select Date
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="date-input"
                                                type="date"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            <FieldDescription>
                                                Choose a date to see all follow-ups scheduled for that day.
                                            </FieldDescription>
                                            {fieldState.invalid && (
                                                <FieldError className="my-2" errors={[fieldState.error]} />
                                            )}
                                            {apiError && (
                                                <div className="my-2 rounded-md bg-destructive/15 p-2.5 text-xs text-center text-destructive font-medium border border-destructive/20">
                                                    {apiError}
                                                </div>
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </CardContent>
                        <CardFooter>
                            <div className="flex gap-2 w-full">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 gap-2"
                                >
                                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                                    <SearchIcon className="h-4 w-4" />
                                    Search
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </DialogContent>
        </Dialog>
    )
}