
async function Call(baseUri, useCase, dtoIn, method) {
  // return fetch
  let response;
  if (!method || method === "get") {
    const cleanedDtoIn = {};
    for (const key in dtoIn) {
      if (dtoIn[key] != null && typeof dtoIn[key] !== "object") {
        cleanedDtoIn[key] = dtoIn[key];
      }
    }

    const params =
      dtoIn && typeof dtoIn === "object" && Object.keys(dtoIn).length
        ? `?${new URLSearchParams(dtoIn)}`
        : "";
    response = await fetch(`${baseUri}/${useCase}${params}`);
  } else {
    response = await fetch(`${baseUri}/${useCase}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
  }
  const data = await response.json();
  console.log("dtoIn poslané do backhandu:", dtoIn)
  console.log("Response from backend:", data);
  return { ok: response.ok, status: response.status, data };
}

const baseUri = "http://localhost:8888";

const FetchHelper = {
  task: {
    get: async (dtoIn) => {
      return await Call(baseUri, "task/get", dtoIn, "get");
    },
    create: async (dtoIn) => {
      return await Call(baseUri, "task/create", dtoIn, "post");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "task/update", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "task/delete", dtoIn, "post");
    },
    list: async (dtoIn) => {
      return await Call(baseUri, "task/list", dtoIn, "get");
    },
  },

  category: {
    get: async (dtoIn) => {
      return await Call(baseUri, "category/get", dtoIn, "get");
    },
    create: async (dtoIn) => {
      return await Call(baseUri, "category/create", dtoIn, "post");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "category/update", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "category/delete", dtoIn, "post");
    },
    list: async () => {
      return await Call(baseUri, "category/list", null, "get");
    },
  },
};

export default FetchHelper;
