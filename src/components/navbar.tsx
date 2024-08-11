
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { buttonVariants } from "@/components/ui/button"

import { GitHubLogoIcon } from "@radix-ui/react-icons"

export const Navbar = () => {
    return (
        <header className="sticky border-b-[1px] top-0 z-40 w-full bg-background">
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="container h-12 px-4 w-screen flex justify-between">
                    <NavigationMenuItem className="font-bold flex">
                        <a
                            rel="noreferrer noopener"
                            href="/"
                            className="font-bold text-xl flex text-primary"
                        >
                            Fraudalyzer
                        </a>
                    </NavigationMenuItem>

                        <nav className="flex gap-2">
                            <a
                                rel="noreferrer noopener"
                                href="https://github.com/mattrmcg/Fraudalyzer"
                                target="_blank"
                                className={`${buttonVariants({ variant: "ghost" })}`}
                            >
                                <GitHubLogoIcon className="w-8 h-8" />
                            </a>
                        </nav>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
};