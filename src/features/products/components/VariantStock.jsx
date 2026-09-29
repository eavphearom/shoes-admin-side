import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { newStock, sizeOptions } from "../productFormModel";

export default function VariantStock({ index }) {
  const { control, register, formState: { errors } } = useFormContext();
  const name = "variants." + index + ".stocks";
  const { fields, append, remove } = useFieldArray({ control, name, keyName: "formKey" });
  const rows = useWatch({ control, name }) || [];
  const rowErrors = errors.variants?.[index]?.stocks;
  return <div>
    <div className="overflow-x-auto rounded-md border border-[#E5EAF1] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <table className="w-full min-w-[375px] text-left text-xs">
        <thead className="bg-[#F1F5FA] text-[#405C80]"><tr>{["Size (US)", "Stock Qty", "Low Stock Alert", ""].map(label => <th key={label} className="px-2 py-2 font-medium">{label}</th>)}</tr></thead>
        <tbody>{fields.map((row, i) => <tr key={row.formKey} className="border-t border-[#EDF1F6]">
          <td className="w-[32%] p-1.5"><Controller control={control} name={name + "." + i + ".size"} render={({ field }) => <Select {...field} placeholder="Size" options={[...sizeOptions, ...(!sizeOptions.some(s => s.value === rows[i]?.size) && rows[i]?.size ? [{ value: rows[i].size, label: rows[i].size }] : [])].filter(option => option.value === rows[i]?.size || !rows.some(r => r.size === option.value))} error={rowErrors?.[i]?.size?.message} />} /></td>
          <td className="p-1.5"><Input type="number" min="0" step="1" aria-label={"Stock quantity for size " + (i + 1)} {...register(name + "." + i + ".stock")} error={rowErrors?.[i]?.stock?.message} className="!px-2 !py-1.5" /></td>
          <td className="p-1.5"><Input type="number" min="0" step="1" aria-label={"Low-stock alert for size " + (i + 1)} {...register(name + "." + i + ".lowStock")} error={rowErrors?.[i]?.lowStock?.message} className="!px-2 !py-1.5" /></td>
          <td className="p-1.5"><button type="button" aria-label={"Remove size " + (i + 1)} onClick={() => remove(i)} className="cursor-pointer rounded p-2 text-red-500 hover:bg-red-50"><Trash2 size={15} /></button></td>
        </tr>)}</tbody>
      </table>
    </div>
    {(rowErrors?.message || rowErrors?.root?.message) && <p className="mt-2 text-xs text-red-600">{rowErrors.message || rowErrors.root.message}</p>}
    <button type="button" onClick={() => append(newStock())} className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-[#75A9FF] py-2 text-xs font-medium text-[#267BFA] hover:bg-blue-50"><Plus size={16} />Add Size</button>
  </div>;
}
