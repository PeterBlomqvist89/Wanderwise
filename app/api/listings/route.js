import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

// Hämta alla listings från databasen
export async function GET(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, "listings"));
    const listings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return new Response(JSON.stringify(listings), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch listings" }), {
      status: 500,
    });
  }
}

// Lägg till en ny listing i databasen
export async function POST(req) {
  try {
    const body = await req.text(); // Hämta råtext från body
    const data = JSON.parse(body); // Parsar texten som JSON

    const docRef = await addDoc(collection(db, "listings"), data);
    return new Response(JSON.stringify({ id: docRef.id, ...data }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error adding document:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to add listing",
        details: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
