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
        return await Activity.update(activityData, { where: { id } });
    }

    //DELETE
    static async deleteActivity(id) {
        return await Activity.destroy({ where: { id } });
    }
}

module.exports = ActivityRepository;
