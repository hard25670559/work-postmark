interface DB {
  posts: Post[];
  comments: Comment[];
  profile: Profile;
}

type Post = {
  id: number;
  title: string;
  author: string;
}

type Comment = {
  id: number;
  body: string;
  postId: number;
}

type Profile = {
  name: string;
}

export const db: DB = {
  posts: [],
  comments: [],
  profile: { name: "abc" },
};
