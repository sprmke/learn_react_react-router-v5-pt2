import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';
import LoadingSpinner from '../ui/LoadingSpinner';

import classes from './Comments.module.css';

const Comments = () => {
  const params = useParams();
  const { quoteId } = params;

  const [isAddingComment, setIsAddingComment] = useState(false);

  const {
    sendRequest,
    data: comments,
    status,
    error,
  } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  // Comments Content
  let commentsContent = null;
  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (status === 'completed' && error) {
    commentsContent = (
      <div className='center'>
        <p>{error}</p>
      </div>
    );
  }
  if (status === 'completed' && !error && comments.length === 0) {
    commentsContent = (
      <div className='center'>
        <p>No comments added yet!</p>
      </div>
    );
  }
  if (status === 'completed' && !error && comments.length > 0) {
    commentsContent = <CommentsList comments={comments} />;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={params.quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {commentsContent}
    </section>
  );
};

export default Comments;
