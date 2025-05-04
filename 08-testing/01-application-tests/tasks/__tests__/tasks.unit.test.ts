import { Test, TestingModule } from "@nestjs/testing";
import { TasksService } from "../tasks.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { NestApplication } from "@nestjs/core";
import { arrayContains } from "class-validator";

describe("TasksService", () => {
  let app: NestApplication;
  let service: TasksService;
  let repository: Repository<Task>;

  const newTasksDTO: CreateTaskDto[] = [
    {
      title: "New Task One",
      description: "New Task One Description"
    },
    {
      title: "New Task Two",
      description: "New Task Two Description"
    },
  ];

  const newTasksEntities: Task[] = [
    {
      id: 1,
      title: "New Task One",
      description: "New Task One Description",
      isCompleted: false,
    },
    {
      id: 2,
      title: "New Task Two",
      description: "New Task Two Description",
      isCompleted: true
    },
  ];

  const mockTasksRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TasksService, 
        {
          provide: getRepositoryToken(Task),
          useValue: mockTasksRepository
        }
      ]
    }).compile()

    app = module.createNestApplication()
    await app.init();

    service = module.get<TasksService>(TasksService);
  });

  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe("create", () => {
    it("should create a new task", async () => {

      mockTasksRepository.create.mockReturnValue(newTasksEntities[0]);
      mockTasksRepository.save.mockResolvedValue(newTasksEntities[0]);

      const request = await service.create(newTasksDTO[0])

      expect(request).toEqual(newTasksEntities[0]);
      expect(mockTasksRepository.create).toHaveBeenLastCalledWith(newTasksDTO[0]);
      expect(mockTasksRepository.save).toHaveBeenCalledWith(newTasksEntities[0]);
    });
  });

  describe("findAll", () => {
    it("should return an array of tasks", async () => {
      mockTasksRepository.find.mockReturnValue(newTasksEntities)
      const result = await service.findAll()
      expect(result).toEqual(expect.arrayContaining(mockTasksRepository.find()))
    });
  });

  describe("findOne", () => {
    it("should return a task when it exists", async () => {
      mockTasksRepository.findOneBy.mockResolvedValue(newTasksEntities[0])
      const result = await service.findOne(1)
      expect(mockTasksRepository.findOneBy).toHaveBeenCalledWith({id: 1})
      expect(result).toEqual(newTasksEntities[0]);
    });

    it("should throw NotFoundException when task does not exist", async () => {
      mockTasksRepository.findOneBy.mockResolvedValue(null)
      const result = service.findOne(5)
      expect(mockTasksRepository.findOneBy).toHaveBeenCalledWith({id: 5})
      await expect(result).rejects.toThrow('Task with ID 5 not found');
    });
  });

  describe("update", () => {
    it("should update a task when it exists", async () => {
      const updatedTask = {
        id: 1,
        title: "New Task One",
        description: "New Task One Description",
        isCompleted: true,
      }
      mockTasksRepository.findOneBy.mockReturnValue(newTasksEntities[0])
      mockTasksRepository.find.mockReturnValue(updatedTask)

      const result = await service.update(newTasksEntities[0].id, {
        isCompleted: true
      })

      expect(mockTasksRepository.findOneBy).toHaveBeenCalledWith({id: 1})
      expect(result).toEqual(updatedTask);
    });

    it("should throw NotFoundException when task to update does not exist", async () => {
      mockTasksRepository.findOneBy.mockReturnValue(null)
      const result = service.update(5, {
        isCompleted: true
      })
      expect(mockTasksRepository.findOneBy).toHaveBeenCalledWith({id: 5})
      await expect(result).rejects.toThrow('Task with ID 5 not found')
    });
  });

  describe("remove", () => {
    it("should remove a task when it exists", async () => {
      mockTasksRepository.findOneBy.mockResolvedValue(newTasksEntities[0].id)
      mockTasksRepository.remove.mockResolvedValue(newTasksEntities[0].id)
      const result = await service.remove(newTasksEntities[0].id)

      expect(mockTasksRepository.findOneBy).toHaveBeenCalledWith({id: newTasksEntities[0].id})
      expect(mockTasksRepository.remove).toHaveBeenCalledWith(newTasksEntities[0].id)
      expect(result).toBeUndefined();
    });

    it("should throw NotFoundException when task to remove does not exist", async () => {
      mockTasksRepository.findOneBy.mockResolvedValue(null)
      await expect(service.remove(5)).rejects.toThrow('Task with ID 5 not found');
    });
  });
});
