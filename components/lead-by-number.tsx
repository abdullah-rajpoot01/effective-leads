"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { PhoneIcon, SearchIcon } from "lucide-react"

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
    phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits")
        .regex(/^\+?[\d\s-]+$/, "Please enter a valid phone number")
        .transform((val) => val.replace(/[\s-]/g, "")) // Remove spaces and dashes
})

type PhoneSearchType = z.input<typeof formSchema>

type PhoneSearchDialogProps = {
    defaultPhoneNumber?: string
}

export default function PhoneSearchDialog({ defaultPhoneNumber }: PhoneSearchDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: defaultPhoneNumber || "",
        },
    })

    async function onSubmit(data: PhoneSearchType) {
        setIsSubmitting(true)
        setApiError(null)

        // Clean the phone number (remove spaces, dashes, etc.)
        const cleanPhoneNumber = data.phoneNumber.replace(/[\s-]/g, "")

        try {
            router.push(`/leads-by-number/?number=${cleanPhoneNumber}`)
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
                <Button className="gap-2" variant={"outline"}>
                    <PhoneIcon className="h-4 w-4" />
                    Search by Phone
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0!">
                <VisuallyHidden>
                    <DialogTitle>Search Leads by Phone Number</DialogTitle>
                </VisuallyHidden>
                <Card className="w-full sm:max-w-md border-0 shadow-none">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle>Search Leads by Phone Number</CardTitle>
                            <CardDescription>
                                Enter a phone number to find leads associated with it.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup>
                                <Controller
                                    name="phoneNumber"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="phone-input">
                                                Phone Number
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="phone-input"
                                                type="tel"
                                                placeholder="+1 234 567 8900"
                                                aria-invalid={fieldState.invalid}
                                                autoComplete="tel"
                                            />
                                            <FieldDescription>
                                                Enter a phone number to view all leads associated with it.
                                                You can use formats like: 1234567890, 123-456-7890, or +1 234 567 8900
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