import { CosmosClient } from "@azure/cosmos";
import Breadcrumb from "../ui/Breadcrumb";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const client = new CosmosClient({ endpoint: process.env["COSMOSDB_ENDPOINT"], key: process.env["COSMOSDB_KEY"] });
    const database = client.database("SWAStore");
    const container = database.container("Items");

    const { resources: items } = await container.items.readAll().fetchAll();

    async function deleteItem(id) {
        "use server";


        return { message: 'Unauthorized' };
        // Uncomment the following code to enable delete functionality and delete the line above
        // try{
        //     await container.item(id, id).delete();
        //     revalidatePath("/items");
        // }
        // catch(err){
        //     return {
        //         message: 'Failed to delete item'
        //     }
        // }        
    }

    return (<>
        <div className="bg-white p-4">
            <Breadcrumb paths={[{ name: "Items", url: "/items" }]} />
            <div>
                {items.map((item) => (
                    <div key={item.id} className="border-b py-2">
                        <div className="flex justify-between">
                            <div className="text-lg font-semibold">#{item.id} - {item.title}</div>
                            <div className="text-gray-600">${item.price}</div>
                        </div>
                        <div className="flex justify-end">
                            <Link
                                href={`/items/edit/${item.id}`}
                                className="text-blue-500 hover:text-blue-700 mr-4"
                            >
                                Edit
                            </Link>
                            <form action={deleteItem.bind(null, item.id)}>
                                <button className="text-red-500 hover:text-red-700">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <Link
                    href="/items/create"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create New Item
                </Link>
            </div>
        </div>
    </>);
}