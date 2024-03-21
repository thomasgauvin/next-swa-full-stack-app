import { CosmosClient } from "@azure/cosmos";
import Breadcrumb from "@/app/ui/Breadcrumb"
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {

  const client = new CosmosClient({ endpoint: process.env["COSMOSDB_ENDPOINT"], key: process.env["COSMOSDB_KEY"] });

  const database = client.database("SWAStore");
  const container = database.container("Items");

  const itemId = params.id;
  const { resource: item } = await container.item(itemId, itemId).read();

  async function updateItem(formData) {
    "use server";

    const id = formData.get('id');
    const title = formData.get('title');
    const price = formData.get('price');
    const updatedItem = {
      id,
      title,
      price
    }

    // Uncomment the following code to enable update functionality
    // try {
    //   const itemId = id;
    //   const { resource: replacedItem } = await container.item(itemId, itemId).replace(updatedItem);
    // }
    // catch (err) {
    //   console.log(err);
    //   return {
    //     message: 'Failed to update item'
    //   }
    // }

    revalidatePath("/items");
    redirect("/items");
  }

  return <>
    <div className="bg-white p-4">
      <Breadcrumb paths={[{ name: 'Items', url: '/items' }, { name: 'Update' }]} />
      <form action={updateItem}>
        <div className="mb-4">
          <label htmlFor="id" className="block text-gray-700 font-bold mb-2">ID</label>
          <input readOnly defaultValue={item.id} placeholder="101" type="text" id="id" name="id" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input defaultValue={item.title} placeholder="Marvelous Mug" type="text" id="title" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
          <input defaultValue={item.price} placeholder="10.99" type="text" id="price" name="price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save
          </button>
        </div>
      </form>
    </div>
  </>
}