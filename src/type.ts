import { Prisma, PrismaClient } from "@prisma/client";
import type { Equal } from "../types/Equal";
import type { Expect } from "../types/Expect";

const SELECT_USER_WITH_POST = Prisma.validator<Prisma.PostDefaultArgs>()({
  select: {
    id: true,
    title: true,
    author: {
      select: {
        id: true,
        name: true,
        posts: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    },
  },
});

/**
 * 위 select 결과 타입을 추출하는 Prisma.util
 *
 * @link https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types
 */
export type SelectUserWithPost = Prisma.PostGetPayload<
  typeof SELECT_USER_WITH_POST
>;

/**
 * SelectUserWithPost의 타입 shape입니다.
 */
export type SelectUserWithPostTypeShape = {
  id: number;
  title: string;
  author: {
    id: number;
    name: string | null;
    posts: {
      id: number;
      title: string;
    }[];
  };
};

/**
 * SelectUserWithPost 타입은 SelectUserWithPostTypeShape와 구조적으로 동일합니다.
 *
 * ! posts 에 id 또는 title 을 하나라도 삭제할 경우, Equal 하지 않기 떄문에 빨간줄이 발생합니다.
 */
type Case = Expect<Equal<SelectUserWithPost, SelectUserWithPostTypeShape>>;
