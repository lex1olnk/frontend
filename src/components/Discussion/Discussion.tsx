import React, { useEffect, useState } from 'react';
import { getDisccusion } from '../../actions/discussionApi';
import Comment from './Comment';
import { getHTML } from '../../actions/univAction';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const Discussion: React.FC = (props: any) => {
  const { id, discussionId, classN, onSubmit, userId, path, auth } = props;
  const dispatch = useAppDispatch()
  const { discussion } = useAppSelector(({root}) => root.book)
  const [commentText, setCommentText] = useState('');

  const backendComments = discussion?.comments;
  const rootComments = discussion?.comments.filter(discussion => discussion.parentId === null);

  useEffect(() => dispatch(getDisccusion(discussionId)), []);

  const onClick = () => onSubmit({ id, discussionId, userId, parentId, value: commentText, path });
  const getComment = () => {};

  const getReplies = (commendId: number) =>
    backendComments
      .filter(backendComment => backendComment.parentId === commendId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  console.log(discussion, rootComments);

  if (!discussion) return null;

  return (
    <div className={!classN ? 'w-[1016px] mx-auto px-4 mt-4' : classN}>
      <span className="text-xl">Комментарии: {backendComments.length}</span>
      <div className="mt-4">
        {auth ? (
          <div>
            <textarea
              id="story"
              name="story"
              className="w-full min-h-24 p-4 bg-white border-2 outline-none focus:border-orange-200 rounded-lg border-slate-200"
              placeholder="Написать комментарий"
              onInput={e => setCommentText("word")}
              contentEditable
            />
            <div className="flex flex-row justify-between">
              <p>{commentText.length} / 500</p>
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
