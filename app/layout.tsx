import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Discord",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // 로그인 직후 무한루프 에러가 발생할 경우 컴퓨터 시간을 서버 시간과 동기화시켜주면 해결된다.
    // https://github.com/clerk/javascript/issues/1436
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} storageKey="discord-theme">
                        <SignedOut>
                            <RedirectToSignIn />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                            {children}
                        </SignedIn>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
