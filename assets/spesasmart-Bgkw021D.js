import"./stile-CzuNk5ou.js";const s="http://localhost:3000/api";let n=null;function c(){console.log("🛒 Inizializzazione SpesaSmart..."),n=document.getElementById("app-spesasmart"),n||(n=document.createElement("div"),n.id="app-spesasmart",document.body.appendChild(n));const t=document.getElementById("vetrina-spesasmart");t&&(t.style.display="none"),m(),d()}function m(){n&&(n.innerHTML=`
    <div style="max-width: 900px; margin: 0 auto; padding: 2rem; position: relative;">
      <!-- Sfondo decorativo sfocato -->
      <div style="position: absolute; top: -100px; left: -100px; width: 300px; height: 300px; background: var(--mandarino); filter: blur(120px); opacity: 0.15; z-index: -1;"></div>
      <div style="position: absolute; bottom: 50%; right: -50px; width: 250px; height: 250px; background: var(--basilico); filter: blur(100px); opacity: 0.1; z-index: -1;"></div>

      <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; animation: slideDown 0.5s ease-out;">
        <div>
          <h1 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 2.5rem; letter-spacing: -1px; margin-bottom: 0.5rem;">Il tuo cruscotto <span style="color: var(--mandarino-scuro);">SpesaSmart</span></h1>
          <p style="color: var(--grigio); font-size: 1.1rem;">L'intelligenza artificiale al servizio del tuo risparmio reale.</p>
        </div>
        <button id="btn-nuovo-scontrino" style="background: var(--inchiostro); color: white; border: none; padding: 1rem 2rem; border-radius: 12px; font-weight: 700; font-size: 1.05rem; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(26, 23, 20, 0.2);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5v14m-7-7h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
          Nuovo Scontrino
        </button>
      </header>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
        <div style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.4); padding: 2rem; border-radius: 20px; box-shadow: 0 8px 32px rgba(26, 23, 20, 0.05); transition: transform 0.3s ease;">
          <div style="font-size: 0.9rem; color: var(--grigio); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Totale Investito</div>
          <div id="stat-totale" style="font-size: 2.5rem; font-weight: 800; font-family: 'Space Mono', monospace; color: var(--inchiostro);">€ 0.00</div>
        </div>
        <div style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.4); padding: 2rem; border-radius: 20px; box-shadow: 0 8px 32px rgba(26, 23, 20, 0.05); transition: transform 0.3s ease;">
          <div style="font-size: 0.9rem; color: var(--grigio); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Scontrini Analizzati</div>
          <div id="stat-scontrini" style="font-size: 2.5rem; font-weight: 800; font-family: 'Space Mono', monospace; color: var(--inchiostro);">0</div>
        </div>
        <div style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.4); padding: 2rem; border-radius: 20px; box-shadow: 0 8px 32px rgba(26, 23, 20, 0.05); transition: transform 0.3s ease;">
          <div style="font-size: 0.9rem; color: var(--grigio); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Prodotti Indicizzati</div>
          <div id="stat-prodotti" style="font-size: 2.5rem; font-weight: 800; font-family: 'Space Mono', monospace; color: var(--inchiostro);">0</div>
        </div>
      </div>

      <div id="area-caricamento" style="display: none; background: var(--inchiostro); color: white; padding: 2.5rem; border-radius: 24px; box-shadow: 0 20px 40px rgba(26,23,20,0.3); margin-bottom: 3rem; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; right: 0; width: 150px; height: 150px; background: var(--mandarino); filter: blur(80px); opacity: 0.3; border-radius: 50%;"></div>
        
        <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem; font-family: 'Bricolage Grotesque', sans-serif;">Carica la tua spesa</h3>
        <p style="color: rgba(255,255,255,0.7); margin-bottom: 2rem; max-width: 400px;">Fotografa uno scontrino lungo, corto, stropicciato o carica il PDF della spesa online. L'IA di Gemini pensa a tutto.</p>
        
        <label for="file-scontrino" style="display: block; background: rgba(255,255,255,0.1); border: 2px dashed rgba(255,255,255,0.2); border-radius: 16px; padding: 2rem; text-align: center; cursor: pointer; transition: all 0.3s ease; margin-bottom: 1.5rem;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style="margin-bottom: 1rem;"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke="var(--mandarino)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <div style="font-weight: 600; font-size: 1.1rem;">Tocca per scegliere un file o scattare</div>
          <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 0.5rem;">JPG, PNG, WEBP o PDF</div>
        </label>
        <input type="file" id="file-scontrino" accept="image/*,application/pdf" style="display: none;">
        
        <button id="btn-invia-scontrino" style="background: var(--mandarino); color: white; border: none; padding: 1.1rem 2rem; border-radius: 12px; font-weight: 800; font-size: 1.1rem; cursor: pointer; width: 100%; transition: transform 0.2s ease;">
          Analizza Scontrino ✨
        </button>
        <div id="stato-caricamento" style="margin-top: 1.5rem; font-size: 1rem; text-align: center; font-weight: 500;"></div>
      </div>

      <div style="background: white; border-radius: 24px; box-shadow: 0 12px 30px rgba(26,23,20,0.06); overflow: hidden; border: 1px solid var(--linea);">
        <div style="padding: 1.5rem 2rem; border-bottom: 1px solid var(--linea); display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.4rem; margin: 0;">Cronologia Spese</h3>
        </div>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead style="background: var(--carta);">
              <tr>
                <th style="padding: 1.25rem 2rem; font-weight: 600; color: var(--grigio); font-size: 0.9rem; letter-spacing: 0.5px; text-transform: uppercase;">Data</th>
                <th style="padding: 1.25rem 2rem; font-weight: 600; color: var(--grigio); font-size: 0.9rem; letter-spacing: 0.5px; text-transform: uppercase;">Supermercato</th>
                <th style="padding: 1.25rem 2rem; font-weight: 600; color: var(--grigio); font-size: 0.9rem; letter-spacing: 0.5px; text-transform: uppercase;">Articoli</th>
                <th style="padding: 1.25rem 2rem; font-weight: 600; color: var(--grigio); font-size: 0.9rem; letter-spacing: 0.5px; text-transform: uppercase; text-align: right;">Totale Pagato</th>
              </tr>
            </thead>
            <tbody id="lista-scontrini">
              <tr>
                <td colspan="4" style="padding: 4rem 2rem; text-align: center; color: var(--grigio);">
                  <div style="margin-bottom: 1rem;">Nessuno scontrino caricato.</div>
                  <div style="font-size: 0.9rem; opacity: 0.8;">Inizia fotografando la tua spesa per popolare il database.</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,document.getElementById("btn-nuovo-scontrino")?.addEventListener("click",()=>{const t=document.getElementById("area-caricamento");t&&(t.style.display=t.style.display==="none"?"block":"none")}),document.getElementById("btn-invia-scontrino")?.addEventListener("click",p))}async function d(){try{const t=await fetch(`${s}/stats`);if(!t.ok)throw new Error("Errore di rete");const e=await t.json();if(e.overview&&(document.getElementById("stat-totale").textContent="€ "+(e.overview.total_spent||0).toFixed(2),document.getElementById("stat-scontrini").textContent=e.overview.total_receipts||0,document.getElementById("stat-prodotti").textContent=e.overview.total_items||0),e.recent_receipts&&e.recent_receipts.length>0){const o=document.getElementById("lista-scontrini");o&&(o.innerHTML=e.recent_receipts.map(i=>`
          <tr style="border-bottom: 1px solid var(--linea);">
            <td style="padding: 1rem;">${new Date(i.scan_date).toLocaleDateString()}</td>
            <td style="padding: 1rem; font-weight: bold;">${i.store}</td>
            <td style="padding: 1rem;">${i.items_count}</td>
            <td style="padding: 1rem; text-align: right; font-family: 'Space Mono', monospace;">€ ${i.total_amount.toFixed(2)}</td>
          </tr>
        `).join(""))}}catch(t){console.error("Impossibile caricare le statistiche:",t)}}async function p(){const e=document.getElementById("file-scontrino").files?.[0],o=document.getElementById("stato-caricamento");if(!e){o&&(o.textContent="Seleziona un file prima di procedere.");return}o&&(o.style.color="var(--inchiostro)",o.textContent="Analisi in corso con Gemini IA...");const i=new FormData;i.append("image",e);try{const a=await(await fetch(`${s}/ocr`,{method:"POST",body:i})).json();if(!a.success)throw new Error(a.error||"Errore sconosciuto");o&&(o.style.color="var(--basilico)",o.textContent="✅ Scontrino salvato con successo!"),await d()}catch(r){o&&(o.style.color="var(--mandarino-scuro)",o.textContent="❌ Errore: "+r.message)}}const g=["btn-entra-desk","btn-entra-mob","btn-inizia-gratis","btn-registrati-submit","btn-foot"];g.forEach(t=>{const e=document.getElementById(t);e&&e.addEventListener("click",o=>{o.preventDefault(),c()})});window.addEventListener("load",function(){document.getElementById("stage")?.classList.add("animate")});const l=new IntersectionObserver(function(t){t.forEach(function(e){e.isIntersecting&&(e.target.classList.add("in"),l.unobserve(e.target))})},{threshold:.15});document.querySelectorAll(".reveal").forEach(function(t){l.observe(t)});document.getElementById("submit")?.addEventListener("click",function(){const t=document.getElementById("nome").value.trim(),e=document.getElementById("email").value.trim(),o=document.getElementById("tel").value.trim(),i=document.getElementById("privacy").checked,r=document.getElementById("msg");if(!t||!e||!o){r.style.color="#E24E12",r.textContent="Compila nome, email e telefono per continuare.";return}if(!i){r.style.color="#E24E12",r.textContent="Serve il consenso ai termini per registrarti.";return}r.style.color="var(--basilico)",r.textContent="Anteprima del sito — qui partirebbe l'SMS con il codice a "+o+"."});
