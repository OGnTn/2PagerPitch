import { FormState } from '../types';

export function DocumentPreview({ data }: { data: FormState }) {
  return (
    <div className="space-y-8 print:space-y-0 pb-12 print:pb-0 font-serif text-[#1A1A1A]">
      {/* Page 1 */}
      <div className="a4-page print:a4-page bg-[#FAF9F6]">
        <div className="h-full flex flex-col">
            <header className="flex justify-between items-baseline mb-8 border-b border-[#1A1A1A] pb-4">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold opacity-60 mb-1">{data.headerEyebrowLeft}</span>
                    <h1 className="text-4xl italic font-serif">{data.gameName || 'Project Name'}</h1>
                </div>
                <div className="text-right">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold opacity-60">{data.headerEyebrowRight}</span>
                    <div className="text-sm italic text-[#7A7067]">{data.headerSubRight}</div>
                </div>
            </header>

            <main className="flex-1 flex flex-col gap-6">
                {data.showPitch && (
                <section className="flex items-start gap-4">
                    <span className="text-3xl font-light opacity-30 mt-[-4px]">{data.page1Section1Number}</span>
                    <div>
                        <h2 className="text-lg font-bold uppercase tracking-wider mb-2 font-sans">{data.page1Section1Title}</h2>
                        <div className="text-sm text-[#4A4A4A] leading-relaxed space-y-3 whitespace-pre-wrap">
                            {data.pitch}
                        </div>
                    </div>
                </section>
                )}

                {data.showCompletionDate && (
                <section className="flex items-start gap-4">
                    <span className="text-3xl font-light opacity-30 mt-[-4px]">{data.page1Section2Number}</span>
                    <div>
                        <h2 className="text-lg font-bold uppercase tracking-wider mb-2 font-sans">{data.page1Section2Title}</h2>
                        <p className="text-sm text-[#4A4A4A] bg-[#F0EBE5] px-2 py-1 inline-block italic font-serif">{data.completionDate}</p>
                    </div>
                </section>
                )}

                {/* Main cover image on page 1 */}
                {data.images.length > 0 && (
                    <section className="mt-auto pt-6 flex-1 flex flex-col min-h-[250px]">
                        <div className="w-full flex-1 relative border border-[#1A1A1A] p-2 bg-[#E5E2DD] flex flex-col min-h-0">
                            <img src={data.images[0]} alt="Visual 1" className="w-full flex-1 object-cover min-h-0" />
                        </div>
                    </section>
                )}
            </main>
        </div>
      </div>

      {/* Page 2 */}
      <div className="a4-page print:a4-page bg-[#FAF9F6]">
        <div className="h-full flex flex-col">
            <header className="flex justify-between items-baseline mb-8 border-b border-[#1A1A1A] pb-4">
                <h1 className="text-2xl italic font-serif">{data.gameName || 'Project Name'} <span className="text-lg font-sans not-italic text-[#7A7067] ml-2 tracking-widest uppercase">{data.page2HeaderSuffix}</span></h1>
                 <div className="w-12 h-12 rounded-full border border-[#1A1A1A] flex items-center justify-center text-[10px] font-sans font-bold tracking-tighter text-center whitespace-pre-wrap leading-tight">{data.page2NumberInfo}</div>
            </header>

            <main className="flex-1 flex flex-col gap-8">
                
                {data.showTeam && (
                <section className="flex items-start gap-4">
                    <span className="text-3xl font-light opacity-30 mt-[-4px]">{data.page2Section1Number}</span>
                    <div className="w-full">
                        <h2 className="text-lg font-bold uppercase tracking-wider mb-4 font-sans">{data.page2Section1Title}</h2>
                        <div className="border border-[#1A1A1A]">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#E5E2DD] border-b border-[#1A1A1A]">
                                        <th className="px-4 py-3 font-sans font-bold uppercase tracking-wider text-[10px] text-[#1A1A1A] w-1/4">{data.tableHeaderName}</th>
                                        <th className="px-4 py-3 font-sans font-bold uppercase tracking-wider text-[10px] text-[#1A1A1A] w-1/4">{data.tableHeaderRole}</th>
                                        <th className="px-4 py-3 font-sans font-bold uppercase tracking-wider text-[10px] text-[#1A1A1A] w-1/4">{data.tableHeaderProfile}</th>
                                        <th className="px-4 py-3 font-sans font-bold uppercase tracking-wider text-[10px] text-[#1A1A1A] w-1/4">{data.tableHeaderOrigin}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E5E2DD]">
                                    {data.team.map((member, i) => (
                                        <tr key={member.id} className={i % 2 === 0 ? 'bg-[#FAF9F6]' : 'bg-[#F0EBE5]'}>
                                            <td className="px-4 py-3 font-serif font-medium text-[#1A1A1A] align-top">{member.name}</td>
                                            <td className="px-4 py-3 font-serif text-[#4A4A4A] align-top">{member.role}</td>
                                            <td className="px-4 py-3 font-serif text-[#7A7067] break-all align-top italic">
                                                {member.linkedin ? (
                                                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#1A1A1A] underline decoration-[#C4B4A3] decoration-1 underline-offset-2">{member.linkedin}</a>
                                                ) : '-'}
                                            </td>
                                            <td className="px-4 py-3 font-serif text-[#4A4A4A] align-top">{member.origin}</td>
                                        </tr>
                                    ))}
                                    {data.team.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-6 text-center text-[#7A7067] italic bg-[#FAF9F6]">{data.tableEmptyText}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                )}

                {(data.showKeyRoles || data.showIpDistribution) && (
                <div className="grid grid-cols-2 gap-8 pr-6 border-r border-[#E5E2DD]">
                    {data.showKeyRoles && (
                    <section className="flex items-start gap-4 col-span-2 md:col-span-1">
                         <span className="text-3xl font-light opacity-30 mt-[-4px]">{data.page2Section2Number}</span>
                         <div className="w-full">
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 font-sans">{data.page2Section2Title}</h2>
                            <div className="text-sm text-[#FAF9F6] whitespace-pre-wrap bg-[#1A1A1A] p-5 rounded-sm font-serif h-full">
                                {data.keyRoles || '-'}
                            </div>
                        </div>
                    </section>
                    )}

                    {data.showIpDistribution && (
                    <section className="flex items-start gap-4 col-span-2 md:col-span-1">
                        <span className="text-3xl font-light opacity-30 mt-[-4px]">{data.page2Section3Number}</span>
                        <div className="w-full">
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 font-sans">{data.page2Section3Title}</h2>
                            <div className="text-sm text-[#4A4A4A] whitespace-pre-wrap border-l-2 border-[#1A1A1A] pl-4 py-2 font-serif italic h-full">
                                {data.ipDistribution || '-'}
                            </div>
                        </div>
                    </section>
                    )}
                </div>
                )}

                {data.showStudentDates && (
                <section className="flex items-start gap-4">
                    <span className="text-3xl font-light opacity-30 mt-[-4px]">{data.page2Section4Number}</span>
                    <div>
                        <h2 className="text-lg font-bold uppercase tracking-wider mb-3 font-sans">{data.page2Section4Title}</h2>
                        <div className="text-sm text-[#4A4A4A] whitespace-pre-wrap font-serif">
                            {data.studentDates || '-'}
                        </div>
                    </div>
                </section>
                )}

                {data.showKeyLinks && (
                <section className="flex items-start gap-4">
                    <span className="text-3xl font-light opacity-30 mt-[-4px]">{data.page2Section5Number}</span>
                    <div className="w-full">
                        <h2 className="text-lg font-bold uppercase tracking-wider mb-3 font-sans">{data.page2Section5Title}</h2>
                        <div className="text-sm text-[#1A1A1A] bg-[#E5E2DD] p-5 rounded-sm font-serif border border-[#1A1A1A]">
                            {data.keyLinks.length > 0 ? (
                                <ul className="space-y-3">
                                    {data.keyLinks.map(link => (
                                        <li key={link.id} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                                            <span className="font-bold text-[#1A1A1A] shrink-0 font-sans tracking-wide uppercase text-[10px] mt-1">{link.label}:</span>
                                            <a href={link.url} target="_blank" rel="noreferrer" className="hover:text-[#4A4A4A] underline decoration-[#C4B4A3] decoration-2 underline-offset-4 break-all">{link.url}</a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="italic text-[#7A7067]">Geen links toegevoegd.</span>
                            )}
                        </div>
                    </div>
                </section>
                )}

                {/* Remaining Images */}
                {data.images.length > 1 && (
                    <section className="mt-4 border-t border-[#1A1A1A] pt-6">
                        <h2 className="text-xs uppercase tracking-[0.2em] mb-4 opacity-70 font-sans font-bold">{data.extraVisualsTitle}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {data.images.slice(1).map((img, i) => (
                                <div key={i} className="aspect-video relative border border-[#1A1A1A] p-1 bg-[#E5E2DD]">
                                    <img src={img} alt={`Visual ${i + 2}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
      </div>
    </div>
  );
}
