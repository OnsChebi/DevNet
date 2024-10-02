import React from 'react'

const Post = ({content,likes,createdAt}) => {
    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  return (
    <div>
        <div className="flex w-52 flex-col gap-4">
  <div className="flex items-center gap-4">
    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
    <div className="flex flex-col gap-4">
      {/* <div className="skeleton h-4 w-20"></div>
      <div className="skeleton h-4 w-28"></div> */}
      <div className="text-gray-600 text-sm">{formattedDate}</div>
      <div className="font-lato">{content}</div>
    </div>
  </div>
  {/* <div className="skeleton h-32 w-full"></div> */}
  <div className="font-lato">Likes: {likes}</div>
</div>
</div>
  )
}

export default Post