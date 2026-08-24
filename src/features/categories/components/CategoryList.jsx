import Input from "../../../components/ui/Input";
import Table from "../../../components/ui/Table";
import Pagination from "../../../components/ui/Pagination";
import Button from "../../../components/ui/Button";

export default function CategoryList({
  categories,
  search,
  onSearch,
  page,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}) {
  const columns = [
    { key: "no", label: "#" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "action", label: "Action" },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <Input
        placeholder="Search category..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Table */}
      <Table
        columns={columns}
        data={categories}
        renderRow={(category, index) => (
          <tr key={category.id} className="border-b">
            <td className="p-3">{index + 1}</td>

            <td className="p-3">{category.name}</td>

            <td className="p-3">{category.description}</td>

            <td className="p-3">
              <div className="flex gap-2">
                <Button variant="warning" onClick={() => onEdit(category)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => onDelete(category)}>
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        )}
      />

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
