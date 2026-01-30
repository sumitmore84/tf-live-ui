"use client"

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackButton() {
    const router = useRouter();

    return (
        <Button 
            variant="secondary" 
            size="sm" 
            className="gap-2 cursor-pointer"
            onClick={() => router.back()}
        >
            <ArrowLeft className="h-4 w-4" /> Back to List
        </Button>
    );
}
