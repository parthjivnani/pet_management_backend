import { Request, Response } from 'express';
import AuthController from '../src/modules/auth/authController';
import User from '../src/modules/user/userModel';
import * as bcrypt from 'bcrypt';

jest.mock('../src/modules/user/userModel');
jest.mock('bcrypt');

describe('AuthController', () => {
  let authController: AuthController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    authController = new AuthController();
    mockRequest = {
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {}
    };
  });

  describe('test', () => {
    it('should return test message', () => {
      authController.test(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('signup', () => {
    it('should create a new user successfully', async () => {
      const hashedPassword = 'hashedPassword123';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      mockRequest.body = {
        firstName: 'John',
        lastName: 'Doe', 
        email: 'john@example.com',
        password: 'password123'
      };

      const mockUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: hashedPassword
      };

      (User.create as jest.Mock).mockResolvedValue(mockUser);

      await authController.signup(mockRequest as Request, mockResponse as Response);

      expect(User.create).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: hashedPassword
      });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    it('should handle signup error', async () => {
      (User.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await authController.signup(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      mockRequest.body = {
        email: 'john@example.com',
        password: 'password123'
      };

      const mockUser = {
        id: '1',
        email: 'john@example.com',
        password: 'hashedPassword',
        isActive: true,
        isDeleted: false
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      mockResponse.locals = {
        token: 'mockToken123'
      };

      await authController.login(mockRequest as Request, mockResponse as Response);

      expect(jest.fn(User.findOne)).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should handle non-existent account', async () => {
      mockRequest.body = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      (User.findOne as jest.Mock).mockResolvedValue(null);

      await authController.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
    });

    it('should handle inactive account', async () => {
      mockRequest.body = {
        email: 'inactive@example.com',
        password: 'password123'
      };

      const mockUser = {
        id: '1',
        email: 'inactive@example.com',
        password: 'hashedPassword',
        isActive: false,
        isDeleted: false
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      await authController.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
    });
  });

  describe('sendVerificationLink', () => {
    it('should send verification link successfully', async () => {
      mockRequest.body = {
        email: 'john@example.com',
        path: 'reset-password'
      };

      const mockUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (User.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 1 });

      await authController.sendVerificationLink(mockRequest as Request, mockResponse as Response);

      expect(jest.fn(User.findOne)).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should handle invalid email', async () => {
      mockRequest.body = {
        email: 'invalid@example.com',
        path: 'reset-password'
      };

      (User.findOne as jest.Mock).mockResolvedValue(null);

      await authController.sendVerificationLink(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('forgotPassword', () => {
    it('should reset password successfully', async () => {
      mockRequest.body = {
        password: 'newPassword123'
      };
      mockResponse.locals = {
        email: 'john@example.com'
      };

      const mockUser = {
        email: 'john@example.com',
        isPasswordReset: 0
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (User.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 1 });

      await authController.forgotPassword(mockRequest as Request, mockResponse as Response);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should handle expired reset link', async () => {
      mockRequest.body = {
        password: 'newPassword123'
      };
      mockResponse.locals = {
        email: 'john@example.com'
      };

      const mockUser = {
        email: 'john@example.com',
        isPasswordReset: 1
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      await authController.forgotPassword(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
  });
});
