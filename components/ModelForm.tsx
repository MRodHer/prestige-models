'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import type { Modelo } from '@/types';

interface ModelFormProps {
  modelo?: Modelo;
}

export default function ModelForm({ modelo }: ModelFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: modelo?.nombre || '',
    edad: modelo?.edad || 18,
    nacionalidad: modelo?.nacionalidad || '',
    altura: modelo?.altura || 160,
    busto: modelo?.busto || 90,
    cintura: modelo?.cintura || 60,
    cadera: modelo?.cadera || 90,
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>(modelo?.fotos || []);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + photos.length + existingPhotos.length > 5) {
      toast.error('Máximo 5 fotos permitidas');
      return;
    }

    setPhotos((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingPhoto = (index: number) => {
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadPhotos = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const photo of photos) {
      const fileExt = photo.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('model-photos')
        .upload(filePath, photo);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('model-photos')
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const totalPhotos = photos.length + existingPhotos.length;
    if (totalPhotos === 0) {
      toast.error('Debes subir al menos una foto');
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      const newPhotoUrls = await uploadPhotos();
      const allPhotos = [...existingPhotos, ...newPhotoUrls];

      const modeloData = {
        nombre: formData.nombre,
        edad: formData.edad,
        nacionalidad: formData.nacionalidad,
        altura: formData.altura,
        busto: formData.busto,
        cintura: formData.cintura,
        cadera: formData.cadera,
        fotos: allPhotos,
        foto_principal: allPhotos[0],
      };

      if (modelo) {
        const { error } = await supabase
          .from('modelos')
          .update(modeloData)
          .eq('id', modelo.id);

        if (error) throw error;
        toast.success('Modelo actualizada correctamente');
      } else {
        const { error } = await supabase.from('modelos').insert(modeloData);

        if (error) throw error;
        toast.success('Modelo agregada correctamente');
      }

      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Error saving modelo:', error);
      toast.error(error.message || 'Error al guardar la modelo');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-lg border border-dark-tertiary bg-dark-secondary p-6">
        <h3 className="mb-4 text-lg font-semibold text-cream">Fotos de la Modelo</h3>
        <p className="mb-4 text-sm text-gray-400">
          Sube entre 1 y 5 fotos. La primera foto será la principal.
        </p>

        <div className="space-y-4">
          {(existingPhotos.length > 0 || photoPreviews.length > 0) && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {existingPhotos.map((photo, index) => (
                <div key={`existing-${index}`} className="group relative aspect-[2/3] overflow-hidden rounded-lg bg-dark-primary">
                  <Image src={photo} alt={`Foto ${index + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingPhoto(index)}
                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-elegant group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute left-2 top-2 rounded bg-burgundy px-2 py-1 text-xs text-cream">
                      Principal
                    </div>
                  )}
                </div>
              ))}
              {photoPreviews.map((preview, index) => (
                <div key={`new-${index}`} className="group relative aspect-[2/3] overflow-hidden rounded-lg bg-dark-primary">
                  <Image src={preview} alt={`Nueva foto ${index + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-elegant group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {photos.length + existingPhotos.length < 5 && (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-dark-tertiary bg-dark-primary p-12 transition-elegant hover:border-rose-mauve hover:bg-dark-primary/50">
              <Upload className="mb-3 h-10 w-10 text-gray-500" />
              <p className="mb-1 text-sm font-medium text-cream">
                Clic para subir fotos
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP (máx. 10MB)</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-cream">
            Nombre <span className="text-red-400">*</span>
          </label>
          <input
            id="nombre"
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full rounded-lg border border-dark-tertiary bg-dark-primary px-4 py-3 text-cream placeholder-gray-500 transition-elegant focus:border-rose-mauve focus:outline-none focus:ring-2 focus:ring-rose-mauve/20"
            placeholder="Nombre de la modelo"
            required
          />
        </div>

        <div>
          <label htmlFor="edad" className="mb-2 block text-sm font-medium text-cream">
            Edad <span className="text-red-400">*</span>
          </label>
          <input
            id="edad"
            type="number"
            min="18"
            max="100"
            value={formData.edad}
            onChange={(e) => setFormData({ ...formData, edad: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-dark-tertiary bg-dark-primary px-4 py-3 text-cream placeholder-gray-500 transition-elegant focus:border-rose-mauve focus:outline-none focus:ring-2 focus:ring-rose-mauve/20"
            required
          />
        </div>

        <div>
          <label htmlFor="nacionalidad" className="mb-2 block text-sm font-medium text-cream">
            Nacionalidad <span className="text-red-400">*</span>
          </label>
          <input
            id="nacionalidad"
            type="text"
            value={formData.nacionalidad}
            onChange={(e) => setFormData({ ...formData, nacionalidad: e.target.value })}
            className="w-full rounded-lg border border-dark-tertiary bg-dark-primary px-4 py-3 text-cream placeholder-gray-500 transition-elegant focus:border-rose-mauve focus:outline-none focus:ring-2 focus:ring-rose-mauve/20"
            placeholder="País de origen"
            required
          />
        </div>

        <div>
          <label htmlFor="altura" className="mb-2 block text-sm font-medium text-cream">
            Altura (cm) <span className="text-red-400">*</span>
          </label>
          <input
            id="altura"
            type="number"
            min="140"
            max="220"
            value={formData.altura}
            onChange={(e) => setFormData({ ...formData, altura: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-dark-tertiary bg-dark-primary px-4 py-3 text-cream placeholder-gray-500 transition-elegant focus:border-rose-mauve focus:outline-none focus:ring-2 focus:ring-rose-mauve/20"
            required
          />
        </div>

        <div>
          <label htmlFor="busto" className="mb-2 block text-sm font-medium text-cream">
            Busto (cm) <span className="text-red-400">*</span>
          </label>
          <input
            id="busto"
            type="number"
            min="60"
            max="150"
            value={formData.busto}
            onChange={(e) => setFormData({ ...formData, busto: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-dark-tertiary bg-dark-primary px-4 py-3 text-cream placeholder-gray-500 transition-elegant focus:border-rose-mauve focus:outline-none focus:ring-2 focus:ring-rose-mauve/20"
            required
          />
        </div>

        <div>
          <label htmlFor="cintura" className="mb-2 block text-sm font-medium text-cream">
            Cintura (cm) <span className="text-red-400">*</span>
          </label>
          <input
            id="cintura"
            type="number"
            min="50"
            max="120"
            value={formData.cintura}
            onChange={(e) => setFormData({ ...formData, cintura: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-dark-tertiary bg-dark-primary px-4 py-3 text-cream placeholder-gray-500 transition-elegant focus:border-rose-mauve focus:outline-none focus:ring-2 focus:ring-rose-mauve/20"
            required
          />
        </div>

        <div>
          <label htmlFor="cadera" className="mb-2 block text-sm font-medium text-cream">
            Cadera (cm) <span className="text-red-400">*</span>
          </label>
          <input
            id="cadera"
            type="number"
            min="60"
            max="150"
            value={formData.cadera}
            onChange={(e) => setFormData({ ...formData, cadera: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-dark-tertiary bg-dark-primary px-4 py-3 text-cream placeholder-gray-500 transition-elegant focus:border-rose-mauve focus:outline-none focus:ring-2 focus:ring-rose-mauve/20"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-burgundy px-6 py-3 font-medium text-cream shadow-elegant transition-elegant hover:bg-burgundy-light hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>{uploading ? 'Subiendo fotos...' : 'Guardando...'}</span>
            </>
          ) : (
            <span>{modelo ? 'Actualizar Modelo' : 'Agregar Modelo'}</span>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-lg border border-dark-tertiary bg-transparent px-6 py-3 font-medium text-gray-400 transition-elegant hover:border-gray-500 hover:text-cream disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
