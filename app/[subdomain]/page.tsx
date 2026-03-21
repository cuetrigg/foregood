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
        <div className="w-full">
            <div className="flex flex-col w-full mb-10 sm:flex-row">
                <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                    <div className="relative h-full ml-0 mr-0 sm:mr-10">
                        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-primary rounded-lg"></span>
                        <div className="relative h-full p-5 bg-white border-2 border-primary rounded-lg">
                            <EmployeeTable data={data} />
                        </div>
                    </div>
                </div>
                <div className="w-full h-96 sm:w-1/2">
                    <div className="relative h-full ml-0 md:mr-10">
                        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-secondary rounded-lg"></span>
                        <div className="relative h-full p-5 bg-white border-2 border-secondary rounded-lg overflow-y-auto">
                            <BusinessUnitTable data={data} />
                        </div>
                    </div>
                </div>
            </div>
            {
                data.userSettings.custom_employee_category_required &&
                (
                    <div className="flex flex-col w-full mb-5 sm:flex-row">
                        <div className="flex-1">
                        </div>
                        <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div className="relative h-full ml-0 mr-0 sm:mr-10">
                                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 rounded-lg bg-gradient-to-r from-primary to-secondary"></span>
                                <div className="relative h-full p-5 bg-white border-2 border-primary rounded-lg">
                            	    <CustomCategoryTable data={data} />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                        </div>
                    </div>
                )
            }
        </div>
    </div>
    </>
  );
}
