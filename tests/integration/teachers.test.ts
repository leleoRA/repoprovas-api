import "../../src/setup";

import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";

beforeAll(async () => {
  await init();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /teachers/:subjectId", () => {
  it("should answer with status 404 for inexistent subject", async () => {
    const response = await supertest(app).get("/teachers/999999");

    expect(response.status).toBe(404);
  });
  
  it("should answer with status 200 and send an array of objects for valid params", async () => { 
    const response = await supertest(app).get("/teachers/8");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
          expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              subjects: expect.any(Object),
          })
      ])
    );
  });
});

describe("GET /teachers", () => {
  it("should answer with status 200 and send an array of objects for valid params", async () => { 
    const response = await supertest(app).get("/teachers");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
          expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              exams: expect.any(Object),
          })
      ])
    );
  });
});

// describe("GET /teacher/:id", () => {
//   it("should answer with status 404 for inexistent teacher", async () => {
//     const response = await supertest(app).get("/teacher/999999");

//     expect(response.status).toBe(404);
//   });
  
//   it("should answer with status 200 and send an array of objects for valid params", async () => { 
//     const body = createBody(2020, 1, 1, 1, 1, "https://infoprovas.dcc.ufrj.br/provas/50.pdf");
    
//     const insertExam = await supertest(app).post("/exam").send(body);

//     expect(insertExam.status).toBe(201);

//     const response = await supertest(app).get("/teacher/1");

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(
//       expect.arrayContaining([
//           expect.objectContaining({
//               id: expect.any(Number),
//               name: expect.any(String),
//               exams: expect.arrayContaining([
//                 expect.objectContaining({
//                   id: expect.any(Number),
//                   year: expect.any(Number),
//                   semester: expect.any(Number),
//                   link: expect.any(String),
//                   category: expect.any(Object),
//                   subject: expect.any(Object),
//                 })
//               ]),
//           })
//       ])
//     );
//   });
// });