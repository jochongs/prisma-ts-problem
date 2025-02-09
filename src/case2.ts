import { PrismaClient } from "@prisma/client";
import { SelectUserWithPost, SelectUserWithPostTypeShape } from "./type";

const prisma = new PrismaClient();

/**
 * id를 통해 게시글을 가져오는 메서드
 *
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

  // ! id가 select되지 않아 posts: { title: string }[]로 평가되어도 return에서 빨간줄이 뜨지 않습니다.
  return postWithAuthor;
}

/**
 * id를 통해 게시글을 가져오는 메서드
 *
 * (return type 에러가 발생 O)
 */
async function getPostWithAuthorById2(id: number): Promise<SelectUserWithPost> {
  const postWithAuthor = await prisma.post.findUniqueOrThrow({
    select: {
      id: true,
      // title: true, // <- 여기 있는 title은 select하지 않았을 때 에러가 발생
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

  // ! title이 select 되지 않아 에러가 발생
  return postWithAuthor;
}
