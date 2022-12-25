import React from 'react';
import ReactPaginate from 'react-paginate';
import { IPost, Post } from '../Post';

interface IPostsProps {
  data: IPost[];
  isPostsLoading: boolean;
}

const Posts: React.FC<IPostsProps> = ({ data, isPostsLoading }) => {
  const [itemOffset, setItemOffset] = React.useState(0);

  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems.map((obj: IPost, index: number) => {
        if (isPostsLoading) {
          return <Post key={index} isLoading={true} />;
        } else {
          let expression = /(https?:\/\/.*\.(?:png|jpg))/g;
          let regex = new RegExp(expression);
          let currentImage = obj.imageUrl;
          let currentImageUrl;

          if (obj.imageUrl) {
            if (currentImage?.match(regex)) {
              currentImageUrl = currentImage;
            } else {
              currentImageUrl = `${
                process.env.REACT_APP_API_URL || 'http://localhost:5000'
              }${obj.imageUrl}`;
            }
          }
          return (
            <Post
              key={obj._id}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? currentImageUrl : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              text={obj.text}
              isEditable={true}
            />
          );
        }
      })}
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        nextLabel=">"
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        // @ts-ignore
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Posts;
