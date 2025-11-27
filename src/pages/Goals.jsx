import { useState, useEffect } from 'react';
import GoalCard from '../components/goals/GoalCard';
import GoalForm from '../components/goals/GoalForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { goalService } from '../services/goalService';

export default function Goals() {
    const [goals, setGoals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const data = await goalService.getGoals();
            setGoals(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching goals:', error);
            setLoading(false);
        }
    };

    const handleCreate = async (goalData) => {
        try {
            await goalService.createGoal(goalData);
            await fetchGoals();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating goal:', error);
        }
    };

    const handleUpdate = async (goalData) => {
        try {
            await goalService.updateGoal(editingGoal.id, { ...editingGoal, ...goalData });
            await fetchGoals();
            setIsModalOpen(false);
            setEditingGoal(null);
        } catch (error) {
            console.error('Error updating goal:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this goal and all its tasks?')) {
            try {
                await goalService.deleteGoal(id);
                await fetchGoals();
            } catch (error) {
                console.error('Error deleting goal:', error);
            }
        }
    };

    const handleEdit = (goal) => {
        setEditingGoal(goal);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingGoal(null);
    };

    // Task operations
    const handleAddTask = async (goalId, taskTitle) => {
        try {
            await goalService.addTask(goalId, taskTitle);
            await fetchGoals();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleToggleTask = async (goalId, taskId) => {
        try {
            await goalService.toggleTask(goalId, taskId);
            await fetchGoals();
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };

    const handleUpdateTask = async (goalId, taskId, updates) => {
        try {
            await goalService.updateTask(goalId, taskId, updates);
            await fetchGoals();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (goalId, taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await goalService.deleteTask(goalId, taskId);
                await fetchGoals();
            } catch (error) {
                console.error('Error deleting task:', error);
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
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                        My Goals
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Track your goals and tasks in one place
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} size="lg" className="shadow-aurora-cyan/20">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Goal
                </Button>
            </div>

            <div className="space-y-6">
                {goals.length > 0 ? (
                    goals.map(goal => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onAddTask={handleAddTask}
                            onToggleTask={handleToggleTask}
                            onUpdateTask={handleUpdateTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    ))
                ) : (
                    <div className="text-center py-16 glass-panel border-dashed border-2 border-white/10">
                        <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 animate-float">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No goals yet</h3>
                        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                            Create your first goal to get started on your journey to success!
                        </p>
                        <Button onClick={() => setIsModalOpen(true)} variant="primary" size="lg">
                            Create Your First Goal
                        </Button>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingGoal ? 'Edit Goal' : 'Create New Goal'}
            >
                <GoalForm
                    goal={editingGoal}
                    onSubmit={editingGoal ? handleUpdate : handleCreate}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
}
