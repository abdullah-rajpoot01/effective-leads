"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const status = [
  "new", "contacted", "qualified", "detail_shared", "interested", "no_answer", "busy", "call_back_later", "not_interested", "follow_up", "converted", "rejected", "lost"
];
const priorities = ["low", "medium", "high"];

function formatText(text: string) {
  return text
    .replace(/[_/]+/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href="/today-followups">Today Followups</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href="/overdue-followups">Overdue Followups</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      {priorities.map((priority, index) => <NavigationMenuItem key={index}>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <DropdownMenu  >
            <DropdownMenuTrigger asChild>
              <Link className={navigationMenuTriggerStyle({ className: "capitalize" })} href="/#" > {priority}</Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-80 ">
              <DropdownMenuLabel className="capitalize">{priority} Priority Leads</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-2 gap-2 px-3 pb-2">
                {status.map((s, i) => (<DropdownMenuItem key={i}>
                  <Link className="w-full h-full" href={`/leads-status?status=${s}&priority=${priority}`}>
                    {formatText(s)}
                  </Link>
                </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuLink>
      </NavigationMenuItem>)}
    </NavigationMenuList>
  </NavigationMenu>
);
