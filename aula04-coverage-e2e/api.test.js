const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");
const assert = require("assert");

describe("Api suite test", () => {
  describe("/contact", () => {
    it("should request the contact page and return http status200", async () => {
      const response = await request(app).get("/contact").expect(200);

      assert.deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should request an inexistent route /hi an redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);

      assert.deepStrictEqual(response.text, "Hello World!");
    });
  });
  describe("/login", () => {
    it("should login successufully on the login route and return http status 200 ", async () => {
      const response = await request(app)
        .post(`/login`)
        .send({ username: "edusantanaw", password: "123" })
        .expect(200);

      assert.deepStrictEqual(response.text, "loggin has successeded");
    });
    it("should unauthorizeda request when requesting it using wrog creadentials and return htpp status 401", async () => {
      const response = await request(app)
        .post(`/login`)
        .send({ usename: "sds", password: "123" })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, "Loggin failed!");
    });
  });
});
