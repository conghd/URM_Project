const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config({ path: "./config.env"  });

let token = '';
/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.ATLAS_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("GET /", () => {
  it("It should return a message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    //expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/advert/list", () => {
  it("It should return a list", async () => {
    const res = await request(app).get("/api/advert/list");
    expect(res.statusCode).toBe(401);
    //expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/user/test", () => {
  it("It should return a token", async () => {
    const res = await request(app)
      .get("/api/user/test")
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    //let data = JSON.parse(res.body);
    //console.log(res.body);
    expect(res.body).toHaveProperty("token");
  });
});