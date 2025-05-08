import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../app.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import { UpdateTaskDto } from "tasks/dto/update-task.dto";
import { CreateTaskDto } from "tasks/dto/create-task.dto";

describe("TasksController (e2e)", () => {
  let app: INestApplication;
  let repository: Repository<Task>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repository = module.get<Repository<Task>>(getRepositoryToken(Task));

    app = module.createNestApplication();
    app.init();
  });
  
  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await repository.clear();

    await repository.save([
      {
        id: 1,
        title: "Test Title",
        description: "Test Desc",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Test Title 2",
        description: "Test Desc 2",
        isCompleted: true,
      },
    ]);
  });

  describe("GET /tasks", () => {
    it("should return all tasks", async () => {
      const response = await request(app.getHttpServer())
        .get("/tasks")
        .expect(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining<Task>({
            id: 1,
            title: "Test Title",
            description: "Test Desc",
            isCompleted: false,
          }),
          expect.objectContaining<Task>({
            id: 2,
            title: "Test Title 2",
            description: "Test Desc 2",
            isCompleted: true, 
          }),
        ]),
      );
    });
  });

  describe("GET /tasks/:id", () => {
    it("should return task by id", async () => {
      const response = await request(app.getHttpServer())
        .get("/tasks/1")
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining<Task>({
          id: 1,
          title: "Test Title",
          description: "Test Desc",
          isCompleted: false,
        }),
      );
    });

    it("should return 404 if task not found", async () => {
      const response = await request(app.getHttpServer())
        .get("/tasks/88")
        .expect(404);
    });
  });

  describe("POST /tasks", () => {
    const newTask:CreateTaskDto = {
      title: "New Task",
      description: "New Description",
    };

    const newTaskDB:Task = {
      id: 3,
      title: "New Task",
      description: "New Description",
      isCompleted: false,
    };

    it("should create a new task", async () => {
      const response = await request(app.getHttpServer())
        .post("/tasks")
        .send(newTask)
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining<CreateTaskDto>(newTask)
      );

      const repdata = await repository.findOneBy({ id: 3 });

      expect(repdata).toEqual<Task>(newTaskDB);
    });
  });

  describe("PATCH /tasks/:id", () => {
    it("should update an existing task", async () => {
      const updatedTask: UpdateTaskDto = {
        title: "Updated Title",
        description: "Updated Description",
        isCompleted: true,
      }
      const updatedTaskDB: Task = {
        id: 2,
        title: "Updated Title",
        description: "Updated Description",
        isCompleted: true,
      }

      const reponse = await request(app.getHttpServer())
      .patch("/tasks/2")
      .send(updatedTask)
      .expect(200)

      expect(reponse.body).toEqual(updatedTaskDB);

      const repdata = await repository.findOneBy({id:2});

      expect(repdata).toEqual(updatedTaskDB);
    });

    it("should return 404 when updating non-existent task", async () => {
      const updatedTask: UpdateTaskDto = {
        title: "Updated Title",
        description: "Updated Description",
        isCompleted: true,
      }

      const response = request(app.getHttpServer())
      .patch("/tasks/88")
      .send(updatedTask)
      .expect(404);
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete an existing task", async () => {
      await request(app.getHttpServer())
      .delete("/tasks/2")
      .expect(200)
      
      const repdata = await repository.findOneBy( { id : 2 })
      
      expect(repdata).toBe(null)
    });

    it("should return 404 when deleting non-existent task", async () => {
      await request(app.getHttpServer())
      .delete("/tasks/88")
      .expect(404)
    });
  });
});
