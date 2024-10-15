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
});
