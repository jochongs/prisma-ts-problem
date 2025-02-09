import { PrismaClient } from "@prisma/client";
import { SelectUserWithPost, SelectUserWithPostTypeShape } from "./type";

const prisma = new PrismaClient();

/**
 * id를 통해 게시글을 가져오는 메서드
 *
 * SelectUserWithPost를 리턴합니다.
 * (return type 에러가 발생 X)
 */
async function getPostWithAuthorById(id: number): Promise<SelectUserWithPost> {
  const postWithAuthor = await prisma.post.findUniqueOrThrow({
    select: {
      id: true,
      title: true,
      author: {
        select: {
          id: true,
          name: true,
          posts: {
            select: {
              // id: true, // <- id는 select하지 않음
              title: true,
            },
          },
        },
      },
    },
    where: { id },
  });

  postWithAuthor.author.posts[0].title; // 빨간줄 X
  postWithAuthor.author.posts[0].id; // 빨간줄 O

  // ! id가 select되지 않아 posts: { title: string }[]로 평가되어도 return에서 빨간줄이 뜨지 않습니다.
  return postWithAuthor;
}

/**
 * id를 통해 게시글을 가져오는 메서드
 *
 * SelectUserWithPostTypeShape를 리턴합니다.
 * (return type 에러가 발생 O)
 */
async function getPostWithAuthorById2(
  id: number
): Promise<SelectUserWithPostTypeShape> {
  const postWithAuthor = await prisma.post.findUniqueOrThrow({
    select: {
      id: true,
      title: true,
      author: {
        select: {
          id: true,
          name: true,
          posts: {
            select: {
              // id: true, // <- id는 select하지 않음
              title: true,
            },
          },
        },
      },
    },
    where: { id },
  });

  postWithAuthor.author.posts[0].title; // 빨간줄 X
  postWithAuthor.author.posts[0].id; // 빨간줄 O

  // ! posts의 id가 select되지 않아 return에서 빨간줄이 발생합니다.
  return postWithAuthor;
}
