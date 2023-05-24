import type { NextPage } from "next";

import React from "react";
import { useState, useEffect, useRef } from "react";
export default function EmailList() {
  const [emails, setEmails] = useState<any>(null);
  const [size, setSize] = useState(0);
  let emailListQuery = null;
  // useEffect(() => {
  //   const getCommunities = async () => {
  //    emailListQuery = query(
  //     collection(firestore, 'subscriptions'),
  //     )
  //   setEmails((await getDocs(emailListQuery)).docs.map(communityToJSON));
  //     setSize((await getDocs(emailListQuery)).size);
  //   console.log("emails", emails );
  //   // setcommunities(communities);
  //   }
  //   getCommunities();

  // }, []);
  return (
    <div>
      <h1>Email List</h1>
      <h1>TotalNumber {size - 3}</h1>
      <ul>
        {emails &&
          emails.map((email: any) => (
            <li key={email.email}>
              <span>{email.email}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
