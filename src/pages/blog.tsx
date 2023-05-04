import AddComment from '@/components/CommentForm';
import CommentList from '@/components/CommentList';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getPostById, toggleLike } from '@/store/blog-slice';
import { useParams } from 'react-router-dom';
import styles from '@/assets/styles/modules/BlogPage.module.scss';
import { HeartIcon as HeartIconOutlined } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useAppDispatch } from '@/hooks/use-app-dispatch';

const BlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => getPostById(state, Number(id)));

  if (!post) {
    return (
      <div className="flex items-center justify-center" style={{ height: '300px' }}>
        Sorry the post you are looking for is not found
      </div>
    );
  }

  const togglePostLike = () => {
    dispatch(toggleLike(post.id));
  };

  return (
    <div>
      <div className="py-6">
        <h1 className="text-center">{post.title}</h1>
        <p className="flex items-center justify-center gap-2 mt-4 text-gray">
          <span>{post.category}</span>
          <span className="h-8 w-8 bg-primary rounded" style={{ display: 'inline-block' }}></span>
          <span>{post.publishedAt}</span>
        </p>
      </div>
      <img src={post.imageUrl} alt={post.title} width={'100%'} />
      <div className="py-4">
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <strong>Tags: </strong>
          <div className="flex items-center flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm bg-primary rounded p-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div role="button" className="flex items-center gap-1" onClick={togglePostLike}>
          {post.isLiked ? (
            <HeartIcon className="text-primary" width={20} height={20} />
          ) : (
            <HeartIconOutlined className="text-primary" width={20} height={20} />
          )}
          {post.isLiked ? <span>Liked</span> : <span>Like</span>}
        </div>
      </div>

      <div className={styles['comment-section']}>
        <CommentList comments={post.comments} />
        <AddComment postId={post.id} />
      </div>
    </div>
  );
};

export default BlogPage;
