const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFound } = require("../errors");

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.id });
    return res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};

const getJob = async (req, res) => {
    const {
        user: { id: userId },
        params: { id: jobId },
    } = req;

    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) throw new NotFound(`No job found for id: ${jobId}`);
    return res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
    req.body.createdBy = req.user.id;
    const job = await Job.create(req.body);
    return res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
    const {
        user: { id: userId },
        params: { id: jobId },
    } = req;

    const job = await Job.findOneAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { runValidators: true, returnDocument: "after" },
    );

    if (!job) throw new NotFound(`No job to edit for id: ${jobId}`);

    return res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
    const {
        user: { id: userId },
        params: { id: jobId },
    } = req;

    const deletedJob = await Job.findOneAndDelete({
        _id: jobId,
        createdBy: userId,
    });

    if (!deletedJob) throw new NotFound(`No job to delete for id: ${jobId}`);
    return res.status(StatusCodes.OK).json({ deletedJob });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
