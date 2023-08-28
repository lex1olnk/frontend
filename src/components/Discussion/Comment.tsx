import React from 'react';

type CommentProps = {
  comment: any,
  replies: any
}

const Comment: React.FC<CommentProps> = ({ comment, replies}) => {
  //const readerStatus = comment.user.id === comment.translatorId ? 'translator' : 'reader';
  return (
    <div className="flex flex-row">
      <div>
        <img>{comment.user.img}</img>
      </div>
      <div className="">
        <div>
          {comment?.user.nickname}
          {'[ читатель ]'}
        </div>
        <div>{comment.createdAt}</div>
        <div>{comment.value}</div>
        <div>
          <div>{comment.likes}</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Comment;
