"use client"
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { Crown } from "lucide-react";
import Link from "next/link";
import DatePickerDialog from "./select-date";
import PhoneSearchDialog from "./lead-by-number";

const Navbar = () => {
  return (
    <nav className="h-16 border-b bg-background sticky top-0 z-50">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={"/"} className="flex items-center gap-2 text-foreground font-bold"><Crown className="size-6" /> Capture My Leads</Link>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-3">

            <PhoneSearchDialog />
            <DatePickerDialog />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
