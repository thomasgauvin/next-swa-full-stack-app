import Link from "next/link";

export default async function Page() {
    return (<>
        <div className="py-4">
            <h1 className="font-semibold text-2xl pb-2">This is the sales page for our e-commerce backstore management application!</h1>
            <p>Check out the <a href="/items" className="text-blue-500">Items</a> page to draw inspiration to implement the CRUD functionality for Sales.</p>
        </div>
    </>);
}