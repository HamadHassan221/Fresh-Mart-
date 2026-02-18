// 'use client'
// import React, { useContext } from 'react'
// import {
//     NavigationMenu,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
// } from "@/components/ui/navigation-menu"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import Link from 'next/link'
// import { UserIcon } from 'lucide-react'
// import { Badge } from "@/components/ui/badge"
// import { CartContext } from '@/components/Context/CartContext'
// import { signOut, useSession } from 'next-auth/react'

// export default function Navbar() {
//     const { cartData } = useContext(CartContext);
//     const session = useSession()

//     return (
//         <>
//             <nav className='py-3 bg-gray-100 text-2xl font-semibold px-25 sticky top-0 z-50 shadow-sm'>
//                 <div className='container mx-auto'>
//                     <div className='flex justify-between items-center '>
//                         <Link href="/"><h1 className='w-fit text-2xl  uppercase'>shop mart</h1></Link>
//                         <div>
//                             <NavigationMenu>
//                                 <NavigationMenuList>
//                                     <NavigationMenuItem>
//                                         <NavigationMenuLink asChild>
//                                             <Link href="/">Home</Link>
//                                         </NavigationMenuLink>
//                                     </NavigationMenuItem>
//                                     <NavigationMenuItem>
//                                         <NavigationMenuLink asChild>
//                                             <Link href="/Products">Products</Link>
//                                         </NavigationMenuLink>
//                                     </NavigationMenuItem>
//                                     <NavigationMenuItem>
//                                         <NavigationMenuLink asChild>
//                                             <Link href="/Brands">Brands</Link>
//                                         </NavigationMenuLink>
//                                     </NavigationMenuItem>
//                                     <NavigationMenuItem>
//                                         <NavigationMenuLink asChild>
//                                             <Link href="/Categories">Categories</Link>
//                                         </NavigationMenuLink>
//                                     </NavigationMenuItem>
//                                 </NavigationMenuList>
//                             </NavigationMenu>
//                         </div>

//                         <div className='flex justify-center items-center gap-1 font-semibold'>
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger className='border-0' asChild>
//                                     <button suppressHydrationWarning className="group inline-flex h-9 w-max items-center justify-center rounded-md  text-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50 outline-none transition-[color,box-shadow] "><UserIcon /></button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent className="w-56" align="start">
//                                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                                     <DropdownMenuGroup>
//                                         {session.status == 'unauthenticated' &&
//                                             <div>
//                                                 <Link href="/Login"><DropdownMenuItem>Login</DropdownMenuItem></Link>
//                                                 <Link href="/Register"><DropdownMenuItem>Register</DropdownMenuItem></Link>
//                                             </div>
//                                         }
//                                         {
//                                             session.status == 'authenticated' &&
//                                             <Link href="/allorders"><DropdownMenuItem>My Orders</DropdownMenuItem></Link>
//                                         }
//                                     </DropdownMenuGroup>
//                                     {
//                                         session.status == 'authenticated' &&
//                                         <div>
//                                             <DropdownMenuSeparator />
//                                             <DropdownMenuItem className='focus:bg-white cursor-pointer' onClick={()=> signOut()}>
//                                                 Log out
//                                             </DropdownMenuItem>
//                                         </div>
//                                     }
//                                 </DropdownMenuContent>
//                             </DropdownMenu>

//                             {
//                                 session.status == 'authenticated' &&
//                                 <NavigationMenu>

//                                     <NavigationMenuList>
//                                         <NavigationMenuItem>
//                                             <NavigationMenuLink asChild>
//                                                 <Link href="/Cart" className='relative'>
//                                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
//                                                     </svg>
//                                                     <Badge className="h-4 min-w-5 absolute top-0 end-0 rounded-full px-1 font-mono tabular-nums">
//                                                         {cartData?.numOfCartItems}
//                                                     </Badge>
//                                                 </Link>
//                                             </NavigationMenuLink>
//                                         </NavigationMenuItem>
//                                     </NavigationMenuList>

//                                 </NavigationMenu>
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     )

// }


'use client'
import React, { useContext, useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { UserIcon, MenuIcon, XIcon, ShoppingCartIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { CartContext } from '@/components/Context/CartContext'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
    const { cartData } = useContext(CartContext);
    const session = useSession()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/Products", label: "Products" },
        { href: "/Brands", label: "Brands" },
        { href: "/Categories", label: "Categories" },
    ]

    return (
        <>
            <nav className='py-3 bg-gray-100 text-2xl font-semibold px-4 lg:px-25 sticky top-0 z-50 shadow-sm'>
                <div className='container mx-auto'>
                    <div className='flex justify-between items-center'>
                        {/* Logo */}
                        <Link href="/">
                            <h1 className='text-xl lg:text-2xl uppercase'>shop mart</h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className='hidden lg:block'>
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {navLinks.map((link) => (
                                        <NavigationMenuItem key={link.href}>
                                            <NavigationMenuLink asChild>
                                                <Link 
                                                    href={link.href}
                                                    className='px-4 py-2 hover:text-gray-600 transition-colors'
                                                >
                                                    {link.label}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        {/* Right side icons */}
                        <div className='flex items-center gap-2 lg:gap-4 font-semibold'>
                            {/* User Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className='border-0' asChild>
                                    <button 
                                        suppressHydrationWarning 
                                        className="inline-flex h-9 w-9 lg:w-max items-center justify-center rounded-md text-black p-2 lg:px-4 lg:py-2 text-sm font-medium hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50 outline-none transition-colors"
                                    >
                                        <UserIcon className='h-5 w-5' />
                                        <span className='hidden lg:inline ml-2'>Account</span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="start">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                        {session.status == 'unauthenticated' ? (
                                            <div>
                                                <Link href="/Login">
                                                    <DropdownMenuItem>Login</DropdownMenuItem>
                                                </Link>
                                                <Link href="/Register">
                                                    <DropdownMenuItem>Register</DropdownMenuItem>
                                                </Link>
                                            </div>
                                        ) : (
                                            <Link href="/allorders">
                                                <DropdownMenuItem>My Orders</DropdownMenuItem>
                                            </Link>
                                        )}
                                    </DropdownMenuGroup>
                                    {session.status == 'authenticated' && (
                                        <div>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem 
                                                className='focus:bg-white cursor-pointer' 
                                                onClick={() => signOut()}
                                            >
                                                Log out
                                            </DropdownMenuItem>
                                        </div>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Cart Icon */}
                            {session.status == 'authenticated' && (
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink asChild>
                                                <Link href="/Cart" className='relative p-2'>
                                                    <ShoppingCartIcon className="h-6 w-6" />
                                                    <Badge className="h-4 min-w-5 absolute -top-1 -right-1 rounded-full px-1 font-mono tabular-nums text-xs">
                                                        {cartData?.numOfCartItems || 0}
                                                    </Badge>
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            )}

                            {/* Mobile Menu Button */}
                            <button 
                                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-black hover:text-white transition-colors"
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? (
                                    <XIcon className="h-6 w-6" />
                                ) : (
                                    <MenuIcon className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <div className={`lg:hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                        <div className="py-4 space-y-2 border-t mt-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block py-2 px-4 text-lg hover:bg-gray-200 rounded-md transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}