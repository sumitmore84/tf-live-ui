"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

const bookingSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    fromCity: z.string().min(2, { message: "From city is required." }),
    days: z.coerce.number().min(1, { message: "At least 1 day is required." }),
    travelers: z.coerce.number().min(1, { message: "At least 1 traveler is required." }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
    packageTitle: string;
    price: number;
    toCity: string;
    eventType: string;
    onCancel: () => void;
}

export function BookingForm({ packageTitle, price, toCity, eventType, onCancel }: BookingFormProps) {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [estimatedPrice, setEstimatedPrice] = useState(0);
    const [userEmail, setUserEmail] = useState("");

    const form = useForm({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            name: "",
            email: user?.email || "",
            phone: "",
            fromCity: "",
            days: 3,
            travelers: 2,
        },
    });

    useEffect(() => {
        if (user?.email) {
            form.setValue("email", user.email);
        }
    }, [user, form]);

    // Two-step booking submission
    async function onSubmit(values: BookingFormValues) {
        setIsSubmitting(true);

        try {
            // Step 1: Call itinerary API to get estimated price
            const itineraryResponse = await fetch("http://localhost:8080/api/ai/itinerary/json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fromCity: values.fromCity,
                    toCity: toCity,
                    days: Number(values.days),
                    travelers: Number(values.travelers),
                    eventType: eventType,
                }),
            });

            if (!itineraryResponse.ok) {
                throw new Error("Failed to fetch itinerary");
            }

            const itineraryData = await itineraryResponse.json();
            const estimatedPrice = itineraryData.summary.grandTotal;

            // Step 2: Submit booking with estimated price
            const bookingResponse = await fetch(
                `http://localhost:8080/api/user/submit?estimatedPrice=${estimatedPrice}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        phone: values.phone,
                        fromCity: values.fromCity,
                        toCity: toCity,
                        days: Number(values.days),
                        travelers: Number(values.travelers),
                        eventType: eventType,
                    }),
                }
            );

            if (!bookingResponse.ok) {
                throw new Error("Failed to submit booking");
            }

            // Success!
            setEstimatedPrice(estimatedPrice);
            setUserEmail(values.email);
            setShowSuccessDialog(true);
            setIsSubmitting(false);
        } catch (error) {
            console.error("Booking error:", error);
            alert(`Booking failed: ${error instanceof Error ? error.message : "Unknown error"}`);
            setIsSubmitting(false);
        }
    }

    const handleSuccessClose = () => {
        setShowSuccessDialog(false);
        onCancel();
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-lg mb-4 border border-slate-100">
                        <p className="text-sm text-muted-foreground">Booking for:</p>
                        <p className="font-semibold text-[#2D3142]">{packageTitle}</p>
                        <p className="text-sm font-medium text-gray-600 mt-1">
                            Destination: {toCity} | Event: {eventType}
                        </p>
                    </div>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage className="absolute -bottom-5 left-0 text-[10px]" />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@example.com" {...field} readOnly className="bg-gray-50" />
                                </FormControl>
                                <FormMessage className="absolute -bottom-5 left-0 text-[10px]" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="+91 98765 43210" {...field} />
                                </FormControl>
                                <FormMessage className="absolute -bottom-5 left-0 text-[10px]" />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="fromCity"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>From City</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Delhi, Mumbai, Bangalore" {...field} />
                            </FormControl>
                            <FormMessage className="absolute -bottom-5 left-0 text-[10px]" />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="days"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>Number of Days</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        {...field}
                                        value={field.value as number}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage className="absolute -bottom-5 left-0 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="travelers"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>Number of Travelers</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        {...field}
                                        value={field.value as number}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage className="absolute -bottom-5 left-0 text-xs" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="pt-2 flex gap-3">
                    <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 bg-[#F17235] hover:bg-[#d9622d]"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Confirm Booking"}
                    </Button>
                </div>
            </form>
        </Form>

        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-2xl">
                        <span className="text-3xl">🎉</span>
                        Booking Successful!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3 pt-4">
                        <p className="text-base text-gray-700">
                            Your travel request has been submitted successfully.
                        </p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Estimated Price:</span>
                                <span className="text-xl font-bold text-green-600">
                                    ₹{estimatedPrice.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Contact Email:</span>
                                <span className="text-sm font-medium text-gray-800">{userEmail}</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 pt-2">
                            We will contact you shortly to confirm your booking details.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction 
                        onClick={handleSuccessClose}
                        className="bg-[#F17235] hover:bg-[#d9622d]"
                    >
                        Close
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
    );
}