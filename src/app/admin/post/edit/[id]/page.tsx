import EditPostClient from "./EditPostClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idString } = await params;
  const id = Number(idString);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid post ID");
  }

  return <EditPostClient id={id} />;
}
