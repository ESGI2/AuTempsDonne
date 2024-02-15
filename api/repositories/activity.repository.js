const Activity = require('../models/activity.model');

class ActivityRepository {
    //GET ALL & By ID
    static async getAllActivities() {
        return await Activity.findAll();
    }

    static async getActivityById(id) {
        return await Activity.findByPk(id);
    }

    //ADD
    static async addActivity(activityData) {
        return await Activity.create(activityData);
    }

    //UPDATE
    static async updateActivity(id, activityData) {
        const activity = await Activity.findByPk(id);
        return await activity.update(activityData);
    }

    //DELETE
    static async deleteActivity(id) {
        const activity = await Activity.findByPk(id);
        return await activity.destroy();
    }
}

module.exports = ActivityRepository;
