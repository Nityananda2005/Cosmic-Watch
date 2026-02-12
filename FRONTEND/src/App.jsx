import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import Features from "./sections/why-cosmic-watch";
import HeroSection from "./sections/hero-section";
import Carousul from "./sections/feature-preview";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AsteroidDetails from "./pages/AsteroidDetails";
import Watchlist from "./pages/Watchlist";
import Alerts from "./pages/Alerts";
import RecentHistory from "./pages/RecentHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

const isDashboardAppRoute = (path) =>
    path === "/dashboard" || path === "/watchlist" || path === "/alerts" || path === "/recent-history" || path.startsWith("/asteroid/");

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};

export default function Page() {
    const location = useLocation();
    const isAuthPage = location.pathname === "/auth";
    const hideNavbar = isAuthPage || isDashboardAppRoute(location.pathname);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [location.pathname]);

    return (
        <>
            {!isAuthPage && <LenisScroll />}
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route
                    path="/"
                    element={
                        <main className="px-6 md:px-16 lg:px-24 xl:px-32">
                            <HeroSection />
                            <Carousul />
                            <Features />
                        </main>
                    }
                />
                <Route path="/about" element={<About />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/asteroid/:id"
                    element={
                        <ProtectedRoute>
                            <AsteroidDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/watchlist"
                    element={
                        <ProtectedRoute>
                            <Watchlist />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/alerts"
                    element={
                        <ProtectedRoute>
                            <Alerts />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/recent-history"
                    element={
                        <ProtectedRoute>
                            <RecentHistory />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            {!isAuthPage && !isDashboardAppRoute(location.pathname) && <Footer />}
        </>
    );
}