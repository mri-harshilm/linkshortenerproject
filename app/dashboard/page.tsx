import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/data/links";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateLinkDialog } from "@/components/create-link-dialog";
import { LinkActions } from "@/components/link-actions";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const links = await getLinksByUserId(userId);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Links</h1>
        <CreateLinkDialog />
      </div>
      {links.length === 0 ? (
        <p className="text-muted-foreground">No links yet. Create your first short link!</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Short Code</TableHead>
              <TableHead>Original URL</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-mono">{link.shortCode}</TableCell>
                <TableCell className="max-w-xs truncate">{link.url}</TableCell>
                <TableCell>{link.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <LinkActions
                    link={{ id: link.id, url: link.url, shortCode: link.shortCode }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
 