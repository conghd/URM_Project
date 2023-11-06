const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
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

describe("POST /api/user/register", () => {
  test("[NG] name, email, password are empty, it should return 400", async () => {
    const userData = {name: '', email: '', password: ''}
    const res = await request(app)
      .post('/api/user/register')
      .send(userData)
      .set('Accept', 'application/json')

    expect(res.statusCode).toBe(400);
  });

  test("[OK] Register successfully. It should return code 200", async () => {
    const userData = {name: 123456, email: 'jest@gmail.com', password: 'Abc13579#'}
    const res = await request(app)
      .post('/api/user/register')
      .send(userData)
      .set('Accept', 'application/json')

    //console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(userData.email);

  });

  test("[NG] User already exists. It should return code 400", async () => {
    const userData = {name: 'jest', email: 'jest@gmail.com', password: 'Abc13579#'}
    const res = await request(app)
      .post('/api/user/register')
      .send(userData)
      .set('Accept', 'application/json')

    //console.log(res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body.email).toBe(userData.email);

  });
});


describe("POST /api/user/login", () => {
  test("[NG] User does not exist", async () => {
    const userData = {email: 'jest0@gmail.com', password: '0000000'}
    const res = await request(app)
      .post('/api/user/login')
      .send(userData)
      .set('Accept', 'application/json')

    expect(res.statusCode).toBe(400);
    //expect(res.body.email).toBe(userData.email);
  });

  test("[NG] Login should return invalid credentials", async () => {
    const userData = {email: 'jest@gmail.com', password: '0000000'}
    const res = await request(app)
      .post('/api/user/login')
      .send(userData)
      .set('Accept', 'application/json')

    expect(res.statusCode).toBe(400);
    //expect(res.body.email).toBe(userData.email);
  });

  test("[OK] Login should return data with token", async () => {
    const userData = {email: 'jest@gmail.com', password: 'Abc13579#'}
    const res = await request(app)
      .post('/api/user/login')
      .send(userData)
      .set('Accept', 'application/json')

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(userData.email);

  });
});

let code = '';
describe("POST /api/user/resend_code", () => {
  test("It should response the user information", async () => {
    const userData = {email: 'jest@gmail.com', type: "ACTIVATION"};
    const res = await request(app)
      .post('/api/user/resend_code')
      .send(userData)
      .set('Accept', 'application/json')

    //console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(userData.email);
    code = res.body.code;
  });
});

describe("POST /api/user/activate", () => {
  test("It should return user information with token", async () => {
    const userData = {email: 'jest@gmail.com', code: code};
    const res = await request(app)
      .post('/api/user/activate')
      .send(userData)
      .set('Accept', 'application/json')

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(userData.email);
    expect(res.body).toHaveProperty("token")
    expect(res.body).toHaveProperty("_id")

  });

  test("It should return code 400", async () => {
    const userData = { email: 'jest@gmail.com', code: '123456'};
    const res = await request(app)
      .post('/api/user/activate')
      .send(userData)
      .set('Accept', 'application/json')

    expect(res.statusCode).toBe(400);
  })

});



describe("POST /api/user/delete", () => {
  test("[OK] It should return code 200", async () => {
    const userData = {email: 'jest@gmail.com'};
    const res = await request(app)
      .post('/api/user/delete')
      .send(userData)
      .set('Accept', 'application/json')

      console.log(res.body);
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe(userData.email);
  });

  
})