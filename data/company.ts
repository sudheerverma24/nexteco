export interface CompanyInfo {
    name: string;
    tagline: string;
    founded: string;
    headquarters: string;
    mission: string;
    about: string;
    values: Array<{ title: string; description: string }>;
    contact: {
        email: string;
        address: string;
        phone: string;
    };
}

export const companyInfoFallback: CompanyInfo = {
    name: "NextECO Solutions",
    tagline: "Building a Greener Digital Future",
    founded: "2022",
    headquarters: "Silicon Valley, CA",
    mission: "To provide high-performance, secure, and privacy-respecting software that empowers users while minimizing digital footprints.",
    about: "NextECO Solutions is a leading software development firm dedicated to creating a holistic ecosystem of tools for modern professionals.",
    values: [
        {
            title: "Security First",
            description: "Every line of code is written with security as the top priority, ensuring your data remains yours."
        },
        {
            title: "Performance Driven",
            description: "Our apps are optimized for speed and efficiency, saving you time and system resources."
        },
        {
            title: "Sustainability",
            description: "We strive to reduce digital waste through efficient algorithms and streamlined workflows."
        }
    ],
    contact: {
        email: "contact@nexteco.example.com",
        address: "123 Tech Lane, Suite 456, Innovation City, CA 94025",
        phone: "+1 (555) 123-4567"
    }
};
