import { useBlog } from "@contexts/blog.context";
import { useAsyncFn } from "@utils/use-async";
// import { createComment } from "@framework/comments";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";
import useApiRequest from "@framework/api-request";

export function BlogView() {
  const http = useApiRequest();
  const { post, rootComments, createLocalComment } = useBlog();

  const createComment = async ({ postId, message, parentId }) => {
    return await http
      .post(`/post/comment/${postId}`, {
        message,
        parentId,
      })
      .then((res) => res.data.data)
      .catch((error) =>
        Promise.reject(error?.response?.data?.message ?? "Error")
      );
  };

  const {
    loading,
    error,
    execute: createCommentFn,
  } = useAsyncFn(createComment);

  function onCommentCreate(message) {
    return createCommentFn({ postId: post.id, message }).then(
      createLocalComment
    );
  }

  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.description}</article>
      <h3 className="comments-title">Comments</h3>
      <section>
        <CommentForm
          loading={loading}
          error={error}
          onSubmit={onCommentCreate}
        />
        {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  );
}
