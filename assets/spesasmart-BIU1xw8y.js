import"./stile-CzuNk5ou.js";class p{recognition;isListening=!1;onResultCallback=null;onErrorCallback=null;onEndCallback=null;constructor(){const t=window.SpeechRecognition||window.webkitSpeechRecognition;t?(this.recognition=new t,this.recognition.continuous=!1,this.recognition.lang="it-IT",this.recognition.interimResults=!1,this.recognition.onstart=()=>{this.isListening=!0},this.recognition.onresult=e=>{const o=e.results[0][0].transcript;this.onResultCallback&&this.onResultCallback(o)},this.recognition.onerror=e=>{this.onErrorCallback&&this.onErrorCallback(e.error),this.isListening=!1},this.recognition.onend=()=>{this.isListening=!1,this.onEndCallback&&this.onEndCallback()}):console.warn("L'API SpeechRecognition non è supportata in questo browser.")}onResult(t){this.onResultCallback=t}onError(t){this.onErrorCallback=t}onEnd(t){this.onEndCallback=t}start(){if(!this.recognition){this.onErrorCallback&&this.onErrorCallback("Browser non supportato per i comandi vocali.");return}this.isListening&&this.stop();try{this.recognition.start()}catch(t){console.error("Errore avvio riconoscimento vocale:",t)}}stop(){this.recognition&&this.isListening&&this.recognition.stop()}getIsListening(){return this.isListening}}class h{apiBase;constructor(t){this.apiBase=t}async parseIntent(t){try{const e=await fetch(`${this.apiBase}/voice-intent`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t})});if(!e.ok)throw new Error("Errore di rete durante il parsing dell'intento");const o=await e.json();return o.success&&o.data?o.data:null}catch(e){return console.error("Errore nel parsing NLP:",e),null}}}class m{engine;parser;container;button;popup;isProcessing=!1;constructor(t){this.engine=new p,this.parser=new h(t),this.createUI(),this.setupEvents()}createUI(){this.container=document.createElement("div"),this.container.style.position="fixed",this.container.style.bottom="30px",this.container.style.right="30px",this.container.style.zIndex="9999",this.container.style.display="flex",this.container.style.flexDirection="column",this.container.style.alignItems="flex-end",this.container.style.gap="10px",this.popup=document.createElement("div"),this.popup.style.background="rgba(255, 255, 255, 0.9)",this.popup.style.backdropFilter="blur(10px)",this.popup.style.padding="12px 20px",this.popup.style.borderRadius="16px",this.popup.style.boxShadow="0 8px 32px rgba(26, 23, 20, 0.15)",this.popup.style.border="1px solid var(--linea)",this.popup.style.fontFamily="'Space Mono', monospace",this.popup.style.fontSize="0.9rem",this.popup.style.color="var(--inchiostro)",this.popup.style.maxWidth="250px",this.popup.style.opacity="0",this.popup.style.transform="translateY(10px)",this.popup.style.transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",this.popup.style.pointerEvents="none",this.popup.textContent="In ascolto...",this.button=document.createElement("button"),this.button.style.width="60px",this.button.style.height="60px",this.button.style.borderRadius="30px",this.button.style.background="var(--mandarino)",this.button.style.border="none",this.button.style.color="white",this.button.style.boxShadow="0 4px 15px rgba(255, 106, 43, 0.4)",this.button.style.cursor="pointer",this.button.style.display="flex",this.button.style.justifyContent="center",this.button.style.alignItems="center",this.button.style.transition="all 0.3s ease",this.button.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" fill="currentColor"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',this.container.appendChild(this.popup),this.container.appendChild(this.button),document.body.appendChild(this.container)}setupEvents(){this.button.addEventListener("click",()=>{this.isProcessing||(this.engine.getIsListening()?(this.engine.stop(),this.setUIState("idle")):(this.engine.start(),this.setUIState("listening")))}),this.engine.onResult(async t=>{this.setUIState("processing",t);const e=await this.parser.parseIntent(t);this.handleIntent(e)}),this.engine.onError(t=>{this.setUIState("error",t),setTimeout(()=>this.setUIState("idle"),3e3)}),this.engine.onEnd(()=>{this.isProcessing||this.setUIState("idle")})}setUIState(t,e){switch(t){case"idle":this.isProcessing=!1,this.button.style.background="var(--mandarino)",this.button.style.transform="scale(1)",this.button.style.animation="none",this.popup.style.opacity="0",this.popup.style.transform="translateY(10px)";break;case"listening":this.isProcessing=!1,this.button.style.background="var(--mandarino-scuro)",this.button.style.transform="scale(1.1)",this.button.style.animation="pulse 1.5s infinite",this.popup.textContent="In ascolto...",this.popup.style.opacity="1",this.popup.style.transform="translateY(0)";break;case"processing":this.isProcessing=!0,this.button.style.background="var(--inchiostro)",this.button.style.animation="none",this.popup.textContent=`"${e}"`;break;case"error":this.isProcessing=!1,this.button.style.background="var(--errore)",this.popup.textContent=e||"Errore";break;case"success":this.isProcessing=!1,this.button.style.background="var(--basilico)",this.popup.textContent=e||"Fatto!",setTimeout(()=>this.setUIState("idle"),3e3);break}}handleIntent(t){if(!t){this.setUIState("error","Non ho capito il comando."),setTimeout(()=>this.setUIState("idle"),3e3);return}if(t.intent==="UNKNOWN"){this.setUIState("error",t.reply||"Comando non riconosciuto."),setTimeout(()=>this.setUIState("idle"),3e3);return}if(this.setUIState("success",t.reply),this.speakReply(t.reply),t.intent==="OPEN_SPESASMART"){window.location.hash="#app";const e=document.getElementById("btn-entra-desk");e&&e.click()}else if(t.intent==="OPEN_BILLS")window.location.href="./index.html";else if(t.intent==="ADD_RECEIPT"){window.location.hash="#app";const e=document.getElementById("btn-entra-desk");e&&(e.click(),setTimeout(()=>{const o=document.getElementById("btn-nuovo-scontrino");o&&o.click()},500))}}speakReply(t){if("speechSynthesis"in window){const e=new SpeechSynthesisUtterance;e.text=t,e.lang="it-IT",window.speechSynthesis.speak(e)}}}const l=document.createElement("style");l.textContent=`
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(255, 106, 43, 0.7); }
    70% { box-shadow: 0 0 0 15px rgba(255, 106, 43, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 106, 43, 0); }
  }
