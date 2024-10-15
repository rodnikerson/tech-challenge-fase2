import { Request, Response } from 'express';
import * as postController from './postController';
import * as postService from '../services/postService';

jest.mock('../services/postService');

describe('postController', () => {
  const mockPosts = [
    {
      id: 'PJw207NixHaNZI8F',
      slug: 'fundamentos-de-termodinamica',
      title: 'Fundamentos de Termodinâmica',
      content: 'Reflexões sobre a Potência Motriz do Fogo',
      author: 'Sadi Carnot',
      publishedAt: '2024-10-15T15:12:21.742Z',
      createdAt: '2024-10-15T15:12:21.743Z',
      updatedAt: '2024-10-15T15:12:21.743Z',
    },
    {
      id: 'BZE_2MAMtbEUPCza',
      slug: 'conceitos-de-macroeconomia',
      title: 'Conceitos de Macroeconomia',
      content: 'Uma introdução ao pensamento Keynesiano',
      author: 'John Maynard Keynes',
      publishedAt: null,
      createdAt: '2024-10-15T16:41:09.335Z',
      updatedAt: '2024-10-15T16:41:09.335Z',
    },
  ];

  describe('getPosts', () => {
    it('Should fetch all posts and return them as JSON', async () => {
      const req = {} as Request;
      const res = {
        json: jest.fn(),
      } as unknown as Response;

      (postService.getAllPosts as jest.Mock).mockResolvedValue(mockPosts);

      await postController.getPosts(req, res);

      expect(postService.getAllPosts).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });
  });

  describe('getPost', () => {
    it('Should fetch a post by id and return it as JSON', async () => {
      const req = {
        params: { id: 'PJw207NixHaNZI8F' },
      } as unknown as Request;
      const res = {
        json: jest.fn(),
      } as unknown as Response;

      const mockPost = mockPosts[0];
      (postService.getPostById as jest.Mock).mockResolvedValue(mockPost);

      await postController.getPost(req, res);

      expect(postService.getPostById).toHaveBeenCalledWith('PJw207NixHaNZI8F');
      expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    it('Should return 404 if post is not found', async () => {
      const req = {
        params: { id: 'any_id' },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const error = new Error('Post not found');
      (postService.getPostById as jest.Mock).mockRejectedValue(error);

      await postController.getPost(req, res);

      expect(postService.getPostById).toHaveBeenCalledWith('any_id');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    it('Should return 500 for other errors', async () => {
      const req = {
        params: { id: 'PJw207NixHaNZI8F' },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const error = new Error('Internal server error');
      (postService.getPostById as jest.Mock).mockRejectedValue(error);

      await postController.getPost(req, res);

      expect(postService.getPostById).toHaveBeenCalledWith('PJw207NixHaNZI8F');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
      });
    });
  });
});
