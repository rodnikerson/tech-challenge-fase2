import { Request, Response } from 'express';
import * as postService from '../services/postService';

export const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.getAllPosts();

  res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await postService.getPostById(id);

    res.json(post);
  } catch (error: any) {
    if (error.message === 'Post not found') {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  try {
    const newPost = await postService.createPost({ title, content, author });

    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating post' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedPost = await postService.updatePost(id, data);

    res.json(updatedPost);
  } catch (error: any) {
    if (error.message === 'Post not found') {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(500).json({ message: 'Error updating post' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedPost = await postService.deletePost(id);

    res.status(204).send();
  } catch (error: any) {
    if (error.message === 'Post not found') {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(500).json({ message: 'Error deleting post' });
  }
};

export const searchPosts = async (req: Request, res: Response) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  const posts = await postService.searchPosts(q as string);

  res.json(posts);
};
