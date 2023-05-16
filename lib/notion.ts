// import "server-only";

import { Client } from "@notionhq/client";
import React from "react";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_AGARTHA_DB_SECRET,
});

export const fetchPages = (database_id: string) => {
  return notion.databases.query({
    database_id,
  });
}

export const fetchPageBySlug = (slug: string, database_id: string) => {
  return notion.databases
    .query({
      database_id,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined);
}

export const fetchPageBlocks = (pageId: string) => {
  return notion.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[]);
}
