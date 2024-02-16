const Activity = require('../models/activity.model');

class ActivityRepository {
    //GET ALL & By ID
    static async getAllActivities() {
        try {
            const activity = await Activity.findAll();
            return activity;
        } catch (error) {
            console.error("Activity error:", error);
            throw error;
        }
    }

    static async getActivityById(id) {
        try {
            const activity = await Activity.findByPk(id);
            return activity;
        } catch (error) {
            console.error("Activity error:", error);
            throw error;
        }
    }

    static async addActivity(activityData) {
        try {
            const activity = await Activity.create(activityData);
            return activity;
        } catch (error) {
            console.error("Activity error:", error);
            throw error;
        }
    }

    static async updateActivity(id, activityData) {
        try {
            const activity = await Activity.findByPk(id);
            if (!activity) {
                throw new Error('Activity not found');
            }
            await activity.update(activityData);
            return activity;
        } catch (error) {
            console.error("Activity error:", error);
            throw error;
        }
    }

    static async deleteActivity(id) {
        try {
            const activity = await Activity.findByPk(id);
            if (!activity) {
                throw new Error('Activity not found');
            }
            await activity.destroy();
            return { message: 'Activity deleted successfully' };
        } catch (error) {
            console.error("Activity error:", error);
            throw error;
        }
    }
}

module.exports = ActivityRepository;
