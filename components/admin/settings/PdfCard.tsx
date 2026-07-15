"use client";

import type {
  Settings,
  UpdateSettingsField,
} from "./SettingsForm";

interface Props {
    form: Settings;
    update: UpdateSettingsField;
}

export default function PdfCard({
    form,
    update,
}:Props){

    return(

<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

<h2 className="mb-6 text-2xl font-bold text-yellow-500">

Configuración PDF

</h2>

<div className="grid gap-4 md:grid-cols-2">

<input
placeholder="Color principal"
value={form.primaryColor ?? ""}
onChange={(e)=>update("primaryColor",e.target.value)}
className="rounded-lg border border-neutral-700 bg-black p-3 text-white"
/>

<input
placeholder="Color secundario"
value={form.secondaryColor ?? ""}
onChange={(e)=>update("secondaryColor",e.target.value)}
className="rounded-lg border border-neutral-700 bg-black p-3 text-white"
/>

<label className="flex items-center gap-3 text-white">

<input
type="checkbox"
checked={form.showLogo}
onChange={(e)=>update("showLogo",e.target.checked)}
/>

Mostrar Logo

</label>

<label className="flex items-center gap-3 text-white">

<input
type="checkbox"
checked={form.showSignature}
onChange={(e)=>update("showSignature",e.target.checked)}
/>

Mostrar Firma

</label>

<label className="flex items-center gap-3 text-white">

<input
type="checkbox"
checked={form.showStamp}
onChange={(e)=>update("showStamp",e.target.checked)}
/>

Mostrar Sello

</label>

<textarea

rows={4}

placeholder="Pie del PDF"

value={form.pdfFooter ?? ""}

onChange={(e)=>update("pdfFooter",e.target.value)}

className="md:col-span-2 rounded-lg border border-neutral-700 bg-black p-3 text-white"

/>

</div>

</div>

    );

}
