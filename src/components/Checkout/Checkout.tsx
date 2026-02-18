'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getUserToken } from "@/getUserToken/getUserToken"
import { CheckoutSessionI } from "@/Interfaces/Interfaces"
import { useEffect, useRef } from "react"


export default function Checkout({ cartId }: { cartId: string }) {

    const cityinput = useRef<HTMLInputElement | null>(null);
    const phoneinput = useRef<HTMLInputElement | null>(null);
    const detailsinput = useRef<HTMLInputElement | null>(null);

    async function handleCheckout(cartId: string, address: any) {
        try {
            const response = await fetch(`/api/checkout/${cartId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    shippingAddress: {
                        details: address.details,
                        phone: address.phone,
                        city: address.city,
                    },
                }),
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("❌ Checkout failed:", response.status, text);
                return;
            }

            const data = await response.json();
            console.log("✅ Checkout success:", data);

            if (data.session?.url) {
                window.location.href = data.session.url;
            }
        } catch (error) {
            console.error("❌ Checkout error:", error);
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-black text-white w-full py-2 rounded-lg mb-3 cursor-pointer hover:text-white hover:bg-gray-900 transition">Checkout</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Checkout</DialogTitle>
                        <DialogDescription>
                            Please, Enter the required informations to make the checkout.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input ref={phoneinput} id="phone" name="phone" defaultValue="" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="city">City</Label>
                            <Input ref={cityinput} id="city" name="city" defaultValue="" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="details">Details</Label>
                            <Input ref={detailsinput} id="details" name="details" defaultValue="" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer">Cash</Button>
                        <Button
                            type="button"  // ✅ don't submit the whole form here
                            className="cursor-pointer"
                            onClick={() =>
                                handleCheckout(cartId, {
                                    details: detailsinput.current?.value || "",
                                    phone: phoneinput.current?.value || "",
                                    city: cityinput.current?.value || "",
                                })
                            }
                        >
                            Visa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}