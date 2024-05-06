const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFound } = require("../errors");

const getAllJobs = async (req, res) => {
    res.send("getAllJobs");
};

const getJob = async (req, res) => {
    res.send("getJob");
};

const createJob = async (req, res) => {
    req.body.createdBy = req.user.id;
    const job = await Job.create(req.body);
    return res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
    res.send("updateJob");
};

const deleteJob = async (req, res) => {
    res.send("deleteJob");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
