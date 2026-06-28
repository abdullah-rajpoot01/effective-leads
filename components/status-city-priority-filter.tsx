"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ALL = "all";


const cityOptions = ["multan", "lahore", "karachi"];


export default function CityFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const city = searchParams.get("city") || ALL;

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === ALL) {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        // reset pagination when filters change
        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    return (
        <Select  value={city}
            onValueChange={(val) => updateQuery("city", val)} defaultValue="apple">
            <SelectTrigger className="w-44 ">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent className="capitalize">
                <SelectGroup className="[&_div:focus]:bg-primary [&_div:focus_*]:text-white!">
                    <SelectItem value={ALL}>All Cities</SelectItem>
                    {cityOptions.map((c) => (
                        <SelectItem key={c} value={c} >
                            {c}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
