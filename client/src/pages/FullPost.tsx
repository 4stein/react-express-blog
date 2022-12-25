import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from '../axios';

import { Post } from '../components/Post';

export const FullPost = () => {
  const [data, setData] = React.useState<any>();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.warn(err);
        alert('Error getting article');
      });
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  let expression = /(https?:\/\/.*\.(?:png|jpg))/g;
  let regex = new RegExp(expression);
  let currentImage = data.imageUrl;
  let currentImageUrl;

  if (data.imageUrl) {
    if (currentImage.match(regex)) {
      currentImageUrl = data.imageUrl;
    } else {
      currentImageUrl = `${
        process.env.REACT_APP_API_URL || 'http://localhost:5000'
      }${data.imageUrl}`;
    }
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? currentImageUrl : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
    </>
  );
};
