import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Check, Upload } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import LoadingScreen from '../ui/LoadingScreen';

function Field({ field, name, value, onChange }) {
  const baseClass = "w-full bg-obsidian border border-silver/10 text-silver font-body text-sm px-3 py-2.5 focus:border-silver/30 focus:outline-none transition-colors placeholder-steel";

  if (field.type === 'string' && field.enum) {
    return (
      <select value={value || ''} onChange={e => onChange(e.target.value)} className={baseClass}>
        <option value="">Select {name}</option>
        {field.enum.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    );
  }

  if (field.format === 'date') {
    return <input type="date" value={value || ''} onChange={e => onChange(e.target.value)} className={baseClass} />;
  }

  if (field.type === 'boolean') {
    return (
      <label className="flex items-center gap-3 cursor-pointer min-h-0">
        <input type="checkbox" checked={!!value} onChange={e => onChange(e.target.checked)}
          className="w-4 h-4 accent-silver" />
        <span className="font-body text-sm text-silver">Enabled</span>
      </label>
    );
  }

  if (field.type === 'number') {
    return <input type="number" value={value || ''} onChange={e => onChange(Number(e.target.value))}
      placeholder={`Enter ${name}`} className={baseClass} />;
  }

  if (name.includes('url') || name.includes('link')) {
    return (
      <div className="space-y-2">
        <input type="url" value={value || ''} onChange={e => onChange(e.target.value)}
          placeholder={`https://...`} className={baseClass} />
        {name.includes('image') || name.includes('banner') || name.includes('photo') ? (
          <FileUploadField value={value} onChange={onChange} />
        ) : null}
      </div>
    );
  }

  if (name === 'bio' || name === 'description') {
    return (
      <textarea value={value || ''} onChange={e => onChange(e.target.value)}
        placeholder={`Enter ${name}`} rows={3}
        className={`${baseClass} resize-none`} />
    );
  }

  return (
    <input type="text" value={value || ''} onChange={e => onChange(e.target.value)}
      placeholder={`Enter ${name}`} className={baseClass} />
  );
}

function FileUploadField({ value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    onChange(file_url);
    setUploading(false);
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer min-h-0">
      <span className={`flex items-center gap-2 font-mono text-xs border border-silver/20 px-3 py-2 transition-colors ${uploading ? 'text-steel' : 'text-steel hover:text-silver hover:border-silver/40'}`}>
        <Upload size={12} />
        {uploading ? 'Uploading...' : 'Upload Image'}
      </span>
      <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
      {value && <span className="font-mono text-xs text-tactical-green flex items-center gap-1"><Check size={10} /> Uploaded</span>}
    </label>
  );
}

export default function EntityManager({ entityName, entity, fields, title, renderRow }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const load = () => {
    setLoading(true);
    entity.list('-created_date').then(setItems).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({}); setShowForm(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    if (editing) {
      await entity.update(editing.id, form);
    } else {
      await entity.create(form);
    }
    await load();
    setShowForm(false);
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    setDeletingId(id);
    await entity.delete(id);
    setItems(prev => prev.filter(i => i.id !== id));
    setDeletingId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-silver">{title}</h1>
          <p className="font-mono text-xs text-steel mt-1">{items.length} total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-silver text-obsidian px-4 py-2 font-heading text-sm font-semibold tracking-widest uppercase hover:bg-silver/90 transition-colors min-h-0"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {loading ? <LoadingScreen /> : (
        items.length === 0 ? (
          <div className="text-center py-24 micro-border bg-graphene">
            <p className="font-mono text-xs text-steel tracking-ultra uppercase mb-4">No items yet</p>
            <button onClick={openCreate} className="font-mono text-xs text-steel hover:text-silver border border-steel/30 px-4 py-2 transition-colors min-h-0">
              + Add First Item
            </button>
          </div>
        ) : (
          <div className="space-y-px">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-graphene micro-border group hover:bg-white/5 transition-colors">
                <div className="flex-1 min-w-0">
                  {renderRow ? renderRow(item) : (
                    <p className="font-heading text-sm text-silver truncate">{item.name || item.title || item.ign || item.tournament_name || item.key || item.id}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <button onClick={() => openEdit(item)} className="p-2 text-steel hover:text-silver transition-colors min-h-0">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} disabled={deletingId === item.id}
                    className="p-2 text-steel hover:text-destructive transition-colors min-h-0">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-obsidian/90 backdrop-blur-lg p-4 pt-10 overflow-y-auto"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="w-full max-w-xl bg-graphene micro-border mb-10"
            >
              <div className="flex items-center justify-between p-5 micro-border-b">
                <p className="font-heading font-semibold text-silver">{editing ? 'Edit' : 'Add'} {title.replace(/s$/, '')}</p>
                <button onClick={() => setShowForm(false)} className="text-steel hover:text-silver p-1 min-h-0">
                  <X size={18} />
                </button>
              </div>
              <div className="p-5 space-y-4">
                {fields.map(([name, field]) => (
                  <div key={name}>
                    <label className="font-mono text-xs text-steel tracking-ultra uppercase block mb-2">
                      {name.replace(/_/g, ' ')}
                    </label>
                    <Field
                      field={field}
                      name={name}
                      value={form[name]}
                      onChange={v => setForm(prev => ({ ...prev, [name]: v }))}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end gap-3 p-5 micro-border-t">
                <button onClick={() => setShowForm(false)} className="font-mono text-xs text-steel hover:text-silver px-4 py-2 border border-steel/20 hover:border-silver/30 transition-all min-h-0">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex items-center gap-2 bg-silver text-obsidian px-5 py-2 font-heading text-sm font-semibold hover:bg-silver/90 transition-colors min-h-0 disabled:opacity-50">
                  {saving ? 'Saving...' : <><Check size={14} /> Save</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}