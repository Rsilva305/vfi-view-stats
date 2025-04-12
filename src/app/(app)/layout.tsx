"use client";

import NavigationWrapper from "@/components/layout/NavigationWrapper";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <NavigationWrapper>
      {children}
    </NavigationWrapper>
  );
} 