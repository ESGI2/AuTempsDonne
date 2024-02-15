const ActivityRepository = require('../repositories/activity.repository');

class ActivityController {
    //GET ALL & By ID
    static async getAllActivities(req, res) {
        try {
            const activities = await ActivityRepository.getAllActivities();
            res.status(200).json(activities);
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error recovering activities" });
        }
    }

    static async getActivityById(req, res) {
        try {
            const id = req.params.id;
            const activity = await ActivityRepository.getActivityById(id);
            if (!activity) {
                res.status(404).json({ "Error": "Activity not found" });
            } else {
                res.status(200).json(activity);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error recovering activity" });
        }
    }

    //ADD
    static async addActivity(req, res) {
        try {
            const activity = await ActivityRepository.addActivity(req.body);
            res.status(201).json(activity);
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error creating activity" });
        }
    }
    //UPDATE
    static async updateActivity(req, res) {
        const { id } = req.params;
        const activityData = req.body;
        try {

            const updateActivity = await ActivityRepository.updateActivity(id, activityData);
            if (!updateActivity) {
                res.status(404).json({ "Error": "Activity not found" });

            } else {
                res.status(200).json({ "Message": "Update success", updateActivity});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error updating activity" });
        }
    }
    //DELETE
    static async deleteActivity(req, res) {
        const { id } = req.params;
        try {
            const deleteActivity = await ActivityRepository.deleteActivity(id);
            if (!deleteActivity) {
                res.status(404).json({ "Error": "Activity not found" });
            } else {
                res.status(200).json({ "Message": "Update success", deleteActivity});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Problem deleting activity" });
        }
    }
}

module.exports = ActivityController;