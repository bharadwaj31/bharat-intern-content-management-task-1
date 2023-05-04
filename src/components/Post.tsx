import { PostType } from '@/types';
import styles from '@/assets/styles/modules/Post.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => {
  return (
    <Link to={`/blog/${post.id}`} className={styles.post}>
      <img className={styles['post-image']} src={post.thumbnailUrl} alt={post.title} />
      <div className={styles['post-footer']}>
        <h3 className={styles['post-title']}>{post.title}</h3>
        <div className="flex justify-between items-end mt-2">
          <span className={styles['post-category']}>{post.category}</span>
          <span className={styles['post-date']}>{post.publishedAt}</span>
        </div>
      </div>
    </Link>
  );
};

export default Post;
