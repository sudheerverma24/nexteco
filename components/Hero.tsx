import HeroClient from "./HeroClient";
import { getCompanyInfo } from "@/lib/data-fetchers";

export default async function Hero() {
    const company = await getCompanyInfo();

    return (
        <HeroClient
            content={{
                name: company.name,
                tagline: company.tagline,
                mission: company.mission
            }}
        />
    );
}
