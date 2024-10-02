export default async function CategoryPage({
  params,
}: {
  params: {
    category: string;
  };
}) {
  return (
    <div>
      <h1>Category: {params.category}</h1>
      <p>Posts in this category</p>
    </div>
  );
}
