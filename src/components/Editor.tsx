import React, { useRef } from 'react';
import { FormState, TeamMember, KeyLink } from '../types';
import { Plus, Trash2, Upload, X, ChevronLeft, ChevronRight } from 'lucide-react';

type EditorProps = {
  data: FormState;
  onChange: (data: FormState) => void;
};

export function Editor({ data, onChange }: EditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof FormState, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const newTeam = [...data.team];
    newTeam[index] = { ...newTeam[index], [field]: value };
    handleChange('team', newTeam);
  };

  const addTeamMember = () => {
    handleChange('team', [
      ...data.team,
      { id: Date.now().toString(), name: '', role: '', linkedin: '', origin: '' }
    ]);
  };

  const removeTeamMember = (index: number) => {
    const newTeam = data.team.filter((_, i) => i !== index);
    handleChange('team', newTeam);
  };

  const updateKeyLink = (index: number, field: keyof KeyLink, value: string) => {
    const newLinks = [...data.keyLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    handleChange('keyLinks', newLinks);
  };

  const addKeyLink = () => {
    handleChange('keyLinks', [
      ...data.keyLinks,
      { id: Date.now().toString(), label: '', url: '' }
    ]);
  };

  const removeKeyLink = (index: number) => {
    const newLinks = data.keyLinks.filter((_, i) => i !== index);
    handleChange('keyLinks', newLinks);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const readFiles = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            resolve(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    });

    const newImages = await Promise.all(readFiles);
    handleChange('images', [...data.images, ...newImages]);
    
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = data.images.filter((_, i) => i !== index);
    handleChange('images', newImages);
  };

  const moveImage = (index: number, direction: number) => {
    const newImages = [...data.images];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newImages.length) {
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
      handleChange('images', newImages);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-[#1A1A1A] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] bg-white font-serif text-sm text-[#1A1A1A]";
  const labelClass = "text-[10px] font-bold font-sans uppercase tracking-widest text-[#1A1A1A]";

  return (
    <div className="p-6 space-y-8 font-sans">
      {/* Visibility Settings */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold text-[#7A7067] uppercase tracking-[0.2em] mb-4 border-b border-[#E5E2DD] pb-2">Zichtbaarheid Secties</h2>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={data.showPitch} onChange={(e) => handleChange('showPitch', e.target.checked)} className="accent-[#1A1A1A] w-4 h-4 cursor-pointer rounded-sm" />
            <span className={labelClass}>Pitch</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={data.showCompletionDate} onChange={(e) => handleChange('showCompletionDate', e.target.checked)} className="accent-[#1A1A1A] w-4 h-4 cursor-pointer rounded-sm" />
            <span className={labelClass}>Afronding Fase</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={data.showTeam} onChange={(e) => handleChange('showTeam', e.target.checked)} className="accent-[#1A1A1A] w-4 h-4 cursor-pointer rounded-sm" />
            <span className={labelClass}>Team</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={data.showKeyRoles} onChange={(e) => handleChange('showKeyRoles', e.target.checked)} className="accent-[#1A1A1A] w-4 h-4 cursor-pointer rounded-sm" />
            <span className={labelClass}>Sleutelrollen</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={data.showIpDistribution} onChange={(e) => handleChange('showIpDistribution', e.target.checked)} className="accent-[#1A1A1A] w-4 h-4 cursor-pointer rounded-sm" />
            <span className={labelClass}>IP Verdeling</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={data.showStudentDates} onChange={(e) => handleChange('showStudentDates', e.target.checked)} className="accent-[#1A1A1A] w-4 h-4 cursor-pointer rounded-sm" />
            <span className={labelClass}>Studenten</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={data.showKeyLinks} onChange={(e) => handleChange('showKeyLinks', e.target.checked)} className="accent-[#1A1A1A] w-4 h-4 cursor-pointer rounded-sm" />
            <span className={labelClass}>Belangrijke Links</span>
          </label>
        </div>
      </section>

      {/* Basic Info */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold text-[#7A7067] uppercase tracking-[0.2em] mb-4 border-b border-[#E5E2DD] pb-2">Basis Informatie</h2>
        
        <div className="space-y-1">
          <label className={labelClass}>Project Naam</label>
          <input 
            type="text" 
            value={data.gameName} 
            onChange={(e) => handleChange('gameName', e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Pitch (Gameconcept)</label>
          <textarea 
            rows={8}
            value={data.pitch} 
            onChange={(e) => handleChange('pitch', e.target.value)}
            className={`${inputClass} resize-y`}
          />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Datum van afronding fase</label>
          <input 
            type="text" 
            value={data.completionDate} 
            onChange={(e) => handleChange('completionDate', e.target.value)}
            className={inputClass}
            placeholder="DD/MM/YYYY"
          />
        </div>
      </section>

      {/* Team */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E2DD] pb-2">
          <h2 className="text-[10px] font-bold text-[#7A7067] uppercase tracking-[0.2em]">Team</h2>
          <button onClick={addTeamMember} className="text-[10px] text-[#1A1A1A] font-bold uppercase tracking-wider hover:text-[#4A4A4A] flex items-center gap-1 cursor-pointer">
            <Plus size={14} /> Voeg toe
          </button>
        </div>

        <div className="space-y-4">
          {data.team.map((member, index) => (
            <div key={member.id} className="p-4 bg-[#E5E2DD]/30 border border-[#1A1A1A] rounded-sm space-y-3 relative">
              <button 
                onClick={() => removeTeamMember(index)}
                className="absolute top-3 right-3 text-[#1A1A1A] hover:text-red-600 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="space-y-1 pr-6">
                <label className={labelClass}>Naam</label>
                <input 
                  type="text" 
                  value={member.name} 
                  onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1">
                <label className={labelClass}>Rol</label>
                <input 
                  type="text" 
                  value={member.role} 
                  onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1">
                <label className={labelClass}>LinkedIn/Portfolio</label>
                <input 
                  type="text" 
                  value={member.linkedin} 
                  onChange={(e) => updateTeamMember(index, 'linkedin', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1">
                <label className={labelClass}>Vlaams/Niet-Vlaams</label>
                <input 
                  type="text" 
                  value={member.origin} 
                  onChange={(e) => updateTeamMember(index, 'origin', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Links */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E2DD] pb-2">
          <h2 className="text-[10px] font-bold text-[#7A7067] uppercase tracking-[0.2em]">Belangrijke Links</h2>
          <button onClick={addKeyLink} className="text-[10px] text-[#1A1A1A] font-bold uppercase tracking-wider hover:text-[#4A4A4A] flex items-center gap-1 cursor-pointer">
            <Plus size={14} /> Voeg toe
          </button>
        </div>

        <div className="space-y-4">
          {data.keyLinks.map((link, index) => (
            <div key={link.id} className="p-4 bg-[#E5E2DD]/30 border border-[#1A1A1A] rounded-sm space-y-3 relative">
              <button 
                onClick={() => removeKeyLink(index)}
                className="absolute top-3 right-3 text-[#1A1A1A] hover:text-red-600 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="space-y-1 pr-6">
                <label className={labelClass}>Titel (bijv. Video of Build)</label>
                <input 
                  type="text" 
                  value={link.label} 
                  onChange={(e) => updateKeyLink(index, 'label', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1">
                <label className={labelClass}>URL</label>
                <input 
                  type="text" 
                  value={link.url} 
                  onChange={(e) => updateKeyLink(index, 'url', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extra details */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold text-[#7A7067] uppercase tracking-[0.2em] mb-4 border-b border-[#E5E2DD] pb-2">Overige Details</h2>
        
        <div className="space-y-1">
          <label className={labelClass}>Sleutelrollen</label>
          <textarea 
            rows={4}
            value={data.keyRoles} 
            onChange={(e) => handleChange('keyRoles', e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>IP Verdeling</label>
          <textarea 
            rows={3}
            value={data.ipDistribution} 
            onChange={(e) => handleChange('ipDistribution', e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Studenten Afstudeerdatum</label>
          <textarea 
            rows={2}
            value={data.studentDates} 
            onChange={(e) => handleChange('studentDates', e.target.value)}
            className={inputClass}
          />
        </div>
      </section>

      {/* Custom Labels */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold text-[#7A7067] uppercase tracking-[0.2em] mb-4 border-b border-[#E5E2DD] pb-2">Aanpasbare Labels</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelClass}>Header Links Boven</label>
            <input type="text" value={data.headerEyebrowLeft} onChange={(e) => handleChange('headerEyebrowLeft', e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Header Rechts Boven</label>
            <input type="text" value={data.headerEyebrowRight} onChange={(e) => handleChange('headerEyebrowRight', e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1 col-span-2">
            <label className={labelClass}>Header Rechts Onder</label>
            <input type="text" value={data.headerSubRight} onChange={(e) => handleChange('headerSubRight', e.target.value)} className={inputClass} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Pagina 1 - Sectie 1 Nummer</label>
            <input type="text" value={data.page1Section1Number} onChange={(e) => handleChange('page1Section1Number', e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Pagina 1 - Sectie 1 Titel</label>
            <input type="text" value={data.page1Section1Title} onChange={(e) => handleChange('page1Section1Title', e.target.value)} className={inputClass} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Pagina 1 - Sectie 2 Nummer</label>
            <input type="text" value={data.page1Section2Number} onChange={(e) => handleChange('page1Section2Number', e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Pagina 1 - Sectie 2 Titel</label>
            <input type="text" value={data.page1Section2Title} onChange={(e) => handleChange('page1Section2Title', e.target.value)} className={inputClass} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Pagina 2 - Header Suffix</label>
            <input type="text" value={data.page2HeaderSuffix} onChange={(e) => handleChange('page2HeaderSuffix', e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Pagina 2 - Paginanummering</label>
            <textarea rows={2} value={data.page2NumberInfo} onChange={(e) => handleChange('page2NumberInfo', e.target.value)} className={inputClass} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Pagina 2 - Sectie 1 Nummer</label>
            <input type="text" value={data.page2Section1Number} onChange={(e) => handleChange('page2Section1Number', e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Pagina 2 - Sectie 1 Titel</label>
            <input type="text" value={data.page2Section1Title} onChange={(e) => handleChange('page2Section1Title', e.target.value)} className={inputClass} />
          </div>

          <div className="space-y-1 col-span-2">
            <label className={labelClass}>Tabel Headers (Naam / Rol / Profiel / Herkomst)</label>
            <div className="grid grid-cols-4 gap-2">
              <input type="text" value={data.tableHeaderName} onChange={(e) => handleChange('tableHeaderName', e.target.value)} className={inputClass} />
              <input type="text" value={data.tableHeaderRole} onChange={(e) => handleChange('tableHeaderRole', e.target.value)} className={inputClass} />
              <input type="text" value={data.tableHeaderProfile} onChange={(e) => handleChange('tableHeaderProfile', e.target.value)} className={inputClass} />
              <input type="text" value={data.tableHeaderOrigin} onChange={(e) => handleChange('tableHeaderOrigin', e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="space-y-1 col-span-2">
            <label className={labelClass}>Tabel Leeg Bericht</label>
            <input type="text" value={data.tableEmptyText} onChange={(e) => handleChange('tableEmptyText', e.target.value)} className={inputClass} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Pagina 2 - Sectie 2 Nummer</label>
            <input type="text" value={data.page2Section2Number} onChange={(e) => handleChange('page2Section2Number', e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Pagina 2 - Sectie 2 Titel</label>
            <input type="text" value={data.page2Section2Title} onChange={(e) => handleChange('page2Section2Title', e.target.value)} className={inputClass} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Pagina 2 - Sectie 3 Nummer</label>
            <input type="text" value={data.page2Section3Number} onChange={(e) => handleChange('page2Section3Number', e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Pagina 2 - Sectie 3 Titel</label>
            <input type="text" value={data.page2Section3Title} onChange={(e) => handleChange('page2Section3Title', e.target.value)} className={inputClass} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Pagina 2 - Sectie 4 Nummer</label>
            <input type="text" value={data.page2Section4Number} onChange={(e) => handleChange('page2Section4Number', e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Pagina 2 - Sectie 4 Titel</label>
            <input type="text" value={data.page2Section4Title} onChange={(e) => handleChange('page2Section4Title', e.target.value)} className={inputClass} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Pagina 2 - Sectie 5 Nummer</label>
            <input type="text" value={data.page2Section5Number} onChange={(e) => handleChange('page2Section5Number', e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Pagina 2 - Sectie 5 Titel</label>
            <input type="text" value={data.page2Section5Title} onChange={(e) => handleChange('page2Section5Title', e.target.value)} className={inputClass} />
          </div>
          
          <div className="space-y-1 col-span-2">
            <label className={labelClass}>Extra Visuals Titel</label>
            <input type="text" value={data.extraVisualsTitle} onChange={(e) => handleChange('extraVisualsTitle', e.target.value)} className={inputClass} />
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="space-y-4 pb-12">
        <h2 className="text-[10px] font-bold text-[#7A7067] uppercase tracking-[0.2em] mb-4 border-b border-[#E5E2DD] pb-2">Beeldmateriaal</h2>
        <div className="space-y-4">
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-[#1A1A1A] rounded-sm flex flex-col items-center justify-center text-[#1A1A1A] hover:bg-[#E5E2DD] transition-colors cursor-pointer bg-white"
            >
                <Upload size={24} className="mb-2 opacity-50" />
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Voeg afbeeldingen toe</span>
            </button>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                multiple 
                accept="image/*" 
            />

            {data.images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                    {data.images.map((img, i) => (
                        <div key={i} className="relative aspect-video bg-[#E5E2DD] rounded-sm overflow-hidden group border border-[#1A1A1A]">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {i > 0 && (
                                    <button 
                                        onClick={() => moveImage(i, -1)}
                                        className="bg-[#1A1A1A] text-[#FAF9F6] p-1.5 hover:bg-[#4A4A4A] cursor-pointer"
                                        title="Move Left"
                                    >
                                        <ChevronLeft size={14} />
                                    </button>
                                )}
                                {i < data.images.length - 1 && (
                                    <button 
                                        onClick={() => moveImage(i, 1)}
                                        className="bg-[#1A1A1A] text-[#FAF9F6] p-1.5 hover:bg-[#4A4A4A] cursor-pointer"
                                        title="Move Right"
                                    >
                                        <ChevronRight size={14} />
                                    </button>
                                )}
                                <button 
                                    onClick={() => removeImage(i)}
                                    className="bg-[#1A1A1A] text-[#FAF9F6] p-1.5 hover:bg-red-600 cursor-pointer"
                                    title="Verwijder"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </section>
    </div>
  );
}
