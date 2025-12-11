"use client";

export default function DeleteButton({ id }: { id: number }) {
  const handleDelete = async () => {
    const deleted = await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });

    window.location.reload(); // refresh dashboard
  };

  return (
    <button onClick={handleDelete} className="text-red-600 underline">
      Delete
    </button>
  );
}
