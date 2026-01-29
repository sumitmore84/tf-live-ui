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
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

const bookingSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    guests: z.coerce.number().min(1, { message: "At least 1 guest is required." }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
    packageTitle: string;
    price: number;
    onCancel: () => void;
}

export function BookingForm({ packageTitle, price, onCancel }: BookingFormProps) {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            name: "",
            email: user?.email || "",
            phone: "",
            guests: 1,
        },
    });

    useEffect(() => {
        if (user?.email) {
            form.setValue("email", user.email);
        }
    }, [user, form]);

    // Mock Booking Form submission.
    // TODO: Send the data to server
    function onSubmit(values: BookingFormValues) {
        setIsSubmitting(true);

        setTimeout(() => {
            const bookingData = {
                ...values,
                package: packageTitle,
                totalPrice: values.guests * price,
                bookingDate: new Date().toISOString(),
            };

            console.log("Booking Submitted:", bookingData);
            alert(`Booking confirmed for ${values.guests} guests! Total: ₹${bookingData.totalPrice}`);
            setIsSubmitting(false);
            onCancel();
        }, 1500);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg mb-4 border border-slate-100">
                    <p className="text-sm text-muted-foreground">Booking for:</p>
                    <p className="font-semibold text-[#2D3142]">{packageTitle}</p>
                    <p className="text-sm font-medium text-[#F17235] mt-1">
                        ₹{price.toLocaleString("en-IN")} <span className="text-gray-400 font-normal">/ person</span>
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
                    name="guests"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>Number of Guests</FormLabel>
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
    );
}