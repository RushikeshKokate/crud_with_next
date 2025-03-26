import { sql } from '@vercel/postgres';

// GET all users
export async function GET() {
  try {
    const result = await sql`SELECT * FROM users ORDER BY id DESC;`;
    return Response.json({ success: true, data: result.rows });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// UPDATE user
export async function PUT(req) {
  try {
    const { id, name, email } = await req.json();
    await sql`UPDATE users SET name=${name}, email=${email} WHERE id=${id};`;
    return Response.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await sql`DELETE FROM users WHERE id=${id};`;
    return Response.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
