import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TiltedImage from "../components/tilt-image";

export default function HeroSection() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleViewDashboard = () => {
        if (currentUser) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    const handleViewGlobalAlerts = () => {
        if (currentUser) {
            navigate("/alerts?tab=global");
        } else {
            navigate("/login");
        }
    };

    return (
        <section className="flex flex-col items-center -mt-18">
            <motion.svg className="absolute -z-10 w-full -mt-40 md:mt-0" width="1440" height="676" viewBox="0 0 1440 676" fill="none" xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5}}
            >
                <rect x="-92" y="-948" width="1624" height="1624" rx="812" fill="url(#a)" />
                <defs>
                    <radialGradient id="a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 428 292)scale(812)">
                        <stop offset=".63" stopColor="#372AAC" stopOpacity="0" />
                        <stop offset="1" stopColor="#372AAC" />
                    </radialGradient>
                </defs>
            </motion.svg>


            
            <motion.a className="flex items-center mt-48 gap-2 "
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                
            </motion.a>
            <motion.h1 className="text-center text-3xl leading-tight sm:text-4xl md:text-5xl md:leading-[68px] lg:text-6xl lg:leading-[70px] mt-4 font-semibold max-w-2xl px-4"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
            >
                Cosmic Watch
            </motion.h1>
            <motion.p className="text-center text-sm sm:text-base max-w-lg mt-2 px-4"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
               Real-time Near-Earth Asteroid Tracking & Risk Analysis Platform
            </motion.p>
            <motion.div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                <button
                    onClick={handleViewDashboard}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition text-white active:scale-95 rounded-lg px-7 h-11"
                >
                    View Live Dashboard
                    <ArrowRight className="size-5" />
                </button>
                <button
                    onClick={handleViewGlobalAlerts}
                    className="border border-slate-400 active:scale-95 hover:bg-white/10 transition rounded-lg px-8 h-11"
                >
                   🌍 View Global Alerts
                </button>
            </motion.div>
            <TiltedImage />
        </section>
    );
}



// import { ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import TiltedImage from "../components/tilt-image";

// export default function HeroSection() {
//     const navigate = useNavigate();
//     const { currentUser } = useAuth();

//     const handleViewDashboard = () => {
//         if (currentUser) {
//             navigate("/dashboard");
//         } else {
//             navigate("/login");
//         }
//     };

//     return (
//         <section className="relative flex flex-col items-center -mt-18 overflow-hidden">

//             {/* 🔥 Background Image (replacing motion.svg) */}
//             <motion.img
//                 src="https://img.freepik.com/premium-photo/comets-falling-toward-earth-massive-destruction_845014-11347.jpg?w=996"
//                 alt="Cosmic Background"
//                 className="absolute -z-10 top-[-200px] w-full max-w-none opacity-70 "
//                 initial={{ opacity: 0, scale: 1.05 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, ease: "easeOut" }}
//             />

//             <motion.a
//                 className="flex items-center mt-48 gap-2"
//                 initial={{ y: -20, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
//             />

//             <motion.h1
//                 className="text-center text-3xl leading-tight sm:text-4xl md:text-5xl md:leading-[68px] lg:text-6xl lg:leading-[70px] mt-4 font-semibold max-w-2xl px-4"
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ type: "spring", stiffness: 240, damping: 70 }}
//             >
//                 Cosmic Watch
//             </motion.h1>

//             <motion.p
//                 className="text-center text-sm sm:text-base max-w-lg mt-2 px-4"
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
//             >
//                 Real-time Near-Earth Asteroid Tracking & Risk Analysis Platform
//             </motion.p>

//             <motion.div
//                 className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4"
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ type: "spring", stiffness: 320, damping: 70 }}
//             >
//                 <button
//                     onClick={handleViewDashboard}
//                     className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition text-white active:scale-95 rounded-lg px-7 h-11"
//                 >
//                     View Live Dashboard
//                     <ArrowRight className="size-5" />
//                 </button>

//                 <button className="border border-slate-400 active:scale-95 hover:bg-white/10 transition rounded-lg px-8 h-11">
//                     Track Asteroids
//                 </button>
//             </motion.div>

//             <TiltedImage />
//         </section>
//     );
// }
