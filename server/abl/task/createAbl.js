const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const taskDao = require("../../dao/task-dao.js");
const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", maxLength: 100 },
    categoryId: { type: "string" },
    time: { type: "string", format: "date-time" },
    description: { type: "string", maxLength: 500 },
  },
  required: ["name","categoryId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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
        message: `The time must be in the future`,
        validationError: ajv.errors,
      });
      return;
    }

    // check if categoryId exists
    const category = categoryDao.get(task.categoryId);

    if (!category) {
      res.status(400).json({
        code: "categoryDoesNotExist",
        message: `category with id ${task.categoryId} does not exist`,
        validationError: ajv.errors,
      });
      return;
    }

    // store task to persistent storage
    task.state = "ongoing";
    task = taskDao.create(task);
    task.category = category;

    // return properly filled dtoOut
    res.json(task);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;