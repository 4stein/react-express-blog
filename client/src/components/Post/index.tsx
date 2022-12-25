import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/posts';

export interface IUser {
  createdAt: string;
  email: string;
  fullName: string;
  passwordHash: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
export interface IPost {
  _id?: string;
  id?: string;
  title?: string;
  createdAt?: string;
  imageUrl?: string;
  user?: IUser;
  viewsCount?: number;
  text?: string | undefined;
  isFullPost?: boolean | undefined;
  isLoading: boolean | undefined;
  isEditable?: boolean | undefined;
}

interface IPostProps {
  id?: string;
  title?: string;
  createdAt?: string;
  imageUrl?: string;
  user?: IUser;
  viewsCount?: number;
  text?: string | undefined;
  children?: React.ReactNode;
  isFullPost?: boolean | undefined;
  isLoading?: boolean | undefined;
  isEditable?: boolean | undefined;
}

export const Post: React.FC<IPostProps> = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  text,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to delete article?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <p className={styles.text}>{text}</p>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