`;document.head.appendChild(l);const s="http://localhost:3000/api";let r=null;function u(){console.log("🛒 Inizializzazione SpesaSmart..."),r=document.getElementById("app-spesasmart"),r||(r=document.createElement("div"),r.id="app-spesasmart",document.body.appendChild(r));const i=document.getElementById("vetrina-spesasmart");i&&(i.style.display="none"),g(),c()}function g(){r&&(r.innerHTML=`
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
  `,document.getElementById("btn-nuovo-scontrino")?.addEventListener("click",()=>{const i=document.getElementById("area-caricamento");i&&(i.style.display=i.style.display==="none"?"block":"none")}),document.getElementById("btn-invia-scontrino")?.addEventListener("click",b))}new m(s);async function c(){try{const i=await fetch(`${s}/stats`);if(!i.ok)throw new Error("Errore di rete");const t=await i.json();if(t.overview&&(document.getElementById("stat-totale").textContent="€ "+(t.overview.total_spent||0).toFixed(2),document.getElementById("stat-scontrini").textContent=t.overview.total_receipts||0,document.getElementById("stat-prodotti").textContent=t.overview.total_items||0),t.recent_receipts&&t.recent_receipts.length>0){const e=document.getElementById("lista-scontrini");e&&(e.innerHTML=t.recent_receipts.map(o=>`
          <tr style="border-bottom: 1px solid var(--linea);">
            <td style="padding: 1rem;">${new Date(o.scan_date).toLocaleDateString()}</td>
            <td style="padding: 1rem; font-weight: bold;">${o.store}</td>
            <td style="padding: 1rem;">${o.items_count}</td>
            <td style="padding: 1rem; text-align: right; font-family: 'Space Mono', monospace;">€ ${o.total_amount.toFixed(2)}</td>
          </tr>
        `).join(""))}}catch(i){console.error("Impossibile caricare le statistiche:",i)}}async function b(){const t=document.getElementById("file-scontrino").files?.[0],e=document.getElementById("stato-caricamento");if(!t){e&&(e.textContent="Seleziona un file prima di procedere.");return}e&&(e.style.color="var(--inchiostro)",e.textContent="Analisi in corso con Gemini IA...");const o=new FormData;o.append("image",t);try{const a=await(await fetch(`${s}/ocr`,{method:"POST",body:o})).json();if(!a.success)throw new Error(a.error||"Errore sconosciuto");e&&(e.style.color="var(--basilico)",e.textContent="✅ Scontrino salvato con successo!"),await c()}catch(n){e&&(e.style.color="var(--mandarino-scuro)",e.textContent="❌ Errore: "+n.message)}}const f=["btn-entra-desk","btn-entra-mob","btn-inizia-gratis","btn-registrati-submit","btn-foot"];f.forEach(i=>{const t=document.getElementById(i);t&&t.addEventListener("click",e=>{e.preventDefault(),u()})});window.addEventListener("load",function(){document.getElementById("stage")?.classList.add("animate")});const d=new IntersectionObserver(function(i){i.forEach(function(t){t.isIntersecting&&(t.target.classList.add("in"),d.unobserve(t.target))})},{threshold:.15});document.querySelectorAll(".reveal").forEach(function(i){d.observe(i)});document.getElementById("submit")?.addEventListener("click",function(){const i=document.getElementById("nome").value.trim(),t=document.getElementById("email").value.trim(),e=document.getElementById("tel").value.trim(),o=document.getElementById("privacy").checked,n=document.getElementById("msg");if(!i||!t||!e){n.style.color="#E24E12",n.textContent="Compila nome, email e telefono per continuare.";return}if(!o){n.style.color="#E24E12",n.textContent="Serve il consenso ai termini per registrarti.";return}n.style.color="var(--basilico)",n.textContent="Anteprima del sito — qui partirebbe l'SMS con il codice a "+e+"."});
