import React, { useEffect, useState } from 'react';
import { getDisccusion } from '../../actions/discussionApi';
import Comment from './Comment';
import { getHTML } from '../../actions/univApi';
import { Input } from '@mui/material';

const Discussion = props => {
  const { id, discussionId, className, onSubmit, userId, path, auth } = props;
  const [disc, setDisc] = useState(undefined);
  const [desc, setDesc] = useState('');
  const [commentText, setCommentText] = useState('');

  const backendComments = disc?.comments;
  const rootComments = disc?.comments.filter(disc => disc.parentId === null);

  useEffect(() => getDisccusion(discussionId).then(res => setDisc(res)), []);

  const onClick = () => onSubmit({ id, discussionId, userId, parentId, value: commentText, path });
  const getComment = () => {};

  const getReplies = commendId =>
    backendComments
      .filter(backendComment => backendComment.parentId === commendId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  console.log(disc, rootComments);

  if (!disc) return;

  return (
    <div className={!className ? 'w-[1016px] mx-auto px-4 mt-4' : className}>
      <span className="text-xl">Комментарии: {backendComments.length}</span>
      <div className="mt-4">
        {auth ? (
          <div>
            <div
              id="story"
              name="story"
              className="w-full min-h-24 p-4 bg-white border-2 outline-none focus:border-orange-200 rounded-lg border-slate-200"
              placeholder="Написать комментарий"
              onInput={e => setCommentText(e.currentTarget.textContent)}
              contentEditable
            />
            <div className="flex flex-row justify-between">
              <p>{comment.length} / 500</p>
              <button
                onClick={onClick}
                className="px-3 py-1 mt-2 bg-white border-2 border-gray-200">
                Отправить
              </button>
            </div>
          </div>
        ) : (
          <div>Чтобы оставить комментарий, вам следует авторизоваться</div>
        )}

        <div className="">
          {rootComments.length ? (
            rootComments.map(rootComment => (
              <Comment
                key={rootComment.id}
                comment={rootComment}
                replies={getReplies(rootComment.id)}
              />
            ))
          ) : (
            <div className="py-16 text-lg text-center">Нет ни одного комментария</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discussion;
