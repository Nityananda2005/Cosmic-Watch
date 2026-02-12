import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/section-title";

export default function Carousul() {
    const [isHovered, setIsHovered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [className, setClassName] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    const sectionData = [
        {
            title: "Bennu",
            description: "101955 Bennu is a small, carbon-rich, near-Earth rubble-pile asteroid",
            image: "https://newscenter.lbl.gov/wp-content/uploads/2025/01/Newscenter_Featured_1025x685px_53141331019_49ae905cb2_o.jpg",
            align: "object-center",
        },
        {
            title: "2020 VT4",
            description: "2020 VT4 is a tiny near-Earth asteroid that passed 370 km (230 mi) above Earth's surface on 13 November 2020 at 17:20 UTC",
            image: "https://www.pennlive.com/resizer/v2/67MQIM53DZFORCIRNELK7E46E4.jpg?auth=930f75ae622a1bec6adc5743bb244d1a22e1d1d263e293df1e8e99a40d61b690&width=1280&smart=true&quality=90",
            align: "object-right",
        },
        {
            title: "3I/ATLAS",
            description: "3I/ATLAS, also known as C/2025 N1 (ATLAS) and previously as A11pl3Z, is an interstellar comet",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/3I-ATLAS_noirlab2532b.jpg/330px-3I-ATLAS_noirlab2532b.jpg",
            align: "object-center",
        },
    ];

    // Detect small screens (mobile + tablet)
    useEffect(() => {
        const handleResize = () => {
            // Treat width < 1024px as "no hover" layout (phones + tablets)
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Auto-rotate only on desktop / larger screens
    useEffect(() => {
        if (isHovered || isMobile) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % sectionData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isHovered, isMobile, sectionData.length]);

    return (
        <section className="flex flex-col items-center" id="creations">
            <SectionTitle
                title="Our latest Data"
                description="Explore live asteroid data, analyze risks, and track Near-Earth Objects through an interactive dashboard built for researchers and enthusiasts."
            />

            <div
                className={`w-full max-w-5xl mt-18 mx-auto gap-4 ${
                    isMobile ? "flex flex-col" : "flex items-center h-100"
                }`}
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isMobile && setIsHovered(false)}
            >
                {sectionData.map((data, index) => {
                    const isActive = index === activeIndex;

                    const cardBaseClasses = "relative group rounded-xl overflow-hidden";
                    const desktopClasses =
                        "flex-grow h-[400px] " +
                        (isHovered && className
                            ? "hover:w-full w-56"
                            : isActive
                            ? "w-full"
                            : "w-56") +
                        ` ${className} ${!className ? "pointer-events-none" : ""}`;
                    const mobileClasses = "w-full h-[260px]";

                    const overlayDesktopClasses =
                        isHovered && className
                            ? "opacity-0 group-hover:opacity-100"
                            : isActive
                            ? "opacity-100"
                            : "opacity-0";

                    const overlayMobileClasses = isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none";

                    return (
                        <motion.div
                            key={data.title}
                            className={`${cardBaseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
                            initial={{ y: 150, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            onAnimationComplete={() => setClassName("transition-all duration-500")}
                            transition={{
                                delay: `${index * 0.15}`,
                                type: "spring",
                                stiffness: 320,
                                damping: 70,
                                mass: 1,
                            }}
                            onClick={() => {
                                if (isMobile) {
                                    setActiveIndex((prev) => (prev === index ? -1 : index));
                                }
                            }}
                        >
                            <img
                                className={`h-full w-full object-cover ${data.align}`}
                                src={data.image}
                                alt={data.title}
                            />
                            <div
                                className={`absolute inset-0 flex flex-col justify-end p-6 sm:p-10 text-white bg-black/50 transition-all duration-300 ${
                                    isMobile ? overlayMobileClasses : overlayDesktopClasses
                                }`}
                            >
                                <h1 className="text-2xl sm:text-3xl font-semibold">{data.title}</h1>
                                <p className="text-sm mt-2">{data.description}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
