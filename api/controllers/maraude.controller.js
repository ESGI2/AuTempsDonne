const MaraudeRepository = require('../repositories/maraude.repository');
const express = require('express');
const {del} = require("express/lib/application");
const e = require("express");

class MaraudeController{

    //GET ALL & By ID
    static async getAllMaraudes(req, res){
        try {
            const maraude = await MaraudeRepository.getAllMaraude();
            res.status(200).json(maraude);
        }catch (error){
            console.error(error);
            res.status(500).json({"Error": "Error recovering maraude"})
        }
    }
    static async getMaraudeById(req, res){
        try {

            const {id} = req.params;
            const maraude = await MaraudeRepository.getMaraudeById(id);
            if(!maraude){
                return res.status(404).json({"Error": "Maraude not found"})
            }else{
                return res.status(200).json(maraude);
            }
        }catch (error){
            console.error(error);
            res.status(500).json({"Error": "Error recovering maraude"})
        }
    }

    //ADD
    static async addMaraude(req, res){
        try{
            const maraudeData = req.body;
            const newMaraude = await MaraudeRepository.addMaraude(maraudeData);
            res.status(201).json(newMaraude);
        }catch (error){
            console.error(error);
            res.status(500).json({"Error": "Error creating maraude"});
        }
    }

    //UPDATE
    static async updateMaraude(req, res){
        const { id } = req.params;
        const maraudeData = req.body;
        try{
            const updateMaraude = await MaraudeRepository.updateMaraude(id, maraudeData);
            if (!updateMaraude){
                res.status(404).json({"Error":"Maraude not found"});
            }else {
                res.status(200).json(updateMaraude);
            }
        }catch (error){
            console.error(error);
            res.status(500).json({"Error":"Error updating maraude"});
        }
    }

    //DELETE
    static async deleteMaraude(req, res){
        const { id } = req.params;
        try {
            const deleteMaraude = await MaraudeRepository.deleteMaraude(id);
            if (!deleteMaraude){
                res.status(404).json({"Error":"Maraude not found"});
            }else{
                res.status(200).json(deleteMaraude);
            }
        }catch (error){
            console.error(error);
            res.status(500).json({"Error":"Error deleting maraude"})
        }
    }
}
module.exports = MaraudeController;

