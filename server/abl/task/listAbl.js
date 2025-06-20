const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const taskDao = require("../../dao/task-dao.js");
const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    categoryId: { type: "string" },
  },
  additionalProperties: false,
};

async function ListAbl(req, res) {
  try {
    const filter = typeof req.query.categoryId !== "undefined" ? req.query : {};
    
    // validate input
    const valid = ajv.validate(schema, filter);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const taskList = filter.categoryId
      ? taskDao.listByCategoryId(filter.categoryId)
      : taskDao.list(); 

    // get category map
    const categoryMap = categoryDao.getCategoryMap();

    // return properly filled dtoOut
    res.json({ itemList: taskList, categoryMap });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;