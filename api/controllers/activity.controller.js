const ActivityService = require('../services/activity.service');

class ActivityController {
    // GET ALL & By ID
    static async getAllActivities(req, res) {
        try {
            const activities = await ActivityService.getAllActivities();
            res.status(200).json(activities);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Error recovering activities"});
        }
    }

    static async getActivityById(req, res) {
        try {
            const id = req.params.id;
            const activity = await ActivityService.getActivityById(id);
            if (!activity) {
                res.status(404).json({error: "Activity not found"});
            } else {
                res.status(200).json(activity);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Error recovering activity"});
        }
    }

    // ADD
    static async addActivity(req, res) {
        try {
            const {activity_name, description, people_needed} = req.body;

            if (!activity_name || people_needed === undefined) {
                return res.status(400).json({error: "Missing required fields"});
            }

            if (people_needed <= 0) {
                return res.status(400).json({error: "People needed must be greater than 0."});
            } else {
                const activity = await ActivityService.addActivity({activity_name, description, people_needed});
                res.status(201).json(activity);
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Error creating activity"});
        }
    }

    // UPDATE
    static async updateActivity(req, res) {
        try {
            const {id} = req.params;
            const {activity_name, description, people_needed} = req.body;
            const activityToUpdate = await ActivityService.getActivityById(id);
            const updatedData = {};

            if (!activityToUpdate) {
                return res.status(404).json({error: "Activity not found."});
            }

            if (activity_name) updatedData.activity_name = activity_name;
            if (description) updatedData.description = description;
            if (people_needed <= 0) {
                return res.status(400).json({error: "The number of people needed must be greater than 0."});
            } else {
                updatedData.people_needed = people_needed;
            }

            await ActivityService.updateActivity(id, updatedData);
            res.status(200).json({message: "Activity updated successfully", updatedData});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Error updating activity"});
        }
    }

    // DELETE
    static async deleteActivity(req, res) {
        const {id} = req.params;
        try {
            const deleteActivity = await ActivityService.deleteActivity(id);
            if (!deleteActivity) {
                res.status(404).json({error: "Activity not found"});
            } else {
                res.status(200).json({message: "Activity deleted successfully"});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Problem deleting activity"});
        }
    }
}

module.exports = ActivityController;
