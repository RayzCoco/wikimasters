import { eq } from "drizzle-orm";
import db from "@/db";
import { articles, usersSync } from "@/db/schema";
import resend from "@/email";
import CelebrationTemplate from "@/email/templates/celebration-template";

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:3000`;

export default async function sendCelebrationEmail(
  articleId: number,
  pageviews: number,
) {
  const response = await db
    .select({
      email: usersSync.email,
      id: usersSync.id,
      title: articles.title,
      name: usersSync.name,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id))
    .where(eq(articles.id, articleId));

  // SELECT usersSync.id, usersSync.email FROM articles LEFT JOIN usersSync ON articles.authorId = usersSync.id WHERE articles.id = $id

  const { email, id, name, title } = response[0];

  if (!email) {
    console.log(
      `No email exist for ${articleId} on pageviews ${pageviews}, could not find email in database`,
    );
    return;
  }

  //custom domain
  //   const emailRes = await resend.emails.send({
  //     from: "Wikimasters <noreply@gmail.com>",
  //     to: email,
  //     subject: `Your article in Wikimasters got ${pageviews} views!`,
  //     html: "<h1>Congrats!</h1><p>You're an amazing author and PEOPLE LIKE YOU.</p>",
  //   });

  const emailRes = await resend.emails.send({
    from: "Wikimasters <onboarding@resend.dev>",
    to: "nicowhong@gmail.com",
    subject: `Your article in Wikimasters got ${pageviews} views!`,
    react: (
      <CelebrationTemplate
        articleTitle={title}
        articleUrl={`${BASE_URL}/wiki/${articleId}`}
        name={name ?? "Friend"}
        pageviews={pageviews}
      />
    ),
  });

  if (!emailRes.error) {
    console.log(
      `sent ${id} a celebration email for getting ${pageviews} on articles ${articleId}`,
    );
  } else {
    console.log(
      `error sending ${id} a celebration email for getting ${pageviews} on articles ${articleId}`,
    );
  }
}
