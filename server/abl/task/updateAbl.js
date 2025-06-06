const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const taskDao = require("../../dao/task-dao.js");
const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string", maxLength: 100 },
    categoryId: { type: "string" },
    time: { type: "string", format: "date-time" },
    description: { type: "string", maxLength: 500 },
  },
  required: ["name","categoryId"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let task = req.body;

    // validate input
    const valid = ajv.validate(schema, task);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // validate time
    if (new Date(task.time) <= new Date()) {
      res.status(400).json({
        code: "invalidTime",
        message: `invalid time`,
        validationError: ajv.errors,
      });
      return;
    }

    // update task in database
    const updatedTask = taskDao.update(task);

    // check if categoryId exists
    const category = categoryDao.get(updatedTask.categoryId);
    if (!category) {
      res.status(400).json({
        code: "categoryDoesNotExist",
        message: `Category with id ${updatedTask.categoryId} does not exist`,
        validationError: ajv.errors,
      });
      return;
    }

    if (!updatedTask) {
      res.status(404).json({
        code: "taskNotFound",
        message: `Task ${task.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    updatedTask.category = category;
    res.json(updatedTask);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;