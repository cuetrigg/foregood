import { resolveThemeBySubdomain } from "@/lib/theme/resolve-theme";
import { toThemeStyle } from "@/lib/theme/to-theme-style"; 

export default async function SubdomainLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ subdomain: string }>
}>) {
  const { subdomain } = await params;
  const theme = resolveThemeBySubdomain(subdomain);

  return (
    <div
      data-theme={theme.id}
      style={toThemeStyle(theme)}
      className="min-h-screen bg-base-200 text-base-content"
    >
      {children}
    </div>
  );
}
