import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8 mb-8">
            <div className="glass-panel px-4 sm:px-6 lg:px-8 rounded-2xl">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-aurora-cyan to-aurora-purple rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center border border-white/10">
                                <svg className="w-6 h-6 text-aurora-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight group-hover:text-aurora-cyan transition-colors duration-300">
                            Life Planner
                        </span>
                    </Link>

                    {/* Navigation Links - Only show when authenticated */}
                    {isAuthenticated && (
                        <div className="hidden md:flex items-center gap-2">
                            <NavLink to="/" icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            }>Dashboard</NavLink>

                            <NavLink to="/goals" icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            }>Goals</NavLink>

                            <NavLink to="/habits" icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }>Habits</NavLink>

                            <NavLink to="/events" icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            }>Events</NavLink>
                        </div>
                    )}

                    {/* User Section */}
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse"></div>
                                <span className="text-sm font-medium text-white">
                                    {user?.name}
                                </span>
                            </div>
                            <Button onClick={handleLogout} variant="outline" size="sm" className="hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="ghost" size="sm" className="text-white hover:text-aurora-cyan">
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="primary" size="sm" className="bg-gradient-to-r from-aurora-cyan to-aurora-blue hover:shadow-lg hover:shadow-aurora-cyan/20">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

function NavLink({ to, children, icon }) {
    return (
        <Link
            to={to}
            className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group overflow-hidden"
        >
            <span className="relative z-10 flex items-center gap-2">
                {icon}
                <span className="font-medium">{children}</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-aurora-cyan/10 to-aurora-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-aurora-cyan to-aurora-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Link>
    );
}
