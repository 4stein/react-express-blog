import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';

import { RootState } from '../redux/store';
import { fetchPosts } from '../redux/slices/posts';
import Posts from '../components/Posts';
import { IPost } from '../components';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.posts);
  const [filteredPosts, setFilteredPosts] = React.useState<string>('');

  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          <TextField
            label="Filter Posts"
            variant="outlined"
            value={filteredPosts}
            onChange={e => setFilteredPosts(e.target.value)}
          />
          <br />
          <br />
          {isPostsLoading ? (
            [...Array(5)]
          ) : (
            <Posts
              // eslint-disable-next-line
              data={posts.items.filter((post: IPost) => {
                if (post.title) {
                  return post.title.includes(filteredPosts);
                }
              })}
              isPostsLoading={isPostsLoading}
            />
          )}
        </Grid>
        <Grid xs={4} item></Grid>
      </Grid>
    </>
  );
};
