import { useRef, useEffect } from 'react';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';

import LoadingSpinner from '../../components/ui/LoadingSpinner';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const text = commentTextRef.current.value;
    // optional: Could validate here

    // send comment to server
    sendRequest({ quoteId: props.quoteId, commentData: { text } });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      )}
      <div>
        <div className={classes.control} onSubmit={submitFormHandler}>
          <label htmlFor='comment'>Your Comment</label>
          <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button className='btn'>Add Comment</button>
        </div>
      </div>
    </form>
  );
};

export default NewCommentForm;
