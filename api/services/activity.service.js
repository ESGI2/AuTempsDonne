const ActivityRepository = require('../repositories/activity.repository');

class ActivityService {
    static async getAllActivities() {
        return await ActivityRepository.getAllActivities();
    }

    static async getActivityById(id) {
        return await ActivityRepository.getActivityById(id);
    }

    static async addActivity(activityData) {
        return await ActivityRepository.addActivity(activityData);
    }

    static async updateActivity(id, activityData) {
        return await ActivityRepository.updateActivity(id, activityData);
    }

    static async deleteActivity(id) {
        return await ActivityRepository.deleteActivity(id);
    }
}

module.exports = ActivityService;
