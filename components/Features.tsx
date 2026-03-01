import FeaturesClient from "./FeaturesClient";
import { getCompanyInfo } from "@/lib/data-fetchers";

export default async function Features() {
    const info = await getCompanyInfo();

    return (
        <FeaturesClient
            info={info.values}
            name={info.name}
        />
    );
}
