import { Request, Response } from 'express';
import * as postService from '../services/postService';

export const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  
  res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  const newPost = await postService.createPost({ title, content, author });

  res.status(201).json(newPost);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedPost = await postService.updatePost(id, req.body);

  res.json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  await postService.deletePost(id);

  res.status(204).send();
};

export const searchPosts = async (req: Request, res: Response) => {
  const { q } = req.query;
  const posts = await postService.searchPosts(q as string);

  res.json(posts);
};
