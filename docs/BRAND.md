# miao / Vortex

Approved source: miao-vortex-transparent.png from the design review. The application uses its traced SVG, not a new font approximation. The final o supplies the compact symbol; body and symbol slices share original path geometry for the one-shot entrance animation. The complete static wordmark always uses the complete original trace.

Mint #B5E2DB, charcoal #172B29, warm white #F8FAF6; yellow #FFE9A6 and lilac #DCCFEB are accents. Secondary text was darkened for readability. Cairo is bundled under the OFL license. Trace preserved one solid region (#172B28); silhouette IoU 0.99636, mean color difference about 0.60 delta-E. Fine raster shading and anti-aliasing were simplified, not claimed pixel-identical.

Do not stretch the wordmark, substitute a font, crop from a presentation board, or squeeze the full name into tiny square slots. Use the spiral asset for compact slots and the full wordmark with contain fit elsewhere. Native/web icons have deliberate safe padding.

Motion: 900ms one-shot logo introduction, short button/favorite response, image Hero transition, controlled card tilt, camera movement and a check success state. Reduced-motion settings disable the decorative transforms. No photographs or illustrations of living beings were AI-generated.
# الأيقونات واتجاه التنقل

واجهات الهاتف تستخدم طقمًا خطيًا خفيفًا موحدًا من Cupertino، مع أيقونة المنزل للرئيسية، والخريطة والمحادثة والملف بالنمط نفسه. مؤشرات الجنس والقراءة تحتفظ بالرموز المتعارف عليها.

الرجوع في العربية يشير لليمين، والدخول إلى صفحة تالية يشير لليسار. المكوّن المشترك `MiaoDirectionIcon` يحسم الاتجاه من معنى الحركة ثم يمنع الانعكاس التلقائي مرة ثانية. يُستخدم في التفاصيل والقوائم والمحادثات والإضافة والخريطة والأزرار الأساسية؛ لا تُقلب الأيقونات غير الاتجاهية.

