import { CosmosClient } from "@azure/cosmos";
import Breadcrumb from "@/app/ui/Breadcrumb"
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function Page() {

    const client = new CosmosClient({ endpoint: process.env["COSMOSDB_ENDPOINT"], key: process.env["COSMOSDB_KEY"] });
    const database = client.database("SWAStore");
    const container = database.container("Items");

    async function createItem(formData) {
        "use server";

        const id = formData.get('id');
        const title = formData.get('title');
        const price = formData.get('price');
        const newItem = {
            id,
            title,
            price
        }

        console.log(newItem);

        // Uncomment the following code to enable create functionality
        // try{
        //     console.log("creating item");
        //     const { resource: createdItem } = await container.items.create(newItem);
        // }
        // catch(err){
        //     console.log(err);
        //     return {
        //         message: 'Failed to create item'
        //     }
        // }     

        revalidatePath("/items");
        redirect("/items");
    }

    return <>
        <div className="bg-white p-4">
            <Breadcrumb paths={[{ name: 'Items', url: '/items' }, { name: 'Create' }]} />
            <form action={createItem}>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-gray-700 font-bold mb-2">ID</label>
                    <input placeholder="101" type="text" id="id" name="id" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                    <input placeholder="Marvelous Mug" type="text" id="title" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
                    <input placeholder="10.99" type="text" id="price" name="price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Create Item
                    </button>
                </div>
            </form>
        </div>
    </>
}