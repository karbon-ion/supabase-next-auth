import AdminHeader from "@/components/ui/user-header";
import React from "react";


export default function HomeLayout({children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return (
        <>
        <AdminHeader />
            {children}
        </>
    )
}