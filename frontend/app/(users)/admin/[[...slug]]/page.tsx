import Link from "next/link";

export default async function AdminPage({ params }: { params: { slug: string[] } }) {
  const { slug } = await params;
  return (
    <div>
      <h1>Admin Page</h1>
      <p>This is admin {slug}</p>
      <div>
        <p>Register New Admin</p>
        <Link href="/admin/registration">Go to Registration</Link>
      </div>
    </div>
  );
}
