import React from 'react'
import { nanoid } from "nanoid";
import CommunityPostForm from "../../components/communities/CommunityPostForm";

export default function CommunityAdminPostsPage(props:any) {
    return (
      <main>
        {/* <AuthCheck> */}
          <CreateNewCommunity />
        {/* </AuthCheck> */}
      </main>
    );
  }


export function CreateNewCommunity () {
  const slug = nanoid();

    return (
      <>
      <CommunityPostForm slug={slug}/>
      </>
    );
}
