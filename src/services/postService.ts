import * as postModel from '../models/postModel';

export const getAllPosts = () => {
  return postModel.getAllPosts();
};

export const getPostById = (id: string) => {
  return postModel.getPostById(id);
};

export const createPost = (data: {
  title: string;
  content: string;
  author: string;
}) => {
  return postModel.createPost(data);
};

export const updatePost = (
  id: string,
  data: { title?: string; content?: string; author?: string }
) => {
  return postModel.updatePost(id, data);
};

export const deletePost = (id: string) => {
  return postModel.deletePost(id);
};

export const searchPosts = (term: string) => {
  const normalizedTerm = term
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return postModel.searchPosts(normalizedTerm);
};
