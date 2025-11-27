import { useState, useEffect } from 'react';
import HabitPlanCard from '../components/habits/HabitCard';
import HabitForm from '../components/habits/HabitForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { habitService } from '../services/habitService';

export default function Habits() {
    const [habitPlan, setHabitPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHabitPlan();
    }, []);

    const fetchHabitPlan = async () => {
        try {
            const plan = await habitService.getHabitPlan();
            setHabitPlan(plan);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching habit plan:', error);
            setLoading(false);
        }
    };

    const handleCreate = async (planData) => {
        try {
            await habitService.createHabitPlan(planData);
            await fetchHabitPlan();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating habit plan:', error);
            alert(error.message);
        }
    };

    const handleUpdate = async (planData) => {
        try {
            await habitService.updateHabitPlan(habitPlan.id, planData);
            await fetchHabitPlan();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating habit plan:', error);
        }
    };

    const handleToggle = async (id, habitIndex) => {
        try {
            await habitService.toggleHabit(id, habitIndex);
            await fetchHabitPlan();
        } catch (error) {
            console.error('Error toggling habit:', error);
        }
    };

    const handleReset = async (id) => {
        if (window.confirm('Reset all habits for tomorrow?')) {
            try {
                await habitService.resetDailyHabits(id);
                await fetchHabitPlan();
            } catch (error) {
                console.error('Error resetting habits:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this habit plan? This action cannot be undone.')) {
            try {
                await habitService.deleteHabitPlan(id);
                await fetchHabitPlan();
            } catch (error) {
                console.error('Error deleting habit plan:', error);
                alert('Failed to delete habit plan: ' + error.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
<<<<<<< HEAD
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                        Daily Habits
                    </h1>
                    <p className="text-gray-400 text-lg">
=======
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Daily Habits
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                        Build consistency with your daily routine
                    </p>
                </div>
            </div>

            {habitPlan ? (
                <HabitPlanCard
                    plan={habitPlan}
                    onEdit={() => setIsModalOpen(true)}
                    onToggle={handleToggle}
                    onReset={handleReset}
                    onDelete={handleDelete}
                />
            ) : (
<<<<<<< HEAD
                <div className="text-center py-16 glass-panel border-dashed border-2 border-white/10">
                    <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 animate-float">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        No Habit Plan Yet
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                        Create your daily habit plan to track your routine and build consistency
                    </p>
                    <Button onClick={() => setIsModalOpen(true)} variant="primary" size="lg" className="shadow-aurora-cyan/20">
=======
                <div className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        No Habit Plan Yet
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Create your daily habit plan to track your routine and build consistency
                    </p>
                    <Button onClick={() => setIsModalOpen(true)} variant="primary" size="lg">
>>>>>>> 35c55d34414a3fbd0930d11bc1970e2a572937be
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Habit Plan
                    </Button>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={habitPlan ? 'Edit Habit Plan' : 'Create Habit Plan'}
            >
                <HabitForm
                    plan={habitPlan}
                    onSubmit={habitPlan ? handleUpdate : handleCreate}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
