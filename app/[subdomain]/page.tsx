import LeaderboardLayout from "@/components/leaderboardlayout";
import Navbar from "@/components/navbar";
import BusinessUnitTable from "@/components/tables/businessunitstable";
import CustomCategoryTable from "@/components/tables/customcategorytable";
import EmployeeTable from "@/components/tables/employeetable";
import { rootApiDomain } from "@/lib/utils";
import { AppConfig } from "@/types/config";

export default async function SubdomainPage({ params }: {
  params: Promise<{ subdomain: string }>
}) {
  const { subdomain } = await params;
  const response = await fetch(`https://${subdomain}.${rootApiDomain}/api/app/config`);

  if (!response.ok) {
    throw new Error("Failed to load config");
  }

  const data: AppConfig = await response.json();
  
  return (
    <>
      <Navbar data={data} />
      <div className="container relative flex flex-col justify-between h-full max-w-4/5 px-10 mx-auto xl:px-0 mt-5">
        <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">Leaderboard</h2>
        <p className="mb-12 text-lg text-gray-500">Here are our competing candidates.</p>
    		<LeaderboardLayout
    			businessUnitsTable={<BusinessUnitTable data={data} />}
    			customCategoryTable={
    				data.userSettings.custom_employee_category_required ? (
    					<CustomCategoryTable data={data} />
    				) : undefined
    			}
    			employeeTable={<EmployeeTable data={data} />}
    		/>
      </div>
    </>
  );
}
