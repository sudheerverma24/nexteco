import AboutSectionClient from "./AboutSectionClient";
import { getCompanyInfo } from "@/lib/data-fetchers";

export default async function AboutSection() {
    const info = await getCompanyInfo();

    return <AboutSectionClient info={info} />;
}
