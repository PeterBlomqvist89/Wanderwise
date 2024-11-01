import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

// Fetch a specific listing by ID
export async function GET(req) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Assuming the ID is the last segment in the path

  try {
    const listingDoc = await getDoc(doc(db, "listings", id));

    if (listingDoc.exists()) {
      return new Response(
        JSON.stringify({ id: listingDoc.id, ...listingDoc.data() }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "Listing not found" }), {
        status: 404,
      });
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch listing. Server Error" }),
      { status: 500 }
    );
  }
}

// Delete a specific listing by ID
export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Assuming the ID is the last segment in the path

  try {
    await deleteDoc(doc(db, "listings", id));
    return new Response(
      JSON.stringify({ message: "Listing deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to delete listing" }), {
      status: 500,
    });
  }
}
