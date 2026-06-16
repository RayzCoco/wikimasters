import db from "@/db/index";
import { usersSync } from "@/db/schema";

type StackUser = {
  id: string;
  displayName: string | null;
  primaryEmail: string | null;
};

export async function ensureUserExists(stackUser: StackUser): Promise<void> {
  console.log("ensureUserExists start");
  try {
    await db
      .insert(usersSync)
      .values({
        id: stackUser.id,
        name: stackUser.displayName,
        email: stackUser.primaryEmail,
      })
      .onConflictDoUpdate({
        target: usersSync.id,
        set: {
          name: stackUser.displayName,
          email: stackUser.primaryEmail,
        },
      });
    console.log(`✅ [ensureUserExists] Successfully synced user to Neon DB.`);
  } catch (e) {
    console.error("ensureUserExists not firing", e);
  }
}
